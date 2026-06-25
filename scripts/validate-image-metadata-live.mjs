#!/usr/bin/env node
/**
 * Live Image Metadata validation loop — fetches each indexable URL and checks JSON-LD ImageObjects.
 * Run after deploy: node scripts/validate-image-metadata-live.mjs
 * Optional: SITE_URL=https://www.lovellcanyon.com node scripts/validate-image-metadata-live.mjs
 */

const SITE_URL = (process.env.SITE_URL ?? "https://www.lovellcanyon.com").replace(/\/$/, "");

const INDEXABLE_PATHS = [
  "/",
  "/contact",
  "/location",
  "/access",
  "/parcels",
  "/parcels/lot-2",
  "/parcels/lot-3",
  "/title-report",
  "/faq",
  "/89124-land",
  "/buying-raw-land",
  "/lovell-canyon-vs-pahrump",
  "/image-license",
];

const REQUIRED = ["contentUrl", "creditText", "copyrightNotice", "license", "acquireLicensePage", "creator"];

function extractJsonLdBlocks(html) {
  const blocks = [];
  const pattern = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = pattern.exec(html)) !== null) {
    try {
      blocks.push(JSON.parse(match[1]));
    } catch {
      // skip
    }
  }
  return blocks;
}

function collectImageObjects(value, path = "root", found = []) {
  if (typeof value !== "object" || value === null) return found;

  if (value["@type"] === "ImageObject") {
    found.push({ node: value, path });
  }

  if (Array.isArray(value["@graph"])) {
    value["@graph"].forEach((item, index) => collectImageObjects(item, `${path}.@graph[${index}]`, found));
  }

  if (value.image && typeof value.image === "object") {
    collectImageObjects(value.image, `${path}.image`, found);
  }

  return found;
}

function validateImageObject(node, label) {
  const errors = [];
  if (node["@type"] !== "ImageObject") errors.push(`${label}: not ImageObject`);
  for (const field of REQUIRED) {
    if (!node[field]) errors.push(`${label}: missing ${field}`);
  }
  if (typeof node.contentUrl !== "string" || !node.contentUrl.startsWith("https://")) {
    errors.push(`${label}: contentUrl must be https`);
  }
  if (typeof node.license !== "string" || !node.license.startsWith("https://")) {
    errors.push(`${label}: license must be https`);
  }
  if (typeof node.acquireLicensePage !== "string" || !node.acquireLicensePage.startsWith("https://")) {
    errors.push(`${label}: acquireLicensePage must be https`);
  }
  if (node.creator?.["@type"] !== "Person") {
    errors.push(`${label}: creator must be Person`);
  }
  return errors;
}

async function validatePath(pathname) {
  const url = pathname === "/" ? SITE_URL : `${SITE_URL}${pathname}`;
  const response = await fetch(url, {
    headers: { "User-Agent": "lovellcanyon-image-metadata-validator/1.0" },
  });

  if (!response.ok) {
    return { pathname, url, ok: false, errors: [`HTTP ${response.status}`], imageCount: 0 };
  }

  const html = await response.text();
  const blocks = extractJsonLdBlocks(html);
  const images = blocks.flatMap((block, index) => collectImageObjects(block, `block${index}`));
  const errors = images.flatMap(({ node, path }) => validateImageObject(node, `${pathname}:${path}`));

  if (images.length === 0) {
    errors.push(`${pathname}: no ImageObject in JSON-LD`);
  }

  return {
    pathname,
    url,
    ok: errors.length === 0,
    errors,
    imageCount: images.length,
  };
}

async function main() {
  console.log(`Validating Image Metadata on ${SITE_URL} …\n`);

  const results = [];
  for (const pathname of INDEXABLE_PATHS) {
    const result = await validatePath(pathname);
    results.push(result);
    const status = result.ok ? "PASS" : "FAIL";
    console.log(`${status}  ${pathname}  (${result.imageCount} ImageObject${result.imageCount === 1 ? "" : "s"})`);
    if (!result.ok) {
      for (const error of result.errors) {
        console.log(`       - ${error}`);
      }
    }
  }

  const failed = results.filter((result) => !result.ok);
  console.log(`\n${results.length - failed.length}/${results.length} pages passed.`);

  if (failed.length > 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
