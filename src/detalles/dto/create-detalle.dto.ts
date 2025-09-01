import { IsInt, IsOptional, IsPositive } from "class-validator";

export class CreateDetalleDto {

    @IsInt()
    @IsPositive()
    @IsOptional()
    idInscripcion?: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    idGrupoMat?: number;
}
