import { IsString, MinLength } from "class-validator";

export class CreateCarreraDto {

    @IsString()
    @MinLength(1)
    nombre: string;

    @IsString()
    @MinLength(1)
    codigo: string;

}
