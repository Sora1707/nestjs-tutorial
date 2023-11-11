import {
    Controller,
    Get,
    Req,
    Query,
    Param,
    Post,
    Body,
    Delete,
    Put,
    UsePipes,
    ValidationPipe,
    DefaultValuePipe,
    ParseIntPipe,
    UseGuards,
    UseInterceptors,
    Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserDto } from './dto/user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { ParseBoolPipe } from 'src/pipes/parse-bool.pipe';
import { RolesGuard } from './roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { LoggingInterceptor } from 'src/interceptors/temp.interceptor';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { CacheInterceptor } from 'src/interceptors/cache.interceptor';
import { TimeOutInterceptor } from 'src/interceptors/timeout.interceptor';
import { Log, MyRequest } from 'src/decorators/request.decorator';
import { Role } from 'src/global/roles.enum';
import { RoleValidationPipe } from 'src/pipes/roles-validation.pipe';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Action } from 'src/global/actions.enum';
import { Article } from './schemas/article.schema';

// @UseFilters(HttpExceptionFilter)
@Controller('users')
@UseGuards(RolesGuard)
@UseInterceptors(
    LoggingInterceptor,
    TransformInterceptor,
    // CacheInterceptor,
    // TimeOutInterceptor,
)
export class UsersController {
    constructor(
        private usersService: UsersService,
        private caslAbilityFactor: CaslAbilityFactory,
        @Inject('MY_CONFIG') private appConfig: any,
    ) {}

    @Get()
    async findAll(): Promise<User[]> {
        const result = await this.usersService.findAll();
        return result;
    }

    @Roles(Role.User)
    @Get('list')
    async findAllAuthorized(
        @Req() req: Request,
        @Query('sort', new DefaultValuePipe(false), ParseBoolPipe)
        isSorted: boolean,
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
        @MyRequest('header') method: string,
    ): Promise<User[]> {
        const userPayload = req['user'];

        const roles: Role[] = userPayload.roles;
        const id: string = userPayload.id;

        let result: User[];
        if (roles.includes(Role.Admin))
            result = await this.usersService.findAll();
        else result = [await this.usersService.findById(id)];
        return result;
    }

    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Get('admin')
    getAdmin(@Req() req: Request) {
        return 'I am Sora';
    }

    @Get('username/:username')
    async findByUserName(@Param('username') username: string) {
        const user = await this.usersService.findOne({ username });

        const ability = this.caslAbilityFactor.createForUser(user);
        console.log(ability.can(Action.Manage, Article));
        console.log(ability.can(Action.Create, Article));
        console.log(ability.can(Action.Read, Article));
        console.log(ability.can(Action.Update, Article));
        console.log(ability.can(Action.Delete, Article));

        return user;
    }

    @Roles(Role.Admin)
    @Get(':id')
    async findById(@Param('id') id: string): Promise<User | unknown> {
        const result = await this.usersService.findById(id);
        return result;
    }

    @UsePipes(RoleValidationPipe)
    @Post()
    async create(
        @Body(new ValidationPipe({ whitelist: true }))
        userDto: UserDto,
    ): Promise<User> {
        console.log(userDto);
        const result = await this.usersService.create(userDto);
        return result;
    }

    // @Roles(Role.Admin)
    @Delete('')
    async deleteAll() {
        const result = await this.usersService.deleteAll();
        return result;
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<User | unknown> {
        const result = await this.usersService.delete(id);
        return result;
    }

    @Put(':id')
    async put(@Param('id') id: string, @Body() userDto: UserDto) {
        const result = await this.usersService.put(id, userDto);
        return result;
    }
}
