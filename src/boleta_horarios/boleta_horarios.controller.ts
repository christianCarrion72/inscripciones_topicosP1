import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { BoletaHorariosService } from './boleta_horarios.service';
import { CreateBoletaHorarioDto } from './dto/create-boleta_horario.dto';
import { UpdateBoletaHorarioDto } from './dto/update-boleta_horario.dto';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TareasProducer } from '../tareas/tareas.producer';
import { generateJobId } from 'src/common/utils/idempotency.util';

@ApiTags('boleta-horarios')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('boleta-horarios')
export class BoletaHorariosController {
  constructor(
    private readonly boletaHorariosService: BoletaHorariosService,
    private readonly tareas: TareasProducer
  ) {}

  @Post()
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async create(@Body() createBoletaHorarioDto: CreateBoletaHorarioDto, @Headers('x-idempotency-key') idem?: string) {
    const jobId = generateJobId('boleta_horario', 'create', createBoletaHorarioDto);
    return this.tareas.enqueue(
      'boleta_horario',
      'create',
      createBoletaHorarioDto,
      idem ?? jobId,
    );
  }

  @Get()
  async findAll() {
    return this.tareas.enqueueAndWait('boleta_horario', 'findAll');
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.tareas.enqueueAndWait('boleta_horario', 'findOne', { id });
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async update(@Param('id') id: number, @Body() updateBoletaHorarioDto: UpdateBoletaHorarioDto, @Headers('x-idempotency-key') idem?: string) {
    const jobId = generateJobId('boleta_horario', 'update', { id, ...updateBoletaHorarioDto });
    return await this.tareas.enqueue(
      'boleta_horario',
      'update',
      { id, ...updateBoletaHorarioDto },
      idem ?? jobId,
    );
  }

  @Delete(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async remove(@Param('id') id: number, @Headers('x-idempotency-key') idem?: string) {
    const jobId = generateJobId('boleta_horario', 'remove', { id });
    return await this.tareas.enqueue(
      'boleta_horario',
      'remove',
      { id },
      idem ?? jobId,
    );
  }

  // Endpoints síncronos
  @Post('sync')
  @ApiOperation({ summary: 'Crear carrera (síncrono)' })
  async createSync(@Body() createBoletaHorarioDto: CreateBoletaHorarioDto) {
    return await this.boletaHorariosService.create(createBoletaHorarioDto);
  }

  @Get('sync')
  @ApiOperation({ summary: 'Obtener todas las boletas horarios (síncrono)' })
  async findAllSync() {
    return await this.boletaHorariosService.findAll();
  }

  @Get('sync/:id')
  @ApiOperation({ summary: 'Obtener un boleta horario por ID (síncrono)' })
  async findOneSync(@Param('id') id: number) {
    return await this.boletaHorariosService.findOne(id);
  }

  @Patch('sync/:id')
  @ApiOperation({ summary: 'Actualizar boleta horario (síncrono)' })
  async updateSync(@Param('id') id: number, @Body() updateBoletaHorarioDto: UpdateBoletaHorarioDto) {
    return await this.boletaHorariosService.update(id, updateBoletaHorarioDto);
  }

  @Delete('sync/:id')
  @ApiOperation({ summary: 'Eliminar boleta horario (síncrono)' })
  async removeSync(@Param('id') id: number) {
    return await this.boletaHorariosService.remove(id);
  }
}
