/* eslint-disable @typescript-eslint/no-explicit-any */
import { DB } from "kysely-codegen/dist/db"
import { SelectQueryParams, SelectQuery, WherableQuery } from "./types"
import mapOperatorExpression from "./mapping"
import { ExpressionBuilder, Kysely } from "kysely"
import db from "src/db"

export abstract class SelectQueryBuilder<Table extends keyof DB> {
  public abstract tableName: Table

  public build(
    params: SelectQueryParams<Table> = {},
    eb: ExpressionBuilder<DB, Table> | Kysely<DB> = db,
  ) {
    let query = (eb as Kysely<DB>).selectFrom(this.tableName)
    query = this.orderByClause(params, query)
    query = this.selectClause(params, query)
    query = this.whereClause(params, query)
    return query
  }

  protected selectClause({ select }: SelectQueryParams<Table>, query: SelectQuery<Table>) {
    return select ? query.select(select as any) : query.selectAll()
  }

  protected orderByClause({ orderBy }: SelectQueryParams<Table>, query: SelectQuery<Table>) {
    if (!orderBy) return query

    const attributes = Object.keys(orderBy) as Array<keyof SelectQueryParams<Table>["orderBy"]>
    for (const attribute of attributes) {
      query = query.orderBy(attribute, orderBy[attribute])
    }
    return query
  }

  protected whereClause<Query extends WherableQuery<Table>>(
    params: SelectQueryParams<Table>,
    query: Query,
  ) {
    const where = params.where
    if (!where) return query

    const attributes = Object.keys(where) as Array<keyof typeof where>
    for (const attribute of attributes) {
      console.log(attribute)
      if (typeof where[attribute] !== "object") {
        const value = where[attribute]
        query = (query as SelectQuery<Table>).where(
          attribute as any,
          mapOperatorExpression("$eq", value as any),
          value,
        ) as Query
      } else {
        const operators = Object.keys(where[attribute] as any) as Array<
          keyof (typeof where)[typeof attribute]
        >
        for (const operator of operators) {
          const value = (params.where?.[attribute] as any)?.[operator]
          if (value !== undefined) {
            query = (query as SelectQuery<Table>).where(
              attribute as any,
              mapOperatorExpression(operator as any, value as any),
              value,
            ) as Query
          }
        }
      }
    }

    return query
  }
}
