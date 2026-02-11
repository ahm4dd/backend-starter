import { AppError } from '@template/shared';
import type { NextFunction, Request, Response } from 'express';
import { ZodError, z } from 'zod';
import { DOCS_ROUTE } from '../openapi.ts';

type ErrorPayload = {
  code: string;
  message: string;
  requestId: string | null;
  path: string;
  method: string;
  docsUrl: string;
  details: unknown | null;
};

function buildErrorPayload(
  req: Request,
  code: string,
  message: string,
  details: unknown | null = null,
): ErrorPayload {
  return {
    code,
    message,
    requestId: req.id ?? null,
    path: req.originalUrl,
    method: req.method,
    docsUrl: DOCS_ROUTE,
    details,
  };
}

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof ZodError) {
    const error = buildErrorPayload(req, 'VALIDATION_ERROR', 'Invalid input', z.flattenError(err));
    return res.status(400).json({ error });
  }

  if (err instanceof AppError) {
    const error = buildErrorPayload(req, err.code, err.message);
    return res.status(err.httpStatus).json({ error });
  }

  const error = buildErrorPayload(req, 'INTERNAL_SERVER_ERROR', 'Unexpected error');
  return res.status(500).json({
    error,
  });
}
