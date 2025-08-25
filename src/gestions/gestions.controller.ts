import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GestionsService } from './gestions.service';
import { CreateGestionDto } from './dto/create-gestion.dto';
import { UpdateGestionDto } from './dto/update-gestion.dto';

@Controller('gestions')
export class GestionsController {
  constructor(private readonly gestionsService: GestionsService) {}

  @Post()
  create(@Body() createGestionDto: CreateGestionDto) {
    return this.gestionsService.create(createGestionDto);
  }

  @Get()
  findAll() {
    return this.gestionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.gestionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateGestionDto: UpdateGestionDto) {
    return this.gestionsService.update(id, updateGestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.gestionsService.remove(id);
  }
}
