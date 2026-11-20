import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile("out/index.html", "utf8");
const sitemap = await readFile("out/sitemap.xml", "utf8");
const robots = await readFile("out/robots.txt", "utf8");
const siteUrl = new URL(process.env.SITE_URL);

assert.match(html, /<meta name="robots" content="index, follow"/);
assert.ok(html.includes(`rel="canonical" href="${siteUrl.href}"`));
assert.ok(sitemap.includes(`<loc>${siteUrl.href}</loc>`));
assert.ok(robots.includes(`Sitemap: ${new URL("sitemap.xml", siteUrl).href}`));
assert.match(html, /<img\b[^>]*\bfetchPriority="high"/);
for (const width of [640, 768, 960, 1122]) {
  assert.ok(html.includes(`/aura-studio/aura-facial-${width}.webp`));
  const image = await readFile(`out/aura-facial-${width}.webp`);
  assert.ok(image.length > 0);
}
console.log("SEO e imagem responsiva da exportação verificados.");
