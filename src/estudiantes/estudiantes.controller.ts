import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { EstudiantesService } from './estudiantes.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TareasProducer } from '../tareas/tareas.producer';
import { generateJobId } from 'src/common/utils/idempotency.util';

@ApiTags('estudiantes')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('estudiantes')
export class EstudiantesController {
  constructor(
    private readonly estudiantesService: EstudiantesService,
    private readonly tareas: TareasProducer
  ) {}

  @Post()
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async create(@Body() createEstudianteDto: CreateEstudianteDto) {
    const jobId = generateJobId('estudiante', 'create', createEstudianteDto);
    return await this.tareas.enqueue(
      'estudiante',
      'create',
      createEstudianteDto,
      jobId,
    );
  }

  @Get()
  async findAll() {
    return await this.tareas.enqueueAndWait('estudiante', 'findAll');
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.tareas.enqueueAndWait('estudiante', 'findOne', { id });
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async update(@Param('id') id: number, @Body() updateEstudianteDto: UpdateEstudianteDto) {
    const jobId = generateJobId('estudiante', 'update', { id, ...updateEstudianteDto });
    return await this.tareas.enqueue(
      'estudiante',
      'update',
      { id, ...updateEstudianteDto },
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
    const jobId = generateJobId('estudiante', 'remove', { id });
    return await this.tareas.enqueue(
      'estudiante',
      'remove',
      { id },
      jobId,
    );
  }
}
