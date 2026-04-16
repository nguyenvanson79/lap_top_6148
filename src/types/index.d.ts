import { user, Role } from '@prisma/client'

declare global {
    namespace Express {
        interface User extends Omit<user, 'password'> {
            role?: Role;
        }
    }
}