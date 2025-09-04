// src/tareas/tareas.events.ts
import { QueueEventsListener, OnQueueEvent, QueueEventsHost } from '@nestjs/bullmq';
import { Inject,Logger  } from '@nestjs/common';
import { TareasGateway } from './tareas.gatway';

@QueueEventsListener('tareas')
export class TareasEvents extends QueueEventsHost {
  private readonly logger = new Logger(TareasEvents.name);

  constructor(@Inject(TareasGateway) private readonly gateway: TareasGateway) {
    super();
  }

  @OnQueueEvent('waiting')
  onWaiting({ jobId }: { jobId: string }) {
    this.logger.debug(`EVENT: waiting → Job ${jobId} está en cola`);
    this.gateway.sendJobUpdate(jobId, 'waiting', { message: 'Tarea en cola' });
  }

  @OnQueueEvent('active')
  onActive({ jobId }: { jobId: string }) {
    this.logger.debug(`EVENT: active → Job ${jobId} comenzó a ejecutarse`);
    this.gateway.sendJobUpdate(jobId, 'active', { message: 'Tarea en ejecución' });
  }

  @OnQueueEvent('progress')
  onProgress({ jobId, data }: { jobId: string; data: any }) {
    this.gateway.sendJobUpdate(jobId, 'progress', { progress: data });
  }

  @OnQueueEvent('completed')
  onCompleted({ jobId, returnvalue }: { jobId: string; returnvalue: any }) {
    this.logger.debug(`Job ${jobId} completado`, returnvalue);
    this.gateway.sendJobUpdate(jobId, 'completed', { result: returnvalue });
  }

  @OnQueueEvent('failed')
  onFailed({ jobId, failedReason }: { jobId: string; failedReason: string }) {
    this.logger.error(`Job ${jobId} falló: ${failedReason}`);
    this.gateway.sendJobUpdate(jobId, 'failed', { error: failedReason });
  }

  @OnQueueEvent('stalled')
  onStalled({ jobId }: { jobId: string }) {
    this.gateway.sendJobUpdate(jobId, 'stalled', { message: 'Tarea bloqueada y reintentando' });
  }

  @OnQueueEvent('removed')
  onRemoved({ jobId }: { jobId: string }) {
    this.gateway.sendJobUpdate(jobId, 'removed', { message: 'Tarea eliminada' });
  }
}
