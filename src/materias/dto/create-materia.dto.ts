import { IsInt, IsOptional, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreateMateriaDto {
    @IsString()
    @MinLength(3)
    nombre: string;
    
    @IsString()
    @MinLength(3)
    codigo: string;
    
    @IsInt()
    @IsPositive()
    @IsOptional()
    idNivel?: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    idPlan?: number;
}
