import { IsInt, IsOptional, IsPositive } from "class-validator";

export class CreateDiaHorarioDto {

    @IsInt()
    @IsPositive()
    @IsOptional()
    idDia?: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    idHorario?: number;

}
