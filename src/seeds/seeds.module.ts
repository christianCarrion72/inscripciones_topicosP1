import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedsController } from './seeds.controller';
import { SeedsService } from './seeds.service';

@Module({
  imports: [],
  controllers: [SeedsController],
  providers: [SeedsService],
  exports: [SeedsService]
})
export class SeedsModule {}
