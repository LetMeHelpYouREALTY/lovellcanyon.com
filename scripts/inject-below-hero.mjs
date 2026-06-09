import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const IMPORT_LINE =
  'import BelowHeroEngagement from "@/components/sections/BelowHeroEngagement";';
const TAG = "        <BelowHeroEngagement />";

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name === "page.tsx") files.push(full);
  }
  return files;
}

function addImport(content) {
  if (content.includes("BelowHeroEngagement")) return content;
  const lines = content.split("\n");
  let lastImport = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("import ")) lastImport = i;
  }
  if (lastImport === -1) return IMPORT_LINE + "\n" + content;
  lines.splice(lastImport + 1, 0, IMPORT_LINE);
  return lines.join("\n");
}

function removeRealScoutListings(content) {
  return content
    .replace(/^import RealScoutListings from "@\/components\/realscout\/RealScoutListings";\n/m, "")
    .replace(/\n\s*<RealScoutListings \/>/g, "");
}

function insertAfterHero(content) {
  if (content.includes("<BelowHeroEngagement")) return content;

  const heroPatterns = [
    /<LandPageHero[\s\S]*?\/>/,
    /<MainlineHero[\s\S]*?\/>/,
    /<HeroSection[\s\S]*?\/>/,
  ];

  for (const pattern of heroPatterns) {
    const match = content.match(pattern);
    if (match) {
      const idx = content.indexOf(match[0]) + match[0].length;
      return content.slice(0, idx) + "\n\n" + TAG + content.slice(idx);
    }
  }

  const navbarMatch = content.match(/<Navbar\s*\/>/);
  if (!navbarMatch) return content;

  const afterNavbar = content.indexOf(navbarMatch[0]) + navbarMatch[0].length;
  const slice = content.slice(afterNavbar, afterNavbar + 4000);
  const sectionClose = slice.indexOf("</section>");
  const mainOpen = slice.indexOf("<main");
  const divHeroClose = slice.match(/<\/div>\s*\n\s*<\/div>\s*\n\s*\{\/\* RealScout Widget/);

  if (divHeroClose) {
    const idx = afterNavbar + divHeroClose.index;
    return (
      content.slice(0, idx) +
      "\n\n" +
      TAG +
      content.slice(idx).replace(
        /\s*\{\/\* RealScout Widget[\s\S]*?<\/section>\s*/,
        "\n"
      )
    );
  }

  if (sectionClose !== -1 && (mainOpen === -1 || sectionClose < mainOpen + 500)) {
    const idx = afterNavbar + sectionClose + "</section>".length;
    return content.slice(0, idx) + "\n\n" + TAG + content.slice(idx);
  }

  const mainMatch = slice.match(/<main[^>]*>/);
  if (mainMatch) {
    const idx = afterNavbar + slice.indexOf(mainMatch[0]) + mainMatch[0].length;
    return content.slice(0, idx) + "\n" + TAG + content.slice(idx);
  }

  return content.slice(0, afterNavbar) + "\n" + TAG + content.slice(afterNavbar);
}

for (const file of walk(path.join(ROOT, "app"))) {
  let content = fs.readFileSync(file, "utf8");
  const original = content;
  content = removeRealScoutListings(content);
  content = addImport(content);
  content = insertAfterHero(content);
  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log("updated", path.relative(ROOT, file));
  }
}
