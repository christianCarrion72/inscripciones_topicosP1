import { forwardRef, Module } from '@nestjs/common';
import { GruposService } from './grupos.service';
import { GruposController } from './grupos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grupo } from './entities/grupo.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Grupo]), forwardRef(() => AuthModule)],
  controllers: [GruposController],
  providers: [GruposService],
})
export class GruposModule {}
