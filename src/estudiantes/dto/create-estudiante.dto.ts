import { IsInt, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateEstudianteDto {
    @IsString()
    @MinLength(3)
    nombre: string;

    @IsInt()
    @IsPositive()
    ci: number;

    @IsInt()
    @IsPositive()
    registro: number;

    @IsInt()
    @IsPositive()
    telefono: number;

    @IsString()
    @MinLength(3)
    direccion: string;

    @IsInt()
    @IsPositive()
    tituloBachiller: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    idPlan?: number;
    
}
