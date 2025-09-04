// src/tareas/tareas.worker.ts
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger, Inject } from '@nestjs/common';
import { TaskData } from './tareas.types';

@Processor('tareas')
export class TareasWorker extends WorkerHost {
  private readonly logger = new Logger(TareasWorker.name);

  constructor(
    @Inject('ENTITY_SERVICES') // Mapa dinámico { carrera: CarrerasService, dia: DiasService, ... }
    private readonly entityServices: Record<string, any>,
  ) {
    super();
  }

  async process(job: Job<TaskData>): Promise<any> {
    const { entity, type, data } = job.data;
    const attemptNumber = job.attemptsMade + 1;
    
    this.logger.debug(`Procesando ${entity}.${type} id=${job.id} (intento ${attemptNumber})`);

    try {
      const service = this.entityServices[entity];
      if (!service) {
        throw new Error(`Entidad no soportada: ${entity}`);
      }

      // 👇 dispatch dinámico
      if (typeof service[type] !== 'function') {
        throw new Error(`Operación no soportada: ${entity}.${type}`);
      }

      // Actualizar progreso
      await job.updateProgress(25);

      const result = await service[type](...(this.buildArgs(type, data)));
      
      // Actualizar progreso a 100%
      await job.updateProgress(100);
      
      this.logger.log(`Trabajo ${entity}.${type} id=${job.id} completado exitosamente`);
      return result;
    } catch (error) {
      this.logger.error(`Error en trabajo ${entity}.${type} id=${job.id} (intento ${attemptNumber}):`, error.message);
      
      // Si es el último intento, loggear el error completo
      if (attemptNumber >= (job.opts.attempts || 3)) {
        this.logger.error(`Trabajo ${job.id} falló definitivamente después de ${attemptNumber} intentos:`, error.stack);
      }
      
      throw error; // Re-lanzar para que BullMQ maneje el reintento
    }
  }

  /**
   * Construye los argumentos en base a la operación.
   * - update/remove/findOne => necesitan un ID
   * - create => DTO completo
   * - findAll => sin args
   */
  private buildArgs(type: string, data: any): any[] {
    switch (type) {
      case 'update': return [data.id, data];
      case 'remove': return [data.id];
      case 'findOne': return [data.id];
      case 'create': return [data];
      case 'findAll': return [];
      default: return [];
    }
  }
}
