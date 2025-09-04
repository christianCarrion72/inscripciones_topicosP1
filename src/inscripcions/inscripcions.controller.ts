import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { InscripcionsService } from './inscripcions.service';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from './dto/update-inscripcion.dto';
import { TareasProducer } from '../tareas/tareas.producer';

@ApiTags('inscripcions')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('inscripcions')
export class InscripcionsController {
  constructor(
    private readonly inscripcionsService: InscripcionsService,
    private readonly tareas: TareasProducer
  ) {}
/*
  @Post()
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async create(@Body() createInscripcionDto: CreateInscripcionDto, @Headers('x-idempotency-key') idem?: string) {
    const idempotencyKey = idem ?? `inscripcion:create:${createInscripcionDto.idEstudiante}:${createInscripcionDto.fechaInscripcion}`;
    return this.tareas.fireAndForget('inscripcion.create', { body: createInscripcionDto, meta: { requestId: idem } }, idempotencyKey);
  }

  @Get()
  async findAll() {
    const { result } = await this.tareas.requestAndWait('inscripciones.getAll', { }, 10_000);
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const { result } = await this.tareas.requestAndWait('inscripcion.get', { params: { id } }, 10_000);
    return result;
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  update(@Param('id') id: number, @Body() updateInscripcionDto: UpdateInscripcionDto, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('inscripcion.update', { params: { id }, body: updateInscripcionDto, meta: { requestId: idem } }, idem ?? `inscripcion:update:${id}`);
  }

  @Delete(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  remove(@Param('id') id: number, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('inscripcion.delete', { params: { id }, meta: { requestId: idem } }, idem ?? `inscripcion:delete:${id}`);
  }*/
}
