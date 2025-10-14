// src/tareas/tareas.producer.ts
import { Injectable } from '@nestjs/common';
import { QueueManagerService } from './queue-manager.service';
import { TaskData, OperationType } from './tareas.types';
import { randomUUID } from 'crypto';
import { Queue, QueueEvents } from 'bullmq';

@Injectable()
export class TareasProducer {
  constructor(private readonly queueManager: QueueManagerService) {}

  async enqueue(entity: string, type: OperationType, data?: any, callback?: string, jobId?: string) {
    const id = jobId ?? randomUUID();
    const task: TaskData = { entity, type, data, callbackUrl: callback };
    // Enqueue balanced (round-robin) by default
    if( entity === 'inscripcion')
      await this.queueManager.enqueueToQueue('inscripciones','inscripcion',task, { jobId: id });
    else
      await this.queueManager.enqueueBalanced(task, { jobId: id });
    return {
      mensaje: 'Procesando Tarea',
      jobId: id,
      notificationEndpoint: `/tareas/status/${id}`,
    };
  }

  async enqueueToQueue(queueName: string, entity: string, type: OperationType, data?: any, opts: any = {}) {
    const id = opts.jobId ?? randomUUID();
    const task: TaskData = { entity, type, data };
    const jobName = `${entity}.${type}`;
    const job = await this.queueManager.enqueueToQueue(queueName, jobName, task, { jobId: id, ...opts });
    return {
      mensaje: 'Procesando Tarea',
      jobId: job.id,
      notificationEndpoint: `/tareas/status/${id}`,
    };
  }
}
