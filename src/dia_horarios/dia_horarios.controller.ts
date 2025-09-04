import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { DiaHorariosService } from './dia_horarios.service';
import { CreateDiaHorarioDto } from './dto/create-dia_horario.dto';
import { UpdateDiaHorarioDto } from './dto/update-dia_horario.dto';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { TareasProducer } from '../tareas/tareas.producer';
import { generateJobId } from 'src/common/utils/idempotency.util';

@ApiTags('dia-horarios')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('dia-horarios')
export class DiaHorariosController {
  constructor(
    private readonly diaHorariosService: DiaHorariosService,
    private readonly tareas: TareasProducer
  ) {}

  @Post()
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async create(@Body() createDiaHorarioDto: CreateDiaHorarioDto, @Headers('x-idempotency-key') idem?: string) {
    const jobId = generateJobId('dia_horario', 'create', createDiaHorarioDto);
    return this.tareas.enqueue(
      'dia_horario',
      'create',
      createDiaHorarioDto,
      idem ?? jobId,
    );
  }

  @Get()
  async findAll() {
    return this.tareas.enqueueAndWait('dia_horario', 'findAll');
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.tareas.enqueueAndWait('dia_horario', 'findOne', { id });
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  update(@Param('id') id: number, @Body() updateDiaHorarioDto: UpdateDiaHorarioDto, @Headers('x-idempotency-key') idem?: string) {
    const jobId = generateJobId('dia_horario', 'update', { id, ...updateDiaHorarioDto });
    return this.tareas.enqueue(
      'dia_horario',
      'update',
      { id, ...updateDiaHorarioDto },
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
    const jobId = generateJobId('dia_horario', 'remove', { id });
    return this.tareas.enqueue(
      'dia_horario',
      'remove',
      { id },
      idem ?? jobId,
    );
  }
}
