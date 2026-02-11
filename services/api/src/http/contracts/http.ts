import { z } from 'zod';

export const HealthResponseDTOSchema = z.object({
  data: z.object({
    status: z.literal('ok'),
  }),
});

export const ErrorBodyDTOSchema = z.object({
  code: z.string(),
  message: z.string(),
  requestId: z.string().nullable(),
  path: z.string(),
  method: z.string(),
  docsUrl: z.string(),
  details: z.unknown().nullable(),
});

export const ErrorResponseDTOSchema = z.object({
  error: ErrorBodyDTOSchema,
});
