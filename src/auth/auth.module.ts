import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.constant';
import { EstudiantesModule } from 'src/estudiantes/estudiantes.module';
import { DocentesModule } from 'src/docentes/docentes.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => EstudiantesModule),
    forwardRef(() => DocentesModule),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
