import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NivelsService } from './nivels.service';
import { CreateNivelDto } from './dto/create-nivel.dto';
import { UpdateNivelDto } from './dto/update-nivel.dto';

@ApiTags('nivels')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('nivels')
export class NivelsController {
  constructor(private readonly nivelsService: NivelsService) {}

  @Post()
  create(@Body() createNivelDto: CreateNivelDto) {
    return this.nivelsService.create(createNivelDto);
  }

  @Get()
  findAll() {
    return this.nivelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.nivelsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateNivelDto: UpdateNivelDto) {
    return this.nivelsService.update(id, updateNivelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.nivelsService.remove(id);
  }
}
