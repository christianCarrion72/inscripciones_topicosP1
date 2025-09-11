import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { CarrerasService } from './carreras.service';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
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
    return await this.tareas.enqueue(
      'carrera',       // entidad
      'create',        // operación CRUD
      createCarreraDto,             // datos del DTO
      jobId, // idempotencia
    );
  }

  @Get()
  async findAll() {
    return await this.tareas.enqueueAndWait('carrera', 'findAll');
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.tareas.enqueueAndWait('carrera', 'findOne', { id });
  }

  @Patch(':id')
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
  async remove(@Param('id') id: number) {
    const jobId = generateJobId('carrera', 'remove', { id });
    return await this.tareas.enqueue(
      'carrera',
      'remove',
      { id },
      jobId,
    );
  }

  // Endpoints síncronos
  @Post('sync')
  @ApiOperation({ summary: 'Crear carrera (síncrono)' })
  async createSync(@Body() createCarreraDto: CreateCarreraDto) {
    return await this.carrerasService.create(createCarreraDto);
  }

  @Get('sync')
  @ApiOperation({ summary: 'Obtener todas las carreras (síncrono)' })
  async findAllSync() {
    return await this.carrerasService.findAll();
  }

  @Get('sync/:id')
  @ApiOperation({ summary: 'Obtener un carrera por ID (síncrono)' })
  async findOneSync(@Param('id') id: number) {
    return await this.carrerasService.findOne(id);
  }

  @Patch('sync/:id')
  @ApiOperation({ summary: 'Actualizar carrera (síncrono)' })
  async updateSync(@Param('id') id: number, @Body() updateCarreraDto: UpdateCarreraDto) {
    return await this.carrerasService.update(id, updateCarreraDto);
  }

  @Delete('sync/:id')
  @ApiOperation({ summary: 'Eliminar carrera (síncrono)' })
  async removeSync(@Param('id') id: number) {
    return await this.carrerasService.remove(id);
  }
}
