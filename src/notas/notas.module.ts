import { forwardRef, Module } from '@nestjs/common';
import { NotasService } from './notas.service';
import { NotasController } from './notas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nota } from './entities/nota.entity';
import { AuthModule } from 'src/auth/auth.module';
import { EstudiantesModule } from 'src/estudiantes/estudiantes.module';
import { GrupoMateriasModule } from 'src/grupo_materias/grupo_materias.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Nota]), 
    EstudiantesModule,
    GrupoMateriasModule,
    forwardRef(() => AuthModule)
  ],
  controllers: [NotasController],
  providers: [NotasService],
})
export class NotasModule {}
