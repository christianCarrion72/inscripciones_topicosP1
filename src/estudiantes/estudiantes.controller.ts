import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
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
  create(@Body() createEstudianteDto: CreateEstudianteDto, @Headers('x-callback-url') callbackUrl?: string) {
    const jobId = generateJobId('estudiante', 'create', createEstudianteDto);
    return this.tareas.enqueue(
      'estudiante',
      'create',
      createEstudianteDto,
      callbackUrl,
      jobId,
    );
  }

  @Get()
  findAll(@Headers('x-callback-url') callbackUrl?: string) {
    return this.tareas.enqueue('estudiante', 'findAll',{}, callbackUrl);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Headers('x-callback-url') callbackUrl?: string) {
    return this.tareas.enqueue('estudiante', 'findOne', { id }, callbackUrl);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateEstudianteDto: UpdateEstudianteDto, @Headers('x-callback-url') callbackUrl?: string) {
    const jobId = generateJobId('estudiante', 'update', { id, ...updateEstudianteDto });
    return this.tareas.enqueue(
      'estudiante',
      'update',
      { id, ...updateEstudianteDto },
      callbackUrl,
      jobId,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Headers('x-callback-url') callbackUrl?: string) {
    const jobId = generateJobId('estudiante', 'remove', { id });
    return this.tareas.enqueue(
      'estudiante',
      'remove',
      { id },
      callbackUrl,
      jobId,
    );
  }
}
