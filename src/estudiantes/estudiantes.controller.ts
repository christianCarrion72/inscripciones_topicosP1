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
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async create(@Body() createEstudianteDto: CreateEstudianteDto, @Headers('x-idempotency-key') idem?: string) {
    const jobId = generateJobId('estudiante', 'create', createEstudianteDto);
    return this.tareas.enqueue(
      'estudiante',
      'create',
      createEstudianteDto,
      idem ?? jobId,
    );
  }

  @Get()
  async findAll() {
    return this.tareas.enqueueAndWait('estudiante', 'findAll');
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.tareas.enqueueAndWait('estudiante', 'findOne', { id });
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  update(@Param('id') id: number, @Body() updateEstudianteDto: UpdateEstudianteDto, @Headers('x-idempotency-key') idem?: string) {
    const jobId = generateJobId('estudiante', 'update', { id, ...updateEstudianteDto });
    return this.tareas.enqueue(
      'estudiante',
      'update',
      { id, ...updateEstudianteDto },
      idem ?? jobId,
    );
  }

  @Delete(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  remove(@Param('id') id: number, @Headers('x-idempotency-key') idem?: string) {
    const jobId = generateJobId('estudiante', 'remove', { id });
    return this.tareas.enqueue(
      'estudiante',
      'remove',
      { id },
      idem ?? jobId,
    );
  }

  // Endpoints síncronos
  @Post('sync')
  @ApiOperation({ summary: 'Crear estudiante (síncrono)' })
  async createSync(@Body() createEstudianteDto: CreateEstudianteDto) {
    return await this.estudiantesService.create(createEstudianteDto);
  }

  @Get('sync')
  @ApiOperation({ summary: 'Obtener todos los estudiantes (síncrono)' })
  async findAllSync() {
    return await this.estudiantesService.findAll();
  }

  @Get('sync/:id')
  @ApiOperation({ summary: 'Obtener un estudiante por ID (síncrono)' })
  async findOneSync(@Param('id') id: number) {
    return await this.estudiantesService.findOne(id);
  }

  @Patch('sync/:id')
  @ApiOperation({ summary: 'Actualizar estudiante (síncrono)' })
  async updateSync(@Param('id') id: number, @Body() updateEstudianteDto: UpdateEstudianteDto) {
    return await this.estudiantesService.update(id, updateEstudianteDto);
  }

  @Delete('sync/:id')
  @ApiOperation({ summary: 'Eliminar estudiante (síncrono)' })
  async removeSync(@Param('id') id: number) {
    return await this.estudiantesService.remove(id);
  } 
}
