// // src/tareas/tareas.worker.ts
// import { Processor, WorkerHost } from '@nestjs/bullmq';
// import { Job } from 'bullmq';
// import { Logger, Inject } from '@nestjs/common';
// import { TaskData } from './tareas.types';
// import { QUEUE } from './tareas.constants';

// @Processor(QUEUE, { 
//   concurrency: 10,              
//   limiter: {
//     max: 50,                   
//     duration: 1000,
//   },
// })
// export class TareasWorker extends WorkerHost {
//   private readonly logger = new Logger(TareasWorker.name);

//   constructor(
//     @Inject('ENTITY_SERVICES')
//     private readonly entityServices: Record<string, any>,
//   ) {
//     super();
//   }

//   async process(job: Job<TaskData>): Promise<any> {
//     const { entity, type, data } = job.data;
//     this.logger.debug(`🚀 Procesando ${entity}.${type} id=${job.id}`);

//     // 🔹 Simulación de timeout para tareas de prueba
//     if (job.id?.startsWith('test-timeout')) {
//       this.logger.warn(`Simulando timeout para el job ${job.id}`);
//       await new Promise((res) => setTimeout(res, 15_000)); // 15s de retardo
//     }

//     const service = this.entityServices[entity];
//     if (!service) throw new Error(`Entidad no soportada: ${entity}`);
//     if (typeof service[type] !== 'function') throw new Error(`Operación no soportada: ${entity}.${type}`);

//     await job.updateProgress(25);

//     const result = await service[type](...(this.buildArgs(type, data)));

//     await job.updateProgress(100);

//     return result;
//   }

//   private buildArgs(type: string, data: any): any[] {
//     switch (type) {
//       case 'update': return [data.id, data];
//       case 'remove': return [data.id];
//       case 'findOne': return [data.id];
//       case 'create': return [data];
//       case 'findAll': return [];
//       default: return [];
//     }
//   }
// }
