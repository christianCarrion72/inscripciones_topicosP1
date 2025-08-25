import { PartialType } from '@nestjs/mapped-types';
import { CreateDiaHorarioDto } from './create-dia_horario.dto';

export class UpdateDiaHorarioDto extends PartialType(CreateDiaHorarioDto) {}
