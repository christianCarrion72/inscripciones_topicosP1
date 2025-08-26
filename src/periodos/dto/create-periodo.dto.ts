import { IsInt, IsOptional, IsPositive } from "class-validator";

export class CreatePeriodoDto {
    @IsInt()
    @IsPositive()
    numero: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    idGrupoMateria?: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    idGestion?: number;
}
