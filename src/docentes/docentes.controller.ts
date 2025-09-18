import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
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
  create(@Body() createDocenteDto: CreateDocenteDto, @Headers('x-callback-url') callbackUrl?: string) {
    const jobId = generateJobId('docente', 'create', createDocenteDto);
    return this.tareas.enqueue(
      'docente',
      'create',
      createDocenteDto,
      callbackUrl,
      jobId,
    );
  }

  @Get()
  findAll(@Headers('x-callback-url') callbackUrl?: string) {
    return this.tareas.enqueue('docente', 'findAll',{}, callbackUrl);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Headers('x-callback-url') callbackUrl?: string) {
    return this.tareas.enqueue('docente', 'findOne', { id }, callbackUrl);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDocenteDto: UpdateDocenteDto, @Headers('x-callback-url') callbackUrl?: string) {
    const jobId = generateJobId('docente', 'update', { id, ...updateDocenteDto });
    return this.tareas.enqueue(
      'docente',
      'update',
      { id, ...updateDocenteDto },
      callbackUrl,
      jobId,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Headers('x-callback-url') callbackUrl?: string) {
    const jobId = generateJobId('docente', 'remove', { id });
    return this.tareas.enqueue(
      'docente',
      'remove',
      { id },
      callbackUrl,
      jobId,
    );
  }
}
