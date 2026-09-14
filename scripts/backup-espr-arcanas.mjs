import { chromium } from "playwright";
import { promises as fs } from "node:fs";
import path from "node:path";
import {
  ESPR_ORIGIN,
  LANGUAGES,
  discoverSlugs,
  downloadAsset,
  firstImageMatching,
  getPagePayload,
  gotoStable,
  localizedFromValues,
  mapLimit,
  normalizeText,
  numericIdFromUrl,
  readJsonIfExists,
  splitLines,
  stableNumericId,
  writeJsonAtomic
} from "./espr-common.mjs";

const ROOT = process.cwd();
const OUTPUT_DIR = path.join(ROOT, "data", "arcanas");
const ASSET_ROOT = path.join(ROOT, "data", "arcana-assets");
const CARD_DIR = path.join(ASSET_ROOT, "cards");
const POTENTIAL_DIR = path.join(ASSET_ROOT, "potentials");
const OUTPUT_PATH = path.join(OUTPUT_DIR, "arcanas.json");
const MANIFEST_PATH = path.join(OUTPUT_DIR, "manifest.json");
const DISPLAY_LEVELS = [35, 40, 45, 50];

const MAIN_STAT_FILE = {
  힘: "power.webp",
  체력: "health.webp",
  인내: "endurance.webp",
  집중: "focus.webp",
  보호: "protect.webp"
};

const UI = {
  ko: {
    mainStat: "메인 스탯", assists: "보조", level: "레벨",
    journeyStart: "여정 시작 효과", training: "훈련 효과", telepathy: "초감응 훈련 효과", supportQuest: "지원 퀘스트 효과",
    events: "이벤트", effect: "효과", sources: "획득처"
  },
  en: {
    mainStat: "Main Stat", assists: "Assists", level: "Level",
    journeyStart: "Journey Start Effects", training: "Training Effects", telepathy: "Sensory Training Effects", supportQuest: "Support Quest Effects",
    events: "Support Events", effect: "Effect", sources: "Sources"
  },
  ja: {
    mainStat: "メインステータス", assists: "補助", level: "レベル",
    journeyStart: "旅程開始効果", training: "トレーニング効果", telepathy: "感応トレーニング効果", supportQuest: "支援クエスト効果",
    events: "アルカナイベント", effect: "効果", sources: "獲得先"
  }
};

function deepClone(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value));
}

function findAfter(lines, label) {
  const index = lines.findIndex((line) => line === label);
  return index >= 0 ? lines[index + 1] || "" : "";
}

function parseDisplayValue(line) {
  const match = normalizeText(line).match(/^(.*?)([+-]\d+(?:\.\d+)?%?)$/);
  if (!match) return null;
  return { label: normalizeText(match[1]), display: normalizeText(match[2]) };
}

async function extractEffectSections(page, language) {
  const labels = UI[language] || UI.ko;
  return page.evaluate((headingLabels) => {
    const norm = (value) => String(value ?? "").replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
    const main = document.querySelector("main") || document.body;
    const headings = [...main.querySelectorAll("h2")];
    const output = {};
    for (const [key, label] of Object.entries(headingLabels)) {
      const heading = headings.find((node) => norm(node.textContent) === label);
      if (!heading) { output[key] = []; continue; }
      const lines = [];
      let node = heading.nextElementSibling;
      while (node && node.tagName !== "H2") {
        const text = norm(node.innerText || node.textContent);
        if (text) lines.push(...String(node.innerText || node.textContent).split(/\r?\n/).map(norm).filter(Boolean));
        node = node.nextElementSibling;
      }
      output[key] = lines;
    }
    return output;
  }, {
    journeyStart: labels.journeyStart,
    training: labels.training,
    telepathy: labels.telepathy,
    supportQuest: labels.supportQuest
  });
}

