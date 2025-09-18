import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TareasProducer } from '../tareas/tareas.producer';
import { generateJobId } from 'src/common/utils/idempotency.util';

@ApiTags('carreras')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('carreras')
export class CarrerasController {
  constructor(
    private readonly tareas: TareasProducer
  ) {}

  @Post()
  @ApiHeader({
    name: 'x-callback-url',
    description: 'CallBack-URL opcional para recibir respuestas',
    required: false,
  })
  @ApiOperation({ summary: 'Crear carrera (asíncrono)' })
  create(@Body() createCarreraDto: CreateCarreraDto, @Headers('x-callback-url') callbackUrl?: string) {
    const jobId = generateJobId('carrera', 'create', createCarreraDto);
    return this.tareas.enqueue(
      'carrera',
      'create',
      createCarreraDto,
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
    return this.tareas.enqueue('carrera', 'findAll', {}, callbackUrl);
  }

  @Get(':id')
  @ApiHeader({
    name: 'x-callback-url',
    description: 'CallBack-URL opcional para recibir respuestas',
    required: false,
  })
  findOne(@Param('id') id: number, @Headers('x-callback-url') callbackUrl?: string) {
    return this.tareas.enqueue('carrera', 'findOne', { id }, callbackUrl);
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-callback-url',
    description: 'CallBack-URL opcional para recibir respuestas',
    required: false,
  })
  update(@Param('id') id: number, @Body() updateCarreraDto: UpdateCarreraDto, @Headers('x-callback-url') callbackUrl?: string) {
    const jobId = generateJobId('carrera', 'update', { id, ...updateCarreraDto });
    return this.tareas.enqueue(
      'carrera',
      'update',
      { id, ...updateCarreraDto },
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
    const jobId = generateJobId('carrera', 'remove', { id });
    return this.tareas.enqueue(
      'carrera',
      'remove',
      { id },
      callbackUrl,
      jobId,
    );
  }
}
