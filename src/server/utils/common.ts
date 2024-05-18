/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextFunction, Request, Response } from "express"
import { z, ZodError } from "zod"

export const validateData = (schema: z.ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)

      return next()
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }))

        return res.status(400).json({ error: "Invalid data", details: errorMessages })
      } else {
        return res.status(500).json({ error: "Internal Server Error" })
      }
    }
  }
}
