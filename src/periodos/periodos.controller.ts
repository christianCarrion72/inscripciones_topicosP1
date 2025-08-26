import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PeriodosService } from './periodos.service';
import { CreatePeriodoDto } from './dto/create-periodo.dto';
import { UpdatePeriodoDto } from './dto/update-periodo.dto';

@ApiTags('periodos')
@ApiBearerAuth()
@UseGuards(AuthGuard)
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
