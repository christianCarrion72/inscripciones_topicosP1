import { forwardRef, Module } from '@nestjs/common';
import { NivelsService } from './nivels.service';
import { NivelsController } from './nivels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nivel } from './entities/nivel.entity';
import { PlanEstudiosModule } from 'src/plan_estudios/plan_estudios.module';
import { PlanEstudiosService } from 'src/plan_estudios/plan_estudios.service';
import { CarrerasModule } from 'src/carreras/carreras.module';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [TypeOrmModule.forFeature([Nivel]),
    PlanEstudiosModule,
    CarrerasModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [NivelsController],
  providers: [NivelsService, PlanEstudiosService],
  exports: [TypeOrmModule]
})
export class NivelsModule {}
