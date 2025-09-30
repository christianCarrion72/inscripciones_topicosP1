// src/queues/dto/create-queue.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateQueueDto {
  @ApiProperty({ example: 'default', description: 'Nombre de la cola a crear' })
  @IsString()
  @MinLength(1)
  name: string;
}