import { forwardRef, Module } from '@nestjs/common';
import { DetallesService } from './detalles.service';
import { DetallesController } from './detalles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Detalle } from './entities/detalle.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TareasModule } from 'src/tareas/tareas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Detalle]), 
    forwardRef(() => AuthModule),
    forwardRef(() => TareasModule)
  ],
  controllers: [DetallesController],
  providers: [DetallesService],
  exports: [TypeOrmModule, DetallesService]
})
export class DetallesModule {}
