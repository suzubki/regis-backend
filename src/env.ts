import dotenv from "dotenv"
import { z } from "zod"

dotenv.config()

const envSchema = z.object({
  PORT: z.string(),
  // Database
  DATABASE_URI: z.string(),
  DATABASE_NAME: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_HOST: z.string().default("localhost"),
  DATABASE_PORT: z.string().default("5432"),

  // Google Config
  GOOGLE_CLIENT_ID: z.string(),

  // Other
  JWT_SECRET: z.string(),
  SALT_ROUNDS: z.string(),
})

const parsedEnv = envSchema.safeParse(process.env)
if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:", JSON.stringify(parsedEnv.error.format(), null, 4))
  process.exit(1)
}

export const env = envSchema.parse(process.env)
