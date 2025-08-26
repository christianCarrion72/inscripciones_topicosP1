import { forwardRef, Module } from '@nestjs/common';
import { DocentesService } from './docentes.service';
import { DocentesController } from './docentes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Docente } from './entities/docente.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Docente]), forwardRef(() => AuthModule)],
  controllers: [DocentesController],
  providers: [DocentesService],
  exports: [TypeOrmModule]
})
export class DocentesModule {}
