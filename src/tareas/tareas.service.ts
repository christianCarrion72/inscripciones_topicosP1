import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { TaskData } from './tareas.types';

@Injectable()
export class TareasService {
  private readonly logger = new Logger(TareasService.name);

  /**
   * Envía un callback al frontend cuando un job se completa o falla
   */
  async sendCallback(
    job: Job<TaskData>,
    status: 'completed' | 'failed',
    payload: { result?: any; error?: string },
  ): Promise<void> {
    const callbackUrl = job.data.callbackUrl;

    if (!callbackUrl) {
      this.logger.debug(`Job ${job.id} no tiene callbackUrl configurada`);
      return;
    }

    // ✅ Agregar el jobId a la URL del callback
    const fullCallbackUrl = `${callbackUrl}/${job.id}`;

    try {
      const callbackPayload = {
        jobId: job.id,
        status,
        progress: status === 'completed' ? 100 : await job.progress,
        timestamp: Date.now(),
        data: job.data,
        ...(status === 'completed'
          ? { result: payload.result }
          : { error: payload.error }),
      };

      this.logger.debug(`📤 Enviando callback para job ${job.id} → ${fullCallbackUrl}`);

      // ✅ Usa fetch nativo (disponible en Node 18+)
      const response = await fetch(fullCallbackUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(callbackPayload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      this.logger.log(`✅ Callback enviado exitosamente para job ${job.id}`);
    } catch (error: any) {
      this.logger.error(
        `❌ Error enviando callback para job ${job.id} → ${fullCallbackUrl}: ${error.message}`,
        {
          jobData: job.data,
          returnValue: payload.result,
        },
      );
      // No lanzar el error para que no falle el job
    }
  }
}
