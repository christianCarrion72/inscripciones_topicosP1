import { Injectable, Logger } from '@nestjs/common';
import { QueueEvents, Job } from 'bullmq';
import { TareasService } from './tareas.service';

const REDIS_HOST = process.env.REDIS_HOST ?? '127.0.0.1';
const REDIS_PORT = Number(process.env.REDIS_PORT ?? 6379);

const defaultRedisConn = {
  host: REDIS_HOST,
  port: REDIS_PORT,
  family: 4,
  connectTimeout: 10_000,
  keepAlive: 1,
};

interface QueueEventListener {
  queueName: string;
  queueEvents: QueueEvents;
}

@Injectable()
export class TareasEventsManager {
  private readonly logger = new Logger(TareasEventsManager.name);
  private eventListeners = new Map<string, QueueEventListener>();

  constructor(private readonly tareasService: TareasService) {}

  async registerQueueEvents(queueName: string, queue: any): Promise<void> {
    if (this.eventListeners.has(queueName)) {
      this.logger.warn(`Ya existen eventos registrados para la cola ${queueName}`);
      return;
    }

    const queueEvents = new QueueEvents(queueName, { connection: defaultRedisConn });
    await queueEvents.waitUntilReady();

    // Evento: waiting
    queueEvents.on('waiting', ({ jobId }) => {
      this.logger.debug(`[${queueName}] Job ${jobId} está en cola (waiting)`);
    });

    // Evento: active
    queueEvents.on('active', ({ jobId }) => {
      this.logger.debug(`[${queueName}] Job ${jobId} está en ejecución (active)`);
    });

    // Evento: progress
    queueEvents.on('progress', ({ jobId, data }) => {
      this.logger.debug(`[${queueName}] Job ${jobId} progreso: ${data}%`);
    });

    // Evento: completed
    queueEvents.on('completed', async ({ jobId, returnvalue }) => {
      this.logger.debug(`[${queueName}] Job ${jobId} completado exitosamente`);
      
      try {
        const job = await queue.getJob(jobId);
        if (job) {
          await this.tareasService.sendCallback(job, 'completed', { result: returnvalue });
        }
      } catch (error) {
        this.logger.error(`Error procesando callback de completed para job ${jobId}: ${error.message}`);
      }
    });

    // Evento: failed
    queueEvents.on('failed', async ({ jobId, failedReason }) => {
      this.logger.error(`[${queueName}] Job ${jobId} falló: ${failedReason}`);
      
      try {
        const job = await queue.getJob(jobId);
        if (job) {
          await this.tareasService.sendCallback(job, 'failed', { error: failedReason });
        }
      } catch (error) {
        this.logger.error(`Error procesando callback de failed para job ${jobId}: ${error.message}`);
      }
    });

    // Evento: stalled
    queueEvents.on('stalled', ({ jobId }) => {
      this.logger.warn(`[${queueName}] Job ${jobId} se ha estancado (stalled)`);
    });

    // Evento: removed
    queueEvents.on('removed', ({ jobId }) => {
      this.logger.debug(`[${queueName}] Job ${jobId} fue removido`);
    });

    // Evento: error
    queueEvents.on('error', (error) => {
      this.logger.error(`[${queueName}] Error en QueueEvents: ${error.message}`);
    });

    this.eventListeners.set(queueName, { queueName, queueEvents });
    this.logger.log(`📡 Eventos registrados para la cola: ${queueName}`);
  }

  async unregisterQueueEvents(queueName: string): Promise<void> {
    const listener = this.eventListeners.get(queueName);
    if (!listener) {
      this.logger.warn(`No hay eventos registrados para la cola ${queueName}`);
      return;
    }

    try {
      await listener.queueEvents.close();
      this.eventListeners.delete(queueName);
      this.logger.log(`📡 Eventos desregistrados para la cola: ${queueName}`);
    } catch (error) {
      this.logger.error(`Error cerrando eventos de la cola ${queueName}: ${error.message}`);
    }
  }

  /**
   * Cierra todos los event listeners (cleanup)
   */
  async closeAll(): Promise<void> {
    const promises = Array.from(this.eventListeners.values()).map(async (listener) => {
      try {
        await listener.queueEvents.close();
      } catch (error) {
        this.logger.error(`Error cerrando eventos de ${listener.queueName}: ${error.message}`);
      }
    });

    await Promise.all(promises);
    this.eventListeners.clear();
    this.logger.log('🔌 Todos los event listeners cerrados');
  }

  getRegisteredQueues(): string[] {
    return Array.from(this.eventListeners.keys());
  }
}