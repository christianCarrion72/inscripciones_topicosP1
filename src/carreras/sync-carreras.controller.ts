import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { SyncCarrerasService } from './sync-carreras.service';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('carreras-sync')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('carreras-sync')
export class SyncCarrerasController {
  constructor(
    private readonly syncCarrerasService: SyncCarrerasService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear carrera (síncrono)' })
  async create(@Body() createCarreraDto: CreateCarreraDto) {
    return await this.syncCarrerasService.create(createCarreraDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las carreras (síncrono)' })
  async findAll() {
    const carreras = await this.syncCarrerasService.find();
    return carreras;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una carrera por ID (síncrono)' })
  async findOne(@Param('id') id: number) {
    return await this.syncCarrerasService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar carrera (síncrono)' })
  async update(@Param('id') id: number, @Body() updateCarreraDto: UpdateCarreraDto) {
    return await this.syncCarrerasService.update(id, updateCarreraDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar carrera (síncrono)' })
  async remove(@Param('id') id: number) {
    return await this.syncCarrerasService.remove(id);
  }
}