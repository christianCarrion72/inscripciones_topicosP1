import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ){}
    async register({email, contraseña}: RegisterDto){
        const user = await this.usersService.findOneByEmail(email);
        if (user) {
            throw new BadRequestException('Usuario ya existe');
        }
        return await this.usersService.create({
            email, 
            contraseña: await bcryptjs.hash(contraseña, 10),
        });
    }
    
    async login({ email, contraseña }: LoginDto ){
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Credenciales incorrectas');
        }

        const isPasswordValid = await bcryptjs.compare(contraseña, user.contraseña);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciales incorrectas');
        }

        const payload = { email: user.email };
        const token = await this.jwtService.signAsync(payload);
        
        return {
            token,
            email,
        };
    }
}
