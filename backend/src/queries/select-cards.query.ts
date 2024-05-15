import * as R from "remeda"
import orderByCluase, { OrderBy } from "./common/order-by.cluase"
import selectClause, { Select } from "./common/select.clause"
import whereClause, { Where } from "./common/where.clause"
import { Database } from "src/db"

export type SelectCardsQueryParams = {
  select?: Select<"cards">
  orderBy?: OrderBy<"cards">
  where?: Where<"cards">
}

export default class SelectCardsQuery {
  constructor(private readonly db: Database) {}

  public build(params: SelectCardsQueryParams = {}, eb: Database = this.db) {
    return R.pipe(
      eb.selectFrom("cards"),
      selectClause(params.select),
      orderByCluase(params.orderBy),
      whereClause(params.where),
    )
  }
}
