import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SyncDiasService } from './sync-dias.service';
import { CreateDiaDto } from './dto/create-dia.dto';
import { UpdateDiaDto } from './dto/update-dia.dto';

@ApiTags('dias-sync')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('dias-sync')
export class SyncDiasController {
  constructor(
    private readonly syncDiasService: SyncDiasService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear dia (síncrono)' })
  async create(@Body() createDiaDto: CreateDiaDto) {
    return await this.syncDiasService.create(createDiaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los dias (síncrono)' })
  async findAll() {
    const dias = await this.syncDiasService.find();
    return dias;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un dia por ID (síncrono)' })
  async findOne(@Param('id') id: number) {
    return await this.syncDiasService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar dia (síncrono)' })
  async update(@Param('id') id: number, @Body() updateDiaDto: UpdateDiaDto) {
    return await this.syncDiasService.update(id, updateDiaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar dia (síncrono)' })
  async remove(@Param('id') id: number) {
    return await this.syncDiasService.remove(id);
  }
}