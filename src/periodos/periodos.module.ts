import { Module } from '@nestjs/common';
import { PeriodosService } from './periodos.service';
import { PeriodosController } from './periodos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Periodo } from './entities/periodo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Periodo])],
  controllers: [PeriodosController],
  providers: [PeriodosService],
})
export class PeriodosModule {}
