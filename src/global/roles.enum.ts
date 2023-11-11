export enum Role {
    User = 'USER',
    Admin = 'ADMIN',
}

export const ROLE_KEY = 'roles';

export function isValidRole(role: string): boolean {
    const roleArray = Object.values(Role) as string[];
    return roleArray.includes(role);
}
