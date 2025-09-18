import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { AulasService } from './aulas.service';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { TareasProducer } from '../tareas/tareas.producer';
import { generateJobId } from 'src/common/utils/idempotency.util';

@ApiTags('aulas')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('aulas')
export class AulasController {
  constructor(
    private readonly aulasService: AulasService,
    private readonly tareas: TareasProducer
  ) {}

  @Post()
  @ApiHeader({
    name: 'x-callback-url',
    description: 'CallBack-URL opcional para recibir respuestas',
    required: false,
  })
  create(@Body() createAulaDto: CreateAulaDto, @Headers('x-callback-url') callbackUrl?: string) {
    const jobId = generateJobId('aula', 'create', createAulaDto);
  
    return this.tareas.enqueue(
      'aula',           // entity
      'create',         // type
      createAulaDto,    // data
      callbackUrl,      // callbackUrl
      jobId             // jobId
    );
  }

  @Get()
  @ApiHeader({
    name: 'x-callback-url',
    description: 'CallBack-URL opcional para recibir respuestas',
    required: false,
  })
  findAll(@Headers('x-callback-url') callbackUrl?: string) {
    return this.tareas.enqueue('aula', 'findAll',{}, callbackUrl);
  }

  @Get(':id')
  @ApiHeader({
    name: 'x-callback-url',
    description: 'CallBack-URL opcional para recibir respuestas',
    required: false,
  })
  findOne(@Param('id') id: number,@Headers('x-callback-url') callbackUrl?: string) {
    return this.tareas.enqueue('aula', 'findOne', { id }, callbackUrl);
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-callback-url',
    description: 'CallBack-URL opcional para recibir respuestas',
    required: false,
  })
  update(@Param('id',) id: number, @Body() updateAulaDto: UpdateAulaDto,@Headers('x-callback-url') callbackUrl?: string) {
    const jobId = generateJobId('aula', 'update', { id, ...updateAulaDto });
    return this.tareas.enqueue(
      'aula',
      'update',
      { id, ...updateAulaDto },
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
  @ApiOperation({ summary: 'Eliminar aula (asíncrono)' })
  remove(@Param('id') id: number,@Headers('x-callback-url') callbackUrl?: string) {
    const jobId = generateJobId('aula', 'remove', { id });
    return this.tareas.enqueue(
      'aula',
      'remove',
      { id },
      callbackUrl,
      jobId,
    );
  }
}
