import * as R from "remeda"
import db, { Database } from "src/db"
import selectClause, { Select } from "./common/select.clause"
import orderByCluase, { OrderBy } from "./common/order-by.cluase"
import whereClause, { Where } from "./common/where.clause"

export type Params = {
  select?: Select<"cards">
  orderBy?: OrderBy<"cards">
  where?: Where<"cards">
}

export default class SelectCardsQuery {
  public build(params: Params = {}, eb: Database = db) {
    return R.pipe(
      eb.selectFrom("cards"),
      selectClause(params.select),
      orderByCluase(params.orderBy),
      whereClause(params.where),
    )
  }
}
