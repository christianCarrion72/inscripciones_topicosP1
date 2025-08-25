import { Module } from '@nestjs/common';
import { BoletaHorariosService } from './boleta_horarios.service';
import { BoletaHorariosController } from './boleta_horarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoletaHorario } from './entities/boleta_horario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoletaHorario])],
  controllers: [BoletaHorariosController],
  providers: [BoletaHorariosService],
})
export class BoletaHorariosModule {}
