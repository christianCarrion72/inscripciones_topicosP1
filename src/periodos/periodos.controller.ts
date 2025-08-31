import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { PeriodosService } from './periodos.service';
import { CreatePeriodoDto } from './dto/create-periodo.dto';
import { UpdatePeriodoDto } from './dto/update-periodo.dto';
import { TareasProducer } from '../tareas/tareas.producer';

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
  async create(@Body() createPeriodoDto: CreatePeriodoDto, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('periodo.create', { body: createPeriodoDto, meta: { requestId: idem } }, idem ?? `periodo:create:${createPeriodoDto.numero}`);
  }

  @Get()
  async findAll() {
    const { result } = await this.tareas.requestAndWait('periodos.getAll', { }, 10_000);
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const { result } = await this.tareas.requestAndWait('periodo.get', { params: { id } }, 10_000);
    return result;
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  update(@Param('id') id: number, @Body() updatePeriodoDto: UpdatePeriodoDto, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('periodo.update', { params: { id }, body: updatePeriodoDto, meta: { requestId: idem } }, idem ?? `periodo:update:${id}`);
  }

  @Delete(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  remove(@Param('id') id: number, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('periodo.delete', { params: { id }, meta: { requestId: idem } }, idem ?? `periodo:delete:${id}`);
  }
}
