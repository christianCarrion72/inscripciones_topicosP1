import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { CarrerasService } from './carreras.service';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TareasProducer } from '../tareas/tareas.producer';

@ApiTags('carreras')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('carreras')
export class CarrerasController {
  constructor(private readonly carrerasService: CarrerasService, private readonly tareas: TareasProducer) {}

  @Post()
  async create(@Body() createCarreraDto: CreateCarreraDto, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('carrera.create', { body: CreateCarreraDto, meta: { requestId: idem } }, idem ?? `carrera:create:${createCarreraDto.codigo}`);
  }

  @Get()
  async findAll() {
    const { result } = await this.tareas.requestAndWait('carreras.getAll', { }, 10_000);
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const { result } = await this.tareas.requestAndWait('carrera.get', { params: { id } }, 10_000);
    return result;
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCarreraDto: UpdateCarreraDto, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('carrera.update', { params: { id }, body: UpdateCarreraDto, meta: { requestId: idem } }, idem ?? `carrera:update:${id}`);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('carrera.delete', { params: { id }, meta: { requestId: idem } }, idem ?? `carrera:delete:${id}`);
  }
}
