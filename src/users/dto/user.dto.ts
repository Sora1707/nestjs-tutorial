import {
    ArrayMinSize,
    Contains,
    IsArray,
    IsNotEmpty,
    IsString,
    MinLength,
} from 'class-validator';
import { Role } from 'src/global/roles.enum';

export class UserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    username: string;

    @IsString()
    @MinLength(3)
    password: string;

    @IsArray()
    @ArrayMinSize(1)
    roles: Role[];
}
