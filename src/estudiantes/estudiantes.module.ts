import { forwardRef, Module } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { EstudiantesController } from './estudiantes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { PlanEstudiosModule } from 'src/plan_estudios/plan_estudios.module';
import { AuthModule } from 'src/auth/auth.module';
import { TareasModule } from 'src/tareas/tareas.module';
import { SyncEstudiantesService } from './sync-estudiantes.service';
import { SyncEstudiantesController } from './sync-estudiantes.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Estudiante]),
    PlanEstudiosModule, 
    forwardRef(() => AuthModule),
    forwardRef(() => TareasModule)
  ],
  controllers: [EstudiantesController, SyncEstudiantesController],
  providers: [EstudiantesService, SyncEstudiantesService],
  exports: [TypeOrmModule, EstudiantesService, SyncEstudiantesService]
})
export class EstudiantesModule {}
