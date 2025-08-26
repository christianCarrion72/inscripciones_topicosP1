import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
//import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GestionsService } from './gestions.service';
import { CreateGestionDto } from './dto/create-gestion.dto';
import { UpdateGestionDto } from './dto/update-gestion.dto';

//@ApiTags('gestions')
//@ApiBearerAuth()
@UseGuards(AuthGuard)
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
