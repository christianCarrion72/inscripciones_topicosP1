import { IsString, MinLength } from "class-validator";

export class CreateGrupoDto {
    @IsString()
    @MinLength(3)
    sigla: string;
}
