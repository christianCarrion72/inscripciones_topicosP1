// src/common/exceptions/exception.filter.ts
import {ExceptionFilter,Catch,ArgumentsHost,HttpException,HttpStatus,} from '@nestjs/common';
import { Request, Response } from 'express';
  
@Catch()
export class AppExceptionFilter implements ExceptionFilter {
catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const isHttpException = exception instanceof HttpException;
    const status = isHttpException
    ? exception.getStatus()
    : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse = isHttpException
    ? (exception.getResponse() as any)
    : { message: 'Internal server error' };

    response.status(status).json({
    timestamp: new Date().toISOString(),
    path: request.url,
    statusCode: status,
    error: exceptionResponse.error ?? 'UNEXPECTED_ERROR',
    message: exceptionResponse.message ?? 'Unexpected error',
    });
}
}
  