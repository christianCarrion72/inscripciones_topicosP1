import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { BoletaHorariosService } from './boleta_horarios.service';
import { CreateBoletaHorarioDto } from './dto/create-boleta_horario.dto';
import { UpdateBoletaHorarioDto } from './dto/update-boleta_horario.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('boleta-horarios')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('boleta-horarios')
export class BoletaHorariosController {
  constructor(private readonly boletaHorariosService: BoletaHorariosService) {}

  @Post()
  create(@Body() createBoletaHorarioDto: CreateBoletaHorarioDto) {
    return this.boletaHorariosService.create(createBoletaHorarioDto);
  }

  @Get()
  findAll() {
    return this.boletaHorariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.boletaHorariosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateBoletaHorarioDto: UpdateBoletaHorarioDto) {
    return this.boletaHorariosService.update(id, updateBoletaHorarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.boletaHorariosService.remove(id);
  }
}
