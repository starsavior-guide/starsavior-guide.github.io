import { chromium } from "playwright";
import { promises as fs } from "node:fs";
import path from "node:path";
import {
  ESPR_ORIGIN,
  LANGUAGES,
  REFRESH_ALL,
  discoverSlugs,
  downloadAsset,
  findLineValue,
  firstImageMatching,
  getPagePayload,
  gotoStable,
  htmlEscape,
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
const PROFILE_DIR = path.join(ROOT, "data", "saviors");
const PROFILE_INDEX_PATH = path.join(PROFILE_DIR, "index.json");
const DETAIL_ASSET_DIR = path.join(ROOT, "data", "savior-detail-assets");
const SKILL_DIR = path.join(ROOT, "data", "savior-skills");
const SKILL_ARCHIVE_PATH = path.join(SKILL_DIR, "saviors.json");
const SKILL_MANIFEST_PATH = path.join(SKILL_DIR, "manifest.json");
const SKILL_ASSET_DIR = path.join(ROOT, "data", "savior-skill-assets", "skills");
const BUFF_ASSET_DIR = path.join(ROOT, "data", "savior-skill-assets", "buffs");
const BLOOM_DIR = path.join(ROOT, "data", "savior-bloom");
const BLOOM_INDEX_PATH = path.join(BLOOM_DIR, "index.json");

const TYPE_LABELS = {
  ko: ["패시브", "기본기", "특수기", "궁극기"],
  en: ["Passive", "Basic", "Special", "Ultimate"],
  ja: ["パッシブ", "基本技", "特殊技", "究極技"]
};

const PROFILE_LABELS_KO = {
  birthday: "생일",
  height: "키",
  origin: "출신",
  affiliation: "소속",
  cvKr: "성우 (한국어)",
  cvJp: "성우 (일본어)"
};

const ELEMENTS = ["태양", "달", "별", "질서", "혼돈"];
const CLASSES = ["스트라이커", "어쌔신", "레인저", "캐스터", "디펜더", "서포터"];
const ATTACK_TYPES = ["참격", "타격", "마법", "정신"];
const JOURNEY_STATS = ["힘", "체력", "인내", "집중", "보호"];
const BASE_STATS = ["공격력", "생명력", "방어력", "속도", "치명타 확률", "치명타 피해", "효과 적중", "효과 저항"];

function deepClone(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value));
}

function matchLocalizedType(line, language) {
  const labels = TYPE_LABELS[language] || TYPE_LABELS.ko;
  const index = labels.findIndex((label) => line.includes(label));
  return index >= 0 ? index : null;
}

function findTitleBeforeName(lines, name) {
  const index = lines.findIndex((line) => line === name);
  if (index <= 0) return "";
  const banned = new Set(["홈", "데이터베이스", "캐릭터", "개요", "여정", "일러스트", "대사", "스탯 & 데미지", "ESPR.gg"]);
  for (let i = index - 1; i >= Math.max(0, index - 8); i -= 1) {
    const line = normalizeText(lines[i]);
    if (!line || banned.has(line) || /^(SSR|SR|R)$/.test(line)) continue;
    if (ELEMENTS.includes(line) || CLASSES.includes(line) || ATTACK_TYPES.includes(line)) continue;
    return line;
  }
  return "";
}

function findDescriptionAfterName(lines, name) {
  const index = lines.findIndex((line) => line === name);
  for (let i = index + 1; i < Math.min(lines.length, index + 8); i += 1) {
    const line = normalizeText(lines[i]);
    if (line.length >= 18 && !line.startsWith("선호 선물") && !ELEMENTS.includes(line) && !CLASSES.includes(line)) return line;
  }
  return "";
}

