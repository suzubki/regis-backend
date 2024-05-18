import { type Request, type Response } from "express"
import AuthService from "~/server/services/auth.service"

class AuthController {
  static async signUp(req: Request, res: Response) {
    try {
      const { email, name, picture_url } = req.body

      const user = await AuthService.signUp({ email, name, picture_url })

      return res.status(201).json(user)
    } catch (error) {
      console.log({ error })

      return res.status(500).json({ error: "An unexpected error happened" })
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email } = req.body

      const user = await AuthService.login(email)

      return res.status(200).json(user)
    } catch (error) {
    }
  }
}

export default AuthController
