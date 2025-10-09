import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginEstudianteDocenteDto {
    @ApiProperty({
        description: 'Número de registro para estudiantes o CI para docentes',
        example: 219062851
    })
    @IsNotEmpty()
    @IsNumber()
    registro: number;

    @ApiProperty({
        description: 'Contraseña del usuario',
        example: '123456'
    })
    @IsNotEmpty()
    contraseña: string;
}