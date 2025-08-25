import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InscripcionsService } from './inscripcions.service';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from './dto/update-inscripcion.dto';

@Controller('inscripcions')
export class InscripcionsController {
  constructor(private readonly inscripcionsService: InscripcionsService) {}

  @Post()
  create(@Body() createInscripcionDto: CreateInscripcionDto) {
    return this.inscripcionsService.create(createInscripcionDto);
  }

  @Get()
  findAll() {
    return this.inscripcionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.inscripcionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateInscripcionDto: UpdateInscripcionDto) {
    return this.inscripcionsService.update(id, updateInscripcionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.inscripcionsService.remove(id);
  }
}
