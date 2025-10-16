// src/tareas/queue-manager.service.ts
import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { Queue, Worker, QueueEvents, Job } from 'bullmq';
import { randomUUID } from 'crypto';
import { TareasWorker } from './tareas.worker';
import { TaskData } from './tareas.types';
import { TareasEventsManager } from './tareas.events';

const REDIS_HOST = process.env.REDIS_HOST ?? '127.0.0.1';
const REDIS_PORT = Number(process.env.REDIS_PORT ?? 6379);

const defaultRedisConn = {
  host: REDIS_HOST,
  port: REDIS_PORT,
  family: 4,
  connectTimeout: 10_000,
  keepAlive: 1,
};

interface ManagedWorker {
  id: string;
  worker: Worker;
}

@Injectable()
export class QueueManagerService implements OnModuleDestroy {
  private readonly logger = new Logger(QueueManagerService.name);
  onQueuesChanged?: () => void;

  private queues = new Map<string, Queue>();
  private workers = new Map<string, ManagedWorker[]>();

  private queueNames: string[] = [];
  private balancedQueueNames: string[] = [];
  private lastIndex = -1;

  constructor(private readonly jobProcessor: TareasWorker,private readonly eventsManager: TareasEventsManager,) { 
    this.createQueue('default', true); 
    this.createQueue('inscripcion', true,false); 
  }

  async createQueue(
    name: string,
    createDefaultWorker = true,
    includeInBalance = true
  ) {
    if (this.queues.has(name)) throw new Error(`Queue ${name} ya existe`);
  
    const queue = new Queue(name, { connection: defaultRedisConn });
    this.queues.set(name, queue);
    this.workers.set(name, []);
    this.queueNames.push(name);
  
    if (includeInBalance) {
      this.balancedQueueNames.push(name);
    }
  
    await this.eventsManager.registerQueueEvents(name, queue);
    this.onQueuesChanged?.();
  
    this.logger.log(`Queue creada: ${name}`);
  
    if (createDefaultWorker) {
      await this.addWorker(name, 10);
    }
  
    return { message: `Queue ${name} creada` };
  }
  async removeQueue(name: string, { waitForDrain = true, timeoutMs = 30_000 } = {}) {
    const queue = this.queues.get(name);
    if (!queue) throw new Error(`Queue ${name} no existe`);

    // 1) Pausar la cola para que deje de aceptar nuevos jobs
    await queue.pause();
    this.logger.log(`⏸️ Queue ${name} pausada (no recibirá nuevos jobs)`);

    // 2) Si pedimos esperar, hacemos polling hasta que no queden waiting/active jobs o timeout
    if (waitForDrain) {
      const start = Date.now();
      while (true) {
        const waiting = await queue.getWaitingCount();
        const active = await queue.getActiveCount();
        const delayed = await queue.getDelayedCount();
        const totalPending = waiting + active + delayed;
        this.logger.debug(`Queue ${name} pendientes=${totalPending} (waiting=${waiting} active=${active} delayed=${delayed})`);
        if (totalPending === 0) break;
        if (Date.now() - start > timeoutMs) {
          throw new Error(`Timeout esperando que la queue ${name} se vacíe`);
        }
        // esperar un poco
        await new Promise((r) => setTimeout(r, 500));
      }
    }

    // 3) Cerrar workers asociados
    const managed = this.workers.get(name) ?? [];
    await Promise.all(managed.map(async (m) => {
      try {
        await m.worker.close(); // espera a terminar jobs activos
      } catch (e) {
        this.logger.warn(`Error cerrando worker ${m.id}: ${String((e as Error).message)}`);
      }
    }));

    // 4) Cerrar y eliminar la cola
    await this.eventsManager.unregisterQueueEvents(name);
    await queue.close();
    this.queues.delete(name);
    this.workers.delete(name);
    this.queueNames = this.queueNames.filter((q) => q !== name);
    this.balancedQueueNames = this.balancedQueueNames.filter((q) => q !== name);

    this.onQueuesChanged?.();
    this.logger.log(`Queue eliminada: ${name}`);
    return { message: `Queue ${name} eliminada` };
  }

  async addWorker(queueName: string, concurrency = 10, number = 1) {
    const queue = this.queues.get(queueName);
    if (!queue) throw new Error(`Queue ${queueName} no existe`);
  
    for (let i = 0; i < number; i++) {
      const id = randomUUID();
      const worker = new Worker<TaskData>(
        queueName,
        async (job: Job<TaskData>) => {
          return this.jobProcessor.process(job);
        },
        {
          connection: defaultRedisConn,
          concurrency,
        },
      );
      const managed: ManagedWorker = { id, worker };
      const arr = this.workers.get(queueName) ?? [];
      arr.push(managed);
      this.workers.set(queueName, arr);
  
      this.logger.log(`Worker ${id} creado para queue ${queueName} (concurrency=${concurrency})`);
    }
  }

  /** Remove a worker by id (safe close) */
  async removeWorker(queueName: string, workerId: string) {
    const arr = this.workers.get(queueName);
    if (!arr) throw new Error(`Queue ${queueName} no existe`);
    const idx = arr.findIndex((m) => m.id === workerId);
    if (idx === -1) throw new Error(`Worker ${workerId} no encontrado en queue ${queueName}`);

    const [managed] = arr.splice(idx, 1);
    try {
      await managed.worker.close(); // espera a terminar el job activo
      this.logger.log(`Worker ${workerId} cerrado y removido de ${queueName}`);
    } catch (e) {
      this.logger.warn(`Error cerrando worker ${workerId}: ${String((e as Error).message)}`);
    }
    this.workers.set(queueName, arr);
    return { workerId };
  }

  /** Enqueue job to specific queue */
  async enqueueToQueue(queueName: string, name: string, data: TaskData, opts: any = {}) {
    const queue = this.queues.get(queueName);
    if (!queue) throw new Error(`Queue ${queueName} no existe`);
    const job = await queue.add(name, data, opts);
    return job;
  }

  /** Simple round-robin: get next queue name */
  getNextQueueName(): string {
    if (this.balancedQueueNames.length === 0)
      throw new Error('No hay colas registradas para el balanceo');
  
    this.lastIndex = (this.lastIndex + 1) % this.balancedQueueNames.length;
    return this.balancedQueueNames[this.lastIndex];
  }  

  /** Enqueue balanced (round-robin) using entity.type as job name */
  async enqueueBalanced(data: TaskData, opts: any = {}) {
    const queueName = this.getNextQueueName();
    const jobName = `${data.entity}.${data.type}`;
    return this.enqueueToQueue(queueName, jobName, data, opts);
  }

  listQueues() {
    return Array.from(this.queues.keys()).map((name) => ({
      name,
      workers: (this.workers.get(name) || []).map((w) => w.id),
    }));
  }

  getAllQueues(): Queue[] {
    return Array.from(this.queues.values());
  }

  async onModuleDestroy() {
    // Cerrar todo al shutdown
    await this.eventsManager.closeAll();
    for (const name of Array.from(this.queues.keys())) {
      try {
        await this.removeQueue(name, { waitForDrain: false });
      } catch (e) {
        this.logger.warn(`Error cerrando queue ${name} on shutdown: ${String((e as Error).message)}`);
      }
    }
  }
}