async function setArcanaLevel(page, level) {
  const button = page.getByRole("button", { name: String(level), exact: true }).first();
  if (await button.count()) {
    try {
      await button.click({ timeout: 5_000 });
      await page.waitForTimeout(120);
      return true;
    } catch {}
  }
  return false;
}

async function scrapeArcanaLanguage(page, slug, language) {
  const labels = UI[language] || UI.ko;
  const url = `${ESPR_ORIGIN}/${language}/database/arcanas/${slug}`;
  await gotoStable(page, url, { settleMs: 250 });
  const payload = await getPagePayload(page);
  const card = firstImageMatching(payload.images, /\/images\/arcanas\/illustration\/(\d+)\.webp/i);
  const id = card ? numericIdFromUrl(card.src, /\/illustration\/(\d+)\.webp/i) : null;
  const name = payload.title;
  const rarity = payload.images.map((item) => item.alt).find((alt) => /^(SSR|SR|R)$/.test(alt)) || "";
  const mainStat = findAfter(payload.lines, labels.mainStat);
  const characterLink = payload.links.find((link) => /\/database\/characters\/[^/?#]+$/i.test(link.href));
  const nameIndex = payload.lines.findIndex((line) => line === name);
  let character = normalizeText(characterLink?.text || "");
  if (!character && nameIndex > 0) character = payload.lines[nameIndex - 1] || "";

  const imageAlt = payload.images.map((item) => normalizeText(item.alt)).filter(Boolean);
  const assists = [...new Set(imageAlt.filter((alt) => ![name, mainStat, rarity, "ESPR"].includes(alt) && !/^ESPR/.test(alt)))];
  // The first remaining image alt can be a character portrait on some pages; keep only the compact assist/class labels.
  const filteredAssists = assists.filter((alt) => alt.length <= 18 && alt !== character).slice(0, 2);

  const levelIndex = payload.lines.findIndex((line) => line === labels.level);
  const assistIndex = payload.lines.findIndex((line) => line === labels.assists);
  let uniqueName = "";
  let uniqueDescription = "";
  if (levelIndex > 0) {
    const before = payload.lines.slice(Math.max(0, assistIndex + 1), levelIndex)
      .filter((line) => !filteredAssists.includes(line) && line !== mainStat && line !== name && line !== character);
    if (before.length >= 2) {
      uniqueName = before[before.length - 2];
      uniqueDescription = before[before.length - 1];
    }
  }

  const effectsByLevel = {};
  for (const level of DISPLAY_LEVELS) {
    await setArcanaLevel(page, level);
    const sections = await extractEffectSections(page, language);
    effectsByLevel[level] = Object.fromEntries(Object.entries(sections).map(([key, lines]) => [
      key,
      lines.map(parseDisplayValue).filter(Boolean)
    ]));
  }

  return {
    url, payload, id, name, character, rarity, mainStat,
    assists: filteredAssists,
    image: card?.src || "",
    uniqueName, uniqueDescription,
    effectsByLevel
  };
}

function mergeLocalizedValue(records, field, fallback = {}) {
  const values = {};
  for (const language of LANGUAGES) values[language] = records[language]?.[field] || fallback?.[language] || "";
  return localizedFromValues(values);
}

function mergeEffects(oldEffects, records) {
  const output = deepClone(oldEffects || { journeyStart: [], training: [], telepathy: [], supportQuest: [] });
  for (const category of ["journeyStart", "training", "telepathy", "supportQuest"]) {
    const koRows = records.ko?.effectsByLevel?.[DISPLAY_LEVELS[0]]?.[category] || [];
    const count = Math.max(output[category]?.length || 0, koRows.length);
    output[category] = Array.from({ length: count }, (_, index) => {
      const old = output[category]?.[index] || {
        unlockLevel: 1,
        promotePerLevel: 1,
        activeType: category,
        valueType: { ko: "", en: "", ja: "" },
        isRate: false,
        valueInt: 0,
        valueRate: 0,
        valueIntPerPromote: 0,
        valueRatePerPromote: 0,
        values: {}
      };
      const valueType = { ...(old.valueType || {}) };
      for (const language of LANGUAGES) {
        const row = records[language]?.effectsByLevel?.[DISPLAY_LEVELS[0]]?.[category]?.[index];
        if (row?.label) valueType[language] = row.label;
      }
      const values = { ...(old.values || {}) };
      for (const level of DISPLAY_LEVELS) {
        const display = records.ko?.effectsByLevel?.[level]?.[category]?.[index]?.display;
        if (display) {
          const numeric = Number(display.replace(/[+,%]/g, ""));
          values[String(level)] = { value: Number.isFinite(numeric) ? numeric : old.values?.[String(level)]?.value ?? 0, display: display.replace(/^\+/, "") };
        }
      }
      return { ...old, valueType, values };
    });
  }
  return output;
}

function mergeArcana(old, records, id) {
  const ko = records.ko;
  const oldEffect = old?.uniqueEffect || null;
  const uniqueEffect = (ko.uniqueName || oldEffect)
    ? {
        ...(oldEffect || { unlockLevel: 1, promotePerLevel: 1, uniqueType: "ESPR", uniqueConditionValue: 0, activeType: "ESPR", valueType: "", valueInt: 0, valueRate: 0, valueIntPerPromote: 0, valueRatePerPromote: 0 }),
        name: mergeLocalizedValue(records, "uniqueName", oldEffect?.name || {}),
        description: mergeLocalizedValue(records, "uniqueDescription", oldEffect?.description || {})
      }
    : null;

  const mainStatKo = ko.mainStat || old?.mainStat?.ko || "";
  return {
    id,
    name: mergeLocalizedValue(records, "name", old?.name || {}),
    character: mergeLocalizedValue(records, "character", old?.character || {}),
    rarity: ko.rarity || old?.rarity || "SSR",
    mainStat: mergeLocalizedValue(records, "mainStat", old?.mainStat || {}),
    assists: Array.from({ length: Math.max(ko.assists?.length || 0, old?.assists?.length || 0) }, (_, index) => {
      const value = {};
      for (const language of LANGUAGES) value[language] = records[language]?.assists?.[index] || old?.assists?.[index]?.[language] || "";
      return value;
    }).filter((item) => item.ko || item.en || item.ja),
    image: `./data/arcana-assets/cards/${id}.webp`,
    mainStatIcon: old?.mainStatIcon || (MAIN_STAT_FILE[mainStatKo] ? `./data/arcana-assets/status/${MAIN_STAT_FILE[mainStatKo]}` : ""),
    specialPotentialId: old?.specialPotentialId ?? null,
    uniqueEffect,
    effects: mergeEffects(old?.effects, records),
    // ESPR renders event text but does not expose the source DB's reward IDs in the DOM.
    // Keep the structured reward graph for existing cards; brand-new cards start with an empty array until IDs can be resolved.
    events: deepClone(old?.events || [])
  };
}

async function scrapePotentialLanguage(page, slug, language) {
  const labels = UI[language] || UI.ko;
  const url = `${ESPR_ORIGIN}/${language}/database/potentials/${slug}`;
  await gotoStable(page, url, { settleMs: 180 });
  const payload = await getPagePayload(page);
  const icon = firstImageMatching(payload.images, /\/images\/potentials\/icons\/(\d+)\.webp/i);
  const id = icon ? numericIdFromUrl(icon.src, /\/icons\/(\d+)\.webp/i) : null;
  const name = payload.title;
  const effectIndex = payload.lines.findIndex((line) => line === labels.effect);
  const sourceIndex = payload.lines.findIndex((line) => line === labels.sources);
  const description = effectIndex >= 0
    ? payload.lines.slice(effectIndex + 1, sourceIndex > effectIndex ? sourceIndex : effectIndex + 5).find((line) => line.length > 4) || ""
    : "";
  return { id, name, description, icon: icon?.src || "", lines: payload.lines };
}

function potentialTypeFromKorean(lines) {
  const joined = lines.join(" ");
  if (joined.includes("고유")) return "unique";
  if (joined.includes("특수")) return "special";
  return "normal";
}

async function refreshPotentials(context, oldPotentials) {
  const page = await context.newPage();
  const slugs = await discoverSlugs(page, "potentials");
  await page.close();
  const oldById = new Map((oldPotentials || []).map((item) => [Number(item.id), item]));
  const results = await mapLimit(slugs, 2, async (slug) => {
    const workerPage = await context.newPage();
    try {
      const records = {};
      for (const language of LANGUAGES) records[language] = await scrapePotentialLanguage(workerPage, slug, language);
      const id = Number(records.ko.id || stableNumericId(`potential:${slug}`, 9_000_000));
      const old = oldById.get(id) || {};
      const descriptions = mergeLocalizedValue(records, "description", old.description || {});
      const levels = Array.isArray(old.levels) && old.levels.length
        ? deepClone(old.levels)
        : [{ level: 1, requiredPotentialPoints: null, bondPointCheck: false, description: descriptions }];
      if (levels.length) levels[0].description = { ...(levels[0].description || {}), ...descriptions };
      return {
        ...old,
        id,
        strId: old.strId || `ESPR_${slug.toUpperCase().replace(/[^A-Z0-9]+/g, "_")}`,
        type: old.type || potentialTypeFromKorean(records.ko.lines),
        unitId: old.unitId ?? null,
        class: old.class ?? null,
        name: mergeLocalizedValue(records, "name", old.name || {}),
        description: descriptions,
        icon: `./data/arcana-assets/potentials/${id}.webp`,
        background: old.background || "./data/arcana-assets/potential-backgrounds/bg_yellow.webp",
        levels,
        _sourceIcon: records.ko.icon
      };
    } catch (error) {
      console.warn(`potential ${slug}: ${error.message}`);
      return null;
    } finally {
      await workerPage.close();
    }
  });
  const valid = results.filter(Boolean);
  const ids = new Set(valid.map((item) => Number(item.id)));
  for (const old of oldPotentials || []) if (!ids.has(Number(old.id))) valid.push(deepClone(old));
  return valid;
}

async function scrapeOneArcana(context, slug, oldById, oldByName) {
  const page = await context.newPage();
  page.setDefaultTimeout(60_000);
  try {
    const records = {};
    for (const language of LANGUAGES) records[language] = await scrapeArcanaLanguage(page, slug, language);
    const id = Number(records.ko.id || 0);
    if (!id) throw new Error(`${slug}: Arcana id was not found in ESPR card image URL`);
    const old = oldById.get(id) || oldByName.get(records.ko.name) || null;
    return { id, slug, records, arcana: mergeArcana(old, records, id), imageSource: records.ko.image };
  } finally {
    await page.close();
  }
}

async function main() {
  await Promise.all([fs.mkdir(OUTPUT_DIR, { recursive: true }), fs.mkdir(CARD_DIR, { recursive: true }), fs.mkdir(POTENTIAL_DIR, { recursive: true })]);
  const oldArchive = await readJsonIfExists(OUTPUT_PATH, { arcanas: [], potentials: [], journeyBuffs: [], statusIcons: {} });
  const oldById = new Map((oldArchive.arcanas || []).map((item) => [Number(item.id), item]));
  const oldByName = new Map((oldArchive.arcanas || []).map((item) => [normalizeText(item.name?.ko), item]));

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ locale: "ko-KR", viewport: { width: 1280, height: 1800 } });
  const discovery = await context.newPage();
  const slugs = await discoverSlugs(discovery, "arcanas");
  await discovery.close();
  console.log(`ESPR Arcana discovered: ${slugs.length}`);

  const failures = [];
  const scraped = await mapLimit(slugs, 2, async (slug, index) => {
    try {
      console.log(`[${index + 1}/${slugs.length}] ${slug}`);
      return await scrapeOneArcana(context, slug, oldById, oldByName);
    } catch (error) {
      failures.push({ slug, error: error?.message || String(error) });
      console.warn(`${slug}: ${error?.stack || error}`);
      return null;
    }
  });

  const results = scraped.filter(Boolean);
  const minimum = Math.max(75, Math.min(slugs.length, oldArchive.arcanas?.length || 0));
  if (results.length < minimum) {
    await browser.close();
    throw new Error(`ESPR Arcana scrape incomplete: ${results.length}/${slugs.length}; minimum ${minimum}`);
  }

  const seen = new Set(results.map((item) => item.id));
  for (const old of oldArchive.arcanas || []) {
    if (!seen.has(Number(old.id))) {
      results.push({ id: Number(old.id), slug: `legacy-${old.id}`, records: null, arcana: deepClone(old), imageSource: "" });
    }
  }
  results.sort((a, b) => a.id - b.id);

  let assetCount = 0;
  let assetBytes = 0;
  for (const item of results) {
    if (!item.imageSource) continue;
    const result = await downloadAsset(context, item.imageSource, path.join(CARD_DIR, `${item.id}.webp`), { optional: true });
    if (!result.failed) { assetCount += 1; assetBytes += result.bytes || 0; }
  }

  const potentials = await refreshPotentials(context, oldArchive.potentials || []);
  for (const potential of potentials) {
    if (!potential._sourceIcon) continue;
    const result = await downloadAsset(context, potential._sourceIcon, path.join(POTENTIAL_DIR, `${potential.id}.webp`), { optional: true });
    if (!result.failed) { assetCount += 1; assetBytes += result.bytes || 0; }
  }
  await browser.close();

  const cleanPotentials = potentials.map(({ _sourceIcon, ...potential }) => potential);
  const capturedAt = new Date().toISOString();
  const archive = {
    schemaVersion: 2,
    sourceOrigin: ESPR_ORIGIN,
    sourcePage: `${ESPR_ORIGIN}/ko/database/arcanas`,
    capturedAt,
    languages: LANGUAGES,
    levels: DISPLAY_LEVELS,
    localOnly: true,
    statusIcons: oldArchive.statusIcons || {},
    potentials: cleanPotentials,
    // Journey-buff internal IDs are not rendered by ESPR. Retain the existing local mapping so old event reward structures remain lossless.
    journeyBuffs: deepClone(oldArchive.journeyBuffs || []),
    arcanas: results.map((item) => item.arcana)
  };
  const eventCount = archive.arcanas.reduce((sum, arcana) => sum + (arcana.events?.length || 0), 0);
  const choiceCount = archive.arcanas.reduce((sum, arcana) => sum + (arcana.events || []).reduce((inner, event) => inner + (event.choices?.length || 0), 0), 0);
  const manifest = {
    schemaVersion: 2,
    sourceOrigin: ESPR_ORIGIN,
    capturedAt,
    languages: LANGUAGES,
    arcanaCount: archive.arcanas.length,
    eventCount,
    choiceCount,
    potentialCount: archive.potentials.length,
    journeyBuffCount: archive.journeyBuffs.length,
    assetCount,
    assetBytes,
    localOnly: true,
    fallbackPolicy: "ESPR is authoritative for visible Arcana fields/effects/images. Existing internal event reward IDs and journey-buff IDs are retained because ESPR does not expose those numeric IDs in rendered pages.",
    failures
  };

  await writeJsonAtomic(OUTPUT_PATH, archive);
  await writeJsonAtomic(MANIFEST_PATH, manifest);
  console.log(JSON.stringify(manifest, null, 2));
}

main().catch((error) => {
  console.error(error?.stack || error?.message || String(error));
  process.exitCode = 1;
});
