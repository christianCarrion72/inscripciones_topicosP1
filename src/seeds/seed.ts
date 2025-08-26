import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { seedCarreras } from './seeders/carrera.seeder';
import { seedPlanEstudios } from './seeders/plan_estudio.seeder';
import { seedNiveles } from './seeders/nivel.seeder';
import { seedEstudiantes } from './seeders/estudiante.seeder';
import { seedModulos } from './seeders/modulo.seeder';
import { seedAulas } from './seeders/aula.seeder';
import { seedDias } from './seeders/dia.seeder';
import { seedHorarios } from './seeders/horario.seeder';
import { seedDiaHorarios } from './seeders/dia_horario.seeder';
import { seedMaterias } from './seeders/materia.seeder';
import { seedPrerequisitos } from './seeders/prerequisito.seeder';
import { seedInscripcions } from './seeders/inscripcion.seeder';
import { seedGestions } from './seeders/gestion.seeder';
import { seedGrupos } from './seeders/grupo.seeder';
import { seedDocentes } from './seeders/docente.seeder';
import { seedPeriodos } from './seeders/periodo.seeder';
import { seedGrupoMaterias } from './seeders/grupo_materia.seeder';
import { seedBoletaHorarios } from './seeders/boleta_horario.seeder';
import { seedDetalles } from './seeders/detalle.seeder';
import { seedNotas } from './seeders/nota.seeder';

async function runSeeders(): Promise<void> {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const dataSource = app.get<DataSource>(getDataSourceToken());

    await seedCarreras(dataSource);
    await seedPlanEstudios(dataSource);
    await seedNiveles(dataSource);
    await seedEstudiantes(dataSource);
    await seedModulos(dataSource);
    await seedAulas(dataSource);
    await seedDias(dataSource);
    await seedHorarios(dataSource);
    await seedDiaHorarios(dataSource);
    await seedMaterias(dataSource);
    await seedPrerequisitos(dataSource);
    await seedInscripcions(dataSource);
    await seedGestions(dataSource);
    await seedGrupos(dataSource);
    await seedDocentes(dataSource);
    await seedPeriodos(dataSource);
    await seedGrupoMaterias(dataSource);
    await seedBoletaHorarios(dataSource);
    await seedDetalles(dataSource);
    await seedNotas(dataSource);

    // eslint-disable-next-line no-console
    console.log('Seeding completed.');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Seeding failed:', error);
    process.exitCode = 1;
  } finally {
    await app.close();
  }
}

runSeeders();


