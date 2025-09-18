import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { DiasService } from './dias.service';
import { CreateDiaDto } from './dto/create-dia.dto';
import { UpdateDiaDto } from './dto/update-dia.dto';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TareasProducer } from 'src/tareas/tareas.producer';
import { generateJobId } from 'src/common/utils/idempotency.util';

@ApiTags('dias')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('dias')
export class DiasController {
  constructor(private readonly diasService: DiasService, private readonly tareas: TareasProducer) {}

  @Post()
  @ApiHeader({
    name: 'x-callback-url',
    description: 'CallBack-URL opcional para recibir respuestas',
    required: false,
  })
  create(@Body() createDiaDto: CreateDiaDto, @Headers('x-callback-url') callbackUrl?: string) {
    const jobId = generateJobId('dia', 'create', createDiaDto);
    return this.tareas.enqueue(
      'dia',       // entidad
      'create',        // operación CRUD
      createDiaDto,             // datos del DTO
      callbackUrl,
      jobId, // idempotencia
    );
  }

  @Get()
  @ApiHeader({
    name: 'x-callback-url',
    description: 'CallBack-URL opcional para recibir respuestas',
    required: false,
  })
  findAll(@Headers('x-callback-url') callbackUrl?: string) {
    return this.tareas.enqueue('dia', 'findAll', {}, callbackUrl);
  }

  @Get(':id')
  @ApiHeader({
    name: 'x-callback-url',
    description: 'CallBack-URL opcional para recibir respuestas',
    required: false,
  })
  findOne(@Param('id') id: number, @Headers('x-callback-url') callbackUrl?: string) {
    return this.tareas.enqueue('dia', 'findOne', { id }, callbackUrl);
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-callback-url',
    description: 'CallBack-URL opcional para recibir respuestas',
    required: false,
  })
  update(@Param('id') id: number, @Body() updateDiaDto: UpdateDiaDto, @Headers('x-callback-url') callbackUrl?: string) {
    const jobId = generateJobId('dia', 'update', { id, ...updateDiaDto });
    return this.tareas.enqueue(
      'dia',
      'update',
      { id, ...updateDiaDto },
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
    const jobId = generateJobId('dia', 'remove', { id });
    return this.tareas.enqueue(
      'dia',
      'remove',
      { id },
      callbackUrl,
      jobId,
    );
  }
}
