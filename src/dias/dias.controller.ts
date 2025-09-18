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
  findAll(@Headers('x-callback-url') callbackUrl?: string) {
    return this.tareas.enqueue('dia', 'findAll', {}, callbackUrl);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Headers('x-callback-url') callbackUrl?: string) {
    return this.tareas.enqueue('dia', 'findOne', { id }, callbackUrl);
  }

  @Patch(':id')
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
