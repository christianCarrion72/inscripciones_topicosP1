// src/common/controllers/stats.controller.ts
import { Controller, Get } from '@nestjs/common';
import { RequestCounterMiddleware } from './request-counter.middleware'; 

@Controller('api/stats')
export class StatsController {
  @Get('requests')
  getRequestsCount() {
    return {
      totalRequests: RequestCounterMiddleware.getCount(),
    };
  }
}
