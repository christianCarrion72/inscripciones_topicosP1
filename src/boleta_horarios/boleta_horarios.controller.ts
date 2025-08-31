import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { BoletaHorariosService } from './boleta_horarios.service';
import { CreateBoletaHorarioDto } from './dto/create-boleta_horario.dto';
import { UpdateBoletaHorarioDto } from './dto/update-boleta_horario.dto';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { TareasProducer } from '../tareas/tareas.producer';

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
  async create(@Body() createBoletaHorarioDto: CreateBoletaHorarioDto, @Headers('x-idempotency-key') idem?: string) {
    const idempotencyKey = idem ?? `boleta_horario:create:${createBoletaHorarioDto.idHorario}:${createBoletaHorarioDto.idGrupoMateria}`;
    return this.tareas.fireAndForget('boleta_horario.create', { body: createBoletaHorarioDto, meta: { requestId: idem } }, idempotencyKey);
  }

  @Get()
  async findAll() {
    const { result } = await this.tareas.requestAndWait('boleta_horarios.getAll', { }, 10_000);
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const { result } = await this.tareas.requestAndWait('boleta_horario.get', { params: { id } }, 10_000);
    return result;
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  update(@Param('id') id: number, @Body() updateBoletaHorarioDto: UpdateBoletaHorarioDto, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('boleta_horario.update', { params: { id }, body: updateBoletaHorarioDto, meta: { requestId: idem } }, idem ?? `boleta_horario:update:${id}`);
  }

  @Delete(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  remove(@Param('id') id: number, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('boleta_horario.delete', { params: { id }, meta: { requestId: idem } }, idem ?? `boleta_horario:delete:${id}`);
  }
}
