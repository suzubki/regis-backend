import { drizzle } from "drizzle-orm/node-postgres"
import { Client } from "pg"
import { env } from "~/env"

const client = new Client({
  host: env.DATABASE_HOST,
  port: Number(env.DATABASE_PORT),
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
})

export const db = drizzle(client)
