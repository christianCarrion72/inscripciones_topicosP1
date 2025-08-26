import { forwardRef, Module } from '@nestjs/common';
import { InscripcionsService } from './inscripcions.service';
import { InscripcionsController } from './inscripcions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inscripcion } from './entities/inscripcion.entity';
import { EstudiantesModule } from 'src/estudiantes/estudiantes.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Inscripcion]), EstudiantesModule, forwardRef(() => AuthModule)],
  controllers: [InscripcionsController],
  providers: [InscripcionsService],
})
export class InscripcionsModule {}
