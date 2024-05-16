import SelectQuery from "../types/select-query.type"
import { DB } from "kysely-codegen/dist/db"
import { Database } from "src/db"
import { sql } from "kysely"

export default class CountQuery<Table extends keyof DB> {
  constructor(private readonly db: Database) {}

  public build(table: Table, eb: SelectQuery<Table> = this.db.selectFrom(table)) {
    return eb
      .clearSelect()
      .clearOrderBy()
      .select(sql<number>`count(*)::int`.as("count"))
  }
}
