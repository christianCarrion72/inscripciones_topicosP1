import { IsInt, IsOptional, IsPositive } from "class-validator";

export class CreateGrupoMateriaDto {
    @IsInt()
    @IsPositive()
    cupos: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    idMateria?: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    idDocente?: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    idGrupo?: number;
}
