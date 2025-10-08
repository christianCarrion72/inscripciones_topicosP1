import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { Job } from 'bullmq';

@Injectable()
export class TareasService {
  private readonly logger = new Logger(TareasService.name);

  /**
   * Callback HTTP cuando un job se completa o falla
   */
  async sendCallback(job: Job, status: 'completed' | 'failed', payload: any) {
    const callbackUrl = job?.data?.callbackUrl;
    if (!callbackUrl) {
      this.logger.debug(`Job ${job.id} no tiene callbackUrl configurado`);
      return;
    }

    try {
      const response = await axios.post(
        callbackUrl,
        {
          jobId: job.id,
          queueName: job.queueName,
          status,
          timestamp: new Date().toISOString(),
          ...payload,
        },
        {
          timeout: 10000, // 10 segundos de timeout
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      this.logger.log(`Callback enviado correctamente para job ${job.id} → ${callbackUrl}`);
      return response.data;
    } catch (err: any) {
      this.logger.error(
        `Error enviando callback para job ${job.id} → ${callbackUrl}: ${err.message}`
      );
      // No lanzamos el error para que no afecte al procesamiento del job
    }
  }
}