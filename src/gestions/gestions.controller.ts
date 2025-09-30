import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GestionsService } from './gestions.service';
import { CreateGestionDto } from './dto/create-gestion.dto';
import { UpdateGestionDto } from './dto/update-gestion.dto';
import { TareasProducer } from '../tareas/tareas.producer';
import { generateJobId } from 'src/common/utils/idempotency.util';

@ApiTags('gestions')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('gestions')
export class GestionsController {
  constructor(
    private readonly gestionsService: GestionsService,
    private readonly tareas: TareasProducer
  ) {}

  @Post()
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async create(@Body() createGestionDto: CreateGestionDto) {
    const jobId = generateJobId('gestion', 'create', createGestionDto);
    return this.tareas.enqueue(
      'gestion',
      'create',
      createGestionDto,
      jobId,
    );
  }

  @Get()
  async findAll() {
    return await this.tareas.enqueue('gestion', 'findAll');
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.tareas.enqueue('gestion', 'findOne', { id });
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async update(@Param('id') id: number, @Body() updateGestionDto: UpdateGestionDto) {
    const jobId = generateJobId('gestion', 'update', { id, ...updateGestionDto });
    return await this.tareas.enqueue(
      'gestion',
      'update',
      { id, ...updateGestionDto },
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
    const jobId = generateJobId('gestion', 'remove', { id });
    return await this.tareas.enqueue(
      'gestion',
      'remove',
      { id },
      jobId,
    );
  }

  // Endpoints síncronos
  @Post('sync')
  @ApiOperation({ summary: 'Crear gestion (síncrono)' })
  async createSync(@Body() createGestionDto: CreateGestionDto) {
    return await this.gestionsService.create(createGestionDto);
  }

  @Get('sync')
  @ApiOperation({ summary: 'Obtener todos las gestiones (síncrono)' })
  async findAllSync() {
    return await this.gestionsService.findAll();
  }

  @Get('sync/:id')
  @ApiOperation({ summary: 'Obtener una gestion por ID (síncrono)' })
  async findOneSync(@Param('id') id: number) {
    return await this.gestionsService.findOne(id);
  }

  @Patch('sync/:id')
  @ApiOperation({ summary: 'Actualizar gestion (síncrono)' })
  async updateSync(@Param('id') id: number, @Body() updateGestionDto: UpdateGestionDto) {
    return await this.gestionsService.update(id, updateGestionDto);
  }

  @Delete('sync/:id')
  @ApiOperation({ summary: 'Eliminar gestion (síncrono)' })
  async removeSync(@Param('id') id: number) {
    return await this.gestionsService.remove(id);
  } 
}
