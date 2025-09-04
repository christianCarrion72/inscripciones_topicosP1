import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
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
  async create(@Body() createHorarioDto: CreateHorarioDto, @Headers('x-idempotency-key') idem?: string) {
    const jobId = generateJobId('horario', 'create', createHorarioDto);
    return this.tareas.enqueue(
      'horario',
      'create',
      createHorarioDto,
      idem ?? jobId,
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
  update(@Param('id') id: number, @Body() updateHorarioDto: UpdateHorarioDto, @Headers('x-idempotency-key') idem?: string) {
    const jobId = generateJobId('horario', 'update', { id, ...updateHorarioDto });
    return this.tareas.enqueue(
      'horario',
      'update',
      { id, ...updateHorarioDto },
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
    const jobId = generateJobId('horario', 'remove', { id });
    return this.tareas.enqueue(
      'horario',
      'remove',
      { id },
      idem ?? jobId,
    );
  }
}
