import cards from "../../data/ashes_reborn_cards.json"
import db, { Collection } from "../db"

export default async function insertAshesRebornCards() {
  const values = cards.map((card) => ({
    name: card.stub,
    collection: "ashes_reborn" as Collection,
    meta: card,
  }))

  await db.deleteFrom("cards").where("collection", "=", "ashes_reborn").execute()
  await db.insertInto("cards").values(values).execute()
}
