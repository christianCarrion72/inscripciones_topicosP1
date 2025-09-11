import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { PeriodosService } from './periodos.service';
import { CreatePeriodoDto } from './dto/create-periodo.dto';
import { UpdatePeriodoDto } from './dto/update-periodo.dto';
import { TareasProducer } from '../tareas/tareas.producer';
import { generateJobId } from 'src/common/utils/idempotency.util';

@ApiTags('periodos')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('periodos')
export class PeriodosController {
  constructor(
    private readonly periodosService: PeriodosService,
    private readonly tareas: TareasProducer
  ) {}

  @Post()
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async create(@Body() createPeriodoDto: CreatePeriodoDto) {
    const jobId = generateJobId('periodo', 'create', createPeriodoDto);
    return this.tareas.enqueue(
      'periodo',
      'create',
      createPeriodoDto,
      jobId,
    );
  }

  @Get()
  async findAll() {
    return this.tareas.enqueueAndWait('periodo', 'findAll');
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.tareas.enqueueAndWait('periodo', 'findOne', { id });
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  update(@Param('id') id: number, @Body() updatePeriodoDto: UpdatePeriodoDto) {
    const jobId = generateJobId('periodo', 'update', { id, ...updatePeriodoDto });
    return this.tareas.enqueue(
      'periodo',
      'update',
      { id, ...updatePeriodoDto },
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
    const jobId = generateJobId('periodo', 'remove', { id });
    return this.tareas.enqueue(
      'periodo',
      'remove',
      { id },
      jobId,
    );
  }
}
