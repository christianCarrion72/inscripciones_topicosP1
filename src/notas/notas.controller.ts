import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { NotasService } from './notas.service';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';
import { TareasProducer } from '../tareas/tareas.producer';

@ApiTags('notas')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('notas')
export class NotasController {
  constructor(
    private readonly notasService: NotasService,
    private readonly tareas: TareasProducer
  ) {}

  @Post()
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async create(@Body() createNotaDto: CreateNotaDto, @Headers('x-idempotency-key') idem?: string) {
    const idempotencyKey = idem ?? `nota:create:${createNotaDto.idEstudiante}:${createNotaDto.idMatGrup}`;
    return this.tareas.fireAndForget('nota.create', { body: createNotaDto, meta: { requestId: idem } }, idempotencyKey);
  }

  @Get()
  async findAll() {
    const { result } = await this.tareas.requestAndWait('notas.getAll', { }, 10_000);
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const { result } = await this.tareas.requestAndWait('nota.get', { params: { id } }, 10_000);
    return result;
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  update(@Param('id') id: number, @Body() updateNotaDto: UpdateNotaDto, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('nota.update', { params: { id }, body: updateNotaDto, meta: { requestId: idem } }, idem ?? `nota:update:${id}`);
  }

  @Delete(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  remove(@Param('id') id: number, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('nota.delete', { params: { id }, meta: { requestId: idem } }, idem ?? `nota:delete:${id}`);
  }
}
