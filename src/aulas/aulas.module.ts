import { forwardRef, Module } from '@nestjs/common';
import { AulasService } from './aulas.service';
import { AulasController } from './aulas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aula } from './entities/aula.entity';
import { ModulosModule } from 'src/modulos/modulos.module';
import { AuthModule } from 'src/auth/auth.module';
import { TareasModule } from 'src/tareas/tareas.module';
import { SyncAulasService } from './sync-aulas.service';
import { SyncAulasController } from './sync-aulas.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Aula]),
    forwardRef(() => AuthModule),
    ModulosModule,
    forwardRef(() => TareasModule),
  ],
  controllers: [AulasController, SyncAulasController],
  providers: [AulasService, SyncAulasService],
  exports: [TypeOrmModule, AulasService, SyncAulasService]
})
export class AulasModule {}
