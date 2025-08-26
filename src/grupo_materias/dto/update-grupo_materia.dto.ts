import { PartialType } from '@nestjs/mapped-types';
import { CreateGrupoMateriaDto } from './create-grupo_materia.dto';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class UpdateGrupoMateriaDto {
    @IsInt()
    @IsPositive()
    @IsOptional()
    cupos?: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    idMateria?: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    idDocente?: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    idGrupo?: number;
}
