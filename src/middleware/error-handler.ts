import { ErrorRequestHandler } from 'express';
import { HttpError } from '@/common/errors';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      message: err.message,
      details: err.details,
    });
  }

  return res.status(500).json({
    message: 'Internal server error',
  });
};
