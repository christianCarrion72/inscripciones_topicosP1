import { IsInt, IsOptional, IsPositive, IsString, MinLength } from "class-validator";
import { Carrera } from "src/carreras/entities/carrera.entity";

export class CreatePlanEstudioDto {

    @IsString()
    @MinLength(3)
    nombre: string;

    @IsInt()
    @IsPositive()
    @IsOptional()
    idCarrera?: number;

}
