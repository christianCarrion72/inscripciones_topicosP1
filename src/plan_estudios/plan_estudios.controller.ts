import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { PlanEstudiosService } from './plan_estudios.service';
import { CreatePlanEstudioDto } from './dto/create-plan_estudio.dto';
import { UpdatePlanEstudioDto } from './dto/update-plan_estudio.dto';
import { TareasProducer } from '../tareas/tareas.producer';
import { generateJobId } from 'src/common/utils/idempotency.util';

@ApiTags('plan-estudios')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('plan-estudios')
export class PlanEstudiosController {
  constructor(
    private readonly planEstudiosService: PlanEstudiosService,
    private readonly tareas: TareasProducer
  ) {}

  @Post()
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async create(@Body() createPlanEstudioDto: CreatePlanEstudioDto) {
    const jobId = generateJobId('plan_estudio', 'create', createPlanEstudioDto);
    return this.tareas.enqueue(
      'plan_estudio',
      'create',
      createPlanEstudioDto,
      jobId,
    );
  }

  @Get()
  async findAll() {
    return this.tareas.enqueueAndWait('plan_estudio', 'findAll');
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.tareas.enqueueAndWait('plan_estudio', 'findOne', { id });
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  update(@Param('id') id: number, @Body() updatePlanEstudioDto: UpdatePlanEstudioDto) {
    const jobId = generateJobId('plan_estudio', 'update', { id, ...updatePlanEstudioDto });
    return this.tareas.enqueue(
      'plan_estudio',
      'update',
      { id, ...updatePlanEstudioDto },
      jobId,
    );
  }

  @Delete(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  remove(@Param('id') id: number) {
    const jobId = generateJobId('plan_estudio', 'remove', { id });
    return this.tareas.enqueue(
      'plan_estudio',
      'remove',
      { id },
      jobId,
    );
  }
}
