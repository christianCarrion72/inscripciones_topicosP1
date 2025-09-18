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
  create(@Body() createDocenteDto: CreateDocenteDto) {
    const jobId = generateJobId('docente', 'create', createDocenteDto);
    return this.tareas.enqueue(
      'docente',
      'create',
      createDocenteDto,
      jobId,
    );
  }

  @Get()
  findAll() {
    return this.tareas.enqueue('docente', 'findAll');
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tareas.enqueue('docente', 'findOne', { id });
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  update(@Param('id') id: number, @Body() updateDocenteDto: UpdateDocenteDto) {
    const jobId = generateJobId('docente', 'update', { id, ...updateDocenteDto });
    return this.tareas.enqueue(
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
  remove(@Param('id') id: number) {
    const jobId = generateJobId('docente', 'remove', { id });
    return this.tareas.enqueue(
      'docente',
      'remove',
      { id },
      jobId,
    );
  }
}
