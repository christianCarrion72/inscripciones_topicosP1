import { forwardRef, Module } from '@nestjs/common';
import { PrerequisitosService } from './prerequisitos.service';
import { PrerequisitosController } from './prerequisitos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prerequisito } from './entities/prerequisito.entity';
import { MateriasModule } from 'src/materias/materias.module';
import { AuthModule } from 'src/auth/auth.module';
import { TareasModule } from 'src/tareas/tareas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Prerequisito]),
    MateriasModule, 
    forwardRef(() => AuthModule),
    forwardRef(() => TareasModule)
  ],
  controllers: [PrerequisitosController],
  providers: [PrerequisitosService],
  exports: [TypeOrmModule, PrerequisitosService]
})
export class PrerequisitosModule {}
