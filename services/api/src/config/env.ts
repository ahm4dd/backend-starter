import { z } from 'zod';

const ConfigSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  // NODE_ENV: z.string().default('development'),
  PORT: z.string().default("3000"),
});

const parsedConfig = ConfigSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
});

if (!parsedConfig.success) {
  const flattenedError = z.flattenError(parsedConfig.error);
  // TODO: Add logging here for an error
  process.exit(1);
}

export const config = parsedConfig.data!;
