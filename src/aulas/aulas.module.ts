import { Module } from '@nestjs/common';
import { AulasService } from './aulas.service';
import { AulasController } from './aulas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aula } from './entities/aula.entity';
import { ModulosModule } from 'src/modulos/modulos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Aula]),ModulosModule],
  controllers: [AulasController],
  providers: [AulasService],
  exports: [TypeOrmModule]
})
export class AulasModule {}
