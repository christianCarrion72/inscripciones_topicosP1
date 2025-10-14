import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
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
  async create(@Body() createNivelDto: CreateNivelDto) {
    const jobId = generateJobId('nivel', 'create', createNivelDto);
    return await this.tareas.enqueue(
      'nivel',
      'create',
      createNivelDto,
      jobId,
    );
  }

  @Get()
  async findAll() {
    return await this.tareas.enqueue('nivel', 'findAll');
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.tareas.enqueue('nivel', 'findOne', { id });
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateNivelDto: UpdateNivelDto) {
    const jobId = generateJobId('nivel', 'update', { id, ...updateNivelDto });
    return await this.tareas.enqueue(
      'nivel',
      'update',
      { id, ...updateNivelDto },
      jobId,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const jobId = generateJobId('nivel', 'remove', { id });
    return await this.tareas.enqueue(
      'nivel',
      'remove',
      { id },
      jobId,
    );
  }

  // Endpoints síncronos
  @Post('sync')
  @ApiOperation({ summary: 'Crear nivel (síncrono)' })
  async createSync(@Body() createNivelDto: CreateNivelDto) {
    return await this.nivelsService.create(createNivelDto);
  }

  @Get('sync')
  @ApiOperation({ summary: 'Obtener todos los niveles (síncrono)' })
  async findAllSync() {
    return await this.nivelsService.findAll();
  }

  @Get('sync/:id')
  @ApiOperation({ summary: 'Obtener un nivel por ID (síncrono)' })
  async findOneSync(@Param('id') id: number) {
    return await this.nivelsService.findOne(id);
  }

  @Patch('sync/:id')
  @ApiOperation({ summary: 'Actualizar nivel (síncrono)' })
  async updateSync(@Param('id') id: number, @Body() updateNivelDto: UpdateNivelDto) {
    return await this.nivelsService.update(id, updateNivelDto);
  }

  @Delete('sync/:id')
  @ApiOperation({ summary: 'Eliminar nivel (síncrono)' })
  async removeSync(@Param('id') id: number) {
    return await this.nivelsService.remove(id);
  } 
}
