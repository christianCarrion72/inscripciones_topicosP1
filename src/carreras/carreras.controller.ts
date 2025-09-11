import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
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
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false, // <--- importante
  })
  async create(@Body() createCarreraDto: CreateCarreraDto, @Headers('x-idempotency-key') idem?: string) {
    const jobId = generateJobId('carrera', 'create', createCarreraDto);
    return this.tareas.enqueue(
      'carrera',       // entidad
      'create',        // operación CRUD
      createCarreraDto,             // datos del DTO
      idem ?? jobId, // idempotencia
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
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false, // <--- importante
  })
  update(@Param('id') id: number, @Body() updateCarreraDto: UpdateCarreraDto, @Headers('x-idempotency-key') idem?: string) {
    const jobId = generateJobId('carrera', 'update', { id, ...updateCarreraDto });
    return this.tareas.enqueue(
      'carrera',
      'update',
      { id, ...updateCarreraDto },
      idem ?? jobId,
    );
  }

  @Delete(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false, // <--- importante
  })
  remove(@Param('id') id: number, @Headers('x-idempotency-key') idem?: string) {
    const jobId = generateJobId('carrera', 'remove', { id });
    return this.tareas.enqueue(
      'carrera',
      'remove',
      { id },
      idem ?? jobId,
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
