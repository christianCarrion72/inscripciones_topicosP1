import { forwardRef, Module } from '@nestjs/common';
import { InscripcionsService } from './inscripcions.service';
import { InscripcionsController } from './inscripcions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inscripcion } from './entities/inscripcion.entity';
import { EstudiantesModule } from 'src/estudiantes/estudiantes.module';
import { AuthModule } from 'src/auth/auth.module';
import { TareasModule } from 'src/tareas/tareas.module';
import { GrupoMateriasModule } from 'src/grupo_materias/grupo_materias.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inscripcion]), 
    EstudiantesModule,
    GrupoMateriasModule, 
    forwardRef(() => AuthModule),
    forwardRef(() => TareasModule)
  ],
  controllers: [InscripcionsController],
  providers: [InscripcionsService],
  exports: [TypeOrmModule, InscripcionsService]
})
export class InscripcionsModule {}
