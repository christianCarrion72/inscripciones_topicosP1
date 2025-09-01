import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue, QueueEvents } from 'bullmq';
import { randomUUID } from 'node:crypto';
import { TAREAS_QUEUE } from './tareas.constants';
import { TaskName, TaskPayload } from './tareas.types';
import { ConfigService } from '@nestjs/config';

export const TAREAS_EVENTS = Symbol('TAREAS_EVENTS');

@Injectable()
export class TareasProducer implements OnModuleDestroy {
  constructor(
    @InjectQueue(TAREAS_QUEUE) private readonly queue: Queue,
    @Inject(TAREAS_EVENTS) private readonly events: QueueEvents,
  ) {}

  async fireAndForget(name: TaskName, payload: TaskPayload, jobId?: string) {
    const id = jobId ?? payload?.meta?.requestId ?? randomUUID();
    const job = await this.queue.add(name, payload, { jobId: id });
    return { enqueued: true, jobId: job.id, name };
  }

  // Útil para GET u operaciones donde necesitas el resultado ahora mismo.
  // Úsalo con criterio; no abuses de waitUntilFinished en controladores.
  async requestAndWait<T = any>(
    name: TaskName,
    payload: TaskPayload,
    ttlMs = 15_000,
    jobId?: string,
  ): Promise<{ jobId: string; result: T }> {
    const id = jobId ?? payload?.meta?.requestId ?? randomUUID();
    const job = await this.queue.add(name, payload, { jobId: id });
    const result = await job.waitUntilFinished(this.events, ttlMs);
    return { jobId: job.id!, result: result as T };
  }

  async onModuleDestroy() {
    await this.events.close();
  }
}

// Provider de QueueEvents (requiere conexión dedicada)
export const TareasEventsProvider = {
  provide: TAREAS_EVENTS,
  useFactory: (config: ConfigService) =>
    new QueueEvents(TAREAS_QUEUE, {
      connection: {
        host: config.get<string>('REDIS_HOST', '127.0.0.1'),
        port: +config.get<number>('REDIS_PORT', 6379),
      },
    }),
  inject: [ConfigService],
};
