import { Module } from '@nestjs/common';
import { DiaHorariosService } from './dia_horarios.service';
import { DiaHorariosController } from './dia_horarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiaHorario } from './entities/dia_horario.entity';
import { Dia } from 'src/dias/entities/dia.entity';
import { Horario } from 'src/horarios/entities/horario.entity';
import { DiasModule } from 'src/dias/dias.module';
import { HorariosModule } from 'src/horarios/horarios.module';

@Module({
  imports: [TypeOrmModule.forFeature([DiaHorario]),DiasModule,HorariosModule],
  controllers: [DiaHorariosController],
  providers: [DiaHorariosService],
})
export class DiaHorariosModule {}
