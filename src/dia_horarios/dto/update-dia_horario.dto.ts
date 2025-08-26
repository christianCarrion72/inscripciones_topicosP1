import { PartialType } from '@nestjs/mapped-types';
import { CreateDiaHorarioDto } from './create-dia_horario.dto';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class UpdateDiaHorarioDto {
    @IsInt()
    @IsPositive()
    @IsOptional()
    idDia?: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    idHorario?: number;
}
