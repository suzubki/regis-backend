/* eslint-disable @typescript-eslint/no-explicit-any */
import { createInsertSchema } from "drizzle-zod"
import { NextFunction, Request, Response } from "express"
import { z, ZodError } from "zod"
import { usersModel } from "~/data/model/schema"

const insertUserSchema = createInsertSchema(usersModel)

export const createUserSchema = insertUserSchema.pick({ name: true, email: true, picture_url: true })

export const validateData = (schema: z.ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)

      next()
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }))

        res.status(400).json({ error: "Invalid data", details: errorMessages })
      } else {
        res.status(500).json({ error: "Internal Server Error" })
      }
    }
  }
}
