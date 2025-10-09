import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { EstudiantesService } from './estudiantes.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TareasProducer } from '../tareas/tareas.producer';
import { generateJobId } from 'src/common/utils/idempotency.util';

@ApiTags('estudiantes')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('estudiantes')
export class EstudiantesController {
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

  @Get(':id/materias-disponibles')
  @ApiOperation({ 
    summary: 'Obtener materias disponibles para inscripción del estudiante',
    description: 'Devuelve las materias que el estudiante puede inscribir basándose en prerrequisitos completados'
  })
  @ApiHeader({
    name: 'x-callback-url',
    description: 'CallBack-URL opcional para recibir respuestas',
    required: false,
  })
  getMateriasDisponibles(@Param('id') id: number, @Headers('x-callback-url') callbackUrl?: string) {
    return this.tareas.enqueue('estudiante', 'getMateriasDisponibles', { id }, callbackUrl);
  }
}
