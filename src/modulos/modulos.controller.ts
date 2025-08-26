import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ModulosService } from './modulos.service';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';

@ApiTags('modulos')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('modulos')
export class ModulosController {
  constructor(private readonly modulosService: ModulosService) {}

  @Post()
  create(@Body() createModuloDto: CreateModuloDto) {
    return this.modulosService.create(createModuloDto);
  }

  @Get()
  findAll() {
    return this.modulosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.modulosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateModuloDto: UpdateModuloDto) {
    return this.modulosService.update(id, updateModuloDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.modulosService.remove(id);
  }
}
