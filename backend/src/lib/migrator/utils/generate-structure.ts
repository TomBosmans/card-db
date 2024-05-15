import config from "@config"
import exec from "./exec"

export default async function generateStructure() {
  await exec(`
    pg_dump ${config.postgres.url} --no-owner --schema-only -U postgres > src/db/structure.sql
  `)

  await exec(`
    pg_dump ${config.postgres.url} --no-owner -t kysely_migration -t kysely_migration_lock --data-only > src/db/data.sql
  `)
}
