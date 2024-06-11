import { User } from '@prisma/client';

export type UserWithoutPassword = Omit<User, 'passwordHash'>;

export interface CreateUserDto {
  email: string;
  password: string;
}
