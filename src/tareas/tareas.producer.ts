import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue, QueueEvents, Job } from 'bullmq';
import { randomUUID } from 'crypto';
import { TaskData, OperationType } from './tareas.types';
import { QUEUE } from './tareas.constants';

@Injectable()
export class TareasProducer implements OnModuleInit, OnModuleDestroy {
  private queueEvents: QueueEvents;

  constructor(@InjectQueue(QUEUE) private readonly queue: Queue) {}

  async onModuleInit() {
    // QueueEvents SOLO para waitUntilFinished
    this.queueEvents = new QueueEvents(QUEUE, {
      connection: this.queue.opts.connection,
    });
    await this.queueEvents.waitUntilReady();
  }

  async onModuleDestroy() {
    await this.queueEvents.close();
  }

  async enqueue<T>(
    entity: string,
    type: OperationType,
    data?: T,
    jobId?: string,
  ) {
    const id = jobId ?? randomUUID();

    const task: TaskData<T> = {
      entity,
      type,
      data,
    };

    await this.queue.add(`${entity}.${type}`, task, { jobId: id });
    return { mensaje: 'Procesando Tarea', jobId: id };
  }

  async enqueueAndWait<T>(
    entity: string,
    type: OperationType,
    data?: T,
    timeout?: number,
    jobId?: string,
  ): Promise<any> {
    const timeoutT = timeout ?? 0;
    const id = jobId ?? randomUUID();

    const task: TaskData<T> = {
      entity,
      type,
      data,
    };

    const job: Job = await this.queue.add(`${entity}.${type}`, task, { jobId: id });

    if (!this.queueEvents) {
      throw new Error('QueueEvents no inicializado');
    }

    //Espera hasta que el Worker lo complete/falle
    return job.waitUntilFinished(this.queueEvents, timeoutT);
  }
}
