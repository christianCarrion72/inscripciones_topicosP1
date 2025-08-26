import { IsInt, IsOptional, IsPositive } from "class-validator";

export class CreatePrerequisitoDto {
    @IsInt()
    @IsPositive()
    @IsOptional()
    idMateria?: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    idPrerequisito?: number;
}
