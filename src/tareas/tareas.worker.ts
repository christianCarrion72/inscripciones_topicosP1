import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { TAREAS_QUEUE } from './tareas.constants';
import { Injectable, Logger } from '@nestjs/common';
import { CarrerasService } from '../carreras/carreras.service';
import { DiasService } from '../dias/dias.service';

@Processor(TAREAS_QUEUE)
@Injectable()
export class TareasWorker extends WorkerHost {
  private readonly logger = new Logger(TareasWorker.name);

  constructor(
    private readonly carrera: CarrerasService,
    private readonly dia: DiasService,
  ) {
    super();
  }

  // En BullMQ se hace switch por job.name (no @Process por nombre)
  async process(job: Job): Promise<any> {
    this.logger.debug(`Procesando ${job.name} id=${job.id}`);

    const { params, body } = job.data ?? {};

    switch (job.name) {
      // Carrera
      case 'carrera.create':
        return this.carrera.create(body);
      case 'carrera.update':
        return this.carrera.update(params.id, body);
      case 'carreras.getAll':
        return this.carrera.findAll();
      case 'carrera.get':
        return this.carrera.findOne(params.id);
      case 'carrera.delete':
        return this.carrera.remove(params.id);

      // Día
      case 'dia.create':
        return this.dia.create(body);
      case 'dia.update':
        return this.dia.update(params.id, body);
      case 'dias.getAll':
        return this.dia.findAll();
      case 'dia.get':
        return this.dia.findOne(params.id);
      case 'dia.delete':
        return this.dia.remove(params.id);

      default:
        throw new Error(`Job name no soportado: ${job.name}`);
    }
  }
}
