import * as R from "remeda"
import { Database } from "src/db"
import selectClause, { Select } from "./common/select.clause"
import orderByCluase, { OrderBy } from "./common/order-by.cluase"
import whereClause, { Where } from "./common/where.clause"

export type Params = {
  select?: Select<"users">
  orderBy?: OrderBy<"users">
  where?: Where<"users">
}

export default class SelectUsersQuery {
  constructor(private readonly db: Database) {}

  public build(params: Params = {}, eb: Database = this.db) {
    return R.pipe(
      eb.selectFrom("users"),
      selectClause(params.select),
      orderByCluase(params.orderBy),
      whereClause(params.where),
    )
  }
}
