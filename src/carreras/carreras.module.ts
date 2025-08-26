import { forwardRef, Module } from '@nestjs/common';
import { CarrerasService } from './carreras.service';
import { CarrerasController } from './carreras.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrera } from './entities/carrera.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Carrera]), forwardRef(() => AuthModule)],
  controllers: [CarrerasController],
  providers: [CarrerasService],
  exports: [TypeOrmModule, CarrerasService]
})
export class CarrerasModule {}
