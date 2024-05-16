import { pgTable, serial } from "drizzle-orm/pg-core"

export const usersModel = pgTable("users_table", {
  id: serial("id").primaryKey(),
  name: serial("name").notNull(),
  email: serial("email").notNull().unique(),
  pictureUrl: serial("picture_url").notNull(),
})

export type InsertUser = typeof usersModel.$inferInsert
export type SelectUser = typeof usersModel.$inferSelect
