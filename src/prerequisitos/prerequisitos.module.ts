import { forwardRef, Module } from '@nestjs/common';
import { PrerequisitosService } from './prerequisitos.service';
import { PrerequisitosController } from './prerequisitos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prerequisito } from './entities/prerequisito.entity';
import { MateriasModule } from 'src/materias/materias.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Prerequisito]),MateriasModule, forwardRef(() => AuthModule)],
  controllers: [PrerequisitosController],
  providers: [PrerequisitosService],
})
export class PrerequisitosModule {}
