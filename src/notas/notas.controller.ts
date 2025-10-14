import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { NotasService } from './notas.service';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';
import { TareasProducer } from '../tareas/tareas.producer';
import { generateJobId } from 'src/common/utils/idempotency.util';

@ApiTags('notas')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('notas')
export class NotasController {
  constructor(
    private readonly notasService: NotasService,
    private readonly tareas: TareasProducer
  ) {}

  @Post()
  async create(@Body() createNotaDto: CreateNotaDto) {
    const jobId = generateJobId('nota', 'create', createNotaDto);
    return await this.tareas.enqueue(
      'nota',
      'create',
      createNotaDto,
      jobId,
    );
  }

  @Get()
  async findAll() {
    return await this.tareas.enqueue('nota', 'findAll');
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.tareas.enqueue('nota', 'findOne', { id });
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateNotaDto: UpdateNotaDto) {
    const jobId = generateJobId('nota', 'update', { id, ...updateNotaDto });
    return await this.tareas.enqueue(
      'nota',
      'update',
      { id, ...updateNotaDto },
      jobId,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const jobId = generateJobId('nota', 'remove', { id });
    return await this.tareas.enqueue(
      'nota',
      'remove',
      { id },
      jobId,
    );
  }

  // Endpoints síncronos
  @Post('sync')
  @ApiOperation({ summary: 'Crear nota (síncrono)' })
  async createSync(@Body() createNotaDto: CreateNotaDto) {
    return await this.notasService.create(createNotaDto);
  }

  @Get('sync')
  @ApiOperation({ summary: 'Obtener todos las notas (síncrono)' })
  async findAllSync() {
    return await this.notasService.findAll();
  }

  @Get('sync/:id')
  @ApiOperation({ summary: 'Obtener una nota por ID (síncrono)' })
  async findOneSync(@Param('id') id: number) {
    return await this.notasService.findOne(id);
  }

  @Patch('sync/:id')
  @ApiOperation({ summary: 'Actualizar nota (síncrono)' })
  async updateSync(@Param('id') id: number, @Body() updateNotaDto: UpdateNotaDto) {
    return await this.notasService.update(id, updateNotaDto);
  }

  @Delete('sync/:id')
  @ApiOperation({ summary: 'Eliminar nota (síncrono)' })
  async removeSync(@Param('id') id: number) {
    return await this.notasService.remove(id);
  } 
}
