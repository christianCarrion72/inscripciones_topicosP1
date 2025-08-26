import { Min, Max, IsInt } from "class-validator";

export class CreateModuloDto {

    @IsInt()
    @Min(0)
    @Max(999)
    codigo: number;

}