function parseSkillHeader(card, language) {
  const labels = TYPE_LABELS[language] || TYPE_LABELS.ko;
  const header = card.lines.find((line) => labels.some((label) => line.includes(label))) || "";
  const type = matchLocalizedType(header, language);
  let target = "NSTT_INVALID";
  if (/광역|All Enemies|敵全体|全体/.test(header)) target = "NSTT_ENEMY_ALL";
  else if (/단일|Single Target|敵単体|単体/.test(header)) target = "NSTT_ENEMY_ONE";
  else if (/아군 전체|All Allies|味方全体/.test(header)) target = "NSTT_ALLY_ALL";
  else if (/아군 단일|1 Ally|味方単体/.test(header)) target = "NSTT_ALLY_ONE";
  else if (/자신|Self|自身/.test(header)) target = "NSTT_MYSELF";

  const cooldown = Number((header.match(/(?:쿨타임|Cooldown|クールタイム)\s*:?\s*(\d+)/i) || [])[1] || 0);
  const breakValue = Number((card.text.match(/(?:강인도 피해|Toughness DMG|靭性ダメージ)\s*(\d+)/i) || [])[1] || 0);
  const nova = Number((card.text.match(/(?:노바|Nova|ノヴァ)\s*(\d+)/i) || [])[1] || 0);
  return { type, target, cooldown, breakValue, nova };
}

async function extractSkillCards(page, language) {
  const cards = await page.evaluate(({ labels }) => {
    const norm = (value) => String(value ?? "").replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
    const unwrap = (raw) => {
      try {
        const url = new URL(raw, location.href);
        if (url.pathname === "/_next/image") {
          const inner = url.searchParams.get("url");
          if (inner) return decodeURIComponent(inner);
        }
        return url.href;
      } catch { return String(raw || ""); }
    };
    const main = document.querySelector("main") || document.body;
    const skillImages = [...main.querySelectorAll("img")]
      .filter((img) => /\/images\/characters\/skills\/\d+_\d+\.webp/i.test(unwrap(img.currentSrc || img.src || "")));

    const results = [];
    for (const img of skillImages) {
      let element = img.parentElement;
      let best = null;
      for (let depth = 0; element && element !== main && depth < 10; depth += 1, element = element.parentElement) {
        const text = norm(element.innerText || "");
        const count = [...element.querySelectorAll("img")]
          .filter((node) => /\/images\/characters\/skills\/\d+_\d+\.webp/i.test(unwrap(node.currentSrc || node.src || ""))).length;
        if (!best && count === 1 && labels.some((label) => text.includes(label)) && text.length > 20) best = element;
        if (best) break;
      }
      const card = best || img.parentElement || main;
      const text = norm(card.innerText || "");
      const lines = String(card.innerText || "").split(/\r?\n/).map(norm).filter(Boolean);
      const paragraphs = [...card.querySelectorAll("p")].map((p) => norm(p.innerText || p.textContent)).filter(Boolean);
      const statusLinks = [...card.querySelectorAll('a[href*="/database/status-effects/"]')].map((anchor) => ({
        text: norm(anchor.innerText || anchor.textContent),
        href: new URL(anchor.getAttribute("href"), location.href).href
      }));
      const novaHeading = [...card.querySelectorAll("h3,h4,strong,div,span")]
        .find((node) => /^(노바 버스트|Nova Burst|ノヴァバースト)$/.test(norm(node.textContent)));
      let novaDescription = "";
      if (novaHeading) {
        let cursor = novaHeading.nextElementSibling;
        while (cursor && !novaDescription) {
          const candidate = norm(cursor.innerText || cursor.textContent);
          if (candidate && !/^(노바 버스트|Nova Burst|ノヴァバースト)$/.test(candidate)) novaDescription = candidate;
          cursor = cursor.nextElementSibling;
        }
      }
      const description = paragraphs.find((value) => value.length >= 18 && value !== novaDescription) || "";
      results.push({
        name: norm(img.alt),
        icon: unwrap(img.currentSrc || img.src || ""),
        text,
        lines,
        description,
        novaDescription,
        statusLinks
      });
    }

    return results.sort((a, b) => {
      const ai = Number((a.icon.match(/_(\d+)\.webp/) || [])[1] || 999);
      const bi = Number((b.icon.match(/_(\d+)\.webp/) || [])[1] || 999);
      return ai - bi;
    });
  }, { labels: TYPE_LABELS[language] || TYPE_LABELS.ko });

  return cards.map((card) => ({ ...card, ...parseSkillHeader(card, language) }));
}

