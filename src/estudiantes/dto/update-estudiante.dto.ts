import { PartialType } from '@nestjs/mapped-types';
import { CreateEstudianteDto } from './create-estudiante.dto';
import { IsInt, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';

export class UpdateEstudianteDto {
    @IsString()
    @MinLength(3)
    @IsOptional()
    nombre?: string;

    @IsInt()
    @IsPositive()
    @IsOptional()
    ci?: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    registro?: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    telefono?: number;

    @IsString()
    @MinLength(3)
    @IsOptional()
    direccion?: string;

    @IsInt()
    @IsPositive()
    @IsOptional()
    tituloBachiller?: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    idPlan?: number;
}
