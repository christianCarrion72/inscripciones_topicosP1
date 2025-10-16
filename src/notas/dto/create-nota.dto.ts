import { IsInt, IsNumber, IsOptional, IsPositive, Max, Min } from "class-validator";

export class CreateNotaDto {

    @IsNumber()
    @Min(0)
    @Max(100)
    nota: number;

    @IsOptional()
    @IsInt()
    @IsPositive()
    idEstudiante?: number;

}
