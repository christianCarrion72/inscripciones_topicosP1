import { PartialType } from '@nestjs/mapped-types';
import { CreatePeriodoDto } from './create-periodo.dto';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class UpdatePeriodoDto {
    @IsInt()
    @IsPositive()
    @IsOptional()
    numero?: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    idGestion?: number;
}
