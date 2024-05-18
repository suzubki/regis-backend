import { pgTable, serial, text } from "drizzle-orm/pg-core"

export const usersModel = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  picture_url: text("picture_url").notNull(),
})

export type InsertUser = typeof usersModel.$inferInsert
export type SelectUser = typeof usersModel.$inferSelect
