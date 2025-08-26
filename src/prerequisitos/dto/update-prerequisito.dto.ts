import { PartialType } from '@nestjs/mapped-types';
import { CreatePrerequisitoDto } from './create-prerequisito.dto';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class UpdatePrerequisitoDto {
    @IsInt()
    @IsPositive()
    @IsOptional()
    idMateria?: number;
    
    @IsInt()
    @IsPositive()
    @IsOptional()
    idPrerequisito?: number;
}
