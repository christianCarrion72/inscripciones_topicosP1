import { forwardRef, Module } from '@nestjs/common';
import { DetallesService } from './detalles.service';
import { DetallesController } from './detalles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Detalle } from './entities/detalle.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TareasModule } from 'src/tareas/tareas.module';
import { InscripcionsModule } from 'src/inscripcions/inscripcions.module';
import { GrupoMateriasModule } from 'src/grupo_materias/grupo_materias.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Detalle]),
    InscripcionsModule,
    GrupoMateriasModule, 
    forwardRef(() => AuthModule),
    forwardRef(() => TareasModule)
  ],
  controllers: [DetallesController],
  providers: [DetallesService],
  exports: [TypeOrmModule, DetallesService]
})
export class DetallesModule {}
