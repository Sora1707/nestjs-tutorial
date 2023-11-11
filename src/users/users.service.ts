import { Model } from 'mongoose';
import {
    BadRequestException,
    Injectable,
    HttpException,
    HttpStatus,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async findAll(): Promise<User[]> {
        return await this.userModel.find();
    }

    async findOne(query: Object): Promise<User> {
        try {
            const result = await this.userModel.findOne(query);

            if (result === null) throw new Error();

            return result;
        } catch (error) {
            throw new UnauthorizedException(`User does not exist`);
        }
    }

    async findById(id: string): Promise<User> {
        try {
            const result = await this.userModel.findById(id);
            return result;
        } catch (error) {
            throw new BadRequestException(`Id ${id} cannot be found`);
        }
    }

    async create(userDto: UserDto): Promise<User> {
        const createdUser = new this.userModel(userDto);
        return await createdUser.save();
    }

    async deleteAll() {
        try {
            const result = await this.userModel.deleteMany({});
            return result;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async delete(id: string): Promise<User> {
        try {
            const result = await this.userModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            throw new BadRequestException(`Id ${id} cannot be found`);
        }
    }

    async put(id: string, userDto: UserDto) {
        try {
            const result = await this.userModel.findByIdAndUpdate(id, userDto);
            return result;
        } catch (error) {
            throw new BadRequestException(`Id ${id} cannot be found`);
        }
    }
}
