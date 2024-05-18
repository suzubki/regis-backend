import { type NextFunction, type Request, type Response } from "express"
import { InsertUser } from "~/data/model/schema"
import AuthService from "~/server/services/auth.service"

class AuthController {
  static async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, name, picture_url } = req.body as Pick<InsertUser, "email" | "name" | "picture_url">

      const user = await AuthService.signUp({ email, name, picture_url })

      res.locals.data = user
      res.locals.status = 201

      return next()
    } catch (error) {
      return next(error)
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body

      const user = await AuthService.login(email)

      res.locals.data = user
      res.locals.status = 200

      return next()
    } catch (error) {
      return next(error)
    }
  }
}

export default AuthController
