import { Role } from '@prisma/client';

export type CreateUserDto = {
  email: string;
  password: string;
  fullName: string;
  role: Role;
  institutionId?: string | null;
};

export type UpdateUserDto = {
  email?: string;
  password?: string;
  fullName?: string;
  role?: Role;
  institutionId?: string | null;
  isActive?: boolean;
};
