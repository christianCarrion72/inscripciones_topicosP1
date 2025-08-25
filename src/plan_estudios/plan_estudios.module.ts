import { Module } from '@nestjs/common';
import { PlanEstudiosService } from './plan_estudios.service';
import { PlanEstudiosController } from './plan_estudios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanEstudio } from './entities/plan_estudio.entity';
import { CarrerasModule } from 'src/carreras/carreras.module';
import { CarrerasService } from 'src/carreras/carreras.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlanEstudio]), CarrerasModule],
  controllers: [PlanEstudiosController],
  providers: [PlanEstudiosService, CarrerasService],
  exports: [TypeOrmModule]
})
export class PlanEstudiosModule {}
