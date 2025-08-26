import { Module } from '@nestjs/common';
import { HorariosService } from './horarios.service';
import { HorariosController } from './horarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Horario } from './entities/horario.entity';
import { Aula } from 'src/aulas/entities/aula.entity';
import { AulasModule } from 'src/aulas/aulas.module';

@Module({
  imports: [TypeOrmModule.forFeature([Horario]),AulasModule],
  controllers: [HorariosController],
  providers: [HorariosService],
  exports: [TypeOrmModule]
})
export class HorariosModule {}