async function tryEnableBloom(page, language) {
  const labels = language === "ko"
    ? ["수호성 개화"]
    : language === "en"
      ? ["Stellar Blooming"]
      : ["ステラブルーミング", "守護星開花"];
  return page.evaluate((headings) => {
    const norm = (value) => String(value ?? "").replace(/\s+/g, " ").trim();
    const all = [...document.querySelectorAll("h2,h3,h4")];
    const heading = all.find((node) => headings.some((label) => norm(node.textContent).includes(label)));
    if (!heading) return false;
    let box = heading.parentElement;
    for (let depth = 0; box && depth < 5; depth += 1, box = box.parentElement) {
      const buttons = [...box.querySelectorAll("button")].filter((button) => /^(SSR|SR|R)$/.test(norm(button.textContent)));
      if (buttons.length >= 2) {
        const target = buttons[buttons.length - 1];
        target.click();
        return true;
      }
    }
    return false;
  }, labels);
}

async function scrapeOverview(page, slug, language) {
  const url = `${ESPR_ORIGIN}/${language}/database/characters/${slug}`;
  await gotoStable(page, url, { settleMs: 300 });
  const payload = await getPagePayload(page);
  const portrait = firstImageMatching(payload.images, /\/images\/characters\/portrait\/(\d+)\.webp/i);
  const id = portrait ? numericIdFromUrl(portrait.src, /\/portrait\/(\d+)\.webp/i) : null;
  const rank = (payload.images.map((item) => item.alt).find((alt) => /^(SSR|SR|R)$/.test(alt)) || "SSR");
  const name = payload.title;
  const title = findTitleBeforeName(payload.lines, name);
  const description = findDescriptionAfterName(payload.lines, name);
  const skills = await extractSkillCards(page, language);

  let bloomSkills = [];
  try {
    if (await tryEnableBloom(page, language)) {
      await page.waitForTimeout(350);
      bloomSkills = await extractSkillCards(page, language);
    }
  } catch (error) {
    console.warn(`${slug}/${language}: Bloom scrape fallback: ${error.message}`);
  }

  return { url, payload, id, rank, name, title, description, portrait: portrait?.src || "", skills, bloomSkills };
}

