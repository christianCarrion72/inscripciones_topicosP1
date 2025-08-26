import { forwardRef, Module } from '@nestjs/common';
import { NotasService } from './notas.service';
import { NotasController } from './notas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nota } from './entities/nota.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Nota]), forwardRef(() => AuthModule)],
  controllers: [NotasController],
  providers: [NotasService],
})
export class NotasModule {}
