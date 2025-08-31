import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { AulasService } from './aulas.service';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { TareasProducer } from '../tareas/tareas.producer';

@ApiTags('aulas')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('aulas')
export class AulasController {
  constructor(
    private readonly aulasService: AulasService,
    private readonly tareas: TareasProducer
  ) {}

  @Post()
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async create(@Body() createAulaDto: CreateAulaDto, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('aula.create', { body: createAulaDto, meta: { requestId: idem } }, idem ?? `aula:create:${createAulaDto.numero}`);
  }

  @Get()
  async findAll() {
    const { result } = await this.tareas.requestAndWait('aulas.getAll', { }, 10_000);
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const { result } = await this.tareas.requestAndWait('aula.get', { params: { id } }, 10_000);
    return result;
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  update(@Param('id') id: number, @Body() updateAulaDto: UpdateAulaDto, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('aula.update', { params: { id }, body: updateAulaDto, meta: { requestId: idem } }, idem ?? `aula:update:${id}`);
  }

  @Delete(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  remove(@Param('id') id: number, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('aula.delete', { params: { id }, meta: { requestId: idem } }, idem ?? `aula:delete:${id}`);
  }
}
