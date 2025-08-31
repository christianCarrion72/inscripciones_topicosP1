import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { ModulosService } from './modulos.service';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';
import { TareasProducer } from '../tareas/tareas.producer';

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
  async create(@Body() createModuloDto: CreateModuloDto, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('modulo.create', { body: createModuloDto, meta: { requestId: idem } }, idem ?? `modulo:create:${createModuloDto.codigo}`);
  }

  @Get()
  async findAll() {
    const { result } = await this.tareas.requestAndWait('modulos.getAll', { }, 10_000);
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const { result } = await this.tareas.requestAndWait('modulo.get', { params: { id } }, 10_000);
    return result;
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  update(@Param('id') id: number, @Body() updateModuloDto: UpdateModuloDto, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('modulo.update', { params: { id }, body: updateModuloDto, meta: { requestId: idem } }, idem ?? `modulo:update:${id}`);
  }

  @Delete(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  remove(@Param('id') id: number, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('modulo.delete', { params: { id }, meta: { requestId: idem } }, idem ?? `modulo:delete:${id}`);
  }
}
