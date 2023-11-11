import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Request,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('Before...');

        const request: Request = context.switchToHttp().getRequest();

        const now = Date.now();
        return next
            .handle()
            .pipe(
                tap(() =>
                    console.log(
                        `[${request.method} ${request.url}] After... ${
                            Date.now() - now
                        }ms`,
                    ),
                ),
            );
    }
}
