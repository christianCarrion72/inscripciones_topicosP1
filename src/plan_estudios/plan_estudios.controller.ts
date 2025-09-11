import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
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
    return await this.tareas.enqueue(
      'plan_estudio',
      'create',
      createPlanEstudioDto,
      jobId,
    );
  }

  @Get()
  async findAll() {
    return await this.tareas.enqueueAndWait('plan_estudio', 'findAll');
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.tareas.enqueueAndWait('plan_estudio', 'findOne', { id });
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async update(@Param('id') id: number, @Body() updatePlanEstudioDto: UpdatePlanEstudioDto) {
    const jobId = generateJobId('plan_estudio', 'update', { id, ...updatePlanEstudioDto });
    return await this.tareas.enqueue(
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
  async remove(@Param('id') id: number) {
    const jobId = generateJobId('plan_estudio', 'remove', { id });
    return await this.tareas.enqueue(
      'plan_estudio',
      'remove',
      { id },
      jobId,
    );
  }

  // Endpoints síncronos
  @Post('sync')
  @ApiOperation({ summary: 'Crear plan estudio (síncrono)' })
  async createSync(@Body() createPlanEstudioDto: CreatePlanEstudioDto) {
    return await this.planEstudiosService.create(createPlanEstudioDto);
  }

  @Get('sync')
  @ApiOperation({ summary: 'Obtener todos los plan estudios (síncrono)' })
  async findAllSync() {
    return await this.planEstudiosService.findAll();
  }

  @Get('sync/:id')
  @ApiOperation({ summary: 'Obtener un plan estudio por ID (síncrono)' })
  async findOneSync(@Param('id') id: number) {
    return await this.planEstudiosService.findOne(id);
  }

  @Patch('sync/:id')
  @ApiOperation({ summary: 'Actualizar plan estudio (síncrono)' })
  async updateSync(@Param('id') id: number, @Body() updatePlanEstudioDto: UpdatePlanEstudioDto) {
    return await this.planEstudiosService.update(id, updatePlanEstudioDto);
  }

  @Delete('sync/:id')
  @ApiOperation({ summary: 'Eliminar plan estudio (síncrono)' })
  async removeSync(@Param('id') id: number) {
    return await this.planEstudiosService.remove(id);
  } 
}
