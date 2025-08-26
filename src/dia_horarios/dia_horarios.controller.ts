import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { DiaHorariosService } from './dia_horarios.service';
import { CreateDiaHorarioDto } from './dto/create-dia_horario.dto';
import { UpdateDiaHorarioDto } from './dto/update-dia_horario.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('dia-horarios')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('dia-horarios')
export class DiaHorariosController {
  constructor(private readonly diaHorariosService: DiaHorariosService) {}

  @Post()
  create(@Body() createDiaHorarioDto: CreateDiaHorarioDto) {
    return this.diaHorariosService.create(createDiaHorarioDto);
  }

  @Get()
  findAll() {
    return this.diaHorariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.diaHorariosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDiaHorarioDto: UpdateDiaHorarioDto) {
    return this.diaHorariosService.update(id, updateDiaHorarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.diaHorariosService.remove(id);
  }
}
