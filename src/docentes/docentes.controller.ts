import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { DocentesService } from './docentes.service';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('docentes')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('docentes')
export class DocentesController {
  constructor(private readonly docentesService: DocentesService) {}

  @Post()
  create(@Body() createDocenteDto: CreateDocenteDto) {
    return this.docentesService.create(createDocenteDto);
  }

  @Get()
  findAll() {
    return this.docentesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.docentesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDocenteDto: UpdateDocenteDto) {
    return this.docentesService.update(id, updateDocenteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.docentesService.remove(id);
  }
}
