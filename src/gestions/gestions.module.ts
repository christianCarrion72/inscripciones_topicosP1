import { forwardRef, Module } from '@nestjs/common';
import { GestionsService } from './gestions.service';
import { GestionsController } from './gestions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gestion } from './entities/gestion.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Gestion]), forwardRef(() => AuthModule)],
  controllers: [GestionsController],
  providers: [GestionsService],
})
export class GestionsModule {}
