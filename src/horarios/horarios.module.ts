import { forwardRef, Module } from '@nestjs/common';
import { HorariosService } from './horarios.service';
import { HorariosController } from './horarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Horario } from './entities/horario.entity';
import { Aula } from 'src/aulas/entities/aula.entity';
import { AulasModule } from 'src/aulas/aulas.module';
import { AuthModule } from 'src/auth/auth.module';
import { TareasModule } from 'src/tareas/tareas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Horario]),
    AulasModule, 
    forwardRef(() => AuthModule),
    forwardRef(() => TareasModule)
  ],
  controllers: [HorariosController],
  providers: [HorariosService],
  exports: [TypeOrmModule, HorariosService]
})
export class HorariosModule {}
