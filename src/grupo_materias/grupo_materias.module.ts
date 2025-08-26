import { Module } from '@nestjs/common';
import { GrupoMateriasService } from './grupo_materias.service';
import { GrupoMateriasController } from './grupo_materias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrupoMateria } from './entities/grupo_materia.entity';
import { DocentesModule } from 'src/docentes/docentes.module';
import { MateriasModule } from 'src/materias/materias.module';
import { GruposModule } from 'src/grupos/grupos.module';

@Module({
  imports: [TypeOrmModule.forFeature([GrupoMateria]), DocentesModule, MateriasModule, GruposModule],
  controllers: [GrupoMateriasController],
  providers: [GrupoMateriasService],
  exports: [TypeOrmModule]
})
export class GrupoMateriasModule {}
