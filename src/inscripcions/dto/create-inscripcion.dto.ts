import { IsArray, IsInt, IsOptional, IsPositive } from "class-validator";

export class CreateInscripcionDto {

    @IsInt()
    @IsPositive()
    @IsOptional()
    idEstudiante?: number;

    @IsArray()
    @IsInt({each: true})
    @IsPositive({each: true})
    @IsOptional()
    idsGrupoMateria?: number[];
}
