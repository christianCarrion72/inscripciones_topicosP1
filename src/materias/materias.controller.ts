import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { MateriasService } from './materias.service';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { TareasProducer } from '../tareas/tareas.producer';

@ApiTags('materias')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('materias')
export class MateriasController {
  constructor(
    private readonly materiasService: MateriasService,
    private readonly tareas: TareasProducer
  ) {}

  @Post()
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async create(@Body() createMateriaDto: CreateMateriaDto, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('materia.create', { body: createMateriaDto, meta: { requestId: idem } }, idem ?? `materia:create:${createMateriaDto.nombre}`);
  }

  @Get()
  async findAll() {
    const { result } = await this.tareas.requestAndWait('materias.getAll', { }, 10_000);
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const { result } = await this.tareas.requestAndWait('materia.get', { params: { id } }, 10_000);
    return result;
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  update(@Param('id') id: number, @Body() updateMateriaDto: UpdateMateriaDto, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('materia.update', { params: { id }, body: updateMateriaDto, meta: { requestId: idem } }, idem ?? `materia:update:${id}`);
  }

  @Delete(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  remove(@Param('id') id: number, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('materia.delete', { params: { id }, meta: { requestId: idem } }, idem ?? `materia:delete:${id}`);
  }
}
