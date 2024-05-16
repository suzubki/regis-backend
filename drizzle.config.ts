import { defineConfig } from 'drizzle-kit';
import { env } from './src/env'

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './src/data/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: env.DATABASE_HOST,
    port: Number(env.DATABASE_PORT),
    user: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
  },
});