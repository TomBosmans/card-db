import CountQuery from "src/queries/common/count.query"
import DeleteQuery, { DeleteQueryParams } from "src/queries/common/delete.query"
import InsertQuery, { InsertQueryParams } from "src/queries/common/insert.query"
import SelectQuery, { SelectQueryParams } from "src/queries/common/select.query"
import UpdateQuery, { UpdateQueryParams } from "src/queries/common/update.query"
import deckSchema from "@schemas/deck.schema"
import { Database } from "src/db"

export default class DeckRepository {
  constructor(
    private readonly db: Database,
    private readonly selectQuery: SelectQuery<"decks">,
    private readonly insertQuery: InsertQuery<"decks">,
    private readonly updateQuery: UpdateQuery<"decks">,
    private readonly deleteQuery: DeleteQuery<"decks">,
    private readonly countQuery: CountQuery<"decks">,
  ) {}

  public async findMany(params: SelectQueryParams<"decks">, db: Database = this.db) {
    const decks = await this.selectQuery.build("decks", params, db).execute()
    return deckSchema.array().parse(decks)
  }

  public async findFirst(params: SelectQueryParams<"decks">, db: Database = this.db) {
    const deck = await this.selectQuery.build("decks", params, db).limit(1).executeTakeFirst()
    return deck ? deckSchema.parse(deck) : null
  }

  public async count(params: SelectQueryParams<"decks">, db: Database = this.db) {
    const selectQuery = this.selectQuery.build("decks", params, db)
    const count = await this.countQuery.build("decks", selectQuery).executeTakeFirstOrThrow()
    return count
  }

  public async create(params: InsertQueryParams<"decks">, db: Database = this.db) {
    const car = await this.insertQuery.build("decks", params, db).executeTakeFirstOrThrow()
    return deckSchema.parse(car)
  }

  public async update(params: UpdateQueryParams<"decks">, db: Database = this.db) {
    const car = await this.updateQuery.build("decks", params, db).executeTakeFirstOrThrow()
    return deckSchema.parse(car)
  }

  public async updateMany(params: UpdateQueryParams<"decks">, db: Database = this.db) {
    const cars = await this.updateQuery.build("decks", params, db).execute()
    return deckSchema.array().parse(cars)
  }

  public async delete(params: DeleteQueryParams<"decks">, db: Database = this.db) {
    const car = await this.deleteQuery.build("decks", params, db).limit(1).executeTakeFirstOrThrow()
    return deckSchema.parse(car)
  }

  public async deleteMany(params: DeleteQueryParams<"decks">, db: Database = this.db) {
    const cars = await this.deleteQuery.build("decks", params, db).execute()
    return deckSchema.array().parse(cars)
  }
}