async function scrapeJourney(page, slug, language) {
  const url = `${ESPR_ORIGIN}/${language}/database/characters/${slug}/journey`;
  await gotoStable(page, url, { settleMs: 250 });
  const payload = await getPagePayload(page);
  const potentialLinks = payload.links.filter((link) => /\/database\/potentials\/[^/?#]+/i.test(link.href));
  const resonanceWords = language === "ko" ? ["공명"] : language === "en" ? ["Resonance"] : ["共鳴"];
  const potentials = potentialLinks.map((link) => {
    const slugMatch = link.href.match(/\/database\/potentials\/([^/?#]+)/i);
    const lines = splitLines(link.text);
    const all = normalizeText(link.text);
    const stepMatch = all.match(/(?:공명|Resonance|共鳴)\s*(\d+)/i) || all.match(/\b(\d+)\b/);
    const name = lines[0] || "";
    const description = [...lines].reverse().find((line) => line !== name && !resonanceWords.some((word) => line.includes(word)) && !/^\d+$/.test(line)) || "";
    return { slug: slugMatch?.[1] || "", name, step: Number(stepMatch?.[1] || 0), description };
  }).filter((item) => item.slug && item.name);

  const journeyStats = {};
  if (language === "ko") {
    const headingIndex = payload.lines.findIndex((line) => line === "여정 시작 스탯");
    const endIndex = payload.lines.findIndex((line, index) => index > headingIndex && line.startsWith("전용 부적"));
    const range = headingIndex >= 0 ? payload.lines.slice(headingIndex + 1, endIndex > headingIndex ? endIndex : headingIndex + 18) : payload.lines;
    for (const stat of JOURNEY_STATS) {
      const line = range.find((value) => new RegExp(`^${stat}\\s*[+-]?\\d`).test(value));
      const match = line?.match(new RegExp(`^${stat}\\s*([+-]?\\d[\\d,]*(?:\\.\\d+)?)`));
      if (match) journeyStats[stat] = match[1].replaceAll(",", "");
    }
  }
  return { url, payload, potentials, journeyStats };
}

function profileFromKorean(overview, journey, oldProfile = {}) {
  const lines = overview.payload.lines;
  const profile = {
    name: overview.name || oldProfile.name || "",
    grade: overview.rank || oldProfile.grade || "SSR",
    element: ELEMENTS.find((value) => lines.includes(value)) || oldProfile.element || "",
    className: CLASSES.find((value) => lines.includes(value)) || oldProfile.className || "",
    attackType: ATTACK_TYPES.find((value) => lines.includes(value)) || oldProfile.attackType || "",
    description: overview.description || oldProfile.description || "",
    birthday: findLineValue(lines, PROFILE_LABELS_KO.birthday) || oldProfile.birthday || "",
    height: findLineValue(lines, PROFILE_LABELS_KO.height) || oldProfile.height || "",
    origin: findLineValue(lines, PROFILE_LABELS_KO.origin) || oldProfile.origin || "",
    affiliation: findLineValue(lines, PROFILE_LABELS_KO.affiliation) || overview.title || oldProfile.affiliation || "",
    cvKr: findLineValue(lines, PROFILE_LABELS_KO.cvKr) || oldProfile.cvKr || "",
    cvJp: findLineValue(lines, PROFILE_LABELS_KO.cvJp) || oldProfile.cvJp || ""
  };
  return { profile, journeyStats: journey.journeyStats || {} };
}

function mergeResonance(oldSavior, journeys) {
  const oldByStep = new Map((oldSavior?.resonancePotentials || []).map((item) => [Number(item.step), item]));
  const ko = journeys.ko?.potentials || [];
  return ko.map((item, index) => {
    const old = oldByStep.get(Number(item.step)) || oldSavior?.resonancePotentials?.[index] || {};
    const names = {};
    const descriptions = {};
    for (const language of LANGUAGES) {
      const candidate = journeys[language]?.potentials?.find((value) => value.slug === item.slug)
        || journeys[language]?.potentials?.[index];
      names[language] = candidate?.name || old.name?.[language] || item.name;
      descriptions[language] = candidate?.description || old.description?.[language] || item.description;
    }
    return {
      step: Number(item.step || old.step || 0),
      unlockLevel: Number(old.unlockLevel || (item.step ? item.step * 20 : 0)),
      id: Number(old.id || stableNumericId(`potential:${item.slug}`, 9_000_000)),
      strId: old.strId || `ESPR_${item.slug.toUpperCase().replace(/[^A-Z0-9]+/g, "_")}`,
      name: names,
      description: descriptions
    };
  });
}

function localizedSkill(scrapes, index, oldSkill = {}, characterId) {
  const ko = scrapes.ko?.[index] || null;
  const id = Number(oldSkill.id || (characterId * 10 + index));
  const name = {};
  const description = {};
  const novaDescription = {};
  for (const language of LANGUAGES) {
    const skill = scrapes[language]?.[index];
    name[language] = skill?.name || oldSkill.name?.[language] || ko?.name || "";
    description[language] = skill?.description || oldSkill.levels?.at(-1)?.skillDescription?.[language] || "";
    novaDescription[language] = skill?.novaDescription || oldSkill.novaDescription?.[language] || "";
  }
  const levels = Array.isArray(oldSkill.levels) && oldSkill.levels.length
    ? deepClone(oldSkill.levels)
    : [{ level: 1, skillDescription: { ...description }, levelDescription: { ...description } }];
  if (levels.length) {
    const last = levels[levels.length - 1];
    last.skillDescription = { ...(last.skillDescription || {}), ...description };
    last.levelDescription = { ...(last.levelDescription || {}), ...description };
  }
  return {
    id,
    type: ko?.type ?? oldSkill.type ?? index,
    target: ko?.target || oldSkill.target || "NSTT_INVALID",
    cooltime: Number(ko?.cooldown ?? oldSkill.cooltime ?? 0),
    break: Number(ko?.breakValue ?? oldSkill.break ?? 0),
    nova: Number(ko?.nova ?? oldSkill.nova ?? 0),
    name,
    novaDescription,
    icon: `./data/savior-skill-assets/skills/${id}.webp`,
    buffs: deepClone(oldSkill.buffs || []),
    levels,
    _sourceIcon: ko?.icon || ""
  };
}

function mergeSkillList(oldList, scraped, characterId) {
  const count = Math.max(oldList?.length || 0, ...LANGUAGES.map((language) => scraped[language]?.length || 0));
  return Array.from({ length: count }, (_, index) => localizedSkill(scraped, index, oldList?.[index] || {}, characterId));
}

function stripInternalSkillFields(skills) {
  return skills.map(({ _sourceIcon, ...skill }) => skill);
}

function extractLegacyBaseStats(html) {
  const result = {};
  if (!html) return result;
  const rowRegex = /<div[^>]*stat-name[^>]*>([^<]+)<\/div>[\s\S]*?<div[^>]*stat-value[^>]*>([^<]+)<\/div>/gi;
  let match;
  while ((match = rowRegex.exec(html))) {
    const label = normalizeText(match[1]);
    const value = normalizeText(match[2]);
    if (BASE_STATS.includes(label) && value) result[label] = value;
  }
  return result;
}

function snapshotHtml({ id, slug, baseStats, journeyStats, capturedAt }) {
  const statRows = (stats) => Object.entries(stats || {}).map(([name, value]) => `<div class="espr-stat-row"><span>${htmlEscape(name)}</span><strong>${htmlEscape(value)}</strong></div>`).join("\n");
  return `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>ESPR Savior ${id}</title></head>
<body>
<div class="snapshot-meta" data-source="${htmlEscape(`${ESPR_ORIGIN}/ko/database/characters/${slug}`)}" data-captured-at="${htmlEscape(capturedAt)}"></div>
<main class="snapshot-root">
  <section><h3>기본 스테이터스 (Lv.200)</h3>${statRows(baseStats)}</section>
  <section><h3>여정 스테이터스</h3>${statRows(journeyStats)}</section>
  <section><h3>공명 잠재력</h3></section>
</main>
</body></html>`;
}

async function scrapeCharacter(context, slug, oldIndex, oldArchiveById) {
  const page = await context.newPage();
  page.setDefaultTimeout(60_000);
  try {
    const overviews = {};
    const journeys = {};
    for (const language of LANGUAGES) {
      overviews[language] = await scrapeOverview(page, slug, language);
      journeys[language] = await scrapeJourney(page, slug, language);
    }
    const id = Number(overviews.ko?.id || 0);
    if (!id) throw new Error(`${slug}: character id was not found in ESPR portrait URL`);
    const oldEntry = oldIndex?.[String(id)] || {};
    const oldProfile = oldEntry.profile || {};
    const oldSavior = oldArchiveById.get(id) || {};
    const { profile, journeyStats } = profileFromKorean(overviews.ko, journeys.ko, oldProfile);
    const name = localizedFromValues(Object.fromEntries(LANGUAGES.map((language) => [language, overviews[language]?.name || oldSavior.name?.[language] || profile.name])));
    const title = localizedFromValues(Object.fromEntries(LANGUAGES.map((language) => [language, overviews[language]?.title || oldSavior.title?.[language] || profile.affiliation])));
    const description = localizedFromValues(Object.fromEntries(LANGUAGES.map((language) => [language, overviews[language]?.description || oldSavior.description?.[language] || profile.description])));

    const skillScrapes = Object.fromEntries(LANGUAGES.map((language) => [language, overviews[language]?.skills || []]));
    const bloomScrapes = Object.fromEntries(LANGUAGES.map((language) => [language, overviews[language]?.bloomSkills || []]));
    const mergedSkills = mergeSkillList(oldSavior.skills || [], skillScrapes, id);
    const hasBloomScrape = LANGUAGES.some((language) => (bloomScrapes[language]?.length || 0) > 0);
    const mergedBloomSkills = hasBloomScrape
      ? mergeSkillList(oldSavior.blossomSkills || [], bloomScrapes, id)
      : deepClone(oldSavior.blossomSkills || []);

    return {
      id,
      slug,
      rank: overviews.ko.rank || oldSavior.rank || profile.grade || "SSR",
      name,
      title,
      description,
      profile,
      journeyStats,
      portraitSource: overviews.ko.portrait,
      illustrationSource: `${ESPR_ORIGIN}/_next/image?url=${encodeURIComponent(`https://ss.esprcdn.dev/images/characters/illustration/${id}.ui.webp`)}&w=3840&q=90`,
      resonancePotentials: mergeResonance(oldSavior, journeys),
      skills: mergedSkills,
      blossomSkills: mergedBloomSkills,
      oldEntry
    };
  } finally {
    await page.close();
  }
}

async function main() {
  await Promise.all([
    fs.mkdir(PROFILE_DIR, { recursive: true }),
    fs.mkdir(DETAIL_ASSET_DIR, { recursive: true }),
    fs.mkdir(SKILL_DIR, { recursive: true }),
    fs.mkdir(SKILL_ASSET_DIR, { recursive: true }),
    fs.mkdir(BUFF_ASSET_DIR, { recursive: true }),
    fs.mkdir(BLOOM_DIR, { recursive: true })
  ]);

  const oldIndex = await readJsonIfExists(PROFILE_INDEX_PATH, {});
  const oldArchive = await readJsonIfExists(SKILL_ARCHIVE_PATH, { saviors: [] });
  const oldArchiveById = new Map((oldArchive?.saviors || []).map((item) => [Number(item.id), item]));
  const oldBloomIndex = await readJsonIfExists(BLOOM_INDEX_PATH, {});

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ locale: "ko-KR", viewport: { width: 1280, height: 1600 } });
  const discoveryPage = await context.newPage();
  const slugs = await discoverSlugs(discoveryPage, "characters");
  await discoveryPage.close();
  console.log(`ESPR characters discovered: ${slugs.length}`);

  const failures = [];
  const scraped = await mapLimit(slugs, 2, async (slug, index) => {
    try {
      console.log(`[${index + 1}/${slugs.length}] ${slug}`);
      return await scrapeCharacter(context, slug, oldIndex, oldArchiveById);
    } catch (error) {
      failures.push({ slug, error: error?.message || String(error) });
      console.warn(`${slug}: ${error?.stack || error}`);
      return null;
    }
  });

  const valid = scraped.filter(Boolean).sort((a, b) => a.id - b.id);
  const minimum = Math.max(50, Math.min(slugs.length, oldArchive?.saviors?.length || 0));
  if (valid.length < minimum) {
    await browser.close();
    throw new Error(`ESPR character scrape incomplete: ${valid.length}/${slugs.length}; minimum ${minimum}`);
  }

  const capturedAt = new Date().toISOString();
  const newIndex = { _meta: { sourceOrigin: ESPR_ORIGIN, capturedAt, languages: LANGUAGES, localOnly: true } };
  const archived = [];
  const bloomIndex = {};
  let assetCount = 0;
  let assetBytes = 0;

  for (const item of valid) {
    const portraitLocal = `./data/savior-detail-assets/${item.id}-portrait.webp`;
    const illustrationLocal = `./data/savior-detail-assets/${item.id}-illustration.webp`;
    const portraitResult = await downloadAsset(context, item.portraitSource, path.join(ROOT, portraitLocal.replace(/^\.\//, "")), { optional: true });
    const illustrationResult = await downloadAsset(context, `https://ss.esprcdn.dev/images/characters/illustration/${item.id}.ui.webp`, path.join(ROOT, illustrationLocal.replace(/^\.\//, "")), { optional: true });
    if (!portraitResult.failed) { item.profile.portrait = portraitLocal; assetCount += 1; assetBytes += portraitResult.bytes || 0; }
    else if (item.oldEntry?.profile?.portrait) item.profile.portrait = item.oldEntry.profile.portrait;
    if (!illustrationResult.failed) { item.profile.illustration = illustrationLocal; assetCount += 1; assetBytes += illustrationResult.bytes || 0; }
    else if (item.oldEntry?.profile?.illustration) item.profile.illustration = item.oldEntry.profile.illustration;

    const allSkillsForAssets = [...item.skills, ...item.blossomSkills];
    for (const skill of allSkillsForAssets) {
      if (!skill._sourceIcon) continue;
      const destination = path.join(SKILL_ASSET_DIR, `${skill.id}.webp`);
      const result = await downloadAsset(context, skill._sourceIcon, destination, { optional: true });
      if (!result.failed) { assetCount += 1; assetBytes += result.bytes || 0; }
    }

    let oldHtml = "";
    try { oldHtml = await fs.readFile(path.join(PROFILE_DIR, `${item.id}.html`), "utf8"); } catch {}
    const baseStats = extractLegacyBaseStats(oldHtml);
    const snapshot = snapshotHtml({ id: item.id, slug: item.slug, baseStats, journeyStats: item.journeyStats, capturedAt });
    await fs.writeFile(path.join(PROFILE_DIR, `${item.id}.html`), snapshot, "utf8");

    newIndex[String(item.id)] = {
      key: item.oldEntry?.key || `espr-${item.slug}`,
      id: item.id,
      slug: item.slug,
      file: `./${item.id}.html`,
      source: `${ESPR_ORIGIN}/ko/database/characters/${item.slug}`,
      capturedAt,
      profile: item.profile
    };

    const archiveEntry = {
      id: item.id,
      rank: item.rank,
      name: item.name,
      title: item.title,
      description: item.description,
      resonancePotentials: item.resonancePotentials,
      skills: stripInternalSkillFields(item.skills),
      blossomSkills: stripInternalSkillFields(item.blossomSkills)
    };
    archived.push(archiveEntry);

    if (archiveEntry.blossomSkills.length) {
      const bloomFile = path.join(BLOOM_DIR, `${item.id}.html`);
      await fs.writeFile(bloomFile, snapshotHtml({ id: item.id, slug: item.slug, baseStats, journeyStats: item.journeyStats, capturedAt }), "utf8");
      bloomIndex[String(item.id)] = {
        ...(oldBloomIndex?.[String(item.id)] || {}),
        key: newIndex[String(item.id)].key,
        id: item.id,
        file: `./${item.id}.html`,
        source: `${ESPR_ORIGIN}/ko/database/characters/${item.slug}`,
        capturedAt
      };
    }
  }

  // If ESPR temporarily rate-limits or a single page fails, never delete an already-backed-up Savior.
  const archivedIds = new Set(archived.map((item) => Number(item.id)));
  for (const oldSavior of oldArchive?.saviors || []) {
    const id = Number(oldSavior.id);
    if (archivedIds.has(id)) continue;
    archived.push(deepClone(oldSavior));
    const oldEntry = oldIndex?.[String(id)];
    if (oldEntry) {
      newIndex[String(id)] = {
        ...deepClone(oldEntry),
        source: `${ESPR_ORIGIN}/ko/database/characters`,
        capturedAt
      };
    }
    if (oldBloomIndex?.[String(id)]) {
      bloomIndex[String(id)] = {
        ...deepClone(oldBloomIndex[String(id)]),
        source: `${ESPR_ORIGIN}/ko/database/characters`,
        capturedAt
      };
    }
  }
  archived.sort((a, b) => Number(a.id) - Number(b.id));

  await browser.close();

  const skillCount = archived.reduce((sum, item) => sum + item.skills.length, 0);
  const blossomSkillCount = archived.reduce((sum, item) => sum + item.blossomSkills.length, 0);
  const resonancePotentialCount = archived.reduce((sum, item) => sum + item.resonancePotentials.length, 0);
  const buffCount = new Set(archived.flatMap((item) => [...item.skills, ...item.blossomSkills].flatMap((skill) => (skill.buffs || []).map((buff) => buff.strId)))).size;
  const archive = {
    schemaVersion: 3,
    source: `${ESPR_ORIGIN}/ko/database/characters`,
    sourceOrigin: ESPR_ORIGIN,
    capturedAt,
    languages: LANGUAGES,
    localOnly: true,
    saviors: archived
  };
  const manifest = {
    schemaVersion: 3,
    sourceOrigin: ESPR_ORIGIN,
    capturedAt,
    languages: LANGUAGES,
    saviorCount: archived.length,
    skillCount,
    blossomSkillCount,
    resonancePotentialCount,
    buffCount,
    assetCount,
    assetBytes,
    localOnly: true,
    fallbackPolicy: "Existing numeric skill/buff metadata and lower skill levels are retained when ESPR renders only the current level.",
    failures
  };

  await writeJsonAtomic(PROFILE_INDEX_PATH, newIndex);
  await writeJsonAtomic(SKILL_ARCHIVE_PATH, archive);
  await writeJsonAtomic(SKILL_MANIFEST_PATH, manifest);
  await writeJsonAtomic(BLOOM_INDEX_PATH, bloomIndex);
  console.log(JSON.stringify(manifest, null, 2));
}

main().catch((error) => {
  console.error(error?.stack || error?.message || String(error));
  process.exitCode = 1;
});
