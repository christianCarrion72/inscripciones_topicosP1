import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { PlanEstudiosService } from './plan_estudios.service';
import { CreatePlanEstudioDto } from './dto/create-plan_estudio.dto';
import { UpdatePlanEstudioDto } from './dto/update-plan_estudio.dto';
import { TareasProducer } from '../tareas/tareas.producer';

@ApiTags('plan-estudios')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('plan-estudios')
export class PlanEstudiosController {
  constructor(
    private readonly planEstudiosService: PlanEstudiosService,
    private readonly tareas: TareasProducer
  ) {}
/*
  @Post()
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async create(@Body() createPlanEstudioDto: CreatePlanEstudioDto, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('plan_estudio.create', { body: createPlanEstudioDto, meta: { requestId: idem } }, idem ?? `plan_estudio:create:${createPlanEstudioDto.nombre}`);
  }

  @Get()
  async findAll() {
    const { result } = await this.tareas.requestAndWait('plan_estudios.getAll', { }, 10_000);
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const { result } = await this.tareas.requestAndWait('plan_estudio.get', { params: { id } }, 10_000);
    return result;
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  update(@Param('id') id: number, @Body() updatePlanEstudioDto: UpdatePlanEstudioDto, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('plan_estudio.update', { params: { id }, body: updatePlanEstudioDto, meta: { requestId: idem } }, idem ?? `plan_estudio:update:${id}`);
  }

  @Delete(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  remove(@Param('id') id: number, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('plan_estudio.delete', { params: { id }, meta: { requestId: idem } }, idem ?? `plan_estudio:delete:${id}`);
  }*/
}
