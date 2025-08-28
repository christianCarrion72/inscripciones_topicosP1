import { Controller, Post, UseGuards, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SeedsService } from './seeds.service';

@ApiTags('Seeds')
@Controller('seeds')
export class SeedsController {
  constructor(private readonly seedsService: SeedsService) {}

  @Post('run')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Ejecutar seeder de base de datos',
    description: 'Ejecuta el proceso de seeding para poblar la base de datos con datos iniciales. Solo administradores pueden ejecutar esta operación.'
  })
  @ApiResponse({
    status: 200,
    description: 'Seeder ejecutado exitosamente',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
        timestamp: { type: 'string' },
        summary: {
          type: 'object',
          properties: {
            carreras: { type: 'number' },
            planEstudios: { type: 'number' },
            niveles: { type: 'number' },
            modulos: { type: 'number' },
            aulas: { type: 'number' },
            dias: { type: 'number' },
            horarios: { type: 'number' },
            materias: { type: 'number' },
            docentes: { type: 'number' },
            estudiantes: { type: 'number' },
            gestiones: { type: 'number' },
            periodos: { type: 'number' },
            grupos: { type: 'number' },
            grupoMaterias: { type: 'number' },
            diaHorarios: { type: 'number' },
            boletaHorarios: { type: 'number' },
            inscripciones: { type: 'number' },
            detalles: { type: 'number' },
            notas: { type: 'number' },
            prerequisitos: { type: 'number' }
          }
        }
      }
    }
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado - Token JWT requerido'
  })
  @ApiResponse({
    status: 403,
    description: 'Prohibido - Se requieren permisos de administrador'
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor durante la ejecución del seeder'
  })
  async runSeeder() {
    return await this.seedsService.runSeeder();
  }

  @Post('run-safe')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Ejecutar seeder de forma segura',
    description: 'Ejecuta el seeder solo si la base de datos está vacía, evitando duplicar datos. Solo administradores pueden ejecutar esta operación.'
  })
  @ApiResponse({
    status: 200,
    description: 'Seeder ejecutado o verificación completada',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
        executed: { type: 'boolean' },
        reason: { type: 'string' },
        timestamp: { type: 'string' }
      }
    }
  })
  async runSeederSafe() {
    return await this.seedsService.runSeederSafe();
  }

  @Post('check-status')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Verificar estado de la base de datos',
    description: 'Verifica si la base de datos tiene datos y muestra un resumen del estado actual.'
  })
  @ApiResponse({
    status: 200,
    description: 'Estado de la base de datos verificado',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        hasData: { type: 'boolean' },
        counts: {
          type: 'object',
          properties: {
            carreras: { type: 'number' },
            materias: { type: 'number' },
            estudiantes: { type: 'number' },
            docentes: { type: 'number' }
          }
        },
        timestamp: { type: 'string' }
      }
    }
  })
  async checkDatabaseStatus() {
    return await this.seedsService.checkDatabaseStatus();
  }
}
