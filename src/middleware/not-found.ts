import { Request, Response, NextFunction } from 'express';

export const notFound = (_req: Request, _res: Response, next: NextFunction) => {
  const error = new Error('Route not found');
  (error as Error & { status?: number }).status = 404;
  next(error);
};
