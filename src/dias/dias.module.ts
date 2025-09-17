import { forwardRef, Module } from '@nestjs/common';
import { DiasService } from './dias.service';
import { DiasController } from './dias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dia } from './entities/dia.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TareasModule } from 'src/tareas/tareas.module';
import { SyncDiasService } from './sync-dias.service';
import { SyncDiasController } from './sync-dias.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Dia]), 
    forwardRef(() => AuthModule),
    forwardRef(() => TareasModule),
  ],
  controllers: [DiasController, SyncDiasController],
  providers: [DiasService, SyncDiasService],
  exports: [TypeOrmModule, DiasService, SyncDiasService]
})
export class DiasModule {}
