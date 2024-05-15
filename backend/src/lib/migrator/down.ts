#!/usr/bin/env node

import db from "src/db"
import buildMigrator from "./utils/build-migrator"
import logMigrationResult from "./utils/log-result"
import generateTypes from "./utils/generate-types"
import generateStructure from "./utils/generate-structure"
import { Kysely } from "kysely"

async function run() {
  const migrator = buildMigrator(db as Kysely<unknown>)
  const result = await migrator.migrateDown()
  logMigrationResult(result)
  await generateTypes()
  await generateStructure()
  await db.destroy()
}

void run()
