import { forwardRef, Module } from '@nestjs/common';
import { GrupoMateriasService } from './grupo_materias.service';
import { GrupoMateriasController } from './grupo_materias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrupoMateria } from './entities/grupo_materia.entity';
import { AuthModule } from 'src/auth/auth.module';
import { MateriasModule } from 'src/materias/materias.module';
import { GestionsModule } from 'src/gestions/gestions.module';
import { DocentesModule } from 'src/docentes/docentes.module';
import { GruposModule } from 'src/grupos/grupos.module';

@Module({
  imports: [TypeOrmModule.forFeature([GrupoMateria]), 
    forwardRef(() => AuthModule),
    MateriasModule, 
    GestionsModule, 
    DocentesModule,
    GruposModule,
  ],
  controllers: [GrupoMateriasController],
  providers: [GrupoMateriasService],
  exports: [TypeOrmModule]
})
export class GrupoMateriasModule {}
