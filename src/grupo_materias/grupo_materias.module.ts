import { forwardRef, Module } from '@nestjs/common';
import { GrupoMateriasService } from './grupo_materias.service';
import { GrupoMateriasController } from './grupo_materias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrupoMateria } from './entities/grupo_materia.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([GrupoMateria]), forwardRef(() => AuthModule)],
  controllers: [GrupoMateriasController],
  providers: [GrupoMateriasService],
})
export class GrupoMateriasModule {}
