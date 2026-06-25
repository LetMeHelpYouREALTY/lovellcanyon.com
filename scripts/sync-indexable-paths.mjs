#!/usr/bin/env node
/**
 * Sync scripts/indexable-paths.json from lib/lovell-canyon-site-pages.ts
 * Run after INDEXABLE_PATHS changes: npm run sync:indexable-paths
 */

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const sourcePath = join(root, "lib", "lovell-canyon-site-pages.ts");
const outputPath = join(root, "scripts", "indexable-paths.json");

const source = readFileSync(sourcePath, "utf8");
const blockMatch = source.match(/export const INDEXABLE_PATHS = \[([\s\S]*?)\] as const/);

if (!blockMatch) {
  console.error("Could not parse INDEXABLE_PATHS from lovell-canyon-site-pages.ts");
  process.exit(1);
}

const paths = [...blockMatch[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]);

writeFileSync(outputPath, `${JSON.stringify(paths, null, 2)}\n`);
console.log(`Synced ${paths.length} paths to scripts/indexable-paths.json`);
