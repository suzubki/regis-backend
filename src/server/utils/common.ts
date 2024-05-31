/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from "bcrypt"
import type { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { z, ZodError } from "zod"
import { env } from "~/env"

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

// ----------------------------
export const crypt = {
  encrypt: encryptString,
  compare: compareString,
}

/**
 * Encrypts a string using SALTS_ROUNDS
 * @param str
 * @returns Promise string
 */
async function encryptString(str: string) {
  return await bcrypt.hash(str, Number(env.SALT_ROUNDS))
}

/**
 * Compares a string with a hash
 * @param str
 * @param hash
 * @returns Promise boolean
 */
async function compareString(str: string, hash: string) {
  return await bcrypt.compare(str, hash)
}

// ----------------------------
export const signToken = {
  accessToken: signAccessToken,
  refreshToken: signRefreshToken,
}

/**
 * We are using the user email, id, name and picture_url to sign the access token
 * @param user
 * @returns Promise string
 */
function signAccessToken(user: Record<string, any>) {
  return jwt.sign({ email: user.email, id: user.id, name: user.name, picture_url: user.picture_url }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  })
}

/**
 * We are using the user id to sign the refresh token
 * @param user, user object
 * @returns Promise string
 */
function signRefreshToken(user: Record<string, any>) {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: "31d",
  })
}
