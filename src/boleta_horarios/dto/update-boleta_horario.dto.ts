import { PartialType } from '@nestjs/mapped-types';
import { CreateBoletaHorarioDto } from './create-boleta_horario.dto';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class UpdateBoletaHorarioDto {
    @IsInt()
    @IsPositive()
    @IsOptional()
    idHorario?: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    idGrupoMateria?: number;
}
