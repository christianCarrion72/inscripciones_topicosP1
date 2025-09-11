import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { DiaHorariosService } from './dia_horarios.service';
import { CreateDiaHorarioDto } from './dto/create-dia_horario.dto';
import { UpdateDiaHorarioDto } from './dto/update-dia_horario.dto';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TareasProducer } from '../tareas/tareas.producer';
import { generateJobId } from 'src/common/utils/idempotency.util';

@ApiTags('dia-horarios')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('dia-horarios')
export class DiaHorariosController {
  constructor(
    private readonly diaHorariosService: DiaHorariosService,
    private readonly tareas: TareasProducer
  ) {}

  @Post()
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async create(@Body() createDiaHorarioDto: CreateDiaHorarioDto) {
    const jobId = generateJobId('dia_horario', 'create', createDiaHorarioDto);
    return await this.tareas.enqueue(
      'dia_horario',
      'create',
      createDiaHorarioDto,
      jobId,
    );
  }

  @Get()
  async findAll() {
    return await this.tareas.enqueueAndWait('dia_horario', 'findAll');
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.tareas.enqueueAndWait('dia_horario', 'findOne', { id });
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async update(@Param('id') id: number, @Body() updateDiaHorarioDto: UpdateDiaHorarioDto) {
    const jobId = generateJobId('dia_horario', 'update', { id, ...updateDiaHorarioDto });
    return await this.tareas.enqueue(
      'dia_horario',
      'update',
      { id, ...updateDiaHorarioDto },
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
    const jobId = generateJobId('dia_horario', 'remove', { id });
    return await this.tareas.enqueue(
      'dia_horario',
      'remove',
      { id },
      jobId,
    );
  }
  
  // Endpoints síncronos
  @Post('sync')
  @ApiOperation({ summary: 'Crear dia horario (síncrono)' })
  async createSync(@Body() createDiaHorarioDto: CreateDiaHorarioDto) {
    return await this.diaHorariosService.create(createDiaHorarioDto);
  }

  @Get('sync')
  @ApiOperation({ summary: 'Obtener todas los dias horarios (síncrono)' })
  async findAllSync() {
    return await this.diaHorariosService.findAll();
  }

  @Get('sync/:id')
  @ApiOperation({ summary: 'Obtener un dia horario por ID (síncrono)' })
  async findOneSync(@Param('id') id: number) {
    return await this.diaHorariosService.findOne(id);
  }

  @Patch('sync/:id')
  @ApiOperation({ summary: 'Actualizar dia horario (síncrono)' })
  async updateSync(@Param('id') id: number, @Body() updateDiaHorarioDto: UpdateDiaHorarioDto) {
    return await this.diaHorariosService.update(id, updateDiaHorarioDto);
  }

  @Delete('sync/:id')
  @ApiOperation({ summary: 'Eliminar dia horario (síncrono)' })
  async removeSync(@Param('id') id: number) {
    return await this.diaHorariosService.remove(id);
  }  
}
