// src/common/controllers/stats.controller.ts
import { Controller, Get } from '@nestjs/common';
import { RequestCounterMiddleware } from './request-counter.middleware'; 
import { ApiTags } from '@nestjs/swagger';

@ApiTags('peticiones')
@Controller('stats')
export class StatsController {
  @Get('requests')
  getRequestsCount() {
    return {
      totalRequests: RequestCounterMiddleware.getCount(),
    };
  }
}
