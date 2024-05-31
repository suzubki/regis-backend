import { eq } from "drizzle-orm"
import { InsertUser, SelectUser, usersModel } from "~/data/model/schema"
import { db } from "~/db"

class AuthRepository {
  static async create({ email, name, password }: InsertUser) {
    const user = await db.insert(usersModel).values({
      id: usersModel.id.default,
      name: name,
      email: email,
      password: password,
    }).returning()

    return user[0]
  }

  static async findOne({ email }: Pick<SelectUser, "email">) {
    const user = await db.select().from(usersModel).where(eq(usersModel.email, email))

    return user[0]
  }
}

export default AuthRepository
