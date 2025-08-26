import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { CarrerasService } from './carreras.service';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('carreras')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('carreras')
export class CarrerasController {
  constructor(private readonly carrerasService: CarrerasService) {}

  @Post()
  create(@Body() createCarreraDto: CreateCarreraDto) {
    return this.carrerasService.create(createCarreraDto);
  }

  @Get()
  findAll() {
    return this.carrerasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.carrerasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCarreraDto: UpdateCarreraDto) {
    return this.carrerasService.update(id, updateCarreraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.carrerasService.remove(id);
  }
}
