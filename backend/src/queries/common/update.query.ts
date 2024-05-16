/* eslint-disable @typescript-eslint/no-explicit-any */
import * as R from "remeda"
import whereClause, { Where } from "./where.clause"
import { DB } from "kysely-codegen/dist/db"
import { Database } from "src/db"
import { ExtractTableAlias } from "node_modules/kysely/dist/cjs/parser/table-parser"
import { UpdateObjectExpression } from "node_modules/kysely/dist/cjs/parser/update-set-parser"

export type UpdateQueryParams<Table extends keyof DB> = {
  set: UpdateObjectExpression<DB, ExtractTableAlias<DB, Table>>
  where: Where<Table>
}

export default class UpdateQuery<Table extends keyof DB> {
  constructor(private readonly db: Database) {}

  public build(table: Table, params: UpdateQueryParams<Table>, db: Database = this.db) {
    return R.pipe(
      db.updateTable(table),
      (eb) => eb.set(params.set),
      (eb) => whereClause(params.where)(eb as any) as any as typeof eb,
      (eb) => eb.returningAll(),
    )
  }
}
