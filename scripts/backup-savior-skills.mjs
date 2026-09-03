import { promises as fs } from "node:fs";
import path from "node:path";

const SOURCE_ORIGIN = "https://star-savior-arcana-db.pages.dev";
const SOURCE_DATA_ROOT = `${SOURCE_ORIGIN}/data`;
const PROJECT_ROOT = process.cwd();
const OUTPUT_DIR = path.join(PROJECT_ROOT, "data", "savior-skills");
const ASSET_ROOT = path.join(PROJECT_ROOT, "data", "savior-skill-assets");
const SKILL_ASSET_DIR = path.join(ASSET_ROOT, "skills");
const BUFF_ASSET_DIR = path.join(ASSET_ROOT, "buffs");
const OUTPUT_PATH = path.join(OUTPUT_DIR, "saviors.json");
const MANIFEST_PATH = path.join(OUTPUT_DIR, "manifest.json");
const REFRESH_ALL = String(process.env.REFRESH_ALL || "false").toLowerCase() === "true";

const LANGUAGES = {
  ko: "ko-KR",
  en: "en-US",
  ja: "ja-JP"
};

const SKILL_TYPE_KO = {
  0: "패시브",
  1: "기본기",
  2: "특수기",
  3: "궁극기"
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(url, options = {}) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45_000);
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "user-agent": "starsavior-guide-local-backup/1.0",
          ...(options.headers || {})
        },
        signal: controller.signal
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response;
    } catch (error) {
      lastError = error;
      if (attempt < 3) await sleep(500 * attempt);
    } finally {
      clearTimeout(timeout);
    }
  }
  throw new Error(`${url}: ${lastError?.message || "request failed"}`);
}

async function fetchJson(filename) {
  const response = await fetchWithRetry(`${SOURCE_DATA_ROOT}/${filename}`);
  return response.json();
}

