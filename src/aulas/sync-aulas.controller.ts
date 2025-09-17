import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SyncAulasService } from './sync-aulas.service';
import { UpdateAulaDto } from './dto/update-aula.dto';
import { CreateAulaDto } from './dto/create-aula.dto';

@ApiTags('aulas-sync')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('aulas-sync')
export class SyncAulasController {
  constructor(
    private readonly syncAulasService: SyncAulasService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear aula (síncrono)' })
  async create(@Body() createAulaDto: CreateAulaDto) {
    return await this.syncAulasService.create(createAulaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las aulas (síncrono)' })
  async findAll() {
    const aulas = await this.syncAulasService.find();
    return aulas;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una aula por ID (síncrono)' })
  async findOne(@Param('id') id: number) {
    return await this.syncAulasService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar aula (síncrono)' })
  async update(@Param('id') id: number, @Body() updateAulaDto: UpdateAulaDto) {
    return await this.syncAulasService.update(id, updateAulaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar aula (síncrono)' })
  async remove(@Param('id') id: number) {
    return await this.syncAulasService.remove(id);
  }
}