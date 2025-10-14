import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers, Logger } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { EstudiantesService } from './estudiantes.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TareasProducer } from '../tareas/tareas.producer';
import { generateJobId } from 'src/common/utils/idempotency.util';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';

@ApiTags('estudiantes')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles('admin')
@Controller('estudiantes')
export class EstudiantesController {
  private readonly logger = new Logger(EstudiantesController.name);
  
  constructor(
    private readonly estudiantesService: EstudiantesService,
    private readonly tareas: TareasProducer
  ) {}

  @Post()
  @ApiHeader({
    name: 'x-callback-url',
    description: 'CallBack-URL opcional para recibir respuestas',
    required: false,
  })
  create(@Body() createEstudianteDto: CreateEstudianteDto, @Headers('x-callback-url') callbackUrl?: string) {
    const jobId = generateJobId('estudiante', 'create', createEstudianteDto);
    return this.tareas.enqueue(
      'estudiante',
      'create',
      createEstudianteDto,
      callbackUrl,
      jobId,
    );
  }

  /**
   * Endpoint optimizado: Lee directamente desde caché (Redis)
   * Sin cola, respuesta instantánea
   */
  @Roles('estudiante')
  @Get('materias-disponibles')
  @ApiOperation({ 
    summary: 'Obtener materias disponibles para inscripción del estudiante (OPTIMIZADO)',
    description: 'Devuelve las materias disponibles desde caché. Respuesta instantánea sin cola.'
  })
  async getMateriasDisponibles(@ActiveUser() user: ActiveUserInterface) {
    this.logger.debug(`Obteniendo materias disponibles desde caché para estudiante: ${user.id}`);
    return await this.estudiantesService.getMateriasDisponibles(user.id);
  }

  /**
   * Endpoint para regenerar manualmente el caché de un estudiante
   */
  @Roles('admin')
  @Post(':id/regenerar-cache')
  @ApiOperation({ 
    summary: 'Regenerar caché de materias disponibles',
    description: 'Fuerza la regeneración del caché para un estudiante específico'
  })
  async regenerarCache(@Param('id') id: number) {
    await this.estudiantesService.invalidateCacheForEstudiante(id);
    return await this.estudiantesService.getMateriasDisponibles(id);
  }

  /**
   * Endpoint para regenerar el caché de todos los estudiantes
   */
  @Roles('estudiante')
  @Post('regenerar-cache-todos')
  @ApiOperation({ 
    summary: 'Regenerar caché de todos los estudiantes',
    description: 'Regenera el caché de materias disponibles para todos los estudiantes'
  })
  async regenerarCacheTodos() {
    return await this.estudiantesService.regenerateAllCache();
  }

  @Get()
  @ApiHeader({
    name: 'x-callback-url',
    description: 'CallBack-URL opcional para recibir respuestas',
    required: false,
  })
  findAll(@Headers('x-callback-url') callbackUrl?: string) {
    return this.tareas.enqueue('estudiante', 'findAll',{}, callbackUrl);
  }

  @Get(':id')
  @ApiHeader({
    name: 'x-callback-url',
    description: 'CallBack-URL opcional para recibir respuestas',
    required: false,
  })
  findOne(@Param('id') id: number, @Headers('x-callback-url') callbackUrl?: string) {
    return this.tareas.enqueue('estudiante', 'findOne', { id }, callbackUrl);
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-callback-url',
    description: 'CallBack-URL opcional para recibir respuestas',
    required: false,
  })
  update(@Param('id') id: number, @Body() updateEstudianteDto: UpdateEstudianteDto, @Headers('x-callback-url') callbackUrl?: string) {
    const jobId = generateJobId('estudiante', 'update', { id, ...updateEstudianteDto });
    return this.tareas.enqueue(
      'estudiante',
      'update',
      { id, ...updateEstudianteDto },
      callbackUrl,
      jobId,
    );
  }

  @Delete(':id')
  @ApiHeader({
    name: 'x-callback-url',
    description: 'CallBack-URL opcional para recibir respuestas',
    required: false,
  })
  remove(@Param('id') id: number, @Headers('x-callback-url') callbackUrl?: string) {
    const jobId = generateJobId('estudiante', 'remove', { id });
    return this.tareas.enqueue(
      'estudiante',
      'remove',
      { id },
      callbackUrl,
      jobId,
    );
  }
}