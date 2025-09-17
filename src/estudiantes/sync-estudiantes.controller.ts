import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SyncEstudiantesService } from './sync-estudiantes.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';

@ApiTags('estudiantes-sync')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('estudiantes-sync')
export class SyncEstudiantesController {
  constructor(
    private readonly syncEstudiantesService: SyncEstudiantesService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear estudiante (síncrono)' })
  async create(@Body() createEstudianteDto: CreateEstudianteDto) {
    return await this.syncEstudiantesService.create(createEstudianteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los estudiantes (síncrono)' })
  async findAll() {
    const estudiantes = await this.syncEstudiantesService.find();
    return estudiantes;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un estudiante por ID (síncrono)' })
  async findOne(@Param('id') id: number) {
    return await this.syncEstudiantesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar estudiante (síncrono)' })
  async update(@Param('id') id: number, @Body() updateEstudianteDto: UpdateEstudianteDto) {
    return await this.syncEstudiantesService.update(id, updateEstudianteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar estudiante (síncrono)' })
  async remove(@Param('id') id: number) {
    return await this.syncEstudiantesService.remove(id);
  }
}