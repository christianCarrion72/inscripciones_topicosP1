import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HorariosService } from './horarios.service';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { TareasProducer } from '../tareas/tareas.producer';
import { generateJobId } from 'src/common/utils/idempotency.util';

@ApiTags('horarios')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('horarios')
export class HorariosController {
  constructor(
    private readonly horariosService: HorariosService,
    private readonly tareas: TareasProducer
  ) {}

  @Post()
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async create(@Body() createHorarioDto: CreateHorarioDto) {
    const jobId = generateJobId('horario', 'create', createHorarioDto);
    return await this.tareas.enqueue(
      'horario',
      'create',
      createHorarioDto,
      jobId,
    );
  }

  @Get()
  async findAll() {
    return await this.tareas.enqueueAndWait('horario', 'findAll');
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.tareas.enqueueAndWait('horario', 'findOne', { id });
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async update(@Param('id') id: number, @Body() updateHorarioDto: UpdateHorarioDto) {
    const jobId = generateJobId('horario', 'update', { id, ...updateHorarioDto });
    return await this.tareas.enqueue(
      'horario',
      'update',
      { id, ...updateHorarioDto },
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
    const jobId = generateJobId('horario', 'remove', { id });
    return await this.tareas.enqueue(
      'horario',
      'remove',
      { id },
      jobId,
    );
  }

  // Endpoints síncronos
  @Post('sync')
  @ApiOperation({ summary: 'Crear horario (síncrono)' })
  async createSync(@Body() createHorarioDto: CreateHorarioDto) {
    return await this.horariosService.create(createHorarioDto);
  }

  @Get('sync')
  @ApiOperation({ summary: 'Obtener todos los horarios (síncrono)' })
  async findAllSync() {
    return await this.horariosService.findAll();
  }

  @Get('sync/:id')
  @ApiOperation({ summary: 'Obtener un horario por ID (síncrono)' })
  async findOneSync(@Param('id') id: number) {
    return await this.horariosService.findOne(id);
  }

  @Patch('sync/:id')
  @ApiOperation({ summary: 'Actualizar horario (síncrono)' })
  async updateSync(@Param('id') id: number, @Body() updateHorarioDto: UpdateHorarioDto) {
    return await this.horariosService.update(id, updateHorarioDto);
  }

  @Delete('sync/:id')
  @ApiOperation({ summary: 'Eliminar horario (síncrono)' })
  async removeSync(@Param('id') id: number) {
    return await this.horariosService.remove(id);
  } 
}
