import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/schemas/user.schema';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(userDto: UserDto) {
        const user: User = await this.usersService.findOne({
            username: userDto.username,
        });

        if (userDto.password !== user.password)
            throw new UnauthorizedException(`Wrong password`);

        const payload = {
            id: user._id,
            username: user.username,
            roles: user.roles,
        };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    signUp() {}
}
