import { Module } from '@nestjs/common';
import { CarrerasModule } from './carreras/carreras.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanEstudiosModule } from './plan_estudios/plan_estudios.module';
import { NivelsModule } from './nivels/nivels.module';
import { PrerequisitosModule } from './prerequisitos/prerequisitos.module';
import { MateriasModule } from './materias/materias.module';
import { NotasModule } from './notas/notas.module';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { InscripcionsModule } from './inscripcions/inscripcions.module';
import { DetallesModule } from './detalles/detalles.module';
import { GrupoMateriasModule } from './grupo_materias/grupo_materias.module';
import { DocentesModule } from './docentes/docentes.module';
import { GruposModule } from './grupos/grupos.module';
import { PeriodosModule } from './periodos/periodos.module';
import { GestionsModule } from './gestions/gestions.module';
import { HorariosModule } from './horarios/horarios.module';
import { DiasModule } from './dias/dias.module';
import { ModulosModule } from './modulos/modulos.module';
import { AulasModule } from './aulas/aulas.module';
import { DiaHorariosModule } from './dia_horarios/dia_horarios.module';
import { BoletaHorariosModule } from './boleta_horarios/boleta_horarios.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SeedsModule } from './seeds/seeds.module';
import { BullModule } from '@nestjs/bullmq';
import { StatsController } from './req-contador/stats.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
      ssl: process.env.DATABASE_SSL === 'true' ? {
        rejectUnauthorized: false
      } : false,
    }),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST ?? '127.0.0.1',
        port: +(process.env.REDIS_PORT ?? 6379),
        // Si usas password o TLS, configúralos aquí.
      },
      // Recomendado: defaults globales para todos los jobs
      defaultJobOptions: {
        attempts: 3,
        backoff: { type: 'exponential', delay: 2000 },
        removeOnComplete: { age: 60 * 60, count: 1000 }, // 1h o mantener hasta 1000
        removeOnFail: { age: 24 * 60 * 60 },            // limpiar fallidos > 24h
      },
    }),
    // Registramos UNA cola para todo
    BullModule.registerQueue({ name: 'tareas' }),
    //--------------------------------------------------------
    CarrerasModule,
    PlanEstudiosModule,
    NivelsModule,
    PrerequisitosModule,
    MateriasModule,
    NotasModule,
    EstudiantesModule,
    InscripcionsModule,
    DetallesModule,
    GrupoMateriasModule,
    DocentesModule,
    GruposModule,
    PeriodosModule,
    GestionsModule,
    HorariosModule,
    DiasModule,
    ModulosModule,
    AulasModule,
    DiaHorariosModule,
    BoletaHorariosModule,
    UsersModule,
    AuthModule,
    SeedsModule,
  ],
  controllers: [StatsController],
  providers: [],
})
export class AppModule {}
