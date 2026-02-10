import { AppError } from '@template/shared';
import type { NextFunction, Request, Response } from 'express';
import { type ZodError, z } from 'zod';

// TODO: add the middleware for error handling
export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof ZodError) {
    const error = {
      code: 'VALIDATION_ERROR',
      message: 'Invalid input',
      details: z.flattenError(err),
      requestId: req.id,
    };
    return res.status(400).json({ error });
  }

  if (err instanceof AppError) {
    const error = {
      code: err.code,
      message: err.message,
      requestId: req.id,
    };
    return res.status(err.httpStatus).json({ error });
  }

  // TODO: add the logger here
  // logger.error({ err }, 'Unhandled error');
  const error = {
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Unexpected error',
    requestId: req.id,
  };
  return res.status(500).json({
    error,
  });
}
