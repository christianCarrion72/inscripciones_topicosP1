import { PartialType } from '@nestjs/mapped-types';
import { CreateModuloDto } from './create-modulo.dto';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class UpdateModuloDto {

    @IsInt()
    @Min(0)
    @Max(999)
    @IsOptional()
    codigo?: number;
}
