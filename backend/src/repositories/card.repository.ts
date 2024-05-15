import cardSchema from "@schemas/card.schema"
import { sql } from "kysely"
import { Database } from "src/db"
import SelectCardsQuery, { SelectCardsQueryParams } from "src/queries/select-cards.query"

export default class CardRepository {
  constructor(
    private readonly db: Database,
    private readonly selectCardsQuery: SelectCardsQuery,
  ) {}

  public async findMany(params: SelectCardsQueryParams, db: Database = this.db) {
    const cards = this.selectCardsQuery.build(params, db).execute()
    return cardSchema.array().parse(cards)
  }

  public async findFirst(params: SelectCardsQueryParams, db: Database = this.db) {
    const [card] = await this.selectCardsQuery.build(params, db).execute()
    return cardSchema.parse(card)
  }

  public async count(params: SelectCardsQueryParams, db: Database = this.db) {
    const [{ count }] = await this.selectCardsQuery
      .build(params, db)
      .clearSelect()
      .clearOrderBy()
      .select(sql<number>`count(*)`.as("count"))
      .execute()

    return count
  }
}
