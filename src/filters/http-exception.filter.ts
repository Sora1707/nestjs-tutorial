import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        console.log('HttpException filter');

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const httpStatus = exception.getStatus();
        const message = exception.message;
        const exceptionRes = exception.getResponse();
        const data =
            typeof exceptionRes === 'string'
                ? exceptionRes
                : exceptionRes['data'];

        response.status(httpStatus).json({
            message,
            statusCode: httpStatus,
            timestamp: new Date().toISOString(),
            path: request.url,
            data,
        });
    }
}
