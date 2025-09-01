import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { DiasService } from './dias.service';
import { CreateDiaDto } from './dto/create-dia.dto';
import { UpdateDiaDto } from './dto/update-dia.dto';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { TareasProducer } from 'src/tareas/tareas.producer';

@ApiTags('dias')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('dias')
export class DiasController {
  constructor(private readonly diasService: DiasService, private readonly tareas: TareasProducer) {}

  @Post()
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false, // <--- importante
  })
  async create(@Body() createDiaDto: CreateDiaDto, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('dia.create', { body: createDiaDto, meta: { requestId: idem } }, idem ?? `dia:create:${createDiaDto.nombre}`);
  }

  @Get()
  async findAll() {
    const { result } = await this.tareas.requestAndWait('dias.getAll', { }, 10_000);
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const { result } = await this.tareas.requestAndWait('dia.get', { params: { id } }, 10_000);
    return result;
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false, // <--- importante
  })
  async update(@Param('id') id: number, @Body() updateDiaDto: UpdateDiaDto, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('dia.update', { params: { id }, body: updateDiaDto, meta: { requestId: idem } }, idem ?? `dia:update:${id}`);
  }

  @Delete(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false, // <--- importante
  })
  async remove(@Param('id') id: number, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('dia.delete', { params: { id }, meta: { requestId: idem } }, idem ?? `dia:delete:${id}`);
  }
}
