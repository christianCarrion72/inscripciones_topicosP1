// src/tareas/tareas.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import axios from 'axios';
import { QUEUE } from './tareas.constants';

@Injectable()
export class TareasService {
  private readonly logger = new Logger(TareasService.name);

  constructor(
    @InjectQueue(QUEUE) private readonly queue: Queue,
  ) {}

  /**
   * Consulta el estado de un job
   */
  async getStatus(jobId: string) {
    const job = await this.queue.getJob(jobId);

    if (!job) return { jobId, status: 'not_found', result: null };

    const state = await job.getState();
    let result = null;
    if (state === 'completed') result = job.returnvalue;
    if (state === 'failed') result = job.failedReason;

    return { jobId, status: state, result };
  }

  /**
   * Callback HTTP cuando un job se completa o falla
   */
  async sendCallback(job: any, status: 'completed' | 'failed', payload: any) {
    const callbackUrl = job?.data?.callbackUrl;
    if (!callbackUrl) return;

    try {
      await axios.post(callbackUrl, {
        jobId: job.id,
        status,
        ...payload,
      });
      this.logger.debug(`Callback enviado correctamente para job ${job.id}`);
    } catch (err: any) {
      this.logger.error(`Error enviando callback para job ${job.id}: ${err.message}`);
    }
  }
}
