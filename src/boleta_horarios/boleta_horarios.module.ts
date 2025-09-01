import { forwardRef, Module } from '@nestjs/common';
import { BoletaHorariosService } from './boleta_horarios.service';
import { BoletaHorariosController } from './boleta_horarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoletaHorario } from './entities/boleta_horario.entity';
import { AuthModule } from 'src/auth/auth.module';
import { GrupoMateriasModule } from 'src/grupo_materias/grupo_materias.module';
import { HorariosModule } from 'src/horarios/horarios.module';
import { TareasModule } from 'src/tareas/tareas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoletaHorario]), 
    forwardRef(() => AuthModule),
    GrupoMateriasModule,
    HorariosModule,
    forwardRef(() => TareasModule)
  ],
  controllers: [BoletaHorariosController],
  providers: [BoletaHorariosService],
  exports: [TypeOrmModule, BoletaHorariosService]
})
export class BoletaHorariosModule {}
