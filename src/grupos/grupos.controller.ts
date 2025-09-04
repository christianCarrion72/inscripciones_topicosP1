import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { GruposService } from './grupos.service';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { TareasProducer } from '../tareas/tareas.producer';

@ApiTags('grupos')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('grupos')
export class GruposController {
  constructor(
    private readonly gruposService: GruposService,
    private readonly tareas: TareasProducer
  ) {}
/*
  @Post()
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async create(@Body() createGrupoDto: CreateGrupoDto, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('grupo.create', { body: createGrupoDto, meta: { requestId: idem } }, idem ?? `grupo:create:${createGrupoDto.sigla}`);
  }

  @Get()
  async findAll() {
    const { result } = await this.tareas.requestAndWait('grupos.getAll', { }, 10_000);
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const { result } = await this.tareas.requestAndWait('grupo.get', { params: { id } }, 10_000);
    return result;
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  update(@Param('id') id: number, @Body() updateGrupoDto: UpdateGrupoDto, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('grupo.update', { params: { id }, body: updateGrupoDto, meta: { requestId: idem } }, idem ?? `grupo:update:${id}`);
  }

  @Delete(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  remove(@Param('id') id: number, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('grupo.delete', { params: { id }, meta: { requestId: idem } }, idem ?? `grupo:delete:${id}`);
  }*/
}
