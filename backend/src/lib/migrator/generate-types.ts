#!/usr/bin/env node

import generateStructure from "./utils/generate-structure"

async function run() {
  await generateStructure()
}

void run()
