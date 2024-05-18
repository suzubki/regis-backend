import { InsertUser, SelectUser, usersModel } from "~/data/model/schema"
import { db } from "~/db"

class AuthRepository {
  static async create({ email, name, picture_url }: InsertUser) {
    const user = await db.insert(usersModel).values({
      name: name,
      email: email,
      picture_url: picture_url,
    }).returning()

    return user
  }

  static async findOne(id: Pick<SelectUser, "id">) {
    const user = await db.query.usersModel.findFirst({
      with: { id: id },
    })

    return user
  }
}

export default AuthRepository
