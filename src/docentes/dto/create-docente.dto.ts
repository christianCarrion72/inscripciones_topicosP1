import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreateDocenteDto {
    @IsInt()
    @IsPositive()
    ci: number;

    @IsString()
    @MinLength(3)
    nombre: string;

    @IsString()
    @MinLength(3)
    direccion: string;

    @IsInt()
    @IsPositive()
    registro: number;

    @IsString()
    @MinLength(3)
    especialidad: string;

    @IsInt()
    @IsPositive()
    telefono: number;    
}
