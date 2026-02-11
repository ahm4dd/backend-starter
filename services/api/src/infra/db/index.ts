import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { config } from '../../config/env.ts';
import * as schema from './schema.ts';

export const pool = new Pool({
  connectionString: config.DATABASE_URL,
});
export const db = drizzle({ client: pool, schema });
export type AppDb = typeof db;

export function createDb(client: Pool) {
  return drizzle({ client, schema });
}
