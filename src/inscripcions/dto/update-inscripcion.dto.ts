import { PartialType } from '@nestjs/mapped-types';
import { CreateInscripcionDto } from './create-inscripcion.dto';
import { IsDate, IsInt, IsOptional, IsPositive } from 'class-validator';

export class UpdateInscripcionDto {
    @IsDate()
    @IsOptional()
    fechaInscripcion?: Date;

    @IsInt()
    @IsPositive()
    @IsOptional()
    idEstudiante?: number;
}
