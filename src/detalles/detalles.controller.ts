import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { DetallesService } from './detalles.service';
import { CreateDetalleDto } from './dto/create-detalle.dto';
import { UpdateDetalleDto } from './dto/update-detalle.dto';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TareasProducer } from '../tareas/tareas.producer';
import { generateJobId } from 'src/common/utils/idempotency.util';

@ApiTags('detalles')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('detalles')
export class DetallesController {
  constructor(
    private readonly detallesService: DetallesService,
    private readonly tareas: TareasProducer
  ) {}

  @Post()
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async create(@Body() createDetalleDto: CreateDetalleDto, @Headers('x-idempotency-key') idem?: string) {
    const jobId = generateJobId('detalle', 'create', createDetalleDto);
    return this.tareas.enqueue(
      'detalle',
      'create',
      createDetalleDto,
      idem ?? jobId,
    );
  }

  @Get()
  async findAll() {
    return this.tareas.enqueueAndWait('detalle', 'findAll');
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.tareas.enqueueAndWait('detalle', 'findOne', { id });
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  update(@Param('id') id: number, @Body() updateDetalleDto: UpdateDetalleDto, @Headers('x-idempotency-key') idem?: string) {
    const jobId = generateJobId('detalle', 'update', { id, ...updateDetalleDto });
    return this.tareas.enqueue(
      'detalle',
      'update',
      { id, ...updateDetalleDto },
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
    const jobId = generateJobId('detalle', 'remove', { id });
    return this.tareas.enqueue(
      'detalle',
      'remove',
      { id },
      idem ?? jobId,
    );
  }

  // Endpoints síncronos
  @Post('sync')
  @ApiOperation({ summary: 'Crear detalle (síncrono)' })
  async createSync(@Body() createDetalleDto: CreateDetalleDto) {
    return await this.detallesService.create(createDetalleDto);
  }

  @Get('sync')
  @ApiOperation({ summary: 'Obtener todas los detalles (síncrono)' })
  async findAllSync() {
    return await this.detallesService.findAll();
  }

  @Get('sync/:id')
  @ApiOperation({ summary: 'Obtener un detalle por ID (síncrono)' })
  async findOneSync(@Param('id') id: number) {
    return await this.detallesService.findOne(id);
  }

  @Patch('sync/:id')
  @ApiOperation({ summary: 'Actualizar detalle (síncrono)' })
  async updateSync(@Param('id') id: number, @Body() updateDetalleDto: UpdateDetalleDto) {
    return await this.detallesService.update(id, updateDetalleDto);
  }

  @Delete('sync/:id')
  @ApiOperation({ summary: 'Eliminar carrera (síncrono)' })
  async removeSync(@Param('id') id: number) {
    return await this.detallesService.remove(id);
  }  
}
