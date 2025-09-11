import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { NotasService } from './notas.service';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';
import { TareasProducer } from '../tareas/tareas.producer';
import { generateJobId } from 'src/common/utils/idempotency.util';

@ApiTags('notas')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('notas')
export class NotasController {
  constructor(
    private readonly notasService: NotasService,
    private readonly tareas: TareasProducer
  ) {}

  @Post()
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async create(@Body() createNotaDto: CreateNotaDto) {
    const jobId = generateJobId('nota', 'create', createNotaDto);
    return this.tareas.enqueue(
      'nota',
      'create',
      createNotaDto,
      jobId,
    );
  }

  @Get()
  async findAll() {
    return this.tareas.enqueueAndWait('nota', 'findAll');
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.tareas.enqueueAndWait('nota', 'findOne', { id });
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  update(@Param('id') id: number, @Body() updateNotaDto: UpdateNotaDto) {
    const jobId = generateJobId('nota', 'update', { id, ...updateNotaDto });
    return this.tareas.enqueue(
      'nota',
      'update',
      { id, ...updateNotaDto },
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
    const jobId = generateJobId('nota', 'remove', { id });
    return this.tareas.enqueue(
      'nota',
      'remove',
      { id },
      jobId,
    );
  }
}
