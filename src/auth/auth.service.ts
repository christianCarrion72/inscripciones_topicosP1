import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { EstudiantesService } from 'src/estudiantes/estudiantes.service';
import { DocentesService } from 'src/docentes/docentes.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly estudiantesService: EstudiantesService,
        private readonly docentesService: DocentesService,
    ){}
    async register({email, contraseña, rol = 'estudiante'}: RegisterDto){
        const user = await this.usersService.findOneByEmail(email);
        if (user) {
            throw new BadRequestException('Usuario ya existe');
        }
        return await this.usersService.create({
            email, 
            contraseña: await bcryptjs.hash(contraseña, 10),
            rol,
        });
    }
    
    async loginAdmin({ email, contraseña }: LoginDto ){
        const user = await this.usersService.findOneByEmail(email);
        if (!user || user.rol !== 'admin') {
            throw new UnauthorizedException('Credenciales incorrectas');
        }

        const isPasswordValid = await bcryptjs.compare(contraseña, user.contraseña);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciales incorrectas');
        }

        const payload = { 
            email: user.email,
            rol: user.rol
        };
        const token = await this.jwtService.signAsync(payload);
        
        return {
            token,
            email,
            rol: user.rol
        };
    }

    async loginEstudianteDocente({ registro, contraseña }: { registro: number; contraseña: string }) {
        // Primero buscar en estudiantes
        const estudiante = await this.estudiantesService.findOneByRegistro(registro);
        if (estudiante?.user) {
            const isPasswordValid = await bcryptjs.compare(contraseña, estudiante.user.contraseña);
            if (!isPasswordValid) {
                throw new UnauthorizedException('Credenciales incorrectas');
            }

            const payload = {
                email: estudiante.user.email,
                id: estudiante.id,
                rol: estudiante.user.rol
            };
            const token = await this.jwtService.signAsync(payload);

            return {
                token,
                email: estudiante.user.email,
                rol: estudiante.user.rol
            };
        }

        // Si no es estudiante, buscar en docentes
        const docente = await this.docentesService.findOneByRegistro(registro);
        if (docente?.user) {
            const isPasswordValid = await bcryptjs.compare(contraseña, docente.user.contraseña);
            if (!isPasswordValid) {
                throw new UnauthorizedException('Credenciales incorrectas');
            }

            const payload = {
                email: docente.user.email,
                rol: docente.user.rol
            };
            const token = await this.jwtService.signAsync(payload);

            return {
                token,
                email: docente.user.email,
                rol: docente.user.rol
            };
        }

        throw new UnauthorizedException('Credenciales incorrectas');
    }
}
