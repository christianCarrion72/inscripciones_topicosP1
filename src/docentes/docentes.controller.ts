import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { DocentesService } from './docentes.service';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TareasProducer } from '../tareas/tareas.producer';
import { generateJobId } from 'src/common/utils/idempotency.util';

@ApiTags('docentes')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('docentes')
export class DocentesController {
  constructor(
    private readonly docentesService: DocentesService,
    private readonly tareas: TareasProducer
  ) {}

  @Post()
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async create(@Body() createDocenteDto: CreateDocenteDto) {
    const jobId = generateJobId('docente', 'create', createDocenteDto);
    return await this.tareas.enqueue(
      'docente',
      'create',
      createDocenteDto,
      jobId,
    );
  }

  @Get()
  async findAll() {
    return await this.tareas.enqueueAndWait('docente', 'findAll');
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.tareas.enqueueAndWait('docente', 'findOne', { id });
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async update(@Param('id') id: number, @Body() updateDocenteDto: UpdateDocenteDto) {
    const jobId = generateJobId('docente', 'update', { id, ...updateDocenteDto });
    return await this.tareas.enqueue(
      'docente',
      'update',
      { id, ...updateDocenteDto },
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
    const jobId = generateJobId('docente', 'remove', { id });
    return await this.tareas.enqueue(
      'docente',
      'remove',
      { id },
      jobId,
    );
  }

  // Endpoints síncronos
  @Post('sync')
  @ApiOperation({ summary: 'Crear docente (síncrono)' })
  async createSync(@Body() createDocenteDto: CreateDocenteDto) {
    return await this.docentesService.create(createDocenteDto);
  }

  @Get('sync')
  @ApiOperation({ summary: 'Obtener todas los docentes (síncrono)' })
  async findAllSync() {
    return await this.docentesService.findAll();
  }

  @Get('sync/:id')
  @ApiOperation({ summary: 'Obtener un docente por ID (síncrono)' })
  async findOneSync(@Param('id') id: number) {
    return await this.docentesService.findOne(id);
  }

  @Patch('sync/:id')
  @ApiOperation({ summary: 'Actualizar docente (síncrono)' })
  async updateSync(@Param('id') id: number, @Body() updateDocenteDto: UpdateDocenteDto) {
    return await this.docentesService.update(id, updateDocenteDto);
  }

  @Delete('sync/:id')
  @ApiOperation({ summary: 'Eliminar docente (síncrono)' })
  async removeSync(@Param('id') id: number) {
    return await this.docentesService.remove(id);
  } 
}
