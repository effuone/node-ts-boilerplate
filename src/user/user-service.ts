import { Prisma, User } from '@prisma/client';
import prisma from '../database';

export default class UserService {
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({ data });
  }

  async getAllUsers(): Promise<User[]> {
    return await prisma.user.findMany({});
  }

  async getUserById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async updateUser(
    id: number,
    data: Prisma.UserUpdateInput
  ): Promise<User | null> {
    return prisma.user.update({ where: { id }, data });
  }

  async deleteUser(id: number): Promise<User | null> {
    return prisma.user.delete({ where: { id } });
  }
}
