import { Reflector } from '@nestjs/core';
import { SetMetadata, createParamDecorator } from '@nestjs/common';
import { ROLE_KEY, Role } from 'src/global/roles.enum';

// export const Roles = Reflector.createDecorator<string[]>();

export const Roles = (...roles: Role[]) => SetMetadata(ROLE_KEY, roles);
