import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { BoletaHorariosService } from './boleta_horarios.service';
import { CreateBoletaHorarioDto } from './dto/create-boleta_horario.dto';
import { UpdateBoletaHorarioDto } from './dto/update-boleta_horario.dto';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TareasProducer } from '../tareas/tareas.producer';
import { generateJobId } from 'src/common/utils/idempotency.util';

@ApiTags('boleta-horarios')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('boleta-horarios')
export class BoletaHorariosController {
  constructor(
    private readonly boletaHorariosService: BoletaHorariosService,
    private readonly tareas: TareasProducer
  ) {}

  @Post()
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  create(@Body() createBoletaHorarioDto: CreateBoletaHorarioDto) {
    const jobId = generateJobId('boleta_horario', 'create', createBoletaHorarioDto);
    return this.tareas.enqueue(
      'boleta_horario',
      'create',
      createBoletaHorarioDto,
      jobId,
    );
  }

  @Get()
  findAll() {
    return this.tareas.enqueue('boleta_horario', 'findAll');
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tareas.enqueue('boleta_horario', 'findOne', { id });
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  update(@Param('id') id: number, @Body() updateBoletaHorarioDto: UpdateBoletaHorarioDto) {
    const jobId = generateJobId('boleta_horario', 'update', { id, ...updateBoletaHorarioDto });
    return this.tareas.enqueue(
      'boleta_horario',
      'update',
      { id, ...updateBoletaHorarioDto },
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
    const jobId = generateJobId('boleta_horario', 'remove', { id });
    return this.tareas.enqueue(
      'boleta_horario',
      'remove',
      { id },
      jobId,
    );
  }
}
