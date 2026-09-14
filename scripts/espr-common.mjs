import crypto from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

export const ESPR_ORIGIN = "https://ss.espr.gg";
export const ESPR_CDN_ORIGIN = "https://ss.esprcdn.dev";
export const LANGUAGES = ["ko", "en", "ja"];
export const REFRESH_ALL = String(process.env.REFRESH_ALL || "false").toLowerCase() === "true";

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function normalizeText(value) {
  return String(value ?? "").replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
}

export function splitLines(value) {
  return String(value ?? "")
    .split(/\r?\n/)
    .map(normalizeText)
    .filter(Boolean);
}

export function unwrapNextImage(raw) {
  const value = String(raw || "").trim();
  if (!value) return "";
  try {
    const url = new URL(value, ESPR_ORIGIN);
    if (url.hostname === "ss.espr.gg" && url.pathname === "/_next/image") {
      const inner = url.searchParams.get("url");
      if (inner) return decodeURIComponent(inner);
    }
    return url.href;
  } catch {
    return value;
  }
}

export function imageSourceFromRecord(record) {
  const candidates = [record?.currentSrc, record?.src, ...(record?.srcset || [])];
  for (const candidate of candidates) {
    const unwrapped = unwrapNextImage(candidate);
    if (/^https?:\/\//i.test(unwrapped)) return unwrapped;
  }
  return "";
}

export function numericIdFromUrl(url, pattern) {
  const value = unwrapNextImage(url);
  const match = value.match(pattern);
  return match ? Number(match[1]) : null;
}

export function stableNumericId(seed, floor = 8_000_000) {
  const hex = crypto.createHash("sha1").update(String(seed)).digest("hex").slice(0, 8);
  return floor + (Number.parseInt(hex, 16) % 900_000);
}

export function safeFilename(value) {
  return String(value || "item")
    .normalize("NFKC")
    .replace(/[\\/:*?"<>|]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "item";
}

export function sourceImageExt(url, fallback = ".webp") {
  try {
    const pathname = new URL(unwrapNextImage(url)).pathname;
    const ext = path.extname(pathname).toLowerCase();
    if (/^\.(?:webp|png|jpe?g|gif|svg|avif)$/.test(ext)) return ext;
  } catch {}
  return fallback;
}

export async function writeJsonAtomic(filename, value) {
  await fs.mkdir(path.dirname(filename), { recursive: true });
  const temp = `${filename}.tmp-${process.pid}`;
  await fs.writeFile(temp, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  await fs.rename(temp, filename);
}

export async function readJsonIfExists(filename, fallback = null) {
  try {
    return JSON.parse(await fs.readFile(filename, "utf8"));
  } catch {
    return fallback;
  }
}

export async function gotoStable(page, url, options = {}) {
  const attempts = Number(options.attempts || 3);
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
      if (response && response.status() >= 400) throw new Error(`HTTP ${response.status()}`);
      await page.waitForFunction(() => String(document.body?.innerText || "").replace(/\s+/g, " ").trim().length > 40, null, { timeout: 30_000 });
      try { await page.waitForLoadState("networkidle", { timeout: 8_000 }); } catch {}
      await page.waitForTimeout(options.settleMs ?? 250);
      return;
    } catch (error) {
      lastError = error;
      if (attempt < attempts) await sleep(700 * attempt);
    }
  }
  throw new Error(`${url}: ${lastError?.message || "navigation failed"}`);
}


export async function getPagePayload(page) {
  return page.evaluate(() => {
    const norm = (value) => String(value ?? "").replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
    const unwrap = (raw) => {
      try {
        const u = new URL(raw, location.href);
        if (u.pathname === "/_next/image") {
          const inner = u.searchParams.get("url");
          if (inner) return decodeURIComponent(inner);
        }
        return u.href;
      } catch {
        return String(raw || "");
      }
    };
    const main = document.querySelector("main") || document.body;
    const images = [...main.querySelectorAll("img")].map((img) => ({
      alt: norm(img.alt),
      src: unwrap(img.currentSrc || img.src || ""),
      currentSrc: unwrap(img.currentSrc || ""),
      srcset: String(img.srcset || "").split(",").map((part) => unwrap(part.trim().split(/\s+/)[0])).filter(Boolean)
    }));
    const links = [...main.querySelectorAll("a[href]")].map((anchor) => ({
      text: norm(anchor.innerText || anchor.textContent),
      href: new URL(anchor.getAttribute("href"), location.href).href
    }));
    return {
      title: norm(main.querySelector("h1")?.textContent || ""),
      text: main.innerText || "",
      lines: String(main.innerText || "").split(/\r?\n/).map(norm).filter(Boolean),
      images,
      links
    };
  });
}

export async function discoverSlugs(page, kind) {
  const url = `${ESPR_ORIGIN}/ko/database/${kind}`;
  await gotoStable(page, url, { settleMs: 350 });
  const slugs = await page.evaluate((kindName) => {
    const prefix = `/ko/database/${kindName}/`;
    const values = new Set();
    for (const anchor of document.querySelectorAll('a[href]')) {
      let pathname = '';
      try { pathname = new URL(anchor.getAttribute('href'), location.href).pathname; } catch { continue; }
      if (!pathname.startsWith(prefix)) continue;
      const rest = pathname.slice(prefix.length).replace(/^\/+|\/+$/g, "");
      if (rest && !rest.includes("/")) values.add(rest);
    }
    return [...values];
  }, kind);
  if (!slugs.length) throw new Error(`No ESPR ${kind} slugs were discovered from ${url}`);
  return slugs;
}

export async function mapLimit(items, concurrency, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  const workers = Array.from({ length: Math.max(1, Math.min(concurrency, items.length)) }, async () => {
    while (true) {
      const index = cursor;
      cursor += 1;
      if (index >= items.length) break;
      results[index] = await worker(items[index], index);
    }
  });
  await Promise.all(workers);
  return results;
}

export async function downloadAsset(context, sourceUrl, destination, options = {}) {
  const url = unwrapNextImage(sourceUrl);
  if (!/^https?:\/\//i.test(url)) return { source: sourceUrl, destination, skipped: true, bytes: 0 };

  if (!REFRESH_ALL && !options.force) {
    try {
      const stat = await fs.stat(destination);
      if (stat.size > 20) return { source: url, destination, kept: true, bytes: stat.size };
    } catch {}
  }

  await fs.mkdir(path.dirname(destination), { recursive: true });
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await context.request.get(url, {
        headers: {
          referer: `${ESPR_ORIGIN}/`,
          "user-agent": "starsavior-guide-espr-backup/2.0"
        },
        timeout: 45_000
      });
      if (!response.ok()) throw new Error(`HTTP ${response.status()}`);
      const contentType = response.headers()["content-type"] || "";
      if (!contentType.startsWith("image/")) throw new Error(`not image: ${contentType}`);
      const body = await response.body();
      if (body.length < 20) throw new Error("empty image");
      await fs.writeFile(destination, body);
      return { source: url, destination, kept: false, bytes: body.length };
    } catch (error) {
      lastError = error;
      if (attempt < 3) await sleep(attempt * 700);
    }
  }
  if (options.optional) {
    console.warn(`asset skipped: ${url}: ${lastError?.message || "failed"}`);
    return { source: url, destination, failed: true, bytes: 0 };
  }
  throw new Error(`${url}: ${lastError?.message || "asset download failed"}`);
}

export function localizedObject(records, field) {
  const out = {};
  for (const language of LANGUAGES) out[language] = normalizeText(records?.[language]?.[field] || "");
  return out;
}

export function localizedFromValues(values) {
  const out = {};
  for (const language of LANGUAGES) out[language] = normalizeText(values?.[language] || "");
  return out;
}

export function findLineValue(lines, label) {
  const index = lines.findIndex((line) => normalizeText(line) === normalizeText(label));
  return index >= 0 ? normalizeText(lines[index + 1]) : "";
}

export function firstImageMatching(images, regexp) {
  for (const record of images || []) {
    const src = imageSourceFromRecord(record);
    if (regexp.test(src)) return { ...record, src };
  }
  return null;
}

export function htmlEscape(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
