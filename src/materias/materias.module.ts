import { Module } from '@nestjs/common';
import { MateriasService } from './materias.service';
import { MateriasController } from './materias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Materia } from './entities/materia.entity';
import { NivelsModule } from 'src/nivels/nivels.module';

@Module({
  imports: [TypeOrmModule.forFeature([Materia]),
    NivelsModule,
  ],
  controllers: [MateriasController],
  providers: [MateriasService],
})
export class MateriasModule {}
