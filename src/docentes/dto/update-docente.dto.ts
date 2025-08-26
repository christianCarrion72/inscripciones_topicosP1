import { PartialType } from '@nestjs/mapped-types';
import { CreateDocenteDto } from './create-docente.dto';
import { IsInt, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';

export class UpdateDocenteDto {
    @IsInt()
    @IsPositive()
    @IsOptional()
    ci?: number;

    @IsString()
    @MinLength(3)
    @IsOptional()
    nombre?: string;

    @IsString()
    @MinLength(3)
    @IsOptional()
    direccion?: string;

    @IsInt()
    @IsPositive()
    @IsOptional()
    registro?: number;

    @IsString()
    @MinLength(3)
    @IsOptional()
    especialidad?: string;

    @IsInt()
    @IsPositive()
    @IsOptional()
    telefono?: number; 
}
