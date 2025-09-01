import { forwardRef, Module } from '@nestjs/common';
import { DiasService } from './dias.service';
import { DiasController } from './dias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dia } from './entities/dia.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TareasModule } from 'src/tareas/tareas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Dia]), 
    forwardRef(() => AuthModule),
    forwardRef(() => TareasModule),
  ],
  controllers: [DiasController],
  providers: [DiasService],
  exports: [TypeOrmModule,DiasService]
})
export class DiasModule {}
