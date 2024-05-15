#!/usr/bin/env node

import buildMigrator from "./utils/build-migrator"
import logMigrationResult from "./utils/log-result"
import generateTypes from "./utils/generate-types"
import generateStructure from "./utils/generate-structure"
import { Kysely } from "kysely"
import db from "./db"

async function run() {
  const migrator = buildMigrator(db as Kysely<unknown>)
  const result = await migrator.migrateDown()
  logMigrationResult(result)
  await generateTypes()
  await generateStructure()
  await db.destroy()
}

void run()
