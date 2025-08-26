import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NotasService } from './notas.service';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';

@ApiTags('notas')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('notas')
export class NotasController {
  constructor(private readonly notasService: NotasService) {}

  @Post()
  create(@Body() createNotaDto: CreateNotaDto) {
    return this.notasService.create(createNotaDto);
  }

  @Get()
  findAll() {
    return this.notasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.notasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateNotaDto: UpdateNotaDto) {
    return this.notasService.update(id, updateNotaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.notasService.remove(id);
  }
}
