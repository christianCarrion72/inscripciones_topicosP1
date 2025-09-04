import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { PrerequisitosService } from './prerequisitos.service';
import { CreatePrerequisitoDto } from './dto/create-prerequisito.dto';
import { UpdatePrerequisitoDto } from './dto/update-prerequisito.dto';
import { TareasProducer } from '../tareas/tareas.producer';

@ApiTags('prerequisitos')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('prerequisitos')
export class PrerequisitosController {
  constructor(
    private readonly prerequisitosService: PrerequisitosService,
    private readonly tareas: TareasProducer
  ) {}
/*
  @Post()
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  async create(@Body() createPrerequisitoDto: CreatePrerequisitoDto, @Headers('x-idempotency-key') idem?: string) {
    const idempotencyKey = idem ?? `prerequisito:create:${createPrerequisitoDto.idMateria}:${createPrerequisitoDto.idPrerequisito}`;
    return this.tareas.fireAndForget('prerequisito.create', { body: createPrerequisitoDto, meta: { requestId: idem } }, idempotencyKey);
  }

  @Get()
  async findAll() {
    const { result } = await this.tareas.requestAndWait('prerequisitos.getAll', { }, 10_000);
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const { result } = await this.tareas.requestAndWait('prerequisito.get', { params: { id } }, 10_000);
    return result;
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  update(@Param('id') id: number, @Body() updatePrerequisitoDto: UpdatePrerequisitoDto, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('prerequisito.update', { params: { id }, body: updatePrerequisitoDto, meta: { requestId: idem } }, idem ?? `prerequisito:update:${id}`);
  }

  @Delete(':id')
  @ApiHeader({
    name: 'x-idempotency-key',
    description: 'Idempotency key opcional para evitar duplicados',
    required: false,
  })
  remove(@Param('id') id: number, @Headers('x-idempotency-key') idem?: string) {
    return this.tareas.fireAndForget('prerequisito.delete', { params: { id }, meta: { requestId: idem } }, idem ?? `prerequisito:delete:${id}`);
  }

  @Get('materia/:id')
  async findPrerequisitosMateria(@Param('id') id: number) {
    return this.prerequisitosService.findPrerequisitosMateria(id);
  }*/
}
