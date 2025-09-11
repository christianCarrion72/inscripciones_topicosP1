import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { MateriasService } from './materias.service';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { TareasProducer } from '../tareas/tareas.producer';
import { generateJobId } from 'src/common/utils/idempotency.util';

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
  async create(@Body() createMateriaDto: CreateMateriaDto) {
    const jobId = generateJobId('materia', 'create', createMateriaDto);
    return this.tareas.enqueue(
      'materia',
      'create',
      createMateriaDto,
      jobId,
    );
  }

  @Get()
  async findAll() {
    return this.tareas.enqueueAndWait('materia', 'findAll');
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.tareas.enqueueAndWait('materia', 'findOne', { id });
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  update(@Param('id') id: number, @Body() updateMateriaDto: UpdateMateriaDto) {
    const jobId = generateJobId('materia', 'update', { id, ...updateMateriaDto });
    return this.tareas.enqueue(
      'materia',
      'update',
      { id, ...updateMateriaDto },
      jobId,
    );
  }

  @Delete(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  remove(@Param('id') id: number) {
    const jobId = generateJobId('materia', 'remove', { id });
    return this.tareas.enqueue(
      'materia',
      'remove',
      { id },
      jobId,
    );
  }
}
