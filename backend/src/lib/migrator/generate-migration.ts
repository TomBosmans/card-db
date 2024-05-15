#!/usr/bin/env node

import * as path from "path"
import fs from "fs"

async function run() {
  if (process.argv.length < 3) {
    console.log("Please provide a name for the migration.")
    process.exit(1)
  }
  const name = process.argv[2]
  const templateFolder = path.resolve(__dirname, "./templates")
  const templateFile = fs.readFileSync(`${templateFolder}/migration.template`)

  const migrationFolder = path.join("src/db/migrations")
  const mkdir = () => fs.mkdirSync(migrationFolder)
  const dateStr = new Date().toISOString().replace(/[-:]/g, "").split(".")[0]
  const fileName = `${migrationFolder}/${dateStr}-${name}.ts`

  try {
    if (!fs.lstatSync(migrationFolder).isDirectory()) mkdir()
  } catch {
    fs.mkdirSync(migrationFolder)
  }

  fs.writeFileSync(fileName, templateFile)
  console.info("Created Migration:", fileName)
}

void run()
