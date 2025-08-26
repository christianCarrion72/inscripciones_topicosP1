import { forwardRef, Module } from '@nestjs/common';
import { DiasService } from './dias.service';
import { DiasController } from './dias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dia } from './entities/dia.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Dia]), forwardRef(() => AuthModule)],
  controllers: [DiasController],
  providers: [DiasService],
  exports: [TypeOrmModule]
})
export class DiasModule {}
