// src/tareas/tareas-queue.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { QUEUE } from './tareas.constants';

@Controller('tareas/status')
export class TareasStatusController {
  constructor(
    @InjectQueue(QUEUE)
    private readonly queue: Queue,
  ) {}

  @Get(':jobId')
  async getStatus(@Param('jobId') jobId: string) {
    const job = await this.queue.getJob(jobId);

    if (!job) {
      return {
        jobId,
        status: 'not_found',
        result: null,
      };
    }

    const state = await job.getState(); // 'completed' | 'failed' | 'waiting' | 'active' | etc.

    let result = null;
    if (state === 'completed') {
      result = await job.returnvalue;
    } else if (state === 'failed') {
      result = job.failedReason;
    }

    return {
      jobId,
      status: state,
      result,
    };
  }
}
