import { forwardRef, Module } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { EstudiantesController } from './estudiantes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { PlanEstudiosModule } from 'src/plan_estudios/plan_estudios.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Estudiante]),PlanEstudiosModule, forwardRef(() => AuthModule)],
  controllers: [EstudiantesController],
  providers: [EstudiantesService],
  exports: [TypeOrmModule]
})
export class EstudiantesModule {}
