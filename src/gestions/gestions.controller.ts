import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { GestionsService } from './gestions.service';
import { CreateGestionDto } from './dto/create-gestion.dto';
import { UpdateGestionDto } from './dto/update-gestion.dto';
import { TareasProducer } from '../tareas/tareas.producer';
import { generateJobId } from 'src/common/utils/idempotency.util';

@ApiTags('gestions')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('gestions')
export class GestionsController {
  constructor(
    private readonly gestionsService: GestionsService,
    private readonly tareas: TareasProducer
  ) {}

  @Post()
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async create(@Body() createGestionDto: CreateGestionDto) {
    const jobId = generateJobId('gestion', 'create', createGestionDto);
    return this.tareas.enqueue(
      'gestion',
      'create',
      createGestionDto,
      jobId,
    );
  }

  @Get()
  async findAll() {
    return this.tareas.enqueueAndWait('gestion', 'findAll');
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.tareas.enqueueAndWait('gestion', 'findOne', { id });
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  update(@Param('id') id: number, @Body() updateGestionDto: UpdateGestionDto) {
    const jobId = generateJobId('gestion', 'update', { id, ...updateGestionDto });
    return this.tareas.enqueue(
      'gestion',
      'update',
      { id, ...updateGestionDto },
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
    const jobId = generateJobId('gestion', 'remove', { id });
    return this.tareas.enqueue(
      'gestion',
      'remove',
      { id },
      jobId,
    );
  }
}
