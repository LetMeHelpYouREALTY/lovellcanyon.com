/**
 * Validates ImageObject nodes against Google Image Metadata requirements.
 * Used by Vitest loop (CI) and optional live crawl script.
 */

export const LOVELL_CANYON_IMAGE_OBJECT_REQUIRED_FIELDS = [
  "contentUrl",
  "creditText",
  "copyrightNotice",
  "license",
  "acquireLicensePage",
  "creator",
] as const;

export type ImageObjectValidationResult = {
  ok: boolean;
  errors: string[];
};

function isAbsoluteHttpUrl(value: unknown): value is string {
  return typeof value === "string" && /^https:\/\//.test(value);
}

export function validateLovellCanyonImageObject(
  node: Record<string, unknown>,
  label = "ImageObject"
): ImageObjectValidationResult {
  const errors: string[] = [];

  if (node["@type"] !== "ImageObject") {
    errors.push(`${label}: @type must be ImageObject`);
  }

  for (const field of LOVELL_CANYON_IMAGE_OBJECT_REQUIRED_FIELDS) {
    if (node[field] === undefined || node[field] === null || node[field] === "") {
      errors.push(`${label}: missing ${field}`);
    }
  }

  if (!isAbsoluteHttpUrl(node.contentUrl)) {
    errors.push(`${label}: contentUrl must be absolute https URL`);
  }

  if (!isAbsoluteHttpUrl(node.license)) {
    errors.push(`${label}: license must be absolute https URL`);
  }

  if (!isAbsoluteHttpUrl(node.acquireLicensePage)) {
    errors.push(`${label}: acquireLicensePage must be absolute https URL`);
  }

  const creator = node.creator;
  if (typeof creator !== "object" || creator === null) {
    errors.push(`${label}: creator must be an object`);
  } else {
    const creatorRecord = creator as Record<string, unknown>;
    if (creatorRecord["@type"] !== "Person") {
      errors.push(`${label}: creator.@type must be Person (not RealEstateAgent)`);
    }
    if (!creatorRecord.name) {
      errors.push(`${label}: creator.name required`);
    }
  }

  return { ok: errors.length === 0, errors };
}

export function collectImageObjectsFromJsonLd(
  payload: unknown,
  labelPrefix = "graph"
): Array<{ node: Record<string, unknown>; label: string }> {
  const found: Array<{ node: Record<string, unknown>; label: string }> = [];

  function walk(value: unknown, path: string) {
    if (typeof value !== "object" || value === null) return;

    const record = value as Record<string, unknown>;

    if (record["@type"] === "ImageObject") {
      found.push({ node: record, label: path });
    }

    if (Array.isArray(record["@graph"])) {
      record["@graph"].forEach((item, index) => walk(item, `${path}.@graph[${index}]`));
    }

    if (record.image && typeof record.image === "object") {
      walk(record.image, `${path}.image`);
    }

    if (Array.isArray(record.associatedMedia)) {
      record.associatedMedia.forEach((item, index) =>
        walk(item, `${path}.associatedMedia[${index}]`)
      );
    }
  }

  walk(payload, labelPrefix);
  return found;
}

export function extractJsonLdBlocks(html: string): unknown[] {
  const blocks: unknown[] = [];
  const pattern =
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

  let match: RegExpExecArray | null;
  while ((match = pattern.exec(html)) !== null) {
    try {
      blocks.push(JSON.parse(match[1]));
    } catch {
      // skip malformed blocks
    }
  }

  return blocks;
}

export function validateImageObjectsInHtml(
  html: string,
  pageLabel: string
): ImageObjectValidationResult {
  const blocks = extractJsonLdBlocks(html);
  const images = blocks.flatMap((block, index) =>
    collectImageObjectsFromJsonLd(block, `${pageLabel}#${index}`)
  );

  if (images.length === 0) {
    return { ok: false, errors: [`${pageLabel}: no ImageObject found in JSON-LD`] };
  }

  const errors = images.flatMap(({ node, label }) => validateLovellCanyonImageObject(node, label).errors);
  return { ok: errors.length === 0, errors };
}
