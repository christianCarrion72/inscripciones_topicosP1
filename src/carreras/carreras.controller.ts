import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { CarrerasService } from './carreras.service';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { TareasProducer } from '../tareas/tareas.producer';
import { generateJobId } from 'src/common/utils/idempotency.util';

@ApiTags('carreras')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('carreras')
export class CarrerasController {
  constructor(
    private readonly carrerasService: CarrerasService,
    private readonly tareas: TareasProducer) {}

  @Post()
  async create(@Body() createCarreraDto: CreateCarreraDto) {
    const jobId = generateJobId('carrera', 'create', createCarreraDto);
    return this.tareas.enqueue(
      'carrera',       // entidad
      'create',        // operación CRUD
      createCarreraDto,             // datos del DTO
      jobId, // idempotencia
    );
  }

  @Get()
  async findAll() {
    return this.tareas.enqueueAndWait('carrera', 'findAll');
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.tareas.enqueueAndWait('carrera', 'findOne', { id });
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCarreraDto: UpdateCarreraDto) {
    const jobId = generateJobId('carrera', 'update', { id, ...updateCarreraDto });
    return this.tareas.enqueue(
      'carrera',
      'update',
      { id, ...updateCarreraDto },
      jobId,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    const jobId = generateJobId('carrera', 'remove', { id });
    return this.tareas.enqueue(
      'carrera',
      'remove',
      { id },
      jobId,
    );
  }
}
