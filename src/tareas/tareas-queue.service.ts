import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue, Job } from 'bullmq';

export interface QueueStats {
  waiting: number;
  active: number;
  completed: number;
  failed: number;
  delayed: number;
  paused: boolean;
}

export interface FailedJobInfo {
  id: string;
  name: string;
  data: any;
  failedReason: string;
  stacktrace: string;
  timestamp: number;
  attemptsMade: number;
  processedOn: number;
}

@Injectable()
export class TareasQueueService {
  private readonly logger = new Logger(TareasQueueService.name);

  constructor(@InjectQueue('tareas') private readonly queue: Queue) {}

  /**
   * Pausa la cola de tareas
   */
  async pauseQueue(): Promise<void> {
    try {
      await this.queue.pause();
      this.logger.log('Cola pausada exitosamente');
    } catch (error) {
      this.logger.error('Error al pausar la cola:', error);
      throw error;
    }
  }

  /**
   * Reanuda la cola de tareas
   */
  async resumeQueue(): Promise<void> {
    try {
      await this.queue.resume();
      this.logger.log('Cola reanudada exitosamente');
    } catch (error) {
      this.logger.error('Error al reanudar la cola:', error);
      throw error;
    }
  }

  /**
   * Obtiene el estado de la cola
   */
  async getQueueStats(): Promise<QueueStats> {
    try {
      const [waiting, active, completed, failed, delayed, isPaused] = await Promise.all([
        this.queue.getWaiting(),
        this.queue.getActive(),
        this.queue.getCompleted(),
        this.queue.getFailed(),
        this.queue.getDelayed(),
        this.queue.isPaused(),
      ]);

      return {
        waiting: waiting.length,
        active: active.length,
        completed: completed.length,
        failed: failed.length,
        delayed: delayed.length,
        paused: isPaused,
      };
    } catch (error) {
      this.logger.error('Error al obtener estadísticas de la cola:', error);
      throw error;
    }
  }

  /**
   * Obtiene trabajos fallidos con información detallada
   */
  async getFailedJobs(limit = 10, offset = 0): Promise<FailedJobInfo[]> {
    try {
      const failedJobs = await this.queue.getFailed(offset, offset + limit - 1);
      
      return failedJobs.map((job: Job) => ({
        id: job.id as string,
        name: job.name,
        data: job.data,
        failedReason: job.failedReason || 'Sin razón especificada',
        stacktrace: Array.isArray(job.stacktrace) ? job.stacktrace.join('\n') : (job.stacktrace || 'Sin stacktrace disponible'),
        timestamp: job.timestamp,
        attemptsMade: job.attemptsMade,
        processedOn: job.processedOn || 0,
      }));
    } catch (error) {
      this.logger.error('Error al obtener trabajos fallidos:', error);
      throw error;
    }
  }

  /**
   * Reintenta un trabajo fallido específico
   */
  async retryFailedJob(jobId: string): Promise<void> {
    try {
      const job = await this.queue.getJob(jobId);
      if (!job) {
        throw new Error(`Trabajo con ID ${jobId} no encontrado`);
      }

      if (!job.failedReason) {
        throw new Error(`El trabajo ${jobId} no está en estado fallido`);
      }

      await job.retry();
      this.logger.log(`Trabajo ${jobId} reintentado exitosamente`);
    } catch (error) {
      this.logger.error(`Error al reintentar trabajo ${jobId}:`, error);
      throw error;
    }
  }

  /**
   * Reintenta todos los trabajos fallidos
   */
  async retryAllFailedJobs(): Promise<number> {
    try {
      const failedJobs = await this.queue.getFailed();
      let retriedCount = 0;

      for (const job of failedJobs) {
        try {
          await job.retry();
          retriedCount++;
        } catch (error) {
          this.logger.warn(`No se pudo reintentar trabajo ${job.id}:`, error.message);
        }
      }

      this.logger.log(`${retriedCount} trabajos fallidos reintentados`);
      return retriedCount;
    } catch (error) {
      this.logger.error('Error al reintentar trabajos fallidos:', error);
      throw error;
    }
  }

  /**
   * Elimina un trabajo fallido específico
   */
  async removeFailedJob(jobId: string): Promise<void> {
    try {
      const job = await this.queue.getJob(jobId);
      if (!job) {
        throw new Error(`Trabajo con ID ${jobId} no encontrado`);
      }

      await job.remove();
      this.logger.log(`Trabajo fallido ${jobId} eliminado`);
    } catch (error) {
      this.logger.error(`Error al eliminar trabajo ${jobId}:`, error);
      throw error;
    }
  }

  /**
   * Limpia todos los trabajos fallidos
   */
  async cleanFailedJobs(): Promise<number> {
    try {
      const failedJobs = await this.queue.getFailed();
      let removedCount = 0;

      for (const job of failedJobs) {
        try {
          await job.remove();
          removedCount++;
        } catch (error) {
          this.logger.warn(`No se pudo eliminar trabajo ${job.id}:`, error.message);
        }
      }

      this.logger.log(`${removedCount} trabajos fallidos eliminados`);
      return removedCount;
    } catch (error) {
      this.logger.error('Error al limpiar trabajos fallidos:', error);
      throw error;
    }
  }

  /**
   * Obtiene información detallada de un trabajo específico
   */
  async getJobDetails(jobId: string): Promise<any> {
    try {
      const job = await this.queue.getJob(jobId);
      if (!job) {
        throw new Error(`Trabajo con ID ${jobId} no encontrado`);
      }

      return {
        id: job.id,
        name: job.name,
        data: job.data,
        progress: job.progress,
        returnvalue: job.returnvalue,
        failedReason: job.failedReason,
        stacktrace: job.stacktrace,
        timestamp: job.timestamp,
        processedOn: job.processedOn,
        finishedOn: job.finishedOn,
        attemptsMade: job.attemptsMade,
        opts: job.opts,
        state: await job.getState(),
      };
    } catch (error) {
      this.logger.error(`Error al obtener detalles del trabajo ${jobId}:`, error);
      throw error;
    }
  }

  /**
   * Limpia trabajos completados antiguos (más de X días)
   */
  async cleanCompletedJobs(olderThanDays = 7): Promise<number> {
    try {
      const olderThan = Date.now() - (olderThanDays * 24 * 60 * 60 * 1000);
      const completedJobs = await this.queue.getCompleted();
      
      let removedCount = 0;
      for (const job of completedJobs) {
        if (job.finishedOn && job.finishedOn < olderThan) {
          try {
            await job.remove();
            removedCount++;
          } catch (error) {
            this.logger.warn(`No se pudo eliminar trabajo completado ${job.id}:`, error.message);
          }
        }
      }

      this.logger.log(`${removedCount} trabajos completados antiguos eliminados`);
      return removedCount;
    } catch (error) {
      this.logger.error('Error al limpiar trabajos completados:', error);
      throw error;
    }
  }
}
