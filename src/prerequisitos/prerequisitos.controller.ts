import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
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
  async create(@Body() createPrerequisitoDto: CreatePrerequisitoDto) {
    const jobId = generateJobId('prerequisito', 'create', createPrerequisitoDto);
    return await this.tareas.enqueue(
      'prerequisito',
      'create',
      createPrerequisitoDto,
      jobId,
    );
  }

  @Get()
  async findAll() {
    return await this.tareas.enqueueAndWait('prerequisito', 'findAll');
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.tareas.enqueueAndWait('prerequisito', 'findOne', { id });
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async update(@Param('id') id: number, @Body() updatePrerequisitoDto: UpdatePrerequisitoDto) {
    const jobId = generateJobId('prerequisito', 'update', { id, ...updatePrerequisitoDto });
    return await this.tareas.enqueue(
      'prerequisito',
      'update',
      { id, ...updatePrerequisitoDto },
      jobId,
    );
  }

  @Delete(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async remove(@Param('id') id: number) {
    const jobId = generateJobId('prerequisito', 'remove', { id });
    return await this.tareas.enqueue(
      'prerequisito',
      'remove',
      { id },
      jobId,
    );
  }

  @Get('materia/:id')
  async findPrerequisitosMateria(@Param('id') id: number) {
    return await this.prerequisitosService.findPrerequisitosMateria(id);
  }

  // Endpoints síncronos
  @Post('sync')
  @ApiOperation({ summary: 'Crear prerequisito (síncrono)' })
  async createSync(@Body() createPrerequisitoDto: CreatePrerequisitoDto) {
    return await this.prerequisitosService.create(createPrerequisitoDto);
  }

  @Get('sync')
  @ApiOperation({ summary: 'Obtener todos los prerequisitos (síncrono)' })
  async findAllSync() {
    return await this.prerequisitosService.findAll();
  }

  @Get('sync/:id')
  @ApiOperation({ summary: 'Obtener un prerequisito por ID (síncrono)' })
  async findOneSync(@Param('id') id: number) {
    return await this.prerequisitosService.findOne(id);
  }

  @Patch('sync/:id')
  @ApiOperation({ summary: 'Actualizar prerequisito (síncrono)' })
  async updateSync(@Param('id') id: number, @Body() updatePrerequisitoDto: UpdatePrerequisitoDto) {
    return await this.prerequisitosService.update(id, updatePrerequisitoDto);
  }

  @Delete('sync/:id')
  @ApiOperation({ summary: 'Eliminar prerequisito (síncrono)' })
  async removeSync(@Param('id') id: number) {
    return await this.prerequisitosService.remove(id);
  } 
}
