import { forwardRef, Module } from '@nestjs/common';
import { PeriodosService } from './periodos.service';
import { PeriodosController } from './periodos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Periodo } from './entities/periodo.entity';
import { AuthModule } from 'src/auth/auth.module';
import { GrupoMateriasModule } from 'src/grupo_materias/grupo_materias.module';
import { GestionsModule } from 'src/gestions/gestions.module';
import { TareasModule } from 'src/tareas/tareas.module';
import { Inscripcion } from 'src/inscripcions/entities/inscripcion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Periodo]), 
    forwardRef(() => AuthModule),
    GestionsModule,
    forwardRef(() => TareasModule)
  ],
  controllers: [PeriodosController],
  providers: [PeriodosService],
  exports: [TypeOrmModule, PeriodosService]
})
export class PeriodosModule {}
