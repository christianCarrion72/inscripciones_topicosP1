import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class UpdateInscripcionDto {
    @IsInt()
    @IsPositive()
    @IsOptional()
    idEstudiante?: number;
}
