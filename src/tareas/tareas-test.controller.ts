import { Controller, Post, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { TareasTestService } from './tareas-test.service';

@ApiTags('Queue Testing')
@Controller('admin/queue/test')
export class TareasTestController {
  constructor(private readonly testService: TareasTestService) {}

  @Post('failing-task')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una tarea de prueba que falla' })
  @ApiResponse({ 
    status: 201, 
    description: 'Tarea de prueba fallida creada exitosamente',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        jobId: { type: 'string' }
      }
    }
  })
  async createFailingTask(): Promise<{ message: string; jobId: string }> {
    const jobId = await this.testService.createFailingTask();
    return { 
      message: 'Tarea de prueba fallida creada exitosamente', 
      jobId 
    };
  }

  @Post('successful-task')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una tarea de prueba que tiene éxito' })
  @ApiResponse({ 
    status: 201, 
    description: 'Tarea de prueba exitosa creada exitosamente',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        jobId: { type: 'string' }
      }
    }
  })
  async createSuccessfulTask(): Promise<{ message: string; jobId: string }> {
    const jobId = await this.testService.createSuccessfulTask();
    return { 
      message: 'Tarea de prueba exitosa creada exitosamente', 
      jobId 
    };
  }

  @Post('multiple-tasks')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear múltiples tareas de prueba' })
  @ApiQuery({ name: 'count', required: false, type: Number, description: 'Número de tareas a crear (default: 5)' })
  @ApiResponse({ 
    status: 201, 
    description: 'Múltiples tareas de prueba creadas exitosamente',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        jobIds: { 
          type: 'array',
          items: { type: 'string' }
        },
        count: { type: 'number' }
      }
    }
  })
  async createMultipleTestTasks(
    @Query('count') count?: number
  ): Promise<{ message: string; jobIds: string[]; count: number }> {
    const jobIds = await this.testService.createMultipleTestTasks(count || 5);
    return { 
      message: `${jobIds.length} tareas de prueba creadas exitosamente`, 
      jobIds,
      count: jobIds.length
    };
  }

  @Post('timeout-task')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una tarea de prueba que simula timeout' })
  @ApiResponse({ 
    status: 201, 
    description: 'Tarea de timeout creada exitosamente',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        jobId: { type: 'string' }
      }
    }
  })
  async createTimeoutTask(): Promise<{ message: string; jobId: string }> {
    const jobId = await this.testService.createTimeoutTask();
    return { 
      message: 'Tarea de timeout creada exitosamente', 
      jobId 
    };
  }

  @Post('priority-tasks')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear tareas con diferentes prioridades' })
  @ApiResponse({ 
    status: 201, 
    description: 'Tareas con diferentes prioridades creadas exitosamente',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        jobIds: { 
          type: 'array',
          items: { type: 'string' }
        }
      }
    }
  })
  async createPriorityTasks(): Promise<{ message: string; jobIds: string[] }> {
    const jobIds = await this.testService.createPriorityTasks();
    return { 
      message: 'Tareas con diferentes prioridades creadas exitosamente', 
      jobIds
    };
  }
}
