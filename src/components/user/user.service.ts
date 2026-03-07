import bcrypt from 'bcrypt';
import { Prisma, Role } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { config } from '@/config';
import { HttpError } from '@/common/errors/http-error';
import { mapPrismaError } from '@/common/errors/prisma-error-map';
import { CreateUserDto, UpdateUserDto } from './user.types';

const userPublicSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  email: true,
  fullName: true,
  role: true,
  institutionId: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
});

const isRole = (role: unknown): role is Role =>
  typeof role === 'string' && Object.values(Role).includes(role as Role);

export const userService = {
  async getAll() {
    return prisma.user.findMany({ select: userPublicSelect });
  },

  async getById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: userPublicSelect,
    });
    if (!user) throw new HttpError(404, 'User not found');
    return user;
  },

  async create(data: CreateUserDto) {
    if (!isRole(data.role)) throw new HttpError(400, 'Invalid role');

    const hashed = await bcrypt.hash(data.password, config.bcryptSaltRounds);

    try {
      return await prisma.user.create({
        data: {
          ...data,
          password: hashed,
          institutionId: data.institutionId ?? null,
        },
        select: userPublicSelect,
      });
    } catch (e) {
      mapPrismaError(e, 'Failed to create user');
    }
  },

  async update(id: string, input: UpdateUserDto) {
    const payload: Prisma.UserUpdateInput = {};

    if (input.email !== undefined) payload.email = input.email;
    if (input.fullName !== undefined) payload.fullName = input.fullName;
    if (input.isActive !== undefined) payload.isActive = input.isActive;

    if (input.role !== undefined) {
      if (!isRole(input.role)) throw new HttpError(400, 'Invalid role');
      payload.role = input.role;
    }

    if (input.institutionId !== undefined) {
      payload.institution = input.institutionId
        ? { connect: { id: input.institutionId } }
        : { disconnect: true };
    }

    if (input.password) {
      payload.password = await bcrypt.hash(
        input.password,
        config.bcryptSaltRounds
      );
    }

    if (Object.keys(payload).length === 0) {
      throw new HttpError(400, 'No fields to update');
    }

    try {
      return await prisma.user.update({
        where: { id },
        data: payload,
        select: userPublicSelect,
      });
    } catch (e) {
      mapPrismaError(e, 'Failed to update user');
    }
  },

  async deactivate(id: string) {
    try {
      await prisma.user.update({
        where: { id },
        data: { isActive: false },
      });
    } catch (e) {
      mapPrismaError(e, 'Failed to deactivate user');
    }
  },
};
