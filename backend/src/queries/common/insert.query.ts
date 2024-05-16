import { DB } from "kysely-codegen/dist/db"
import { InsertExpression } from "node_modules/kysely/dist/cjs/parser/insert-values-parser"
import { Database } from "src/db"

export type InsertQueryParams<Table extends keyof DB> = InsertExpression<DB, Table>

export default class InsertQuery<Table extends keyof DB> {
  constructor(private readonly db: Database) {}

  public build(table: Table, params: InsertQueryParams<Table>, db: Database = this.db) {
    return db.insertInto(table).values(params).returningAll()
  }
}
