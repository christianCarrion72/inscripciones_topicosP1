import { PartialType } from '@nestjs/mapped-types';
import { CreateGestionDto } from './create-gestion.dto';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class UpdateGestionDto {
    @IsInt()
    @IsPositive()
    @IsOptional()
    numero?: number;
}
