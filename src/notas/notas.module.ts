import { forwardRef, Module } from '@nestjs/common';
import { NotasService } from './notas.service';
import { NotasController } from './notas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nota } from './entities/nota.entity';
import { AuthModule } from 'src/auth/auth.module';
import { EstudiantesModule } from 'src/estudiantes/estudiantes.module';
import { GrupoMateriasModule } from 'src/grupo_materias/grupo_materias.module';
import { TareasModule } from 'src/tareas/tareas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Nota]), 
    forwardRef(() => EstudiantesModule),
    GrupoMateriasModule,
    forwardRef(() => AuthModule),
    forwardRef(() => TareasModule)
  ],
  controllers: [NotasController],
  providers: [NotasService],
  exports: [TypeOrmModule, NotasService]
})
export class NotasModule {}
