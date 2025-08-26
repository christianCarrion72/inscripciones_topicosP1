import { Module } from '@nestjs/common';
import { PeriodosService } from './periodos.service';
import { PeriodosController } from './periodos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Periodo } from './entities/periodo.entity';
import { GestionsModule } from 'src/gestions/gestions.module';
import { GrupoMateriasModule } from 'src/grupo_materias/grupo_materias.module';

@Module({
  imports: [TypeOrmModule.forFeature([Periodo]), GestionsModule, GrupoMateriasModule],
  controllers: [PeriodosController],
  providers: [PeriodosService],
  exports: [TypeOrmModule]
})
export class PeriodosModule {}
