import {
    Controller,
    Get,
    Req,
    Res,
    Query,
    Param,
    Post,
    Body,
    Delete,
    Put,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    async findAll(): Promise<User[]> {
        const result = await this.usersService.findAll();
        return result;
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<User | unknown> {
        const result = await this.usersService.findById(id);
        return result;
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        const result = await this.usersService.create(createUserDto);
        return result;
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<User | unknown> {
        const result = await this.usersService.delete(id);
        return result;
    }

    @Put(':id')
    async put(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        const result = await this.usersService.put(id, updateUserDto);
        return result;
    }

    // @Get('/admin')
    // async findAdmin() {
    //     // throw new HttpException({message: 'Forbidden', ip: '127.0.0.2'}, HttpStatus.FORBIDDEN);
    //     throw new BadGatewayException('Bad gateway');
    // }
}
