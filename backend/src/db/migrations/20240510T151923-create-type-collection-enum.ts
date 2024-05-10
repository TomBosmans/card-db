import { Kysely } from "kysely"

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .createType("collection_enum")
    .asEnum(["ashes_reborn", "lotr_the_card_game", "arkham_horror_the_card_game", "fab", "mtg"])
    .execute()
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropType("collection_enum").execute()
}
