import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class TempService {
    index() {
        throw new Error();
        // throw new BadRequestException('Bad request');
    }
    getTest(id: number) {
        return `Get user ${id}`;
    }
}
