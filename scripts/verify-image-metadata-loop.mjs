#!/usr/bin/env node
/**
 * Goal loop: run validators until pass or max attempts (loop engineering pattern).
 * 1. Local schema unit tests (fast verifier)
 * 2. Live production crawl (external verifier)
 *
 * Usage:
 *   npm run verify:image-metadata
 *   SITE_URL=https://preview.vercel.app npm run verify:image-metadata
 */

import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));
const maxAttempts = Number(process.env.VERIFY_MAX_ATTEMPTS ?? "5");
const waitMs = Number(process.env.VERIFY_WAIT_MS ?? "30000");
const siteUrl = process.env.SITE_URL ?? "https://www.lovellcanyon.com";

function run(command, args, env = {}) {
  const result = spawnSync(command, args, {
    cwd: join(root, ".."),
    stdio: "inherit",
    shell: true,
    env: { ...process.env, ...env },
  });
  return result.status === 0;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log("=== Image Metadata verify loop ===\n");

  if (!run("npm", ["run", "sync:indexable-paths"])) {
    process.exit(1);
  }

  if (!run("npm", ["run", "validate:image-object"])) {
    console.error("\nLocal ImageObject schema tests failed — fix before live check.");
    process.exit(1);
  }

  console.log(`\nLocal tests passed. Live check target: ${siteUrl}\n`);

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    console.log(`--- Live attempt ${attempt}/${maxAttempts} ---`);
    const liveOk = run("npm", ["run", "validate:image-metadata-live"], { SITE_URL: siteUrl });

    if (liveOk) {
      console.log(`\n✓ All Image Metadata checks passed on ${siteUrl}`);
      process.exit(0);
    }

    if (attempt < maxAttempts) {
      console.log(`\nWaiting ${waitMs / 1000}s before retry (deploy may still be propagating)…\n`);
      await sleep(waitMs);
    }
  }

  console.error(`\n✗ Live validation failed after ${maxAttempts} attempts.`);
  process.exit(1);
}

main();
