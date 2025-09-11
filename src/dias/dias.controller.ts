import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { DiasService } from './dias.service';
import { CreateDiaDto } from './dto/create-dia.dto';
import { UpdateDiaDto } from './dto/update-dia.dto';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TareasProducer } from 'src/tareas/tareas.producer';

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
  async create(@Body() createDiaDto: CreateDiaDto, @Headers('x-idempotency-key') idem?: string) {
    const jobId = "id";
    return this.tareas.enqueue(
      'dia',       // entidad
      'create',        // operación CRUD
      createDiaDto,             // datos del DTO
      idem ?? jobId, // idempotencia
    );
  }

  @Get()
  async findAll() {
    return this.tareas.enqueue('dia', 'findAll');
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.tareas.enqueue('dia', 'findOne', { id });
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false, // <--- importante
  })
  async update(@Param('id') id: number, @Body() updateDiaDto: UpdateDiaDto, @Headers('x-idempotency-key') idem?: string) {
    const jobId = "id";
    return this.tareas.enqueue(
      'dia',
      'update',
      { id, ...updateDiaDto },
      idem ?? jobId,
    );
  }

  @Delete(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false, // <--- importante
  })
  async remove(@Param('id') id: number, @Headers('x-idempotency-key') idem?: string) {
    const jobId = "id";
    return this.tareas.enqueue(
      'dia',
      'remove',
      { id },
      idem ?? jobId,
    );
  }

  // Endpoints síncronos
  @Post('sync')
  @ApiOperation({ summary: 'Crear dia (síncrono)' })
  async createSync(@Body() createDiaDto: CreateDiaDto) {
    return await this.diasService.create(createDiaDto);
  }

  @Get('sync')
  @ApiOperation({ summary: 'Obtener todas los dias (síncrono)' })
  async findAllSync() {
    return await this.diasService.findAll();
  }

  @Get('sync/:id')
  @ApiOperation({ summary: 'Obtener un dia por ID (síncrono)' })
  async findOneSync(@Param('id') id: number) {
    return await this.diasService.findOne(id);
  }

  @Patch('sync/:id')
  @ApiOperation({ summary: 'Actualizar dia (síncrono)' })
  async updateSync(@Param('id') id: number, @Body() updateDiaDto: UpdateDiaDto) {
    return await this.diasService.update(id, updateDiaDto);
  }

  @Delete('sync/:id')
  @ApiOperation({ summary: 'Eliminar dia (síncrono)' })
  async removeSync(@Param('id') id: number) {
    return await this.diasService.remove(id);
  }  
}
