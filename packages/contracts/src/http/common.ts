import { z } from "zod";

export const HealthResponseSchema = z.object({
  data: z.object({
    status: z.literal("ok"),
  }),
});

export const ErrorBodySchema = z.object({
  code: z.string(),
  message: z.string(),
  requestId: z.string().nullable(),
  path: z.string(),
  method: z.string(),
  docsUrl: z.string(),
  details: z.record(z.string(), z.unknown()).nullable(),
});

export const ErrorResponseSchema = z.object({
  error: ErrorBodySchema,
});
