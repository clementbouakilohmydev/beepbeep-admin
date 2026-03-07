import { readFileSync, writeFileSync } from "fs"

const FILE = "src/gql/generated.ts"
let content = readFileSync(FILE, "utf-8")

// Fix: graphqlClient must be a value import, not type-only
content = content.replace(
  /import type \{ graphqlClient \} from/,
  "import { graphqlClient } from"
)

// Add eslint-disable at the top of the file
if (!content.startsWith("/* eslint-disable */")) {
  content = "/* eslint-disable */\n" + content
}

writeFileSync(FILE, content)
console.log("✅ generated.ts patched")
