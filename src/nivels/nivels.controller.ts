import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { NivelsService } from './nivels.service';
import { CreateNivelDto } from './dto/create-nivel.dto';
import { UpdateNivelDto } from './dto/update-nivel.dto';
import { TareasProducer } from '../tareas/tareas.producer';

@ApiTags('nivels')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('nivels')
export class NivelsController {
  constructor(
    private readonly nivelsService: NivelsService,
    private readonly tareas: TareasProducer
  ) {}

  @Post()
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async create(@Body() createNivelDto: CreateNivelDto, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('nivel.create', { body: createNivelDto, meta: { requestId: idem } }, idem ?? `nivel:create:${createNivelDto.nombre}`);
  }

  @Get()
  async findAll() {
    const { result } = await this.tareas.requestAndWait('nivels.getAll', { }, 10_000);
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const { result } = await this.tareas.requestAndWait('nivel.get', { params: { id } }, 10_000);
    return result;
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  update(@Param('id') id: number, @Body() updateNivelDto: UpdateNivelDto, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('nivel.update', { params: { id }, body: updateNivelDto, meta: { requestId: idem } }, idem ?? `nivel:update:${id}`);
  }

  @Delete(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  remove(@Param('id') id: number, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('nivel.delete', { params: { id }, meta: { requestId: idem } }, idem ?? `nivel:delete:${id}`);
  }
}
