// src/tareas/queue-manager.controller.ts
import { Controller, Post, Delete, Param, Body, Get } from '@nestjs/common';
import { QueueManagerService } from './queue-manager.service';
import { CreateQueueDto } from './dto/create.queue.dto';
import { CreateWorkerDto } from './dto/create-worker.dto';

@Controller('queues')
export class QueueManagerController {
  constructor(private readonly manager: QueueManagerService) {}

  @Post()
  async createQueue(@Body() dto: CreateQueueDto) {
    return this.manager.createQueue(dto.name);
  }

  @Delete(':name')
  async remove(@Param('name') name: string) {
    return this.manager.removeQueue(name, { waitForDrain: true });
  }

  @Post(':name/workers')
  async addWorker(@Param('name') name: string, @Body() dto: CreateWorkerDto) {
    return this.manager.addWorker(name, { concurrency: dto.concurrency });
  }

  @Delete(':name/workers/:id')
  async removeWorker(@Param('name') name: string, @Param('id') id: string) {
    return this.manager.removeWorker(name, id);
  }

  @Get()
  list() {
    return this.manager.getAllQueues();
  }
}
