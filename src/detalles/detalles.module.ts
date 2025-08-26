import { forwardRef, Module } from '@nestjs/common';
import { DetallesService } from './detalles.service';
import { DetallesController } from './detalles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Detalle } from './entities/detalle.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Detalle]), forwardRef(() => AuthModule)],
  controllers: [DetallesController],
  providers: [DetallesService],
})
export class DetallesModule {}
