import AuthRepository from "~/data/repositories/auth.repository"

class UserService {
  static async getUserById(id: number) {
    return await AuthRepository.findOne({ id })
  }
}

export default UserService
