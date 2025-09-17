import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SyncDocentesService } from './sync-docentes.service';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';

@ApiTags('docentes-sync')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('docentes-sync')
export class SyncDocentesController {
  constructor(
    private readonly syncDocentesService: SyncDocentesService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear docente (síncrono)' })
  async create(@Body() createDocenteDto: CreateDocenteDto) {
    return await this.syncDocentesService.create(createDocenteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los docentes (síncrono)' })
  async findAll() {
    const docentes = await this.syncDocentesService.find();
    return docentes;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un docente por ID (síncrono)' })
  async findOne(@Param('id') id: number) {
    return await this.syncDocentesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar docente (síncrono)' })
  async update(@Param('id') id: number, @Body() updateDocenteDto: UpdateDocenteDto) {
    return await this.syncDocentesService.update(id, updateDocenteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar docente (síncrono)' })
  async remove(@Param('id') id: number) {
    return await this.syncDocentesService.remove(id);
  }
}