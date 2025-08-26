import { IsString, IsInt, IsPositive, Matches, IsOptional } from "class-validator";

export class CreateHorarioDto {

    @IsString()
    @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, { 
        message: 'La hora de inicio debe estar en formato HH:MM (24 horas)' 
    })
    horaInicio: string;

    @IsString()
    @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, { 
        message: 'La hora de fin debe estar en formato HH:MM (24 horas)' 
    })
    horaFin: string;

    @IsInt()
    @IsPositive()
    @IsOptional()
    idAula?: number;

}
