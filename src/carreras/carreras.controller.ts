import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TareasProducer } from '../tareas/tareas.producer';
import { generateJobId } from 'src/common/utils/idempotency.util';

@ApiTags('carreras')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('carreras')
export class CarrerasController {
  constructor(
    private readonly tareas: TareasProducer
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear carrera (asíncrono)' })
  async create(@Body() createCarreraDto: CreateCarreraDto) {
    const jobId = generateJobId('carrera', 'create', createCarreraDto);
    return await this.tareas.enqueue(
      'carrera',
      'create',
      createCarreraDto,
      jobId,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las carreras (asíncrono)' })
  async findAll() {
    return await this.tareas.enqueueAndWait('carrera', 'findAll');
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una carrera por ID (asíncrono)' })
  async findOne(@Param('id') id: number) {
    return await this.tareas.enqueueAndWait('carrera', 'findOne', { id });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar carrera (asíncrono)' })
  async update(@Param('id') id: number, @Body() updateCarreraDto: UpdateCarreraDto) {
    const jobId = generateJobId('carrera', 'update', { id, ...updateCarreraDto });
    return await this.tareas.enqueue(
      'carrera',
      'update',
      { id, ...updateCarreraDto },
      jobId,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar carrera (asíncrono)' })
  async remove(@Param('id') id: number) {
    const jobId = generateJobId('carrera', 'remove', { id });
    return await this.tareas.enqueue(
      'carrera',
      'remove',
      { id },
      jobId,
    );
  }
}
