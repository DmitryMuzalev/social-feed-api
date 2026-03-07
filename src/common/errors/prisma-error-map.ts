import { Prisma } from '@prisma/client';
import { HttpError } from './http-error';

export const PRISMA_ERROR = {
  UNIQUE: 'P2002',
  FK: 'P2003',
  NOT_FOUND: 'P2025',
} as const;

export const mapPrismaError = (
  error: unknown,
  fallbackMessage = 'Database error'
): never => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case PRISMA_ERROR.UNIQUE:
        throw new HttpError(409, 'Unique constraint violation', error.meta);
      case PRISMA_ERROR.FK:
        throw new HttpError(400, 'Invalid relation reference', error.meta);
      case PRISMA_ERROR.NOT_FOUND:
        throw new HttpError(404, 'Entity not found', error.meta);
      default:
        throw new HttpError(400, fallbackMessage, {
          code: error.code,
          meta: error.meta,
        });
    }
  }

  throw error;
};
