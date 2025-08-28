import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { DatabaseSeeder } from './seeder';

async function runSeeder(): Promise<void> {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: ['error', 'warn'] });
  try {
    const dataSource = app.get<DataSource>(getDataSourceToken());
    const seeder = new DatabaseSeeder(dataSource);
    // linea de consola
    console.log('🚀 Ejecutando seeders...');
    await seeder.seed();
    // linea de consola
    console.log('✅ Seeding completado');
  } catch (error) {
    // linea de consola
    console.error('❌ Error ejecutando seeders:', error);
    process.exitCode = 1;
  } finally {
    await app.close();
  }
}

if (require.main === module) {
  runSeeder();
}

export { runSeeder };


