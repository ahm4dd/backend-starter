import { z } from "zod";

const NodeEnvs = ["development", "production", "test"] as const;
type NodeEnv = (typeof NodeEnvs)[number];

const ConfigSchema = z.object({
  NODE_ENV: z.enum(NodeEnvs).default("development"),
  PORT: z.string().default("3000"),
  DATABASE_URL: z.string(),
});

type Config = z.infer<typeof ConfigSchema>;

const parsedConfig = ConfigSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV as NodeEnv,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
} satisfies Partial<Config>);

if (!parsedConfig.success) {
  const flattenedError = z.flattenError(parsedConfig.error);
  console.error("Invalid environment configuration");
  console.error(flattenedError);
  process.exit(1);
}

export const config = parsedConfig.data;
