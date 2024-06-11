import { eq } from "drizzle-orm"
import { SelectUser, usersModel } from "~/data/model/schema"
import { db } from "~/db"

class UserRepository {
  static async findById({ id }: Pick<SelectUser, "id">) {
    const user = await db.select().from(usersModel).where(eq(usersModel.id, id))

    return user[0]
  }

  static async findOne({ email }: Pick<SelectUser, "email">) {
    const user = await db.select().from(usersModel).where(eq(usersModel.email, email))

    return user[0]
  }

  static async create({ email, name, password }: Pick<SelectUser, "email" | "name" | "password">) {
    const user = await db.insert(usersModel).values({
      id: usersModel.id.default,
      name: name,
      email: email,
      password: password,
    }).returning()

    return user[0]
  }
}

export default UserRepository
