import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TempService } from './temp.service';
import { UsersService } from 'src/users/users.service';

@Controller('temp')
export class TempController {
    constructor(
        private tempService: TempService,
        private userService: UsersService,
    ) {}

    @Get()
    index() {
        return this.tempService.index();
    }

    @Get(':id')
    getTest(@Param('id', ParseIntPipe) id: number) {
        return this.tempService.getTest(id);
    }
}
