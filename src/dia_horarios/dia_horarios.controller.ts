import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { DiaHorariosService } from './dia_horarios.service';
import { CreateDiaHorarioDto } from './dto/create-dia_horario.dto';
import { UpdateDiaHorarioDto } from './dto/update-dia_horario.dto';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { TareasProducer } from '../tareas/tareas.producer';

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
    const idempotencyKey = idem ?? `dia_horario:create:${createDiaHorarioDto.idDia}:${createDiaHorarioDto.idHorario}`;
    return this.tareas.fireAndForget('dia_horario.create', { body: createDiaHorarioDto, meta: { requestId: idem } }, idempotencyKey);
  }

  @Get()
  async findAll() {
    const { result } = await this.tareas.requestAndWait('dia_horarios.getAll', { }, 10_000);
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const { result } = await this.tareas.requestAndWait('dia_horario.get', { params: { id } }, 10_000);
    return result;
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  update(@Param('id') id: number, @Body() updateDiaHorarioDto: UpdateDiaHorarioDto, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('dia_horario.update', { params: { id }, body: updateDiaHorarioDto, meta: { requestId: idem } }, idem ?? `dia_horario:update:${id}`);
  }

  @Delete(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  remove(@Param('id') id: number, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('dia_horario.delete', { params: { id }, meta: { requestId: idem } }, idem ?? `dia_horario:delete:${id}`);
  }
}
