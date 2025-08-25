import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrerequisitosService } from './prerequisitos.service';
import { CreatePrerequisitoDto } from './dto/create-prerequisito.dto';
import { UpdatePrerequisitoDto } from './dto/update-prerequisito.dto';

@Controller('prerequisitos')
export class PrerequisitosController {
  constructor(private readonly prerequisitosService: PrerequisitosService) {}

  @Post()
  create(@Body() createPrerequisitoDto: CreatePrerequisitoDto) {
    return this.prerequisitosService.create(createPrerequisitoDto);
  }

  @Get()
  findAll() {
    return this.prerequisitosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.prerequisitosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePrerequisitoDto: UpdatePrerequisitoDto) {
    return this.prerequisitosService.update(id, updatePrerequisitoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.prerequisitosService.remove(id);
  }
}
