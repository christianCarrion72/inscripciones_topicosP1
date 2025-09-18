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
    name: 'x-callback-url',
    description: 'CallBack-URL opcional para recibir respuestas',
    required: false,
  })
  create(@Body() createBoletaHorarioDto: CreateBoletaHorarioDto, @Headers('x-callback-url') callbackUrl?: string) {
    const jobId = generateJobId('boleta_horario', 'create', createBoletaHorarioDto);
    return this.tareas.enqueue(
      'boleta_horario',
      'create',
      createBoletaHorarioDto,
      callbackUrl,
      jobId,
    );
  }

  @Get()
  @ApiHeader({
    name: 'x-callback-url',
    description: 'CallBack-URL opcional para recibir respuestas',
    required: false,
  })
  findAll(@Headers('x-callback-url') callbackUrl?: string) {
    return this.tareas.enqueue('boleta_horario', 'findAll',{}, callbackUrl);
  }

  @Get(':id')
  @ApiHeader({
    name: 'x-callback-url',
    description: 'CallBack-URL opcional para recibir respuestas',
    required: false,
  })
  findOne(@Param('id') id: number, @Headers('x-callback-url') callbackUrl?: string) {
    return this.tareas.enqueue('boleta_horario', 'findOne', { id }, callbackUrl);
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-callback-url',
    description: 'CallBack-URL opcional para recibir respuestas',
    required: false,
  })
  update(@Param('id') id: number, @Body() updateBoletaHorarioDto: UpdateBoletaHorarioDto, @Headers('x-callback-url') callbackUrl?: string) {
    const jobId = generateJobId('boleta_horario', 'update', { id, ...updateBoletaHorarioDto });
    return this.tareas.enqueue(
      'boleta_horario',
      'update',
      { id, ...updateBoletaHorarioDto },
      callbackUrl,
      jobId,
    );
  }

  @Delete(':id')
  @ApiHeader({
    name: 'x-callback-url',
    description: 'CallBack-URL opcional para recibir respuestas',
    required: false,
  })
  remove(@Param('id') id: number, @Headers('x-callback-url') callbackUrl?: string) {
    const jobId = generateJobId('boleta_horario', 'remove', { id });
    return this.tareas.enqueue(
      'boleta_horario',
      'remove',
      { id },
      callbackUrl,
      jobId,
    );
  }
}
