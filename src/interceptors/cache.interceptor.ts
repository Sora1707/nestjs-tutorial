import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const isCached = true;
        if (isCached) {
            return of([]); // immediately returns []
        }
        // return next.handle().pipe(tap(() => console.log('Cache Interceptor')));
    }
}
