// src/common/middleware/request-counter.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestCounterMiddleware implements NestMiddleware {
  private static counter = 0; // Contador estático para que sea global

  use(req: Request, res: Response, next: NextFunction) {
    RequestCounterMiddleware.counter++;
    next();
  }

  // Método para obtener el total
  static getCount(): number {
    return RequestCounterMiddleware.counter;
  }
}
