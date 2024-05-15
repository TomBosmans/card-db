import * as path from "path"
import { Migrator, FileMigrationProvider, Kysely } from "kysely"
import { promises as fs } from "fs"

export default function buildMigrator(db: Kysely<unknown>) {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.resolve("src/db/migrations"),
    }),
  })

  return migrator
}
