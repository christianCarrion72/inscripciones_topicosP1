import { forwardRef, Module } from '@nestjs/common';
import { GestionsService } from './gestions.service';
import { GestionsController } from './gestions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gestion } from './entities/gestion.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TareasModule } from 'src/tareas/tareas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Gestion]), 
    forwardRef(() => AuthModule),
    forwardRef(() => TareasModule)
  ],
  controllers: [GestionsController],
  providers: [GestionsService],
  exports: [TypeOrmModule, GestionsService]
})
export class GestionsModule {}
