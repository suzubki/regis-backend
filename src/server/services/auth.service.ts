import { InsertUser } from "~/data/model/schema"
import AuthRepository from "~/data/repositories/auth.repository"

class AuthService {
  static async signUp({ email, name, password }: Omit<InsertUser, "id">) {
    const user = await AuthRepository.create({ email, name, password })

    return user
  }

  static async login(id: number) {
    const user = await AuthRepository.findOne({ id })

    return user
  }
}

export default AuthService
