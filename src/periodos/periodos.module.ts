import { forwardRef, Module } from '@nestjs/common';
import { PeriodosService } from './periodos.service';
import { PeriodosController } from './periodos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Periodo } from './entities/periodo.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Periodo]), forwardRef(() => AuthModule)],
  controllers: [PeriodosController],
  providers: [PeriodosService],
  exports: [TypeOrmModule]
})
export class PeriodosModule {}
