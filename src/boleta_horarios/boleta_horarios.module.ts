import { forwardRef, Module } from '@nestjs/common';
import { BoletaHorariosService } from './boleta_horarios.service';
import { BoletaHorariosController } from './boleta_horarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoletaHorario } from './entities/boleta_horario.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([BoletaHorario]), forwardRef(() => AuthModule)],
  controllers: [BoletaHorariosController],
  providers: [BoletaHorariosService],
})
export class BoletaHorariosModule {}
