import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { GestionsService } from './gestions.service';
import { CreateGestionDto } from './dto/create-gestion.dto';
import { UpdateGestionDto } from './dto/update-gestion.dto';
import { TareasProducer } from '../tareas/tareas.producer';

@ApiTags('gestions')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('gestions')
export class GestionsController {
  constructor(
    private readonly gestionsService: GestionsService,
    private readonly tareas: TareasProducer
  ) {}
/*
  @Post()
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async create(@Body() createGestionDto: CreateGestionDto, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('gestion.create', { body: createGestionDto, meta: { requestId: idem } }, idem ?? `gestion:create:${createGestionDto.numero}`);
  }

  @Get()
  async findAll() {
    const { result } = await this.tareas.requestAndWait('gestions.getAll', { }, 10_000);
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const { result } = await this.tareas.requestAndWait('gestion.get', { params: { id } }, 10_000);
    return result;
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  update(@Param('id') id: number, @Body() updateGestionDto: UpdateGestionDto, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('gestion.update', { params: { id }, body: updateGestionDto, meta: { requestId: idem } }, idem ?? `gestion:update:${id}`);
  }

  @Delete(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  remove(@Param('id') id: number, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('gestion.delete', { params: { id }, meta: { requestId: idem } }, idem ?? `gestion:delete:${id}`);
  }*/
}