function localized(source, label) {
  const result = {};
  for (const [language, locale] of Object.entries(LANGUAGES)) {
    const value = source?.[locale];
    if (typeof value !== "string") {
      throw new Error(`${label}: ${locale} text is missing`);
    }
    result[language] = value;
  }
  return result;
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function sourceIconFilename(value) {
  return String(value || "").replace(/[\\/:*?"<>|\s]/g, "");
}

function findSkillBuffs(skill, buffs) {
  const maxLevel = skill.levels?.at(-1);
  const descriptions = maxLevel?.skill_desc || {};
  return buffs.filter((buff) => Object.values(LANGUAGES).some((locale) => {
    const name = buff.name?.[locale];
    const description = descriptions?.[locale];
    if (!name || !description || !description.includes(name)) return false;
    return new RegExp(`<b><color=#[0-9a-fA-F]{6}>${escapeRegExp(name)}`, "u").test(description);
  }));
}

function archiveBuff(buff) {
  return {
    id: buff.id,
    strId: buff.str_id,
    name: localized(buff.name, `buff ${buff.str_id} name`),
    description: localized(buff.desc, `buff ${buff.str_id} description`),
    icon: `./data/savior-skill-assets/buffs/${buff.str_id}.webp`
  };
}

function archiveSkill(skill, buffs, icon) {
  if (!Array.isArray(skill.levels) || !skill.levels.length) {
    throw new Error(`skill ${skill.id}: levels are missing`);
  }

  return {
    id: skill.id,
    type: skill.type,
    target: skill.target,
    cooltime: skill.cooltime || 0,
    break: skill.break || 0,
    nova: skill.nova || 0,
    name: localized(skill.name, `skill ${skill.id} name`),
    novaDescription: localized(skill.nova_desc, `skill ${skill.id} Nova description`),
    icon,
    buffs: findSkillBuffs(skill, buffs).map(archiveBuff),
    levels: skill.levels.map((level) => ({
      level: level.level,
      skillDescription: localized(level.skill_desc, `skill ${skill.id} level ${level.level} description`),
      levelDescription: localized(level.level_desc || level.skill_desc, `skill ${skill.id} level ${level.level} level description`)
    }))
  };
}

function archiveResonancePotential(resonance, potential, saviorId) {
  if (!potential) {
    throw new Error(`Savior ${saviorId}: resonance potential ${resonance.potential} is missing`);
  }

  return {
    step: resonance.step,
    unlockLevel: resonance.unlock_level,
    id: potential.id,
    strId: potential.str_id,
    name: localized(potential.name, `potential ${potential.id} name`),
    description: localized(potential.desc, `potential ${potential.id} description`)
  };
}

function skillIconSource(savior, skill, blossomed) {
  const characterName = `${savior.name[LANGUAGES.ko]}(${savior.title[LANGUAGES.ko]})`;
  const type = SKILL_TYPE_KO[skill.type];
  if (!type) throw new Error(`skill ${skill.id}: unsupported skill type ${skill.type}`);
  const filename = `${characterName}_${blossomed ? "blossom_" : ""}${type}.webp`;
  return `${SOURCE_ORIGIN}/images/icon/skills/${encodeURIComponent(filename)}`;
}

function buffIconSource(buff) {
  const filename = `${sourceIconFilename(buff.name[LANGUAGES.ko])}.webp`;
  return `${SOURCE_ORIGIN}/images/icon/buff/${encodeURIComponent(filename)}`;
}

async function downloadAsset(asset) {
  if (!REFRESH_ALL) {
    try {
      const stat = await fs.stat(asset.destination);
      if (stat.size > 20) return { ...asset, kept: true, bytes: stat.size };
    } catch {}
  }

  const response = await fetchWithRetry(asset.source);
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.startsWith("image/")) {
    throw new Error(`${asset.source}: expected an image, received ${contentType || "unknown content type"}`);
  }
  const body = Buffer.from(await response.arrayBuffer());
  if (body.length < 20) throw new Error(`${asset.source}: image is empty`);
  await fs.writeFile(asset.destination, body);
  return { ...asset, kept: false, bytes: body.length };
}

async function downloadAssets(assets, concurrency = 8) {
  let cursor = 0;
  let completed = 0;
  const results = [];
  const workers = Array.from({ length: Math.min(concurrency, assets.length) }, async () => {
    while (cursor < assets.length) {
      const index = cursor;
      cursor += 1;
      const result = await downloadAsset(assets[index]);
      results[index] = result;
      completed += 1;
      if (completed % 25 === 0 || completed === assets.length) {
        console.log(`assets ${completed}/${assets.length}`);
      }
    }
  });
  await Promise.all(workers);
  return results;
}

async function writeJsonAtomic(filename, value) {
  const temporary = `${filename}.tmp`;
  await fs.writeFile(temporary, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  await fs.rename(temporary, filename);
}

await Promise.all([
  fs.mkdir(OUTPUT_DIR, { recursive: true }),
  fs.mkdir(SKILL_ASSET_DIR, { recursive: true }),
  fs.mkdir(BUFF_ASSET_DIR, { recursive: true })
]);

console.log("Downloading Savior skill and resonance source data...");
const [sourceSaviors, sourceBuffs, sourcePotentials] = await Promise.all([
  fetchJson("saviors.json"),
  fetchJson("buffs.json"),
  fetchJson("potentials.json")
]);

if (!Array.isArray(sourceSaviors) || sourceSaviors.length < 52) {
  throw new Error(`Expected at least 52 Saviors, received ${sourceSaviors?.length ?? "invalid data"}`);
}
if (!Array.isArray(sourceBuffs) || sourceBuffs.length < 1) {
  throw new Error("Buff data is missing");
}
if (!Array.isArray(sourcePotentials) || sourcePotentials.length < 1) {
  throw new Error("Potential data is missing");
}

const potentialByStrId = new Map(sourcePotentials.map((potential) => [potential.str_id, potential]));

const assetMap = new Map();
const addAsset = (source, destination) => {
  const key = path.resolve(destination);
  if (!assetMap.has(key)) assetMap.set(key, { source, destination });
};

const archivedSaviors = sourceSaviors.map((savior) => {
  const resonancePotentials = (savior.resonances || [])
    .filter((resonance) => resonance.potential)
    .map((resonance) => archiveResonancePotential(
      resonance,
      potentialByStrId.get(resonance.potential),
      savior.id
    ));
  if (resonancePotentials.length !== 3) {
    throw new Error(`Savior ${savior.id}: expected 3 resonance potentials, received ${resonancePotentials.length}`);
  }

  const skills = savior.skills.map((skill) => {
    const icon = `./data/savior-skill-assets/skills/${skill.id}.webp`;
    addAsset(skillIconSource(savior, skill, false), path.join(SKILL_ASSET_DIR, `${skill.id}.webp`));
    const archived = archiveSkill(skill, sourceBuffs, icon);
    archived.buffs.forEach((buff) => {
      const sourceBuff = sourceBuffs.find((item) => item.str_id === buff.strId);
      addAsset(buffIconSource(sourceBuff), path.join(BUFF_ASSET_DIR, `${buff.strId}.webp`));
    });
    return archived;
  });

  const blossomSkills = (savior.blossom?.skills || []).map((skill) => {
    const icon = `./data/savior-skill-assets/skills/${skill.id}.webp`;
    addAsset(skillIconSource(savior, skill, true), path.join(SKILL_ASSET_DIR, `${skill.id}.webp`));
    const archived = archiveSkill(skill, sourceBuffs, icon);
    archived.buffs.forEach((buff) => {
      const sourceBuff = sourceBuffs.find((item) => item.str_id === buff.strId);
      addAsset(buffIconSource(sourceBuff), path.join(BUFF_ASSET_DIR, `${buff.strId}.webp`));
    });
    return archived;
  });

  return {
    id: savior.id,
    rank: savior.rank,
    name: localized(savior.name, `Savior ${savior.id} name`),
    title: localized(savior.title, `Savior ${savior.id} title`),
    description: localized(savior.inst?.desc, `Savior ${savior.id} description`),
    resonancePotentials,
    skills,
    blossomSkills
  };
});

const assets = [...assetMap.values()];
console.log(`Downloading ${assets.length} local skill and effect icons...`);
const assetResults = await downloadAssets(assets);

const capturedAt = new Date().toISOString();
const archive = {
  schemaVersion: 2,
  source: `${SOURCE_DATA_ROOT}/saviors.json`,
  capturedAt,
  languages: Object.keys(LANGUAGES),
  saviors: archivedSaviors
};

const skillCount = archivedSaviors.reduce((total, savior) => total + savior.skills.length, 0);
const blossomSkillCount = archivedSaviors.reduce((total, savior) => total + savior.blossomSkills.length, 0);
const resonancePotentialCount = archivedSaviors.reduce((total, savior) => total + savior.resonancePotentials.length, 0);
const buffCount = new Set(archivedSaviors.flatMap((savior) => [...savior.skills, ...savior.blossomSkills]
  .flatMap((skill) => skill.buffs.map((buff) => buff.strId)))).size;

const manifest = {
  schemaVersion: 2,
  sourceOrigin: SOURCE_ORIGIN,
  capturedAt,
  languages: Object.keys(LANGUAGES),
  saviorCount: archivedSaviors.length,
  skillCount,
  blossomSkillCount,
  resonancePotentialCount,
  buffCount,
  assetCount: assetResults.length,
  localOnly: true
};

await writeJsonAtomic(OUTPUT_PATH, archive);
await writeJsonAtomic(MANIFEST_PATH, manifest);

console.log(JSON.stringify(manifest, null, 2));
