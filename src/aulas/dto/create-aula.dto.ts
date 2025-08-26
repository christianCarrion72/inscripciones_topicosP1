import { IsNumber, IsOptional, Min, Max, IsPositive, IsInt } from "class-validator";

export class CreateAulaDto {

    @IsInt()
    @IsPositive()
    numero: number;

    @IsOptional()
    @IsInt()
    @IsPositive()
    idModulo?: number;

}
