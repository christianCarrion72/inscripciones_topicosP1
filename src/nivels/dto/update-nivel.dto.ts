import { PartialType } from '@nestjs/mapped-types';
import { CreateNivelDto } from './create-nivel.dto';
import { IsInt, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';

export class UpdateNivelDto {
    @IsString()
    @MinLength(3)
    @IsOptional()
    nombre?: string;
    
    @IsInt()
    @IsPositive()
    @IsOptional()
    idPlan?: number;
}
