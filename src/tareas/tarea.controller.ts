// src/tareas/tareas-queue.controller.ts
import { Controller, Get, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { QueueManagerService } from './queue-manager.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('tareas')
@Controller('tareas/status')
export class TareasStatusController {
  constructor(
    private readonly queueManager: QueueManagerService,
  ) {}

  @Get(':jobId')
  @ApiOperation({ summary: 'Obtener el estado de un job por ID' })
  @ApiParam({ name: 'jobId', description: 'ID del job a consultar' })
  @ApiResponse({ status: 200, description: 'Estado del job encontrado' })
  @ApiResponse({ status: 404, description: 'Job no encontrado en ninguna cola' })
  async getStatus(@Param('jobId') jobId: string) {
    const queues = this.queueManager.getAllQueues();
    
    for (const queue of queues) {
      try {
        const job = await queue.getJob(jobId);
        
        if (job) {
          const state = await job.getState();
          
          let result = null;
          let progress = await job.progress;
          
          if (state === 'completed') {
            result = job.returnvalue;
          } else if (state === 'failed') {
            result = job.failedReason;
          }

          return {
            jobId,
            queueName: queue.name,
            status: state,
            progress,
            result,
            attemptsMade: job.attemptsMade,
            processedOn: job.processedOn,
            finishedOn: job.finishedOn,
            timestamp: job.timestamp,
            data: job.data,
          };
        }
      } catch (error) {
        continue;
      }
    }

    throw new NotFoundException({
      jobId,
      status: 'not_found',
      message: `Job ${jobId} no encontrado en ninguna cola`,
      availableQueues: queues.map(q => q.name),
    });
  }

  @Get('queue/:queueName/:jobId')
  @ApiOperation({ summary: 'Obtener el estado de un job en una cola específica' })
  @ApiParam({ name: 'queueName', description: 'Nombre de la cola' })
  @ApiParam({ name: 'jobId', description: 'ID del job a consultar' })
  @ApiResponse({ status: 200, description: 'Estado del job encontrado' })
  @ApiResponse({ status: 404, description: 'Cola o job no encontrado' })
  async getStatusInQueue(
    @Param('queueName') queueName: string,
    @Param('jobId') jobId: string,
  ) {
    const queues = this.queueManager.getAllQueues();
    const queue = queues.find(q => q.name === queueName);

    if (!queue) {
      throw new NotFoundException({
        message: `Cola ${queueName} no encontrada`,
        availableQueues: queues.map(q => q.name),
      });
    }

    const job = await queue.getJob(jobId);

    if (!job) {
      throw new NotFoundException({
        jobId,
        queueName,
        status: 'not_found',
        message: `Job ${jobId} no encontrado en la cola ${queueName}`,
      });
    }

    const state = await job.getState();
    
    let result = null;
    let progress = await job.progress;
    
    if (state === 'completed') {
      result = job.returnvalue;
    } else if (state === 'failed') {
      result = job.failedReason;
    }

    return {
      jobId,
      queueName,
      status: state,
      progress,
      result,
      attemptsMade: job.attemptsMade,
      processedOn: job.processedOn,
      finishedOn: job.finishedOn,
      timestamp: job.timestamp,
      data: job.data,
    };
  }

  @Get('queue/:queueName/jobs')
  @ApiOperation({ summary: 'Listar todos los jobs de una cola específica' })
  @ApiParam({ name: 'queueName', description: 'Nombre de la cola' })
  @ApiResponse({ status: 200, description: 'Lista de jobs en la cola' })
  async getQueueJobs(@Param('queueName') queueName: string) {
    const queues = this.queueManager.getAllQueues();
    const queue = queues.find(q => q.name === queueName);

    if (!queue) {
      throw new NotFoundException({
        message: `Cola ${queueName} no encontrada`,
        availableQueues: queues.map(q => q.name),
      });
    }

    const [waiting, active, completed, failed, delayed] = await Promise.all([
      queue.getWaiting(),
      queue.getActive(),
      queue.getCompleted(),
      queue.getFailed(),
      queue.getDelayed(),
    ]);

    return {
      queueName,
      counts: {
        waiting: waiting.length,
        active: active.length,
        completed: completed.length,
        failed: failed.length,
        delayed: delayed.length,
      },
      jobs: {
        waiting: waiting.map(j => ({ id: j.id, name: j.name, data: j.data })),
        active: active.map(j => ({ id: j.id, name: j.name, data: j.data })),
        completed: completed.slice(0, 10).map(j => ({ id: j.id, name: j.name, returnvalue: j.returnvalue })),
        failed: failed.slice(0, 10).map(j => ({ id: j.id, name: j.name, failedReason: j.failedReason })),
      },
    };
  }
}