import CountQuery from "src/queries/common/count.query"
import DeleteQuery, { DeleteQueryParams } from "src/queries/common/delete.query"
import InsertQuery, { InsertQueryParams } from "src/queries/common/insert.query"
import SelectQuery, { SelectQueryParams } from "src/queries/common/select.query"
import UpdateQuery, { UpdateQueryParams } from "src/queries/common/update.query"
import cardSchema from "@schemas/card.schema"
import { Database } from "src/db"

export default class CardRepository {
  constructor(
    private readonly db: Database,
    private readonly selectQuery: SelectQuery<"cards">,
    private readonly insertQuery: InsertQuery<"cards">,
    private readonly updateQuery: UpdateQuery<"cards">,
    private readonly deleteQuery: DeleteQuery<"cards">,
    private readonly countQuery: CountQuery<"cards">,
  ) {}

  public async findMany(params: SelectQueryParams<"cards">, db: Database = this.db) {
    const cards = await this.selectQuery.build("cards", params, db).execute()
    return cardSchema.array().parse(cards)
  }

  public async findFirst(params: SelectQueryParams<"cards">, db: Database = this.db) {
    const card = await this.selectQuery.build("cards", params, db).limit(1).executeTakeFirst()
    return card ? cardSchema.parse(card) : null
  }

  public async count(params: SelectQueryParams<"cards">, db: Database = this.db) {
    const selectQuery = this.selectQuery.build("cards", params, db)
    const count = await this.countQuery.build("cards", selectQuery).executeTakeFirstOrThrow()
    return count
  }

  public async create(params: InsertQueryParams<"cards">, db: Database = this.db) {
    const car = await this.insertQuery.build("cards", params, db).executeTakeFirstOrThrow()
    return cardSchema.parse(car)
  }

  public async update(params: UpdateQueryParams<"cards">, db: Database = this.db) {
    const car = await this.updateQuery.build("cards", params, db).executeTakeFirstOrThrow()
    return cardSchema.parse(car)
  }

  public async updateMany(params: UpdateQueryParams<"cards">, db: Database = this.db) {
    const cars = await this.updateQuery.build("cards", params, db).execute()
    return cardSchema.array().parse(cars)
  }

  public async delete(params: DeleteQueryParams<"cards">, db: Database = this.db) {
    const car = await this.deleteQuery.build("cards", params, db).limit(1).executeTakeFirstOrThrow()
    return cardSchema.parse(car)
  }

  public async deleteMany(params: DeleteQueryParams<"cards">, db: Database = this.db) {
    const cars = await this.deleteQuery.build("cards", params, db).execute()
    return cardSchema.array().parse(cars)
  }
}
