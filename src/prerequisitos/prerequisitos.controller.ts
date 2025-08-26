import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
//import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PrerequisitosService } from './prerequisitos.service';
import { CreatePrerequisitoDto } from './dto/create-prerequisito.dto';
import { UpdatePrerequisitoDto } from './dto/update-prerequisito.dto';

//@ApiTags('prerequisitos')
//@ApiBearerAuth()
@UseGuards(AuthGuard)
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

  @Get('materia/:id')
  findPrerequisitosMateria(@Param('id') id: number) {
    return this.prerequisitosService.findPrerequisitosMateria(id);
  }
}
