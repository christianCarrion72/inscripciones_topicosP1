import { PartialType } from '@nestjs/mapped-types';
import { CreateDiaDto } from './create-dia.dto';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateDiaDto {
    
    @IsString()
    @MinLength(1)
    @MaxLength(10)
    nombre: string;
    
}
