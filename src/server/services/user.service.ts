import AuthRepository from "~/data/repositories/auth.repository"

class UserService {
  static async getUserByEmail(email: string) {
    return await AuthRepository.findOne({ email })
  }
}

export default UserService
