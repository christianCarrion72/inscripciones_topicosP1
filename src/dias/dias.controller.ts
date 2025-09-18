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
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false, // <--- importante
  })
  create(@Body() createDiaDto: CreateDiaDto) {
    const jobId = generateJobId('dia', 'create', createDiaDto);
    return this.tareas.enqueue(
      'dia',       // entidad
      'create',        // operación CRUD
      createDiaDto,             // datos del DTO
      jobId, // idempotencia
    );
  }

  @Get()
  findAll() {
    return this.tareas.enqueue('dia', 'findAll');
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tareas.enqueue('dia', 'findOne', { id });
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false, // <--- importante
  })
  update(@Param('id') id: number, @Body() updateDiaDto: UpdateDiaDto) {
    const jobId = generateJobId('dia', 'update', { id, ...updateDiaDto });
    return this.tareas.enqueue(
      'dia',
      'update',
      { id, ...updateDiaDto },
      jobId,
    );
  }

  @Delete(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false, // <--- importante
  })
  remove(@Param('id') id: number) {
    const jobId = generateJobId('dia', 'remove', { id });
    return this.tareas.enqueue(
      'dia',
      'remove',
      { id },
      jobId,
    );
  }
}
