import { Module } from '@nestjs/common';
import { GestionsService } from './gestions.service';
import { GestionsController } from './gestions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gestion } from './entities/gestion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gestion])],
  controllers: [GestionsController],
  providers: [GestionsService],
  exports: [TypeOrmModule]
})
export class GestionsModule {}
