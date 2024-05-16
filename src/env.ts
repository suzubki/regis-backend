import dotenv from "dotenv"
import { z } from "zod"

dotenv.config()

const envSchema = z.object({
  PORT: z.string(),
})

const parsedEnv = envSchema.safeParse(process.env)
if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:", JSON.stringify(parsedEnv.error.format(), null, 4))
  process.exit(1)
}

export const env = envSchema.parse(process.env)
