import { IsString, MinLength, MaxLength } from "class-validator";

export class CreateDiaDto {

    @IsString()
    @MinLength(1)
    @MaxLength(10)
    nombre: string;

}
