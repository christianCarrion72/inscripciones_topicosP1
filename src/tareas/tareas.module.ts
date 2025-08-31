import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { TAREAS_QUEUE } from './tareas.constants';
import { TareasProducer, TareasEventsProvider } from './tareas.producer';
import { TareasWorker } from './tareas.worker';
import { CarrerasModule } from '../carreras/carreras.module';
import { DiasModule } from '../dias/dias.module';
import { AulasModule } from '../aulas/aulas.module';
import { BoletaHorariosModule } from '../boleta_horarios/boleta_horarios.module';
import { DocentesModule } from '../docentes/docentes.module';
import { EstudiantesModule } from '../estudiantes/estudiantes.module';
import { GestionsModule } from '../gestions/gestions.module';
import { GrupoMateriasModule } from '../grupo_materias/grupo_materias.module';
import { GruposModule } from '../grupos/grupos.module';
import { HorariosModule } from '../horarios/horarios.module';
import { InscripcionsModule } from '../inscripcions/inscripcions.module';
import { MateriasModule } from '../materias/materias.module';
import { ModulosModule } from '../modulos/modulos.module';
import { NivelsModule } from '../nivels/nivels.module';
import { NotasModule } from '../notas/notas.module';
import { PeriodosModule } from '../periodos/periodos.module';
import { PlanEstudiosModule } from '../plan_estudios/plan_estudios.module';
import { DetallesModule } from '../detalles/detalles.module';
import { DiaHorariosModule } from '../dia_horarios/dia_horarios.module';
import { PrerequisitosModule } from '../prerequisitos/prerequisitos.module';

@Module({
  imports: [
    ConfigModule, BullModule.registerQueue({ name: TAREAS_QUEUE }), 
    forwardRef(() => CarrerasModule), 
    forwardRef(() => DiasModule),
    forwardRef(() => AulasModule),
    forwardRef(() => BoletaHorariosModule),
    forwardRef(() => DocentesModule),
    forwardRef(() => EstudiantesModule),
    forwardRef(() => GestionsModule),
    forwardRef(() => GrupoMateriasModule),
    forwardRef(() => GruposModule),
    forwardRef(() => HorariosModule),
    forwardRef(() => InscripcionsModule),
    forwardRef(() => MateriasModule),
    forwardRef(() => ModulosModule),
    forwardRef(() => NivelsModule),
    forwardRef(() => NotasModule),
    forwardRef(() => PeriodosModule),
    forwardRef(() => PlanEstudiosModule),
    forwardRef(() => DetallesModule),
    forwardRef(() => DiaHorariosModule),
    forwardRef(() => PrerequisitosModule),
    ],
  providers: [TareasProducer, TareasWorker, TareasEventsProvider],
  exports: [TareasProducer],
})
export class TareasModule {}
