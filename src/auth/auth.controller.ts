import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './guard/auth.guard';
import { RolesGuard } from './guard/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { LoginEstudianteDocenteDto } from './dto/login-estudiante-docente.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin')
    @ApiBearerAuth()
    register(
        @Body()
        registerDto: RegisterDto
    ){
        return this.authService.register(registerDto);
    }

    @Post('login/admin')
    loginAdmin(@Body() loginDto: LoginDto) {
        return this.authService.loginAdmin(loginDto);
    }

    @Post('login/estudiante-docente')
    loginEstudianteDocente(@Body() loginDto: LoginEstudianteDocenteDto) {
        return this.authService.loginEstudianteDocente(loginDto);
    }
}
