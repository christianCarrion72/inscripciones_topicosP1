import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
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
    return this.tareas.enqueue(
      'inscripcion',
      'create',
      createInscripcionDto,
      jobId,
    );
  }

  @Get()
  async findAll() {
    return this.tareas.enqueueAndWait('inscripcion', 'findAll');
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.tareas.enqueueAndWait('inscripcion', 'findOne', { id });
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  update(@Param('id') id: number, @Body() updateInscripcionDto: UpdateInscripcionDto) {
    const jobId = generateJobId('inscripcion', 'update', { id, ...updateInscripcionDto });
    return this.tareas.enqueue(
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
  remove(@Param('id') id: number) {
    const jobId = generateJobId('inscripcion', 'remove', { id });
    return this.tareas.enqueue(
      'inscripcion',
      'remove',
      { id },
      jobId,
    );
  }
}
