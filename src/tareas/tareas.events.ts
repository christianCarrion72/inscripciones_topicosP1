// src/tareas/tareas.events.ts
import { QueueEventsListener, OnQueueEvent, QueueEventsHost } from '@nestjs/bullmq';
import { Inject, Logger } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { QUEUE } from './tareas.constants';

@QueueEventsListener(QUEUE)
export class TareasEvents extends QueueEventsHost {
  private readonly logger = new Logger(TareasEvents.name);

  constructor(
    @Inject(TareasService) private readonly tareasService: TareasService,
    @InjectQueue(QUEUE) private readonly queue: Queue,
  ) {
    super();
  }

  @OnQueueEvent('waiting')
  onWaiting({ jobId }: { jobId: string }) {
    this.logger.debug(`EVENT: waiting → Job ${jobId} está en cola`);
  }

  @OnQueueEvent('active')
  onActive({ jobId }: { jobId: string }) {
  }

  @OnQueueEvent('progress')
  onProgress({ jobId, data }: { jobId: string; data: any }) {
  }

  @OnQueueEvent('completed')
  async onCompleted({ jobId, returnvalue }: { jobId: string; returnvalue: any }) {
    this.logger.debug(`Job ${jobId} completado`);

    const job = await this.queue.getJob(jobId);
    await this.tareasService.sendCallback(job, 'completed', { result: returnvalue });
  }

  @OnQueueEvent('failed')
  async onFailed({ jobId, failedReason }: { jobId: string; failedReason: string }) {
    this.logger.error(`Job ${jobId} falló: ${failedReason}`);

    const job = await this.queue.getJob(jobId);
    await this.tareasService.sendCallback(job, 'failed', { error: failedReason });
  }

  @OnQueueEvent('stalled')
  onStalled({ jobId }: { jobId: string }) {
  }

  @OnQueueEvent('removed')
  onRemoved({ jobId }: { jobId: string }) {
  }
}
