import { PartialType } from '@nestjs/mapped-types';
import { CreateHorarioDto } from './create-horario.dto';
import { IsInt, IsOptional, IsPositive, IsString, Matches } from 'class-validator';

export class UpdateHorarioDto {
    @IsString()
    @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, { 
        message: 'La hora de inicio debe estar en formato HH:MM (24 horas)' 
    })
    @IsOptional()
    horaInicio?: string;

    @IsString()
    @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, { 
        message: 'La hora de fin debe estar en formato HH:MM (24 horas)' 
    })
    @IsOptional()
    horaFin?: string;

    @IsInt()
    @IsPositive()
    @IsOptional()
    idAula?: number;
}
