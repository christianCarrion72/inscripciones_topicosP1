import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { NivelsService } from './nivels.service';
import { CreateNivelDto } from './dto/create-nivel.dto';
import { UpdateNivelDto } from './dto/update-nivel.dto';
import { TareasProducer } from '../tareas/tareas.producer';
import { generateJobId } from 'src/common/utils/idempotency.util';

@ApiTags('nivels')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('nivels')
export class NivelsController {
  constructor(
    private readonly nivelsService: NivelsService,
    private readonly tareas: TareasProducer
  ) {}

  @Post()
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async create(@Body() createNivelDto: CreateNivelDto) {
    const jobId = generateJobId('nivel', 'create', createNivelDto);
    return this.tareas.enqueue(
      'nivel',
      'create',
      createNivelDto,
      jobId,
    );
  }

  @Get()
  async findAll() {
    return this.tareas.enqueueAndWait('nivel', 'findAll');
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.tareas.enqueueAndWait('nivel', 'findOne', { id });
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  update(@Param('id') id: number, @Body() updateNivelDto: UpdateNivelDto) {
    const jobId = generateJobId('nivel', 'update', { id, ...updateNivelDto });
    return this.tareas.enqueue(
      'nivel',
      'update',
      { id, ...updateNivelDto },
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
    const jobId = generateJobId('nivel', 'remove', { id });
    return this.tareas.enqueue(
      'nivel',
      'remove',
      { id },
      jobId,
    );
  }
}
