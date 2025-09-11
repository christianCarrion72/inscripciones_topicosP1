import { IsInt, IsOptional, IsPositive } from "class-validator";

export class CreateInscripcionDto {

    @IsInt()
    @IsPositive()
    @IsOptional()
    idEstudiante?: number;
}
