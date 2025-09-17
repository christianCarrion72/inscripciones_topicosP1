import { forwardRef, Module } from '@nestjs/common';
import { BoletaHorariosService } from './boleta_horarios.service';
import { BoletaHorariosController } from './boleta_horarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoletaHorario } from './entities/boleta_horario.entity';
import { AuthModule } from 'src/auth/auth.module';
import { GrupoMateriasModule } from 'src/grupo_materias/grupo_materias.module';
import { HorariosModule } from 'src/horarios/horarios.module';
import { TareasModule } from 'src/tareas/tareas.module';
import { SyncBoletaHorariosService } from './sync-boleta_horarios.service';
import { SyncBoletaHorariosController } from './sync-boleta_horarios.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoletaHorario]), 
    forwardRef(() => AuthModule),
    GrupoMateriasModule,
    HorariosModule,
    forwardRef(() => TareasModule)
  ],
  controllers: [BoletaHorariosController, SyncBoletaHorariosController],
  providers: [BoletaHorariosService, SyncBoletaHorariosService],
  exports: [TypeOrmModule, BoletaHorariosService, SyncBoletaHorariosService]
})
export class BoletaHorariosModule {}
