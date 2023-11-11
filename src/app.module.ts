import {
    Module,
    NestModule,
    MiddlewareConsumer,
    RequestMethod,
    UseFilters,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { logger } from './middlewares/logger.middleware';
import { printer } from './middlewares/printer.middleware';
import { AuthModule } from './auth/auth.module';
import { TempModule } from './temp/temp.module';
import { CaslModule } from './casl/casl.module';

@Module({
    imports: [AuthModule, UsersModule, TempModule, CaslModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(logger)
            //.forRoutes('users');
            .forRoutes({ path: 'users/2', method: RequestMethod.GET });
        consumer
            .apply(printer)
            .forRoutes({ path: 'users/1', method: RequestMethod.GET });
    }
}
