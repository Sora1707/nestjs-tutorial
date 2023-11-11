import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './schemas/user.schema';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { CaslModule } from 'src/casl/casl.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/crud_dev}'),

        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),

        CaslModule,
    ],
    providers: [
        UsersService,
        {
            provide: 'MY_CONFIG',
            useValue: { ip: 'localhost', version: '1.0' },
        },
        {
            provide: 'APP_CONFIG',
            useValue: { ip: '1.1.1.1', version: '1.0' },
        },
    ],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule {}
