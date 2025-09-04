import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { QUEUE } from './tareas.constants';
import { TareasProducer } from './tareas.producer';
import { TareasWorker } from './tareas.worker';
import { TareasQueueService } from './tareas-queue.service';
import { TareasQueueController } from './tareas-queue.controller';
import { TareasTestService } from './tareas-test.service';
import { TareasTestController } from './tareas-test.controller';
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
import { TareasEvents } from './tareas.events';
import { TareasGateway } from './tareas.gatway';

@Module({
  imports: [
    ConfigModule, BullModule.registerQueue({ 
      name: QUEUE,
      connection: {
        host: 'localhost',
        port: 6379,
      },
      defaultJobOptions: {
        removeOnComplete: 100, // Mantener los últimos 100 trabajos completados
        removeOnFail: 50, // Mantener los últimos 50 trabajos fallidos
        attempts: 3, // Reintentar hasta 3 veces
        backoff: {
          type: 'exponential', // Backoff exponencial
          delay: 2000, // Empezar con 2 segundos
        },
      },
     }), 
    forwardRef(() => CarrerasModule),
    forwardRef(() => DiasModule),
    ],
  providers: [
    TareasWorker,
    TareasProducer,
    TareasQueueService,
    TareasTestService,
    TareasEvents,
    TareasGateway,
    {
      provide: 'ENTITY_SERVICES',
      useFactory: (carreras: CarrerasService, dias: DiasService) => ({
        carrera: carreras,
        dia: dias,
      }),
      inject: [CarrerasService, DiasService],
    },
  ],
  controllers: [TareasQueueController, TareasTestController],
  exports: [TareasProducer, TareasQueueService, TareasTestService, TareasModule],
})
export class TareasModule {}
