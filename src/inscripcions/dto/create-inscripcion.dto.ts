import { IsDate, IsInt, IsOptional, IsPositive } from "class-validator";

export class CreateInscripcionDto {
    @IsDate()
    fechaInscripcion: Date;

    @IsInt()
    @IsPositive()
    @IsOptional()
    idEstudiante?: number;
}
