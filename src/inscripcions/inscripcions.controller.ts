import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InscripcionsService } from './inscripcions.service';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from './dto/update-inscripcion.dto';
import { TareasProducer } from '../tareas/tareas.producer';
import { generateJobId } from 'src/common/utils/idempotency.util';

@ApiTags('inscripcions')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('inscripcions')
export class InscripcionsController {
  constructor(
    private readonly inscripcionsService: InscripcionsService,
    private readonly tareas: TareasProducer
  ) {}

  @Post()
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async create(@Body() createInscripcionDto: CreateInscripcionDto) {
    const jobId = generateJobId('inscripcion', 'create', createInscripcionDto);
    return await this.tareas.enqueue(
      'inscripcion',
      'create',
      createInscripcionDto,
      jobId,
    );
  }

  @Get()
  async findAll() {
    return await this.tareas.enqueue('inscripcion', 'findAll');
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.tareas.enqueue('inscripcion', 'findOne', { id });
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async update(@Param('id') id: number, @Body() updateInscripcionDto: UpdateInscripcionDto) {
    const jobId = generateJobId('inscripcion', 'update', { id, ...updateInscripcionDto });
    return await this.tareas.enqueue(
      'inscripcion',
      'update',
      { id, ...updateInscripcionDto },
      jobId,
    );
  }

  @Delete(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async remove(@Param('id') id: number) {
    const jobId = generateJobId('inscripcion', 'remove', { id });
    return await this.tareas.enqueue(
      'inscripcion',
      'remove',
      { id },
      jobId,
    );
  }

  // Endpoints síncronos
  @Post('sync')
  @ApiOperation({ summary: 'Crear inscripcion (síncrono)' })
  async createSync(@Body() createInscripcionDto: CreateInscripcionDto) {
    return await this.inscripcionsService.create(createInscripcionDto);
  }

  @Get('sync')
  @ApiOperation({ summary: 'Obtener todas las inscripcions (síncrono)' })
  async findAllSync() {
    return await this.inscripcionsService.findAll();
  }

  @Get('sync/:id')
  @ApiOperation({ summary: 'Obtener una inscripcion por ID (síncrono)' })
  async findOneSync(@Param('id') id: number) {
    return await this.inscripcionsService.findOne(id);
  }

  @Patch('sync/:id')
  @ApiOperation({ summary: 'Actualizar inscripcion (síncrono)' })
  async updateSync(@Param('id') id: number, @Body() updateInscripcionDto: UpdateInscripcionDto) {
    return await this.inscripcionsService.update(id, updateInscripcionDto);
  }

  @Delete('sync/:id')
  @ApiOperation({ summary: 'Eliminar inscripcion (síncrono)' })
  async removeSync(@Param('id') id: number) {
    return await this.inscripcionsService.remove(id);
  } 
}
