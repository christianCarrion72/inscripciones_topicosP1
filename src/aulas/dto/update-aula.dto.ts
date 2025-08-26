import { PartialType } from '@nestjs/mapped-types';
import { CreateAulaDto } from './create-aula.dto';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class UpdateAulaDto {
    @IsInt()
    @IsPositive()
    @IsOptional()
    numero?: number;

    @IsOptional()
    @IsInt()
    @IsPositive()
    idModulo?: number;
}
