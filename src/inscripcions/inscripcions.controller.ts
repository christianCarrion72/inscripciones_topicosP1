import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Logger, Headers } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InscripcionsService } from './inscripcions.service';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from './dto/update-inscripcion.dto';
import { TareasProducer } from '../tareas/tareas.producer';
import { generateJobId } from 'src/common/utils/idempotency.util';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';

@ApiTags('inscripcions')
// @ApiBearerAuth()
// @UseGuards(AuthGuard)
@Controller('inscripcions')
export class InscripcionsController {
  private readonly logger = new Logger(InscripcionsController.name);
  constructor(
    private readonly inscripcionsService: InscripcionsService,
    private readonly tareas: TareasProducer
  ) {}

  @Post()
  async create(@Body() createInscripcionDto: CreateInscripcionDto) {
    const jobId = generateJobId('inscripcion', 'create', createInscripcionDto);
    return await this.tareas.enqueue(
      'inscripcion',
      'create',
      createInscripcionDto,
      jobId,
    );
  }

  @Get()
  async findAll() {
    return await this.tareas.enqueue('inscripcion', 'findAll');
  }

  @Get('historial')
  @ApiOperation({ summary: 'Obtener historial de inscripciones del estudiante autenticado' })
  async getHistorial(@ActiveUser() user: ActiveUserInterface) {
    return await this.tareas.enqueue('inscripcion', 'getHistorial', { userId: user.id });
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.tareas.enqueue('inscripcion', 'findOne', { id });
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateInscripcionDto: UpdateInscripcionDto) {
    const jobId = generateJobId('inscripcion', 'update', { id, ...updateInscripcionDto });
    return await this.tareas.enqueue(
      'inscripcion',
      'update',
      { id, ...updateInscripcionDto },
      jobId,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const jobId = generateJobId('inscripcion', 'remove', { id });
    return await this.tareas.enqueue(
      'inscripcion',
      'remove',
      { id },
      jobId,
    );
  }

  @Post('request-seat')
  @ApiHeader({
    name: 'x-callback-url',
    description: 'CallBack-URL opcional para recibir respuestas',
    required: false,
  })
  async requestSeat(@Body() createInscripcionDto: CreateInscripcionDto, @Headers('x-callback-url') callbackUrl?: string) {
    const jobId = generateJobId('inscripcion', 'requestSeat', createInscripcionDto);
    return await this.tareas.enqueue(
      'inscripcion',
      'requestSeat',
      createInscripcionDto,
      callbackUrl,
      jobId,
    );
  }
 
  // @Post('request-seat')
  // @ApiHeader({
  //   name: 'x-callback-url',
  //   description: 'CallBack-URL opcional para recibir respuestas',
  //   required: false,
  // })
  // async requestSeat(@Body() createInscripcionDto: CreateInscripcionDto,@ActiveUser() user: ActiveUserInterface, @Headers('x-callback-url') callbackUrl?: string) {
  //   createInscripcionDto.idEstudiante = user.id;
  //   const jobId = generateJobId('inscripcion', 'requestSeat', createInscripcionDto);
  //   return await this.tareas.enqueue(
  //     'inscripcion',
  //     'requestSeat',
  //     createInscripcionDto,
  //     callbackUrl,
  //     jobId,
  //   );
  // }
}
