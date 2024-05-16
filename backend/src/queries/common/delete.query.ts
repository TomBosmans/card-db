/* eslint-disable @typescript-eslint/no-explicit-any */
import * as R from "remeda"
import whereClause, { Where } from "./where.clause"
import { DB } from "kysely-codegen/dist/db"
import { Database } from "src/db"

export type DeleteQueryParams<Table extends keyof DB> = {
  where: Where<Table>
}

export default class DeleteQuery<Table extends keyof DB> {
  constructor(private readonly db: Database) {}

  public build(table: Table, params: DeleteQueryParams<Table>, db: Database = this.db) {
    return R.pipe(
      db.deleteFrom(table),
      (eb) => whereClause(params.where)(eb as any) as any as typeof eb,
      (eb) => eb.returningAll(),
    )
  }
}
