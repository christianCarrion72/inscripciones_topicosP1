import { IsInt, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateNivelDto {

    @IsString()
    @MinLength(3)
    nombre: string;
    
    @IsInt()
    @IsPositive()
    @IsOptional()
    idPlan?: number;

}
