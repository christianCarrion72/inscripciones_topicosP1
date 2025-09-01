import { forwardRef, Module } from '@nestjs/common';
import { MateriasService } from './materias.service';
import { MateriasController } from './materias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Materia } from './entities/materia.entity';
import { NivelsModule } from 'src/nivels/nivels.module';
import { AuthModule } from 'src/auth/auth.module';
import { TareasModule } from 'src/tareas/tareas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Materia]),
    NivelsModule,
    forwardRef(() => AuthModule),
    forwardRef(() => TareasModule)
  ],
  controllers: [MateriasController],
  providers: [MateriasService],
  exports: [TypeOrmModule, MateriasService]
})
export class MateriasModule {}
