import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ModulosService } from './modulos.service';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';
import { TareasProducer } from '../tareas/tareas.producer';
import { generateJobId } from 'src/common/utils/idempotency.util';

@ApiTags('modulos')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('modulos')
export class ModulosController {
  constructor(
    private readonly modulosService: ModulosService,
    private readonly tareas: TareasProducer
  ) {}

  @Post()
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async create(@Body() createModuloDto: CreateModuloDto) {
    const jobId = generateJobId('modulo', 'create', createModuloDto);
    return await this.tareas.enqueue(
      'modulo',
      'create',
      createModuloDto,
      jobId,
    );
  }

  @Get()
  async findAll() {
    return await this.tareas.enqueue('modulo', 'findAll');
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.tareas.enqueue('modulo', 'findOne', { id });
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async update(@Param('id') id: number, @Body() updateModuloDto: UpdateModuloDto) {
    const jobId = generateJobId('modulo', 'update', { id, ...updateModuloDto });
    return await this.tareas.enqueue(
      'modulo',
      'update',
      { id, ...updateModuloDto },
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
    const jobId = generateJobId('modulo', 'remove', { id });
    return await this.tareas.enqueue(
      'modulo',
      'remove',
      { id },
      jobId,
    );
  }

  // Endpoints síncronos
  @Post('sync')
  @ApiOperation({ summary: 'Crear modulo (síncrono)' })
  async createSync(@Body() createModuloDto: CreateModuloDto) {
    return await this.modulosService.create(createModuloDto);
  }

  @Get('sync')
  @ApiOperation({ summary: 'Obtener todos los modulos (síncrono)' })
  async findAllSync() {
    return await this.modulosService.findAll();
  }

  @Get('sync/:id')
  @ApiOperation({ summary: 'Obtener un modulo por ID (síncrono)' })
  async findOneSync(@Param('id') id: number) {
    return await this.modulosService.findOne(id);
  }

  @Patch('sync/:id')
  @ApiOperation({ summary: 'Actualizar modulo (síncrono)' })
  async updateSync(@Param('id') id: number, @Body() updateModuloDto: UpdateModuloDto) {
    return await this.modulosService.update(id, updateModuloDto);
  }

  @Delete('sync/:id')
  @ApiOperation({ summary: 'Eliminar modulo (síncrono)' })
  async removeSync(@Param('id') id: number) {
    return await this.modulosService.remove(id);
  } 
}
