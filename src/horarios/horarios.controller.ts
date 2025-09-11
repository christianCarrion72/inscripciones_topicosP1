import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { HorariosService } from './horarios.service';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { TareasProducer } from '../tareas/tareas.producer';
import { generateJobId } from 'src/common/utils/idempotency.util';

@ApiTags('horarios')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('horarios')
export class HorariosController {
  constructor(
    private readonly horariosService: HorariosService,
    private readonly tareas: TareasProducer
  ) {}

  @Post()
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async create(@Body() createHorarioDto: CreateHorarioDto) {
    const jobId = generateJobId('horario', 'create', createHorarioDto);
    return this.tareas.enqueue(
      'horario',
      'create',
      createHorarioDto,
      jobId,
    );
  }

  @Get()
  async findAll() {
    return this.tareas.enqueueAndWait('horario', 'findAll');
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.tareas.enqueueAndWait('horario', 'findOne', { id });
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  update(@Param('id') id: number, @Body() updateHorarioDto: UpdateHorarioDto) {
    const jobId = generateJobId('horario', 'update', { id, ...updateHorarioDto });
    return this.tareas.enqueue(
      'horario',
      'update',
      { id, ...updateHorarioDto },
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
    const jobId = generateJobId('horario', 'remove', { id });
    return this.tareas.enqueue(
      'horario',
      'remove',
      { id },
      jobId,
    );
  }
}
