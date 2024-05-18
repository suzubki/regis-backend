CREATE TABLE IF NOT EXISTS "users_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" serial NOT NULL,
	"email" serial NOT NULL,
	"picture_url" serial NOT NULL,
	CONSTRAINT "users_table_email_unique" UNIQUE("email")
);
