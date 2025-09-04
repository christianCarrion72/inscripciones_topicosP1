import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { DetallesService } from './detalles.service';
import { CreateDetalleDto } from './dto/create-detalle.dto';
import { UpdateDetalleDto } from './dto/update-detalle.dto';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { TareasProducer } from '../tareas/tareas.producer';

@ApiTags('detalles')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('detalles')
export class DetallesController {
  constructor(
    private readonly detallesService: DetallesService,
    private readonly tareas: TareasProducer
  ) {}
/*
  @Post()
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async create(@Body() createDetalleDto: CreateDetalleDto, @Headers('x-idempotency-key') idem?: string) {
    const idempotencyKey = idem ?? `detalle:create:${Date.now()}`;
    return this.tareas.fireAndForget('detalle.create', { body: createDetalleDto, meta: { requestId: idem } }, idempotencyKey);
  }

  @Get()
  async findAll() {
    const { result } = await this.tareas.requestAndWait('detalles.getAll', { }, 10_000);
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const { result } = await this.tareas.requestAndWait('detalle.get', { params: { id } }, 10_000);
    return result;
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  update(@Param('id') id: number, @Body() updateDetalleDto: UpdateDetalleDto, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('detalle.update', { params: { id }, body: updateDetalleDto, meta: { requestId: idem } }, idem ?? `detalle:update:${id}`);
  }

  @Delete(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  remove(@Param('id') id: number, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('detalle.delete', { params: { id }, meta: { requestId: idem } }, idem ?? `detalle:delete:${id}`);
  }*/
}
