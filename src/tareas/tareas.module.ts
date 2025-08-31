import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { TAREAS_QUEUE } from './tareas.constants';
import { TareasProducer, TareasEventsProvider } from './tareas.producer';
import { TareasWorker } from './tareas.worker';
import { CarrerasModule } from '../carreras/carreras.module';
import { DiasModule } from '../dias/dias.module';

@Module({
  imports: [
    ConfigModule, BullModule.registerQueue({ name: TAREAS_QUEUE }), 
    forwardRef(() => CarrerasModule), 
    forwardRef(() => DiasModule),  
    ],
  providers: [TareasProducer, TareasWorker, TareasEventsProvider],
  exports: [TareasProducer],
})
export class TareasModule {}
