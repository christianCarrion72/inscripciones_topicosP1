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
    await this.queueManager.enqueueBalanced(task, { jobId: id });
    return {
      mensaje: 'Procesando Tarea',
      jobId: id,
      notificationEndpoint: `/api/tareas/status/${id}`,
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
      queue: queueName,
    };
  }

  // /** enqueue and wait: waits for completion from the queue the manager chooses */
  // async enqueueAndWait(entity: string, type: OperationType, data?: any, timeout?: number, jobId?: string) {
  //   const id = jobId ?? randomUUID();
  //   const task: TaskData = { entity, type, data, timeout: timeout ?? 15000 };
  //   const queueName = this.queueManager.getNextQueueName();
  //   const jobName = `${entity}.${type}`;

  //   // add job with timeout
  //   const job = await this.queueManager.enqueueToQueue(queueName, jobName, task, {
  //     jobId: id,
  //     timeout: task.timeout,
  //   });

  //   // create QueueEvents for waitUntilFinished (connected to the queue)
  //   const queueEvents = new QueueEvents(queueName, { connection: (job.queue as unknown as any)?.opts?.connection ?? undefined });
  //   await queueEvents.waitUntilReady();
  //   try {
  //     return await job.waitUntilFinished(queueEvents, task.timeout);
  //   } finally {
  //     await queueEvents.close();
  //   }
  // }
}
