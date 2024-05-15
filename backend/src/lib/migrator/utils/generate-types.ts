import config from "@config"
import exec from "./exec"

export default async function generateTypes() {
  await exec(`DATABASE_URL=${config.postgres.url} kysely-codegen --camel-case`)
}
