import { type NextFunction, type Request, type Response } from "express"
import jwt from "jsonwebtoken"
import { env } from "~/env"
import UserService from "../services/user.service"

// Declare properties as optional to avoid TypeScript errors, they MUST be assigned later
interface CustomizedRequest extends Request {
  auth?: {
    email: string
    id: string
  }
}

export const isAuthenticated = (req: CustomizedRequest, res: Response, next: NextFunction) => {
  const authorization = req.get("Authorization")

  if (!authorization) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  const [_, accessToken] = authorization.split(" ")

  jwt.verify(accessToken, env.JWT_SECRET, async (err, payload) => {
    if (err || !payload || typeof payload !== "object" || !payload.id) return res.status(401).json({ error: "Invalid token" })

    const user = await UserService.getUserByEmail(payload.email)
    if (!user) return res.status(401).json({ error: "User not found" })

    if (!req.auth) {
      req.auth = {
        email: user.email,
        id: user.id,
      }
    }

    return next()
  })
}
