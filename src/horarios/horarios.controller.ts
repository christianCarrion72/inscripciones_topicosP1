import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { HorariosService } from './horarios.service';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { TareasProducer } from '../tareas/tareas.producer';

@ApiTags('horarios')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('horarios')
export class HorariosController {
  constructor(
    private readonly horariosService: HorariosService,
    private readonly tareas: TareasProducer
  ) {}
/*
  @Post()
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async create(@Body() createHorarioDto: CreateHorarioDto, @Headers('x-idempotency-key') idem?: string) {
    const idempotencyKey = idem ?? `horario:create:${createHorarioDto.idAula}:${createHorarioDto.horaInicio}:${createHorarioDto.horaFin}`;
    return this.tareas.fireAndForget('horario.create', { body: createHorarioDto, meta: { requestId: idem } }, idempotencyKey);
  }

  @Get()
  async findAll() {
    const { result } = await this.tareas.requestAndWait('horarios.getAll', { }, 10_000);
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const { result } = await this.tareas.requestAndWait('horario.get', { params: { id } }, 10_000);
    return result;
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  update(@Param('id') id: number, @Body() updateHorarioDto: UpdateHorarioDto, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('horario.update', { params: { id }, body: updateHorarioDto, meta: { requestId: idem } }, idem ?? `horario:update:${id}`);
  }

  @Delete(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  remove(@Param('id') id: number, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('horario.delete', { params: { id }, meta: { requestId: idem } }, idem ?? `horario:delete:${id}`);
  }*/
}
