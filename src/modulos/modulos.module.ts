import { forwardRef, Module } from '@nestjs/common';
import { ModulosService } from './modulos.service';
import { ModulosController } from './modulos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modulo } from './entities/modulo.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TareasModule } from 'src/tareas/tareas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Modulo]), 
    forwardRef(() => AuthModule),
    forwardRef(() => TareasModule)
  ],
  controllers: [ModulosController],
  providers: [ModulosService],
  exports: [TypeOrmModule, ModulosService]
})
export class ModulosModule {}
