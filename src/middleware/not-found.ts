import { Request, Response, NextFunction } from 'express';
import { HttpError } from '@/common/errors';

export const notFound = (_req: Request, _res: Response, next: NextFunction) => {
  next(new HttpError(404, 'Route not found'));
};
