import { PartialType } from '@nestjs/mapped-types';
import { CreateDetalleDto } from './create-detalle.dto';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class UpdateDetalleDto {
    @IsInt()
    @IsPositive()
    @IsOptional()
    idInscripcion?: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    idGrupoMat?: number;
}
