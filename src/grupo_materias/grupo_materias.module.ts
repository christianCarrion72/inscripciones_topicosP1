import { Module } from '@nestjs/common';
import { GrupoMateriasService } from './grupo_materias.service';
import { GrupoMateriasController } from './grupo_materias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrupoMateria } from './entities/grupo_materia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GrupoMateria])],
  controllers: [GrupoMateriasController],
  providers: [GrupoMateriasService],
})
export class GrupoMateriasModule {}
