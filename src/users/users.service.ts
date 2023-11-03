import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async findAll(): Promise<User[]> {
        return await this.userModel.find();
    }

    async findById(id: string): Promise<User | unknown> {
        try {
            const result = await this.userModel.findById(id);
            return result;
        } catch (error) {
            throw new BadRequestException(`Id ${id} cannot be found`);
        }
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return await createdUser.save();
    }

    async delete(id: string): Promise<User | unknown> {
        try {
            const result = await this.userModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            throw new BadRequestException(`Id ${id} cannot be found`);
        }
    }

    async put(id: string, updateUserDto: UpdateUserDto) {
        try {
            const result = await this.userModel.findByIdAndUpdate(
                id,
                updateUserDto,
            );
            return result;
        } catch (error) {
            throw new BadRequestException(`Id ${id} cannot be found`);
        }
    }
}
