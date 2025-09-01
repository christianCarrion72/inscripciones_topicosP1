import { PartialType } from '@nestjs/mapped-types';
import { CreateMateriaDto } from './create-materia.dto';
import { IsInt, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';

export class UpdateMateriaDto {
    @IsString()
    @MinLength(3)
    @IsOptional()
    nombre?: string;
    
    @IsString()
    @MinLength(3)
    @IsOptional()
    codigo?: string;
    
    @IsInt()
    @IsPositive()
    @IsOptional()
    idNivel?: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    idPlan?: number;
}
