import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue, QueueEvents, Job } from 'bullmq';
import { randomUUID } from 'crypto';
import { TaskData, OperationType } from './tareas.types';

@Injectable()
export class TareasProducer implements OnModuleInit, OnModuleDestroy {
  private queueEvents: QueueEvents;

  constructor(@InjectQueue('tareas') private readonly queue: Queue) {}

  onModuleInit() {
    // 🔹 Creamos QueueEvents para esta cola
    this.queueEvents = new QueueEvents('tareas', {
      connection: this.queue.opts.connection,
    });
  }

  onModuleDestroy() {
    // 🔹 Cerramos conexión a eventos al terminar
    this.queueEvents.close();
  }

  async enqueue<T>(
    entity: string,
    type: OperationType,
    data?: T,
    jobId?: string,
  ) {
    const id=jobId ?? randomUUID();
    const task: TaskData<T> = {
      entity,
      type,
      data,
      status: 'pending',
      createdAt: new Date(),
    };
    this.queue.add(`${entity}.${type}`, task, { jobId: id });
    return { mensaje: "Procesando Tarea",jobId: id };
  }

  async enqueueAndWait<T>(
    entity: string,
    type: OperationType,
    data?: T,
    timeout = 10000,
  ): Promise<any> {
    const id= randomUUID();
    const task: TaskData<T> = {
      entity,
      type,
      data,
      status: 'pending',
      createdAt: new Date(),
    };

    const job: Job = await this.queue.add(`${entity}.${type}`, task, { jobId: id });

    if (!this.queueEvents) {
      throw new Error('QueueEvents no inicializado');
    }

    // 🔹 Espera a que el Worker complete el Job
    const result = await job.waitUntilFinished(this.queueEvents, timeout);
    return result;
  }




}
