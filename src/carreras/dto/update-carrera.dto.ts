import { PartialType } from '@nestjs/mapped-types';
import { CreateCarreraDto } from './create-carrera.dto';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateCarreraDto {
    @IsString()
    @MinLength(1)
    @IsOptional()
    nombre?: string;
    
    @IsString()
    @MinLength(1)
    @IsOptional()
    codigo?: string;
}
