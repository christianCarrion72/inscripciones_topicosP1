import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { GrupoMateriasService } from './grupo_materias.service';
import { CreateGrupoMateriaDto } from './dto/create-grupo_materia.dto';
import { UpdateGrupoMateriaDto } from './dto/update-grupo_materia.dto';
import { TareasProducer } from '../tareas/tareas.producer';
import { generateJobId } from 'src/common/utils/idempotency.util';

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
    const jobId = generateJobId('grupo_materia', 'create', createGrupoMateriaDto);
    return this.tareas.enqueue(
      'grupo_materia',
      'create',
      createGrupoMateriaDto,
      idem ?? jobId,
    );
  }

  @Get()
  async findAll() {
    return this.tareas.enqueueAndWait('grupo_materia', 'findAll');
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.tareas.enqueueAndWait('grupo_materia', 'findOne', { id });
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  update(@Param('id') id: number, @Body() updateGrupoMateriaDto: UpdateGrupoMateriaDto, @Headers('x-idempotency-key') idem?: string) {
    const jobId = generateJobId('grupo_materia', 'update', { id, ...updateGrupoMateriaDto });
    return this.tareas.enqueue(
      'grupo_materia',
      'update',
      { id, ...updateGrupoMateriaDto },
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
    const jobId = generateJobId('grupo_materia', 'remove', { id });
    return this.tareas.enqueue(
      'grupo_materia',
      'remove',
      { id },
      idem ?? jobId,
    );
  }
}
