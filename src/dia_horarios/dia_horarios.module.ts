import { Module } from '@nestjs/common';
import { DiaHorariosService } from './dia_horarios.service';
import { DiaHorariosController } from './dia_horarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiaHorario } from './entities/dia_horario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiaHorario])],
  controllers: [DiaHorariosController],
  providers: [DiaHorariosService],
})
export class DiaHorariosModule {}
