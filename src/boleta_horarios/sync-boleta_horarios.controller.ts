import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateBoletaHorarioDto } from './dto/create-boleta_horario.dto';
import { UpdateBoletaHorarioDto } from './dto/update-boleta_horario.dto';
import { SyncBoletaHorariosService } from './sync-boleta_horarios.service';

@ApiTags('boleta-horarios-sync')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('boleta-horarios-sync')
export class SyncBoletaHorariosController {
  constructor(
    private readonly syncBoletaHorarioService: SyncBoletaHorariosService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear boleta horario (síncrono)' })
  async create(@Body() createBoletaHorarioDto: CreateBoletaHorarioDto) {
    return await this.syncBoletaHorarioService.create(createBoletaHorarioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las boleta horarios (síncrono)' })
  async findAll() {
    const boleta_horarios = await this.syncBoletaHorarioService.find();
    return boleta_horarios;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una boleta horario por ID (síncrono)' })
  async findOne(@Param('id') id: number) {
    return await this.syncBoletaHorarioService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar boleta horario (síncrono)' })
  async update(@Param('id') id: number, @Body() updateBoletaHorarioDto: UpdateBoletaHorarioDto) {
    return await this.syncBoletaHorarioService.update(id, updateBoletaHorarioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar boleta horario (síncrono)' })
  async remove(@Param('id') id: number) {
    return await this.syncBoletaHorarioService.remove(id);
  }
}