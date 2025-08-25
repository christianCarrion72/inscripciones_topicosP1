import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanEstudioDto } from './create-plan_estudio.dto';
import { IsInt, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';

export class UpdatePlanEstudioDto {
    @IsString()
    @MinLength(3)
    @IsOptional()
    nombre?: string;
    
    @IsInt()
    @IsPositive()
    @IsOptional()
    idCarrera?: number;
}
