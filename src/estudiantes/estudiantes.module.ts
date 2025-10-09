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
import { MateriasModule } from 'src/materias/materias.module';
import { NotasModule } from 'src/notas/notas.module';
import { PrerequisitosModule } from 'src/prerequisitos/prerequisitos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Estudiante]),
    PlanEstudiosModule,
    MateriasModule,
    forwardRef(() => NotasModule),
    PrerequisitosModule,
    forwardRef(() => AuthModule),
    forwardRef(() => PlanEstudiosModule),
    forwardRef(() => TareasModule)
  ],
  controllers: [EstudiantesController, SyncEstudiantesController],
  providers: [EstudiantesService, SyncEstudiantesService],
  exports: [TypeOrmModule, EstudiantesService, SyncEstudiantesService]
})
export class EstudiantesModule {}
