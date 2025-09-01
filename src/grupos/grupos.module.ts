import { forwardRef, Module } from '@nestjs/common';
import { GruposService } from './grupos.service';
import { GruposController } from './grupos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grupo } from './entities/grupo.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TareasModule } from 'src/tareas/tareas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Grupo]), 
    forwardRef(() => AuthModule),
    forwardRef(() => TareasModule)
  ],
  controllers: [GruposController],
  providers: [GruposService],
  exports: [TypeOrmModule, GruposService]
})
export class GruposModule {}
