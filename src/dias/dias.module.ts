import { Module } from '@nestjs/common';
import { DiasService } from './dias.service';
import { DiasController } from './dias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dia } from './entities/dia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dia])],
  controllers: [DiasController],
  providers: [DiasService],
})
export class DiasModule {}
