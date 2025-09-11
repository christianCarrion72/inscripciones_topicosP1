import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { GruposService } from './grupos.service';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { TareasProducer } from '../tareas/tareas.producer';
import { generateJobId } from 'src/common/utils/idempotency.util';

@ApiTags('grupos')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('grupos')
export class GruposController {
  constructor(
    private readonly gruposService: GruposService,
    private readonly tareas: TareasProducer
  ) {}

  @Post()
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async create(@Body() createGrupoDto: CreateGrupoDto) {
    const jobId = generateJobId('grupo', 'create', createGrupoDto);
    return this.tareas.enqueue(
      'grupo',
      'create',
      createGrupoDto,
      jobId,
    );
  }

  @Get()
  async findAll() {
    return this.tareas.enqueueAndWait('grupo', 'findAll');
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.tareas.enqueueAndWait('grupo', 'findOne', { id });
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  update(@Param('id') id: number, @Body() updateGrupoDto: UpdateGrupoDto) {
    const jobId = generateJobId('grupo', 'update', { id, ...updateGrupoDto });
    return this.tareas.enqueue(
      'grupo',
      'update',
      { id, ...updateGrupoDto },
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
    const jobId = generateJobId('grupo', 'remove', { id });
    return this.tareas.enqueue(
      'grupo',
      'remove',
      { id },
      jobId,
    );
  }
}
