import { Controller, Post, Get, Delete, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { TareasQueueService, QueueStats, FailedJobInfo } from './tareas-queue.service';

@ApiTags('Queue Management')
@Controller('admin/queue')
export class TareasQueueController {
  constructor(private readonly queueService: TareasQueueService) {}

  @Post('pause')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Pausar la cola de tareas' })
  @ApiResponse({ status: 200, description: 'Cola pausada exitosamente' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async pauseQueue(): Promise<{ message: string; paused: boolean }> {
    await this.queueService.pauseQueue();
    return { message: 'Cola pausada exitosamente', paused: true };
  }

  @Post('resume')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reanudar la cola de tareas' })
  @ApiResponse({ status: 200, description: 'Cola reanudada exitosamente' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async resumeQueue(): Promise<{ message: string; paused: boolean }> {
    await this.queueService.resumeQueue();
    return { message: 'Cola reanudada exitosamente', paused: false };
  }

  @Get('stats')
  @ApiOperation({ summary: 'Obtener estadísticas de la cola' })
  @ApiResponse({ 
    status: 200, 
    description: 'Estadísticas de la cola obtenidas exitosamente',
    schema: {
      type: 'object',
      properties: {
        waiting: { type: 'number', description: 'Trabajos en espera' },
        active: { type: 'number', description: 'Trabajos activos' },
        completed: { type: 'number', description: 'Trabajos completados' },
        failed: { type: 'number', description: 'Trabajos fallidos' },
        delayed: { type: 'number', description: 'Trabajos retrasados' },
        paused: { type: 'boolean', description: 'Estado de pausa de la cola' }
      }
    }
  })
  async getQueueStats(): Promise<QueueStats> {
    return this.queueService.getQueueStats();
  }

  @Get('failed')
  @ApiOperation({ summary: 'Obtener trabajos fallidos' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Número máximo de trabajos a retornar (default: 10)' })
  @ApiQuery({ name: 'offset', required: false, type: Number, description: 'Número de trabajos a omitir (default: 0)' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de trabajos fallidos obtenida exitosamente',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          data: { type: 'object' },
          failedReason: { type: 'string' },
          stacktrace: { type: 'string' },
          timestamp: { type: 'number' },
          attemptsMade: { type: 'number' },
          processedOn: { type: 'number' }
        }
      }
    }
  })
  async getFailedJobs(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number
  ): Promise<FailedJobInfo[]> {
    return this.queueService.getFailedJobs(limit || 10, offset || 0);
  }

  @Post('failed/:jobId/retry')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reintentar un trabajo fallido específico' })
  @ApiParam({ name: 'jobId', description: 'ID del trabajo a reintentar' })
  @ApiResponse({ status: 200, description: 'Trabajo reintentado exitosamente' })
  @ApiResponse({ status: 404, description: 'Trabajo no encontrado' })
  @ApiResponse({ status: 400, description: 'El trabajo no está en estado fallido' })
  async retryFailedJob(@Param('jobId') jobId: string): Promise<{ message: string; jobId: string }> {
    await this.queueService.retryFailedJob(jobId);
    return { message: 'Trabajo reintentado exitosamente', jobId };
  }

  @Post('failed/retry-all')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reintentar todos los trabajos fallidos' })
  @ApiResponse({ 
    status: 200, 
    description: 'Trabajos fallidos reintentados',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        retriedCount: { type: 'number' }
      }
    }
  })
  async retryAllFailedJobs(): Promise<{ message: string; retriedCount: number }> {
    const retriedCount = await this.queueService.retryAllFailedJobs();
    return { 
      message: `${retriedCount} trabajos fallidos reintentados`, 
      retriedCount 
    };
  }

  @Delete('failed/:jobId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar un trabajo fallido específico' })
  @ApiParam({ name: 'jobId', description: 'ID del trabajo a eliminar' })
  @ApiResponse({ status: 200, description: 'Trabajo eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Trabajo no encontrado' })
  async removeFailedJob(@Param('jobId') jobId: string): Promise<{ message: string; jobId: string }> {
    await this.queueService.removeFailedJob(jobId);
    return { message: 'Trabajo fallido eliminado exitosamente', jobId };
  }

  @Delete('failed')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Limpiar todos los trabajos fallidos' })
  @ApiResponse({ 
    status: 200, 
    description: 'Trabajos fallidos eliminados',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        removedCount: { type: 'number' }
      }
    }
  })
  async cleanFailedJobs(): Promise<{ message: string; removedCount: number }> {
    const removedCount = await this.queueService.cleanFailedJobs();
    return { 
      message: `${removedCount} trabajos fallidos eliminados`, 
      removedCount 
    };
  }

  @Get('job/:jobId')
  @ApiOperation({ summary: 'Obtener detalles de un trabajo específico' })
  @ApiParam({ name: 'jobId', description: 'ID del trabajo' })
  @ApiResponse({ 
    status: 200, 
    description: 'Detalles del trabajo obtenidos exitosamente',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        data: { type: 'object' },
        progress: { type: 'number' },
        returnvalue: { type: 'any' },
        failedReason: { type: 'string' },
        stacktrace: { type: 'string' },
        timestamp: { type: 'number' },
        processedOn: { type: 'number' },
        finishedOn: { type: 'number' },
        attemptsMade: { type: 'number' },
        opts: { type: 'object' },
        state: { type: 'string' }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Trabajo no encontrado' })
  async getJobDetails(@Param('jobId') jobId: string): Promise<any> {
    return this.queueService.getJobDetails(jobId);
  }

  @Delete('completed/clean')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Limpiar trabajos completados antiguos' })
  @ApiQuery({ name: 'olderThanDays', required: false, type: Number, description: 'Días de antigüedad (default: 7)' })
  @ApiResponse({ 
    status: 200, 
    description: 'Trabajos completados antiguos eliminados',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        removedCount: { type: 'number' }
      }
    }
  })
  async cleanCompletedJobs(
    @Query('olderThanDays') olderThanDays?: number
  ): Promise<{ message: string; removedCount: number }> {
    const removedCount = await this.queueService.cleanCompletedJobs(olderThanDays || 7);
    return { 
      message: `${removedCount} trabajos completados antiguos eliminados`, 
      removedCount 
    };
  }
}
