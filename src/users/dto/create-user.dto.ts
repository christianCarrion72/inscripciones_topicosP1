import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    contraseña: string;

    @IsEnum(['admin', 'docente', 'estudiante'])
    @IsOptional()
    rol?: string;
}
