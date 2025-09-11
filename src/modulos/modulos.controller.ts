import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
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
    return this.tareas.enqueue(
      'modulo',
      'create',
      createModuloDto,
      jobId,
    );
  }

  @Get()
  async findAll() {
    return this.tareas.enqueueAndWait('modulo', 'findAll');
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.tareas.enqueueAndWait('modulo', 'findOne', { id });
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  update(@Param('id') id: number, @Body() updateModuloDto: UpdateModuloDto) {
    const jobId = generateJobId('modulo', 'update', { id, ...updateModuloDto });
    return this.tareas.enqueue(
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
  remove(@Param('id') id: number) {
    const jobId = generateJobId('modulo', 'remove', { id });
    return this.tareas.enqueue(
      'modulo',
      'remove',
      { id },
      jobId,
    );
  }
}
