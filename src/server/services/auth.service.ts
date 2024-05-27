import { InsertUser } from "~/data/model/schema"
import AuthRepository from "~/data/repositories/auth.repository"
import { crypt } from "~/server/utils/common"
import { RegisError } from "~/server/utils/errors/RegisError"

class AuthService {
  static async signUp({ email, name, password }: Omit<InsertUser, "id">) {
    const hashedPassword = await crypt.encrypt(password)

    const user = await AuthRepository.create({ email, name, password: hashedPassword })

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    }
  }

  static async login({ email, password }: Pick<InsertUser, "email" | "password">) {
    const user = await AuthRepository.findOne({ email })

    const validPassword = await this.verifyPassword({ password, hashedPassword: user.password })

    if (!validPassword) throw new RegisError(401, "Invalid email or password")

    const authenticatedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken: "access_token",
      refreshToken: "refresh_token",
    }

    return authenticatedUser
  }

  static async verifyPassword({ password, hashedPassword }: { password: string; hashedPassword: string }) {
    return await crypt.compare(password, hashedPassword)
  }
}

export default AuthService
