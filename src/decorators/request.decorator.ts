import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const MyRequest = createParamDecorator(
    (data: string, contenxt: ExecutionContext): string => {
        const request: Request = contenxt.switchToHttp().getRequest();
        if (data in request) return request[data];
        return 'oops';
    },
);

export const Log = createParamDecorator(
    (data: unknown, contenxt: ExecutionContext) => {
        return function (value: any) {
            console.log(value);
        };
    },
);
