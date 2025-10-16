// src/tareas/job-processor.ts
import { Injectable, Logger, Inject } from '@nestjs/common';
import { Job } from 'bullmq';
import { TaskData } from './tareas.types';

@Injectable()
export class TareasWorker {
  private readonly logger = new Logger(TareasWorker.name);

  constructor(
    @Inject('ENTITY_SERVICES')
    private readonly entityServices: Record<string, any>,
  ) {}

  async process(job: Job<TaskData>): Promise<any> {
    const { entity, type, data } = job.data;

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
      case 'requestSeat':
        return [data];
      case 'getMateriasDisponibles':
        return [data.id];
      case 'getHistorial':
        return [data.userId];
      default:
        return [];
    }
  }
}
