import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TareasProducer } from './tareas.producer';
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
import { CarrerasService } from 'src/carreras/carreras.service';
import { DiasService } from 'src/dias/dias.service';
import { AulasService } from 'src/aulas/aulas.service';
import { BoletaHorariosService } from 'src/boleta_horarios/boleta_horarios.service';
import { DetallesService } from 'src/detalles/detalles.service';
import { DiaHorariosService } from 'src/dia_horarios/dia_horarios.service';
import { DocentesService } from 'src/docentes/docentes.service';
import { EstudiantesService } from 'src/estudiantes/estudiantes.service';
import { GestionsService } from 'src/gestions/gestions.service';
import { GrupoMateriasService } from 'src/grupo_materias/grupo_materias.service';
import { GruposService } from 'src/grupos/grupos.service';
import { HorariosService } from 'src/horarios/horarios.service';
import { InscripcionsService } from 'src/inscripcions/inscripcions.service';
import { MateriasService } from 'src/materias/materias.service';
import { ModulosService } from 'src/modulos/modulos.service';
import { NivelsService } from 'src/nivels/nivels.service';
import { NotasService } from 'src/notas/notas.service';
import { PeriodosService } from 'src/periodos/periodos.service';
import { PlanEstudiosService } from 'src/plan_estudios/plan_estudios.service';
import { PrerequisitosService } from 'src/prerequisitos/prerequisitos.service';
import { TareasService } from './tareas.service';
import { TareasWorker } from './tareas.worker';
import { QueueManagerService } from './queue-manager.service';
import { QueueManagerController } from './queue-manager.controller';
import { TareasStatusController } from './tarea.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TareasEventsManager } from './tareas.events';

@Module({
  imports: [
    ConfigModule,
    forwardRef(() => AuthModule),
    forwardRef(() => CarrerasModule),
    forwardRef(() => DiasModule),
    forwardRef(() => AulasModule),
    forwardRef(() => BoletaHorariosModule),
    forwardRef(() => DetallesModule),
    forwardRef(() => DiaHorariosModule),
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
    forwardRef(() => PrerequisitosModule),
    ],
  providers: [
    TareasProducer,
    TareasEventsManager,
    TareasService,
    TareasWorker,
    QueueManagerService,
    {
      provide: 'ENTITY_SERVICES',
      useFactory: (
        carreras: CarrerasService, 
        dias: DiasService,
        aulas: AulasService,
        boletaHorarios: BoletaHorariosService,
        detalles: DetallesService,
        diaHorarios: DiaHorariosService,
        docentes: DocentesService,
        estudiantes: EstudiantesService,
        gestions: GestionsService,
        grupoMaterias: GrupoMateriasService,
        grupos: GruposService,
        horarios: HorariosService,
        inscripcions: InscripcionsService,
        materias: MateriasService,
        modulos: ModulosService,
        nivels: NivelsService,
        notas: NotasService,
        periodos: PeriodosService,
        planEstudios: PlanEstudiosService,
        prerequisitos: PrerequisitosService
      ) => ({
        carrera: carreras,
        dia: dias,
        aula: aulas,
        boleta_horario: boletaHorarios,
        detalle: detalles,
        dia_horario: diaHorarios,
        docente: docentes,
        estudiante: estudiantes,
        gestion: gestions,
        grupo_materia: grupoMaterias,
        grupo: grupos,
        horario: horarios,
        inscripcion: inscripcions,
        materia: materias,
        modulo: modulos,
        nivel: nivels,
        nota: notas,
        periodo: periodos,
        plan_estudio: planEstudios,
        prerequisito: prerequisitos
      }),
      inject: [
        CarrerasService, 
        DiasService,
        AulasService,
        BoletaHorariosService,
        DetallesService,
        DiaHorariosService,
        DocentesService,
        EstudiantesService,
        GestionsService,
        GrupoMateriasService,
        GruposService,
        HorariosService,
        InscripcionsService,
        MateriasService,
        ModulosService,
        NivelsService,
        NotasService,
        PeriodosService,
        PlanEstudiosService,
        PrerequisitosService
      ],
    },
  ],
  controllers: [QueueManagerController,TareasStatusController],
  exports: [TareasProducer, TareasModule, QueueManagerService],
})
export class TareasModule {}
