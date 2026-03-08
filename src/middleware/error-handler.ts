import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error & { status?: number; details?: unknown },
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = err.status ?? 500;

  res.status(status).json({
    message: err.message || 'Internal server error',
    details: err.details,
  });
};
