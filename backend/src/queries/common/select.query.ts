import * as R from "remeda"
import { Database } from "src/db"
import selectClause, { Select } from "./select.clause"
import orderByClause, { OrderBy } from "./order-by.clause"
import whereClause, { Where } from "./where.clause"
import { DB } from "kysely-codegen/dist/db"

export type SelectQueryParams<Table extends keyof DB> = {
  select?: Select<Table>
  orderBy?: OrderBy<Table>
  where?: Where<Table>
}

export default class SelectQuery<Table extends keyof DB> {
  constructor(private readonly db: Database) {}

  public build(table: Table, params: SelectQueryParams<Table> = {}, eb: Database = this.db) {
    return R.pipe(
      eb.selectFrom(table),
      selectClause(params.select),
      orderByClause(params.orderBy),
      whereClause(params.where),
    )
  }
}
