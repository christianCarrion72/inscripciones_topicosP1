// src/tareas/dto/create-worker.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, Min } from 'class-validator';

export class CreateWorkerDto {
  @ApiPropertyOptional({ description: 'Cantidad de concurrencia del worker', example: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  concurrency?: number;
}
