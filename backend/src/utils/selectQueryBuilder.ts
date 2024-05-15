/* eslint-disable @typescript-eslint/no-explicit-any */

import { SelectQueryBuilder } from "./queryBuilder"
import { DB } from "kysely-codegen/dist/db"

export default function selectQueryBuilder<Table extends keyof DB>(table: Table) {
  return class extends SelectQueryBuilder<Table> {
    public tableName = table
  }
}
