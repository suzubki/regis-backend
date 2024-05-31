import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const usersModel = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  picture_url: text("picture_url"),
  password: text("password").notNull(),

  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
})

export type InsertUser = typeof usersModel.$inferInsert
export type SelectUser = typeof usersModel.$inferSelect
