import { drizzle } from "drizzle-orm/node-postgres"
import { Client } from "pg"
import * as schema from "~/data/model/schema"
import { env } from "~/env"

const client = new Client({
  host: env.DATABASE_HOST,
  port: Number(env.DATABASE_PORT),
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
})

async function enableConnection() {
  await client.connect()
}

enableConnection()
export const db = drizzle(client, { schema })
