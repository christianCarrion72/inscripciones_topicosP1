import { PartialType } from '@nestjs/mapped-types';
import { CreateBoletaHorarioDto } from './create-boleta_horario.dto';

export class UpdateBoletaHorarioDto extends PartialType(CreateBoletaHorarioDto) {}
