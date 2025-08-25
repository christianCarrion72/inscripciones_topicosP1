import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiasService } from './dias.service';
import { CreateDiaDto } from './dto/create-dia.dto';
import { UpdateDiaDto } from './dto/update-dia.dto';

@Controller('dias')
export class DiasController {
  constructor(private readonly diasService: DiasService) {}

  @Post()
  create(@Body() createDiaDto: CreateDiaDto) {
    return this.diasService.create(createDiaDto);
  }

  @Get()
  findAll() {
    return this.diasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.diasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDiaDto: UpdateDiaDto) {
    return this.diasService.update(id, updateDiaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.diasService.remove(id);
  }
}
