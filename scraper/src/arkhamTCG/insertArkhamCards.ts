import cards from "../../data/arkham_tcg_cards.json"
import db, { Collection } from "../db"

type Card = {
  name: string
}

export default async function insertArkhamCards() {
  const values = cards.map((card: Card) => ({
    name: card.name,
    collection: "arkham_horror_the_card_game" as Collection,
    meta: card,
  }))

  await db.deleteFrom("cards").where("collection", "=", "arkham_horror_the_card_game").execute()
  await db.insertInto("cards").values(values).execute()
}
