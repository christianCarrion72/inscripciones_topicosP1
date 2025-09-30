import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GruposService } from './grupos.service';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { TareasProducer } from '../tareas/tareas.producer';
import { generateJobId } from 'src/common/utils/idempotency.util';

@ApiTags('grupos')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('grupos')
export class GruposController {
  constructor(
    private readonly gruposService: GruposService,
    private readonly tareas: TareasProducer
  ) {}

  @Post()
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async create(@Body() createGrupoDto: CreateGrupoDto) {
    const jobId = generateJobId('grupo', 'create', createGrupoDto);
    return await this.tareas.enqueue(
      'grupo',
      'create',
      createGrupoDto,
      jobId,
    );
  }

  @Get()
  async findAll() {
    return await this.tareas.enqueue('grupo', 'findAll');
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.tareas.enqueue('grupo', 'findOne', { id });
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async update(@Param('id') id: number, @Body() updateGrupoDto: UpdateGrupoDto) {
    const jobId = generateJobId('grupo', 'update', { id, ...updateGrupoDto });
    return await this.tareas.enqueue(
      'grupo',
      'update',
      { id, ...updateGrupoDto },
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
    const jobId = generateJobId('grupo', 'remove', { id });
    return await this.tareas.enqueue(
      'grupo',
      'remove',
      { id },
      jobId,
    );
  }

  // Endpoints síncronos
  @Post('sync')
  @ApiOperation({ summary: 'Crear grupo (síncrono)' })
  async createSync(@Body() createGrupoDto: CreateGrupoDto) {
    return await this.gruposService.create(createGrupoDto);
  }

  @Get('sync')
  @ApiOperation({ summary: 'Obtener todos los grupo (síncrono)' })
  async findAllSync() {
    return await this.gruposService.findAll();
  }

  @Get('sync/:id')
  @ApiOperation({ summary: 'Obtener un grupo por ID (síncrono)' })
  async findOneSync(@Param('id') id: number) {
    return await this.gruposService.findOne(id);
  }

  @Patch('sync/:id')
  @ApiOperation({ summary: 'Actualizar grupo (síncrono)' })
  async updateSync(@Param('id') id: number, @Body() updateGrupoDto: UpdateGrupoDto) {
    return await this.gruposService.update(id, updateGrupoDto);
  }

  @Delete('sync/:id')
  @ApiOperation({ summary: 'Eliminar grupo (síncrono)' })
  async removeSync(@Param('id') id: number) {
    return await this.gruposService.remove(id);
  } 
}
