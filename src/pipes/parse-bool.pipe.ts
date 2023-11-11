import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseBoolPipe implements PipeTransform<any, Boolean> {
    transform(value: any, metadata: ArgumentMetadata): Boolean {
        if (value === null) return false;
        if (value === undefined) return false;
        if (value === 0) return false;
        if (value === '') return false;
        if (Number.isNaN(value)) return false;
        if (typeof value === 'string' && value.toLowerCase() == 'false')
            return false;
        return true;
    }
}
