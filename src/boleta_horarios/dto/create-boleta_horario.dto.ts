import { IsInt, IsOptional, IsPositive } from "class-validator";

export class CreateBoletaHorarioDto {
    @IsInt()
    @IsPositive()
    @IsOptional()
    idHorario?: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    idGrupoMateria?: number;
}
