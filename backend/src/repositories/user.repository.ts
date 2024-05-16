import CountQuery from "src/queries/common/count.query"
import DeleteQuery, { DeleteQueryParams } from "src/queries/common/delete.query"
import InsertQuery, { InsertQueryParams } from "src/queries/common/insert.query"
import SelectQuery, { SelectQueryParams } from "src/queries/common/select.query"
import UpdateQuery, { UpdateQueryParams } from "src/queries/common/update.query"
import userSchema from "@schemas/user.schema"
import { Database } from "src/db"

export default class UserRepository {
  constructor(
    private readonly db: Database,
    private readonly selectQuery: SelectQuery<"users">,
    private readonly insertQuery: InsertQuery<"users">,
    private readonly updateQuery: UpdateQuery<"users">,
    private readonly deleteQuery: DeleteQuery<"users">,
    private readonly countQuery: CountQuery<"users">,
  ) {}

  public async findMany(params: SelectQueryParams<"users">, db: Database = this.db) {
    const users = await this.selectQuery.build("users", params, db).execute()
    return userSchema.array().parse(users)
  }

  public async findFirst(params: SelectQueryParams<"users">, db: Database = this.db) {
    const user = await this.selectQuery.build("users", params, db).limit(1).executeTakeFirst()
    return user ? userSchema.parse(user) : null
  }

  public async count(params: SelectQueryParams<"users">, db: Database = this.db) {
    const selectQuery = this.selectQuery.build("users", params, db)
    const count = await this.countQuery.build("users", selectQuery).executeTakeFirstOrThrow()
    return count
  }

  public async create(params: InsertQueryParams<"users">, db: Database = this.db) {
    const car = await this.insertQuery.build("users", params, db).executeTakeFirstOrThrow()
    return userSchema.parse(car)
  }

  public async update(params: UpdateQueryParams<"users">, db: Database = this.db) {
    const car = await this.updateQuery.build("users", params, db).executeTakeFirstOrThrow()
    return userSchema.parse(car)
  }

  public async updateMany(params: UpdateQueryParams<"users">, db: Database = this.db) {
    const cars = await this.updateQuery.build("users", params, db).execute()
    return userSchema.array().parse(cars)
  }

  public async delete(params: DeleteQueryParams<"users">, db: Database = this.db) {
    const car = await this.deleteQuery.build("users", params, db).limit(1).executeTakeFirstOrThrow()
    return userSchema.parse(car)
  }

  public async deleteMany(params: DeleteQueryParams<"users">, db: Database = this.db) {
    const cars = await this.deleteQuery.build("users", params, db).execute()
    return userSchema.array().parse(cars)
  }
}
