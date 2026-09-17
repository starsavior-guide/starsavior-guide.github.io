import { chromium } from "playwright";
import { promises as fs } from "node:fs";
import path from "node:path";
import {
  ESPR_ORIGIN,
  LANGUAGES,
  REFRESH_ALL,
  discoverSlugs,
  downloadAsset,
  firstImageMatching,
  getPagePayload,
  loadStaticPage,
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
const AGILE_STANCE_BUFF_ID = 8_103_901;

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

function extractEffectSectionsFromLines(lines, labels) {
  const headings = [labels.journeyStart, labels.training, labels.telepathy, labels.supportQuest, labels.events].filter(Boolean);
  const output = {};
  for (const [key, label] of Object.entries({
    journeyStart: labels.journeyStart,
    training: labels.training,
    telepathy: labels.telepathy,
    supportQuest: labels.supportQuest
  })) {
    const start = lines.findIndex((line) => line === label);
    if (start < 0) { output[key] = []; continue; }
    let end = lines.length;
    for (let index = start + 1; index < lines.length; index += 1) {
      if (headings.includes(lines[index])) { end = index; break; }
    }
    output[key] = lines.slice(start + 1, end);
  }
  return output;
}

function parseFlightArcanaEffects(html) {
  const chunks = [];
  const chunkPattern = /self\.__next_f\.push\(\[1,("(?:\\.|[^"\\])*")\]\)/g;
  for (const match of String(html || '').matchAll(chunkPattern)) {
    try { chunks.push(JSON.parse(match[1])); } catch {}
  }
  const flight = chunks.join('\n');
  const readArray = (key) => {
    const marker = `"${key}":`;
    let searchAt = 0;
    let selected = null;
    while (searchAt < flight.length) {
      const start = flight.indexOf(marker, searchAt);
      if (start < 0) break;
      searchAt = start + marker.length;
      const bracket = flight.indexOf('[', searchAt);
      if (bracket < 0 || bracket - searchAt > 3) continue;
      let depth = 0;
      let quoted = false;
      let escaped = false;
      for (let index = bracket; index < flight.length; index += 1) {
        const char = flight[index];
        if (quoted) {
          if (escaped) escaped = false;
          else if (char === '\\') escaped = true;
          else if (char === '"') quoted = false;
          continue;
        }
        if (char === '"') { quoted = true; continue; }
        if (char === '[') depth += 1;
        else if (char === ']') {
          depth -= 1;
          if (depth === 0) {
            try {
              const candidate = JSON.parse(flight.slice(bracket, index + 1));
              if (!candidate.length || candidate.every((item) => item && typeof item === 'object' && 'unlockLevel' in item)) selected = candidate;
            } catch {}
            break;
          }
        }
      }
    }
    return selected || [];
  };
  return {
    journeyStart: readArray('journeyStartEffects'),
    training: readArray('trainingEffects'),
    telepathy: readArray('sensoryTrainingEffects'),
    supportQuest: readArray('questEffects')
  };
}

async function extractEffectSections(page, language) {
  const labels = UI[language] || UI.ko;
  return page.evaluate((headingLabels) => {
    const norm = (value) => String(value ?? "").replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
    const main = document.querySelector("main") || document.body;
    const headings = [...main.querySelectorAll("h2,h3")];
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
  const staticHtml = await loadStaticPage(page, url);
  const payload = await getPagePayload(page);
  const card = firstImageMatching(payload.images, /\/images\/arcanas\/illustration\/(\d+)\.webp/i);
  const id = card ? numericIdFromUrl(card.src, /\/illustration\/(\d+)\.webp/i) : null;
  const name = payload.title;
  const rarity = payload.images.map((item) => item.alt).find((alt) => /^(SSR|SR|R)$/.test(alt)) || "";
  const mainStat = findAfter(payload.lines, labels.mainStat);
  const nameIndex = payload.lines.findIndex((line) => line === name);
  const repeatedNameIndex = payload.lines.findIndex((line, index) => index > nameIndex && line === name);
  let character = repeatedNameIndex > 0 ? payload.lines[repeatedNameIndex - 1] || "" : "";

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
    const currentPayload = await getPagePayload(page);
    const domSections = await extractEffectSections(page, language);
    const lineSections = extractEffectSectionsFromLines(currentPayload.lines, labels);
    const sections = Object.fromEntries(Object.keys(lineSections).map((key) => [key, domSections[key]?.length ? domSections[key] : lineSections[key]]));
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
    effectsByLevel,
    sourceEffects: parseFlightArcanaEffects(staticHtml)
  };
}

function mergeLocalizedValue(records, field, fallback = {}) {
  const values = {};
  for (const language of LANGUAGES) values[language] = records[language]?.[field] || fallback?.[language] || "";
  return localizedFromValues(values);
}

function mergeEffects(oldEffects, records) {
  const source = records.en?.sourceEffects || records.ko?.sourceEffects;
  if (source && Object.values(source).some((items) => items.length)) {
    return Object.fromEntries(Object.entries(source).map(([category, items]) => [category, items.map((effect) => {
      const unlockLevel = Number(effect.unlockLevel || 1);
      const promotePerLevel = Math.max(1, Number(effect.promotePerLevel || 1));
      const valueInt = Number(effect.valueInt || 0);
      const valueRate = Number(effect.valueRate || 0);
      const valueIntPerPromote = Number(effect.perPromoteInt || 0);
      const valueRatePerPromote = Number(effect.perPromoteRate || 0);
      const isRate = valueRate !== 0 || valueRatePerPromote !== 0;
      const values = {};
      for (const level of DISPLAY_LEVELS) {
        if (level < unlockLevel) continue;
        const promotions = Math.floor((level - unlockLevel) / promotePerLevel);
        const value = isRate
          ? valueRate + promotions * valueRatePerPromote
          : valueInt + promotions * valueIntPerPromote;
        values[String(level)] = { value, display: isRate ? `${(value / 100).toFixed(2)}%` : String(value) };
      }
      return {
        unlockLevel,
        promotePerLevel,
        activeType: category,
        valueType: {
          ko: effect.valueType?.ko || '',
          en: effect.valueType?.en || '',
          ja: effect.valueType?.ja || ''
        },
        isRate,
        valueInt,
        valueRate,
        valueIntPerPromote,
        valueRatePerPromote,
        values
      };
    })]));
  }
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

function professorMEvents() {
  const stat = (type, amount, ko, en, ja, icon) => ({ type: 'RT_STAT', min: amount, max: amount, rewardStat: type, statName: { ko, en, ja }, icon: `./data/arcana-assets/status/${icon}` });
  const potential = (id) => ({ type: 'RT_SE_POTEN', min: 1, max: 1, rewardId: id });
  const buff = () => ({ type: 'RT_JOURNEY_BUFF', min: 1, max: 1, rewardId: AGILE_STANCE_BUFF_ID });
  return [
    {
      id: 710390101,
      name: { ko: '인기 강좌의 비결', en: 'The Secret to a Popular Course', ja: '人気講座の秘訣' },
      choices: [
        { name: { ko: '강의 주제의 문제가 아닐까?', en: 'Could the lecture topic be the problem?', ja: '講義のテーマに問題があるんじゃないかな？' }, successRewards: [[stat('JST_ENDURANCE', 10, '인내', 'Endurance', '忍耐', 'endurance.webp')], [stat('JST_FOCUS', 10, '집중', 'Focus', '集中', 'focus.webp')]], failureRewards: [] },
        { name: { ko: '강의 방식의 문제가 아닐까?', en: 'Could the teaching style be the problem?', ja: '講義のやり方に問題があるんじゃないかな？' }, successRewards: [[potential(20007)]], failureRewards: [] }
      ]
    },
    {
      id: 710390102,
      name: { ko: '십자말풀이', en: 'Crossword Puzzle', ja: 'クロスワード' },
      choices: [
        { name: { ko: '그웬에게 준다.', en: 'Give it to Gwen.', ja: 'グウェンに渡す。' }, successRewards: [[stat('JST_ENDURANCE', 12, '인내', 'Endurance', '忍耐', 'endurance.webp')], [stat('JST_HEALTH', 8, '체력', 'Vitality', '体力', 'health.webp')], [potential(21004)]], failureRewards: [] },
        { name: { ko: '교수에게 준다.', en: 'Give it to the Professor.', ja: '教授に渡す。' }, successRewards: [[stat('JST_ENDURANCE', 12, '인내', 'Endurance', '忍耐', 'endurance.webp')], [stat('JST_HEALTH', 8, '체력', 'Vitality', '体力', 'health.webp')], [potential(21005)]], failureRewards: [] }
      ]
    },
    {
      id: 710390103,
      name: { ko: '분홍색 연구', en: 'A Study in Pink', ja: '桃色の研究' },
      choices: [
        { name: { ko: '분홍색 연구: 미래를 아는 예언자', en: 'Pink Research: The Oracle Who Knows the Future', ja: '桃色の研究：未来を知る予言者' }, successRewards: [[stat('JST_ENDURANCE', 15, '인내', 'Endurance', '忍耐', 'endurance.webp')], [{ type: 'RT_POTEN_POINT', min: 20, max: 20 }], [buff()]], failureRewards: [] },
        { name: { ko: '분홍색 연구: 모노리스 교단의 성녀', en: 'Pink Research: The Saintess of the Monolith Order', ja: '桃色の研究：モノリス教団の聖女' }, successRewards: [[stat('JST_FOCUS', 18, '집중', 'Focus', '集中', 'focus.webp')], [potential(22007)], [buff()]], failureRewards: [] }
      ]
    }
  ];
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
    events: deepClone(old?.events || (id === 7103901 ? professorMEvents() : []))
  };
}

async function scrapePotentialLanguage(page, slug, language) {
  const labels = UI[language] || UI.ko;
  const url = `${ESPR_ORIGIN}/${language}/database/potentials/${slug}`;
  await loadStaticPage(page, url);
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
  const results = await mapLimit(slugs, 1, async (slug) => {
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
  const context = await browser.newContext({
    locale: "ko-KR",
    viewport: { width: 1280, height: 1800 },
    userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
    extraHTTPHeaders: {
      "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control": "no-cache",
      pragma: "no-cache"
    }
  });
  const discovery = await context.newPage();
  await loadStaticPage(discovery, `${ESPR_ORIGIN}/en/database/arcanas`);
  const candidates = await discovery.evaluate(() => [...document.querySelectorAll('a[href*="/en/database/arcanas/"]')]
    .map((anchor) => {
      const href = anchor.getAttribute('href') || '';
      const slug = (href.match(/\/en\/database\/arcanas\/([^/?#]+)/) || [])[1] || '';
      const sources = [...anchor.querySelectorAll('img')].flatMap((img) => [img.currentSrc, img.src, img.srcset]);
      const decoded = sources.map((value) => { try { return decodeURIComponent(value || ''); } catch { return value || ''; } }).join(' ');
      const id = Number((decoded.match(/\/arcanas\/illustration\/(\d+)\.webp/) || [])[1] || 0);
      return { id, slug };
    })
    .filter((item) => item.id && item.slug));
  await discovery.close();
  const uniqueCandidates = [...new Map(candidates.map((item) => [item.id, item])).values()].sort((a, b) => a.id - b.id);
  const selected = REFRESH_ALL ? uniqueCandidates : uniqueCandidates.filter((item) => !oldById.has(Number(item.id)));
  const slugs = selected.map((item) => item.slug);
  console.log(`ESPR Arcana discovered: ${uniqueCandidates.length}; selected new: ${slugs.length}`);
  if (!slugs.length) {
    await browser.close();
    console.log('No new ESPR Arcana IDs.');
    return;
  }

  const failures = [];
  const scraped = await mapLimit(slugs, 1, async (slug, index) => {
    try {
      console.log(`[${index + 1}/${slugs.length}] ${slug}`);
      return await scrapeOneArcana(context, slug, oldById, oldByName);
    } catch (error) {
      failures.push({ slug, error: error?.message || String(error) });
      console.warn(`${slug}: ${error?.stack || error}`);
      return null;
    }
  });

  const freshResults = scraped.filter(Boolean);
  const minimum = slugs.length;
  if (freshResults.length < minimum) {
    await browser.close();
    throw new Error(`ESPR Arcana scrape incomplete: ${freshResults.length}/${slugs.length}; minimum ${minimum}`);
  }

  const freshIds = new Set(freshResults.map((item) => item.id));
  const results = (oldArchive.arcanas || []).map((old) => ({
    id: Number(old.id), slug: `legacy-${old.id}`, records: null, arcana: deepClone(old), imageSource: ""
  }));
  for (const item of freshResults) if (!results.some((old) => old.id === item.id)) results.push(item);

  let assetCount = 0;
  let assetBytes = 0;
  for (const item of results) {
    if (!item.imageSource) continue;
    const result = await downloadAsset(context, item.imageSource, path.join(CARD_DIR, `${item.id}.webp`), { optional: true });
    if (!result.failed) { assetCount += 1; assetBytes += result.bytes || 0; }
  }

  const potentials = REFRESH_ALL
    ? await refreshPotentials(context, oldArchive.potentials || [])
    : deepClone(oldArchive.potentials || []);
  for (const potential of potentials) {
    if (!potential._sourceIcon) continue;
    const result = await downloadAsset(context, potential._sourceIcon, path.join(POTENTIAL_DIR, `${potential.id}.webp`), { optional: true });
    if (!result.failed) { assetCount += 1; assetBytes += result.bytes || 0; }
  }
  await browser.close();

  const cleanPotentials = potentials.map(({ _sourceIcon, ...potential }) => potential);
  const capturedAt = new Date().toISOString();
  const journeyBuffs = deepClone(oldArchive.journeyBuffs || []);
  if (results.some((item) => item.id === 7103901) && !journeyBuffs.some((item) => Number(item.id) === AGILE_STANCE_BUFF_ID)) {
    journeyBuffs.push({
      id: AGILE_STANCE_BUFF_ID,
      group: 0,
      type: 'ESPR_VISIBLE_REWARD',
      value: 0,
      turn: 0,
      isBuff: true,
      name: { ko: '날렵한 자세', en: 'Agile Stance', ja: '鋭い姿勢' },
      description: { ko: '', en: '', ja: '' },
      icon: ''
    });
  }
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
    journeyBuffs,
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
