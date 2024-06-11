import { type NextFunction, type Request, type Response } from "express"
import { InsertUser } from "~/data/model/schema"
import AuthService from "~/server/services/auth.service"

class AuthController {
  static async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, name, password } = req.body as Pick<InsertUser, "email" | "name" | "password">

      const user = await AuthService.signUp({ email, name, password })

      res.locals.data = user
      res.locals.status = 201

      return next()
    } catch (error) {
      return next(error)
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body

      const authenticatedUser = await AuthService.login({ email, password })

      res.locals.data = authenticatedUser
      res.locals.status = 200

      return next()
    } catch (error) {
      console.log({ error })
      return next(error)
    }
  }

  // Should validate
  static async verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, provider } = req.body
      if (provider != "google") throw new Error()

      const authenticatedUser = AuthService.verifyToken({ token, provider })!

      res.locals.data = authenticatedUser
      res.locals.status = 200

      return next()
    } catch (error) {
      console.log({ error })
      return next(error)
    }
  }
}

export default AuthController
