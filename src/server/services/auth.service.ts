import { OAuth2Client } from "google-auth-library"
import { InsertUser } from "~/data/model/schema"
import { UserRepository } from "~/data/repositories"
import { env } from "~/env"
import { crypt, signToken } from "~/server/utils/common"
import { NoPayloadProvidedError, UserNotFoundError, WrongCredentialsError } from "~/server/utils/errors/RegisError"

// Should move this file into their own service and class
const oAuth2Client = new OAuth2Client()

class AuthService {
  static async signUp({ email, name, password }: Omit<InsertUser, "id">) {
    const hashedPassword = await crypt.encrypt(password)
    const user = await UserRepository.create({ email, name, password: hashedPassword })

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    }
  }

  static async login({ email, password }: Pick<InsertUser, "email" | "password">) {
    const user = await UserRepository.findOne({ email })
    if (!user) throw new UserNotFoundError()

    const validPassword = await this.verifyPassword({ password, hashedPassword: user.password })
    if (!validPassword) throw new WrongCredentialsError()

    return this.createAuthenticatedUser({ email, id: user.id, name: user.name })
  }

  static async verifyPassword({ password, hashedPassword }: { password: string; hashedPassword: string }) {
    return await crypt.compare(password, hashedPassword)
  }

  // Should use strategy pattern to handle verification in each provider
  static async verifyToken({ token, provider }: { token: string; provider: string }) {
    // By the moment we will only use Google Provider
    if (provider === "google") {
      const ticket = await oAuth2Client.verifyIdToken({
        idToken: token,
        audience: env.GOOGLE_CLIENT_ID,
      })

      const payload = ticket.getPayload()
      if (!payload) throw new NoPayloadProvidedError()

      const userId = payload["sub"]
      const user = await UserRepository.findById({ id: userId })
      if (!user) throw new UserNotFoundError()

      return this.createAuthenticatedUser({ id: user.id, email: user.email, name: user.name })
    }
  }

  static createSession({ id, name, email }: { id: string; name: string; email: string }) {
    const accessToken = signToken.accessToken({ id, name, email })
    const refreshToken = signToken.refreshToken({ id })

    return { accessToken, refreshToken }
  }

  static async createAuthenticatedUser({ id, name, email }: { id: string; name: string; email: string }) {
    const { accessToken, refreshToken } = this.createSession({ id, name, email })

    return {
      id: id,
      name: name,
      email: email,
      accessToken: accessToken,
      refreshToken: refreshToken,
    }
  }
}

export default AuthService
