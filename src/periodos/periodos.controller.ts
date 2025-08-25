import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PeriodosService } from './periodos.service';
import { CreatePeriodoDto } from './dto/create-periodo.dto';
import { UpdatePeriodoDto } from './dto/update-periodo.dto';

@Controller('periodos')
export class PeriodosController {
  constructor(private readonly periodosService: PeriodosService) {}

  @Post()
  create(@Body() createPeriodoDto: CreatePeriodoDto) {
    return this.periodosService.create(createPeriodoDto);
  }

  @Get()
  findAll() {
    return this.periodosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.periodosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePeriodoDto: UpdatePeriodoDto) {
    return this.periodosService.update(id, updatePeriodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.periodosService.remove(id);
  }
}
