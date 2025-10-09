import { IsEmail, IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreateDocenteDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    contraseña: string;
    
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
