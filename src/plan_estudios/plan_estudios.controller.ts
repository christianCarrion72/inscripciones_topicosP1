import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlanEstudiosService } from './plan_estudios.service';
import { CreatePlanEstudioDto } from './dto/create-plan_estudio.dto';
import { UpdatePlanEstudioDto } from './dto/update-plan_estudio.dto';

@Controller('plan-estudios')
export class PlanEstudiosController {
  constructor(private readonly planEstudiosService: PlanEstudiosService) {}

  @Post()
  create(@Body() createPlanEstudioDto: CreatePlanEstudioDto) {
    return this.planEstudiosService.create(createPlanEstudioDto);
  }

  @Get()
  findAll() {
    return this.planEstudiosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.planEstudiosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePlanEstudioDto: UpdatePlanEstudioDto) {
    return this.planEstudiosService.update(id, updatePlanEstudioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.planEstudiosService.remove(id);
  }
}
