import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { Role, isValidRole } from 'src/global/roles.enum';

@Injectable()
export class RoleValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata) {
        const { metatype, type, data } = metadata;

        // Modify the roles field
        if (value && typeof value === 'object') {
            if (!value.hasOwnProperty('roles')) {
                value['roles'] = [];
            }
            if (!value['roles'].includes(Role.User)) {
                value['roles'].push(Role.User);
            }
        }

        const object: Object = plainToInstance(metatype, value);

        console.log(object);
        const errors = await validate(object);

        // class-validator errors
        if (errors.length > 0) {
            throw new BadRequestException(errors);
        }

        // Roles checking
        const roles: string[] = object['roles'];
        const invalidRoles = roles.filter(role => !isValidRole(role));

        if (invalidRoles.length > 0) {
            throw new BadRequestException({
                message: 'Invalid Roles',
                data: invalidRoles,
            });
        }

        return value;
    }
}
