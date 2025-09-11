import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
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
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  @ApiOperation({ summary: 'Crear aula (asíncrono)' })
  async create(@Body() createAulaDto: CreateAulaDto) {
    const jobId = generateJobId('aula', 'create', createAulaDto);
    return await this.tareas.enqueue(
      'aula',
      'create',
      createAulaDto,
      jobId,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las aulas (asíncrono)' })
  async findAll() {
    return await this.tareas.enqueueAndWait('aula', 'findAll');
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un aula por ID (asíncrono)' })
  async findOne(@Param('id') id: number) {
    return await this.tareas.enqueueAndWait('aula', 'findOne', { id });
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  @ApiOperation({ summary: 'Actualizar aula (asíncrono)' })
  async update(@Param('id') id: number, @Body() updateAulaDto: UpdateAulaDto) {
    const jobId = generateJobId('aula', 'update', { id, ...updateAulaDto });
    return await this.tareas.enqueue(
      'aula',
      'update',
      { id, ...updateAulaDto },
      jobId,
    );
  }

  @Delete(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  @ApiOperation({ summary: 'Eliminar aula (asíncrono)' })
  async remove(@Param('id') id: number) {
    const jobId = generateJobId('aula', 'remove', { id });
    return await this.tareas.enqueue(
      'aula',
      'remove',
      { id },
      jobId,
    );
  }

  //Endpoint de respuesta
  
  
  // Endpoints síncronos
  @Post('sync')
  @ApiOperation({ summary: 'Crear aula (síncrono)' })
  async createSync(@Body() createAulaDto: CreateAulaDto) {
    return await this.aulasService.create(createAulaDto);
  }

  @Get('sync')
  @ApiOperation({ summary: 'Obtener todas las aulas (síncrono)' })
  async findAllSync() {
    return await this.aulasService.findAll();
  }

  @Get('sync/:id')
  @ApiOperation({ summary: 'Obtener un aula por ID (síncrono)' })
  async findOneSync(@Param('id') id: number) {
    return await this.aulasService.findOne(id);
  }

  @Patch('sync/:id')
  @ApiOperation({ summary: 'Actualizar aula (síncrono)' })
  async updateSync(@Param('id') id: number, @Body() updateAulaDto: UpdateAulaDto) {
    return await this.aulasService.update(id, updateAulaDto);
  }

  @Delete('sync/:id')
  @ApiOperation({ summary: 'Eliminar aula (síncrono)' })
  async removeSync(@Param('id') id: number) {
    return await this.aulasService.remove(id);
  }
}
