// src/tareas/job-processor.ts
import { Injectable, Logger, Inject } from '@nestjs/common';
import { Job } from 'bullmq';
import { TaskData } from './tareas.types';

@Injectable()
export class JobProcessor {
  private readonly logger = new Logger(JobProcessor.name);

  constructor(
    @Inject('ENTITY_SERVICES')
    private readonly entityServices: Record<string, any>,
  ) {}

  async process(job: Job<TaskData>): Promise<any> {
    const { entity, type, data } = job.data;
    const jobIdStr = String(job.id ?? '');
    this.logger.debug(`🚀 Procesando ${entity}.${type} id=${jobIdStr}`);

    // Simulación de timeout para pruebas (mantenido si quieres)
    if (jobIdStr.startsWith('test-timeout')) {
      this.logger.warn(`Simulando timeout para el job ${jobIdStr}`);
      await new Promise((res) => setTimeout(res, 15_000));
    }

    const service = this.entityServices[entity];
    if (!service) {
      const msg = `Entidad no soportada: ${entity}`;
      this.logger.error(msg);
      throw new Error(msg);
    }
    if (typeof service[type] !== 'function') {
      const msg = `Operación no soportada: ${entity}.${type}`;
      this.logger.error(msg);
      throw new Error(msg);
    }

    await job.updateProgress(25);

    // Ejecuta la operación con los argumentos normalizados
    const result = await service[type](...this.buildArgs(type, data));

    await job.updateProgress(100);
    return result;
  }

  private buildArgs(type: string, data: any): any[] {
    switch (type) {
      case 'update':
        return [data.id, data];
      case 'remove':
        return [data.id];
      case 'findOne':
        return [data.id];
      case 'create':
        return [data];
      case 'findAll':
        return [];
      default:
        return [];
    }
  }
}
