// src/tareas/tareas.producer.ts
import { Injectable } from '@nestjs/common';
import { QueueManagerService } from './queue-manager.service';
import { TaskData, OperationType } from './tareas.types';
import { randomUUID } from 'crypto';
import { Queue, QueueEvents } from 'bullmq';

@Injectable()
export class TareasProducer {
  constructor(private readonly queueManager: QueueManagerService) {}

  async enqueue(entity: string, type: OperationType, data?: any, callback?: string, jobId?: string) {
    const id = jobId ?? randomUUID();
    const task: TaskData = { entity, type, data, callbackUrl: callback };
    if(entity === 'inscripcion' && type === "requestSeat"){
      await this.queueManager.enqueueToQueue('inscripcion', `${entity}.${type}`, task, { jobId: id });
    }else{
      await this.queueManager.enqueueBalanced(task, { jobId: id });
    }
    
    return {
      mensaje: 'Procesando Tarea',
      jobId: id,
      notificationEndpoint: `/tareas/status/${id}`,
    };
  }
}
