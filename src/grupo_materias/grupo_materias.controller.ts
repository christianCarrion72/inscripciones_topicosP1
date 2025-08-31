import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { GrupoMateriasService } from './grupo_materias.service';
import { CreateGrupoMateriaDto } from './dto/create-grupo_materia.dto';
import { UpdateGrupoMateriaDto } from './dto/update-grupo_materia.dto';
import { TareasProducer } from '../tareas/tareas.producer';

@ApiTags('grupo-materias')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('grupo-materias')
export class GrupoMateriasController {
  constructor(
    private readonly grupoMateriasService: GrupoMateriasService,
    private readonly tareas: TareasProducer
  ) {}

  @Post()
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async create(@Body() createGrupoMateriaDto: CreateGrupoMateriaDto, @Headers('x-idempotency-key') idem?: string) {
    const idempotencyKey = idem ?? `grupo_materia:create:${createGrupoMateriaDto.idMateria}:${createGrupoMateriaDto.idDocente}:${createGrupoMateriaDto.idGrupo}`;
    return this.tareas.fireAndForget('grupo_materia.create', { body: createGrupoMateriaDto, meta: { requestId: idem } }, idempotencyKey);
  }

  @Get()
  async findAll() {
    const { result } = await this.tareas.requestAndWait('grupo_materias.getAll', { }, 10_000);
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const { result } = await this.tareas.requestAndWait('grupo_materia.get', { params: { id } }, 10_000);
    return result;
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  update(@Param('id') id: number, @Body() updateGrupoMateriaDto: UpdateGrupoMateriaDto, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('grupo_materia.update', { params: { id }, body: updateGrupoMateriaDto, meta: { requestId: idem } }, idem ?? `grupo_materia:update:${id}`);
  }

  @Delete(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  remove(@Param('id') id: number, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('grupo_materia.delete', { params: { id }, meta: { requestId: idem } }, idem ?? `grupo_materia:delete:${id}`);
  }
}
