import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { resolve } from "node:path";
import { after, before, test } from "node:test";
import { setTimeout as sleep } from "node:timers/promises";

let server;
let baseUrl;
let html;
let serverErrors = "";

async function freePort() {
  const socket = createServer();
  await new Promise((resolve, reject) => {
    socket.once("error", reject);
    socket.listen(0, "127.0.0.1", resolve);
  });
  const { port } = socket.address();
  await new Promise((resolve, reject) => socket.close((error) => error ? reject(error) : resolve()));
  return port;
}

before(async () => {
  const port = await freePort();
  baseUrl = `http://127.0.0.1:${port}`;
  server = spawn(process.execPath, [
    resolve("node_modules/next/dist/bin/next"),
    "start",
    "-H",
    "127.0.0.1",
    "-p",
    String(port),
  ], { stdio: ["ignore", "ignore", "pipe"], env: process.env, windowsHide: true });
  server.stderr.setEncoding("utf8");
  server.stderr.on("data", (chunk) => { serverErrors += chunk; });

  for (let attempt = 0; attempt < 80; attempt++) {
    if (server.exitCode !== null) throw new Error(`O servidor encerrou antes dos testes. ${serverErrors}`);
    const response = await fetch(baseUrl).catch(() => null);
    if (response) {
      assert.equal(response.status, 200);
      html = await response.text();
      return;
    }
    await sleep(250);
  }
  throw new Error("O servidor não respondeu em 20 segundos.");
});

after(() => {
  server?.kill();
});

test("cada link do menu encontra uma única seção correspondente", () => {
  const nav = html.match(/<nav\b[^>]*>([\s\S]*?)<\/nav>/)?.[1];
  assert.ok(nav, "A navegação principal deve existir.");
  const targets = [...nav.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
  assert.ok(targets.length > 0, "O menu deve ter links para seções.");
  for (const target of targets) {
    const ids = [...html.matchAll(new RegExp(`\\bid="${target}"`, "g"))];
    assert.equal(ids.length, 1, `O id ${target} deve ser único.`);
    assert.match(html, new RegExp(`<section\\b[^>]*\\bid="${target}"`));
  }
});

test("a página apresenta idioma, título principal e descrição", () => {
  assert.match(html, /<html lang="pt-BR"/);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
  assert.match(html, /<meta name="description" content="[^"]+"/);
});

test("a imagem principal está disponível", async () => {
  const imagePath = html.match(/imageSrcSet="\/_next\/image\?url=([^&"]+)/)?.[1];
  assert.ok(imagePath, "A imagem principal deve ser informada.");
  const response = await fetch(new URL(decodeURIComponent(imagePath), baseUrl));
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /^image\//);
});

test("a conversão e a indexação seguem o cenário configurado no build", async () => {
  const commercial = process.env.SITE_INDEXABLE === "true";
  const links = [...html.matchAll(/href="(https:\/\/wa\.me\/[^"]+)"/g)]
    .map((match) => new URL(match[1].replaceAll("&amp;", "&")));

  if (commercial) {
    assert.ok(links.length > 0, "A página deve oferecer contato por WhatsApp.");
    for (const link of links) {
      assert.equal(link.pathname, `/${process.env.WHATSAPP_NUMBER}`);
      assert.match(link.searchParams.get("text"), /Origem:/);
    }
    const serviceName = html.match(/<article\b[^>]*>[\s\S]*?<h3\b[^>]*>([^<]+)<\/h3>/)?.[1];
    assert.ok(serviceName, "Deve haver um serviço na página.");
    assert.ok(links.some((link) => link.searchParams.get("text").includes(serviceName)));
    assert.match(html, /<meta name="robots" content="index, follow"/);
    const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
    assert.equal(new URL(canonical).origin, new URL(process.env.SITE_URL).origin);
    const sitemap = await (await fetch(`${baseUrl}/sitemap.xml`)).text();
    assert.ok(sitemap.includes(`<loc>${new URL(process.env.SITE_URL).origin}/</loc>`));
  } else {
    assert.equal(links.length, 0);
    assert.match(html, /href="#demo-in%C3%ADcio"/);
    assert.match(html, /id="demo-início"/);
    assert.match(html, /<meta name="robots" content="noindex, nofollow"/);
    const sitemap = await (await fetch(`${baseUrl}/sitemap.xml`)).text();
    assert.doesNotMatch(sitemap, /<loc>/);
  }
});
