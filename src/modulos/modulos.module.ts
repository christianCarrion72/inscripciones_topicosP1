import { forwardRef, Module } from '@nestjs/common';
import { ModulosService } from './modulos.service';
import { ModulosController } from './modulos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modulo } from './entities/modulo.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Modulo]), forwardRef(() => AuthModule)],
  controllers: [ModulosController],
  providers: [ModulosService],
  exports: [TypeOrmModule]
})
export class ModulosModule {}
