import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { PrerequisitosService } from './prerequisitos.service';
import { CreatePrerequisitoDto } from './dto/create-prerequisito.dto';
import { UpdatePrerequisitoDto } from './dto/update-prerequisito.dto';
import { TareasProducer } from '../tareas/tareas.producer';
import { generateJobId } from 'src/common/utils/idempotency.util';

@ApiTags('prerequisitos')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('prerequisitos')
export class PrerequisitosController {
  constructor(
    private readonly prerequisitosService: PrerequisitosService,
    private readonly tareas: TareasProducer
  ) {}

  @Post()
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async create(@Body() createPrerequisitoDto: CreatePrerequisitoDto, @Headers('x-idempotency-key') idem?: string) {
    const jobId = generateJobId('prerequisito', 'create', createPrerequisitoDto);
    return this.tareas.enqueue(
      'prerequisito',
      'create',
      createPrerequisitoDto,
      idem ?? jobId,
    );
  }

  @Get()
  async findAll() {
    return this.tareas.enqueueAndWait('prerequisito', 'findAll');
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.tareas.enqueueAndWait('prerequisito', 'findOne', { id });
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  update(@Param('id') id: number, @Body() updatePrerequisitoDto: UpdatePrerequisitoDto, @Headers('x-idempotency-key') idem?: string) {
    const jobId = generateJobId('prerequisito', 'update', { id, ...updatePrerequisitoDto });
    return this.tareas.enqueue(
      'prerequisito',
      'update',
      { id, ...updatePrerequisitoDto },
      idem ?? jobId,
    );
  }

  @Delete(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  remove(@Param('id') id: number, @Headers('x-idempotency-key') idem?: string) {
    const jobId = generateJobId('prerequisito', 'remove', { id });
    return this.tareas.enqueue(
      'prerequisito',
      'remove',
      { id },
      idem ?? jobId,
    );
  }

  @Get('materia/:id')
  async findPrerequisitosMateria(@Param('id') id: number) {
    return this.prerequisitosService.findPrerequisitosMateria(id);
  }
}
