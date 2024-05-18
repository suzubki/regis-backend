import { createInsertSchema } from "drizzle-zod"
import { usersModel } from "~/data/model/schema"

const insertUserSchema = createInsertSchema(usersModel)

export const createUserSchema = insertUserSchema.pick({ name: true, email: true, password: true })
export const loginUserSchema = insertUserSchema.pick({ email: true, password: true })
