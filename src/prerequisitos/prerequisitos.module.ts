import { Module } from '@nestjs/common';
import { PrerequisitosService } from './prerequisitos.service';
import { PrerequisitosController } from './prerequisitos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prerequisito } from './entities/prerequisito.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prerequisito])],
  controllers: [PrerequisitosController],
  providers: [PrerequisitosService],
})
export class PrerequisitosModule {}
