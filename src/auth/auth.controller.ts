import {
    Controller,
    Post,
    HttpStatus,
    HttpCode,
    Body,
    Req,
    UseGuards,
    Get,
    UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/users/dto/user.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @UsePipes()
    signIn(@Body() userDto: UserDto) {
        return this.authService.signIn(userDto);
    }

    @Post('signup')
    signUp() {
        return 'Signup';
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Req() req) {
        return req.user;
    }
}
