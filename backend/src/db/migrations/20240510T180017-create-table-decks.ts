import { Kysely, sql } from "kysely"

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .createTable("decks")
    .addColumn("id", "uuid", (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn("user_id", "uuid", (col) => col.references("users.id"))
    .addColumn("card_ids", sql`uuid[]`, (col) => col.defaultTo(sql`'{}'::uuid[]`))
    .addColumn("collection", sql`collection_enum`, (col) => col.notNull())
    .addColumn("name", "varchar", (col) => col.notNull())
    .addColumn("meta", "jsonb", (col) => col.defaultTo(sql`'{}'::jsonb`))
    .addColumn("created_at", "timestamptz", (col) => col.notNull().defaultTo(sql`NOW()`))
    .addColumn("updated_at", "timestamptz", (col) => col.notNull().defaultTo(sql`NOW()`))
    .execute()
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropTable("decks").execute()
}
