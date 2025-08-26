import { PartialType } from '@nestjs/mapped-types';
import { CreateGrupoDto } from './create-grupo.dto';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateGrupoDto {
    @IsString()
    @MinLength(3)
    @IsOptional()
    sigla?: string;
}
