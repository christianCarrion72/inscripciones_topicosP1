import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PeriodosService } from './periodos.service';
import { CreatePeriodoDto } from './dto/create-periodo.dto';
import { UpdatePeriodoDto } from './dto/update-periodo.dto';
import { TareasProducer } from '../tareas/tareas.producer';
import { generateJobId } from 'src/common/utils/idempotency.util';

@ApiTags('periodos')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('periodos')
export class PeriodosController {
  constructor(
    private readonly periodosService: PeriodosService,
    private readonly tareas: TareasProducer
  ) {}

  @Post()
  async create(@Body() createPeriodoDto: CreatePeriodoDto) {
    const jobId = generateJobId('periodo', 'create', createPeriodoDto);
    return await this.tareas.enqueue(
      'periodo',
      'create',
      createPeriodoDto,
      jobId,
    );
  }

  @Get()
  async findAll() {
    return await this.tareas.enqueue('periodo', 'findAll');
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.tareas.enqueue('periodo', 'findOne', { id });
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updatePeriodoDto: UpdatePeriodoDto) {
    const jobId = generateJobId('periodo', 'update', { id, ...updatePeriodoDto });
    return await this.tareas.enqueue(
      'periodo',
      'update',
      { id, ...updatePeriodoDto },
      jobId,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const jobId = generateJobId('periodo', 'remove', { id });
    return await this.tareas.enqueue(
      'periodo',
      'remove',
      { id },
      jobId,
    );
  }

  // Endpoints síncronos
  @Post('sync')
  @ApiOperation({ summary: 'Crear periodo (síncrono)' })
  async createSync(@Body() createPeriodoDto: CreatePeriodoDto) {
    return await this.periodosService.create(createPeriodoDto);
  }

  @Get('sync')
  @ApiOperation({ summary: 'Obtener todos los periodos (síncrono)' })
  async findAllSync() {
    return await this.periodosService.findAll();
  }

  @Get('sync/:id')
  @ApiOperation({ summary: 'Obtener un periodo por ID (síncrono)' })
  async findOneSync(@Param('id') id: number) {
    return await this.periodosService.findOne(id);
  }

  @Patch('sync/:id')
  @ApiOperation({ summary: 'Actualizar periodo (síncrono)' })
  async updateSync(@Param('id') id: number, @Body() updatePeriodoDto: UpdatePeriodoDto) {
    return await this.periodosService.update(id, updatePeriodoDto);
  }

  @Delete('sync/:id')
  @ApiOperation({ summary: 'Eliminar periodo (síncrono)' })
  async removeSync(@Param('id') id: number) {
    return await this.periodosService.remove(id);
  } 
}
