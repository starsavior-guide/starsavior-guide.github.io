import { promises as fs } from "node:fs";
import path from "node:path";

const SOURCE_ORIGIN = "https://star-savior-arcana-db.pages.dev";
const SOURCE_DATA_ROOT = `${SOURCE_ORIGIN}/data`;
const PROJECT_ROOT = process.cwd();
const OUTPUT_DIR = path.join(PROJECT_ROOT, "data", "arcanas");
const ASSET_ROOT = path.join(PROJECT_ROOT, "data", "arcana-assets");
const CARD_DIR = path.join(ASSET_ROOT, "cards");
const POTENTIAL_DIR = path.join(ASSET_ROOT, "potentials");
const POTENTIAL_BG_DIR = path.join(ASSET_ROOT, "potential-backgrounds");
const JOURNEY_BUFF_DIR = path.join(ASSET_ROOT, "journey-buffs");
const STATUS_DIR = path.join(ASSET_ROOT, "status");
const OUTPUT_PATH = path.join(OUTPUT_DIR, "arcanas.json");
const MANIFEST_PATH = path.join(OUTPUT_DIR, "manifest.json");
const REFRESH_ALL = String(process.env.REFRESH_ALL || "false").toLowerCase() === "true";
const DISPLAY_LEVELS = [35, 40, 45, 50];
// Keep source-driven additions (including newly released Arcana) in the local archive.

const LANGUAGES = {
  ko: "ko-KR",
  en: "en-US",
  ja: "ja-JP"
};

const STATUS_ASSETS = [
  { code: "JST_POWER", sourceName: "힘", file: "power.webp" },
  { code: "JST_HEALTH", sourceName: "체력", file: "health.webp" },
  { code: "JST_ENDURANCE", sourceName: "인내", file: "endurance.webp" },
  { code: "JST_FOCUS", sourceName: "집중", file: "focus.webp" },
  { code: "JST_PROTECT", sourceName: "보호", file: "protect.webp" }
];

const STATUS_NAMES = {
  JST_POWER: { ko: "힘", en: "Strength", ja: "力" },
  JST_HEALTH: { ko: "체력", en: "Health", ja: "体力" },
  JST_ENDURANCE: { ko: "인내", en: "Endurance", ja: "忍耐" },
  JST_FOCUS: { ko: "집중", en: "Focus", ja: "集中" },
  JST_PROTECT: { ko: "보호", en: "Protection", ja: "保護" }
};

const POTENTIAL_BACKGROUNDS = {
  yellow: "bg_yellow.webp",
  red: "bg_red.webp",
  blue: "bg_blue.webp",
  special: "bg_special.webp"
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
          "user-agent": "starsavior-guide-local-arcana-backup/1.0",
          ...(options.headers || {})
        },
        signal: controller.signal
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response;
    } catch (error) {
      lastError = error;
      if (attempt < 3) await sleep(600 * attempt);
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
  if (!source || typeof source !== "object") {
    if (source === "") return { ko: "", en: "", ja: "" };
    throw new Error(`${label}: localized object is missing`);
  }
  const result = {};
  for (const [language, locale] of Object.entries(LANGUAGES)) {
    const value = source[locale];
    if (typeof value !== "string") throw new Error(`${label}: ${locale} text is missing`);
    result[language] = value;
  }
  return result;
}

function sourceIconFilename(value) {
  return String(value || "").replace(/[\\/:*?"<>|\s]/g, "");
}

function sourceAssetUrl(directory, filename) {
  return `${SOURCE_ORIGIN}${directory}${encodeURIComponent(filename)}`;
}

function potentialBackgroundKey(potential) {
  if (potential.type === "일반 잠재력") return "yellow";
  if (potential.type === "특수 잠재력") {
    if (Number(potential.unitId) !== 0) return "red";
    if (String(potential.class || "")) return "blue";
  }
  return "special";
}

function archivePotential(potential) {
  const background = potentialBackgroundKey(potential);
  return {
    id: potential.id,
    strId: potential.str_id,
    type: potential.type,
    unitId: potential.unitId,
    class: potential.class,
    name: localized(potential.name, `potential ${potential.id} name`),
    description: localized(potential.desc, `potential ${potential.id} description`),
    icon: `./data/arcana-assets/potentials/${potential.id}.webp`,
    background: `./data/arcana-assets/potential-backgrounds/${background}.webp`,
    levels: (potential.levels || []).map((level) => ({
      level: level.level,
      description: localized(level.desc, `potential ${potential.id} level ${level.level} description`),
      requiredPotentialPoints: level.req_pp,
      bondPointCheck: Boolean(level.bp_check),
      stats: level.stats || []
    }))
  };
}

function archiveJourneyBuff(buff) {
  return {
    id: buff.id,
    group: buff.group,
    type: buff.type,
    value: buff.value,
    turn: buff.turn,
    isBuff: Boolean(buff.isBuff),
    name: localized(buff.name, `journey buff ${buff.id} name`),
    description: localized(buff.desc, `journey buff ${buff.id} description`),
    icon: `./data/arcana-assets/journey-buffs/${buff.id}.webp`
  };
}

function calculateEffectValue(effect, level, isRate) {
  const step = Math.floor((level - Number(effect.unlock_level)) / Number(effect.promote_per_level));
  if (step < 0) return 0;
  const base = Number(isRate ? effect.value_rate : effect.value_int);
  const perStep = Number(isRate ? effect.value_rate_per_promote : effect.value_int_per_promote);
  return base + step * perStep;
}

function archiveGrowthEffect(effect, label) {
  const isRate = Number(effect.value_rate) !== 0;
  const values = {};
  for (const level of DISPLAY_LEVELS) {
    const value = calculateEffectValue(effect, level, isRate);
    values[String(level)] = {
      value,
      display: isRate ? `${(value / 100).toFixed(2)}%` : String(value)
    };
  }
  return {
    unlockLevel: effect.unlock_level,
    promotePerLevel: effect.promote_per_level,
    activeType: effect.active_type,
    valueType: localized(effect.value_type, `${label} value type`),
    isRate,
    valueInt: effect.value_int,
    valueRate: effect.value_rate,
    valueIntPerPromote: effect.value_int_per_promote,
    valueRatePerPromote: effect.value_rate_per_promote,
    values
  };
}

function archiveUniqueEffect(effect, arcanaId) {
  if (!effect) return null;
  return {
    name: localized(effect.name, `arcana ${arcanaId} unique effect name`),
    description: localized(effect.desc, `arcana ${arcanaId} unique effect description`),
    unlockLevel: effect.unlock_level,
    promotePerLevel: effect.promote_per_level,
    uniqueType: effect.unique_type,
    uniqueConditionValue: effect.unique_cond_value,
    activeType: effect.active_type,
    valueType: localized(effect.value_type, `arcana ${arcanaId} unique effect value type`),
    valueInt: effect.value_int,
    valueRate: effect.value_rate,
    valueIntPerPromote: effect.value_int_per_promote,
    valueRatePerPromote: effect.value_rate_per_promote
  };
}

function archiveReward(reward, potentialById, buffById, arcanaId) {
  const archived = {
    type: reward.type,
    min: reward.min,
    max: reward.max
  };
  if (reward.reward_stat) {
    const stat = STATUS_NAMES[reward.reward_stat];
    if (!stat) throw new Error(`arcana ${arcanaId}: unsupported reward stat ${reward.reward_stat}`);
    archived.rewardStat = reward.reward_stat;
    archived.statName = stat;
    archived.icon = `./data/arcana-assets/status/${STATUS_ASSETS.find((item) => item.code === reward.reward_stat).file}`;
  }
  if (reward.reward_id != null) archived.rewardId = reward.reward_id;
  if (reward.type === "RT_SE_POTEN" && !potentialById.has(Number(reward.reward_id))) {
    throw new Error(`arcana ${arcanaId}: potential reward ${reward.reward_id} is missing`);
  }
  if (reward.type === "RT_JOURNEY_BUFF" && !buffById.has(Number(reward.reward_id))) {
    throw new Error(`arcana ${arcanaId}: journey buff reward ${reward.reward_id} is missing`);
  }
  return archived;
}

function archiveRewardGroups(groups, potentialById, buffById, arcanaId) {
  return (groups || []).map((alternatives) => alternatives.map((reward) => (
    archiveReward(reward, potentialById, buffById, arcanaId)
  )));
}

function archiveArcana(arcana, potentialByName, potentialById, buffById) {
  const specialPotential = arcana.sp_potential
    ? potentialByName.get(arcana.sp_potential[LANGUAGES.ko])
    : null;
  if (arcana.sp_potential && !specialPotential) {
    throw new Error(`arcana ${arcana.id}: special potential is missing`);
  }
  const mainStatAsset = STATUS_ASSETS.find((item) => item.sourceName === arcana.main_stat[LANGUAGES.ko]);
  return {
    id: arcana.id,
    name: localized(arcana.name, `arcana ${arcana.id} name`),
    character: localized(arcana.char_name, `arcana ${arcana.id} character`),
    rarity: arcana.rarity,
    mainStat: localized(arcana.main_stat, `arcana ${arcana.id} main stat`),
    assists: (arcana.assists || [])
      .filter((assist) => typeof assist?.[LANGUAGES.ko] === "string")
      .map((assist, index) => localized(assist, `arcana ${arcana.id} assist ${index}`)),
    image: `./data/arcana-assets/cards/${arcana.id}.webp`,
    mainStatIcon: mainStatAsset ? `./data/arcana-assets/status/${mainStatAsset.file}` : "",
    specialPotentialId: specialPotential?.id || null,
    uniqueEffect: archiveUniqueEffect(arcana.unique_effect, arcana.id),
    effects: {
      journeyStart: (arcana.journey_start_stats || []).map((effect, index) => archiveGrowthEffect(effect, `arcana ${arcana.id} journey effect ${index}`)),
      training: (arcana.training_effects || []).map((effect, index) => archiveGrowthEffect(effect, `arcana ${arcana.id} training effect ${index}`)),
      telepathy: (arcana.telepathy_effects || []).map((effect, index) => archiveGrowthEffect(effect, `arcana ${arcana.id} telepathy effect ${index}`)),
      supportQuest: (arcana.support_quest_effects || []).map((effect, index) => archiveGrowthEffect(effect, `arcana ${arcana.id} support effect ${index}`))
    },
    events: (arcana.events || []).map((event) => ({
      id: event.id,
      name: localized(event.name, `arcana ${arcana.id} event ${event.id} name`),
      choices: (event.choices || []).map((choice) => ({
        name: localized(choice.name, `arcana ${arcana.id} event ${event.id} choice`),
        successRewards: archiveRewardGroups(choice.success_rewards, potentialById, buffById, arcana.id),
        failureRewards: archiveRewardGroups(choice.failure_rewards, potentialById, buffById, arcana.id)
      }))
    }))
  };
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
      if (completed % 20 === 0 || completed === assets.length) {
        console.log(`assets ${completed}/${assets.length}`);
      }
    }
  });
  await Promise.all(workers);
  return results;
}

async function writeJsonAtomic(filename, value) {
  const temp = `${filename}.tmp`;
  await fs.writeFile(temp, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  await fs.rename(temp, filename);
}

async function main() {
  const [arcanas, potentials, journeyBuffs] = await Promise.all([
    fetchJson("arcanas.json"),
    fetchJson("potentials.json"),
    fetchJson("journey_buffs.json")
  ]);
  if (!Array.isArray(arcanas) || arcanas.length < 79) throw new Error("Arcana source data is incomplete");
  if (!Array.isArray(potentials) || !Array.isArray(journeyBuffs)) throw new Error("Arcana support data is incomplete");

  const potentialById = new Map(potentials.map((item) => [Number(item.id), item]));
  const potentialByName = new Map(potentials.map((item) => [item.name?.[LANGUAGES.ko], item]));
  const buffById = new Map(journeyBuffs.map((item) => [Number(item.id), item]));
  const referencedPotentialIds = new Set();
  const referencedBuffIds = new Set();

  for (const arcana of arcanas) {
    if (arcana.sp_potential) {
      const potential = potentialByName.get(arcana.sp_potential[LANGUAGES.ko]);
      if (!potential) throw new Error(`arcana ${arcana.id}: special potential lookup failed`);
      referencedPotentialIds.add(Number(potential.id));
    }
    for (const event of arcana.events || []) {
      for (const choice of event.choices || []) {
        for (const group of [...(choice.success_rewards || []), ...(choice.failure_rewards || [])]) {
          for (const reward of group) {
            if (reward.type === "RT_SE_POTEN") referencedPotentialIds.add(Number(reward.reward_id));
            if (reward.type === "RT_JOURNEY_BUFF") referencedBuffIds.add(Number(reward.reward_id));
          }
        }
      }
    }
  }

  const archivedPotentials = [...referencedPotentialIds]
    .sort((a, b) => a - b)
    .map((id) => {
      const potential = potentialById.get(id);
      if (!potential) throw new Error(`potential ${id}: source entry is missing`);
      return archivePotential(potential);
    });
  const archivedJourneyBuffs = [...referencedBuffIds]
    .sort((a, b) => a - b)
    .map((id) => {
      const buff = buffById.get(id);
      if (!buff) throw new Error(`journey buff ${id}: source entry is missing`);
      return archiveJourneyBuff(buff);
    });

  const archivedArcanas = arcanas.map((arcana) => archiveArcana(arcana, potentialByName, potentialById, buffById));
  if (archivedArcanas.some((arcana) => arcana.mainStat.ko !== "구원자" && !arcana.mainStatIcon.endsWith(".webp"))) {
    throw new Error("An Arcana main stat icon mapping is missing");
  }

  await Promise.all([OUTPUT_DIR, CARD_DIR, POTENTIAL_DIR, POTENTIAL_BG_DIR, JOURNEY_BUFF_DIR, STATUS_DIR].map((dir) => (
    fs.mkdir(dir, { recursive: true })
  )));

  const assets = [];
  for (const arcana of arcanas) {
    const filename = `${sourceIconFilename(arcana.name[LANGUAGES.ko])}.webp`;
    assets.push({
      kind: "card",
      id: arcana.id,
      source: sourceAssetUrl("/images/cards/", filename),
      destination: path.join(CARD_DIR, `${arcana.id}.webp`)
    });
  }
  for (const id of referencedPotentialIds) {
    const potential = potentialById.get(id);
    const filename = `${sourceIconFilename(potential.name[LANGUAGES.ko])}.webp`;
    assets.push({
      kind: "potential",
      id,
      source: sourceAssetUrl("/images/icon/potential/", filename),
      destination: path.join(POTENTIAL_DIR, `${id}.webp`)
    });
  }
  for (const [key, filename] of Object.entries(POTENTIAL_BACKGROUNDS)) {
    assets.push({
      kind: "potential-background",
      id: key,
      source: sourceAssetUrl("/images/icon/potential/", filename),
      destination: path.join(POTENTIAL_BG_DIR, `${key}.webp`)
    });
  }
  for (const id of referencedBuffIds) {
    const buff = buffById.get(id);
    const filename = `${sourceIconFilename(buff.name[LANGUAGES.ko])}.webp`;
    assets.push({
      kind: "journey-buff",
      id,
      source: sourceAssetUrl("/images/icon/journey_buff/", filename),
      destination: path.join(JOURNEY_BUFF_DIR, `${id}.webp`)
    });
  }
  for (const status of STATUS_ASSETS) {
    assets.push({
      kind: "status",
      id: status.code,
      source: sourceAssetUrl("/images/icon/journey_status/", `${status.sourceName}.webp`),
      destination: path.join(STATUS_DIR, status.file)
    });
  }

  const assetResults = await downloadAssets(assets);
  const capturedAt = new Date().toISOString();
  const archive = {
    schemaVersion: 1,
    sourceOrigin: SOURCE_ORIGIN,
    sourcePage: `${SOURCE_ORIGIN}/arcana`,
    capturedAt,
    languages: Object.keys(LANGUAGES),
    levels: DISPLAY_LEVELS,
    localOnly: true,
    statusIcons: Object.fromEntries(STATUS_ASSETS.map((item) => [item.code, `./data/arcana-assets/status/${item.file}`])),
    potentials: archivedPotentials,
    journeyBuffs: archivedJourneyBuffs,
    arcanas: archivedArcanas
  };
  const manifest = {
    schemaVersion: 1,
    sourceOrigin: SOURCE_ORIGIN,
    capturedAt,
    languages: Object.keys(LANGUAGES),
    arcanaCount: archivedArcanas.length,
    eventCount: archivedArcanas.reduce((sum, arcana) => sum + arcana.events.length, 0),
    choiceCount: archivedArcanas.reduce((sum, arcana) => sum + arcana.events.reduce((inner, event) => inner + event.choices.length, 0), 0),
    potentialCount: archivedPotentials.length,
    journeyBuffCount: archivedJourneyBuffs.length,
    assetCount: assetResults.length,
    assetBytes: assetResults.reduce((sum, asset) => sum + asset.bytes, 0),
    localOnly: true
  };

  await writeJsonAtomic(OUTPUT_PATH, archive);
  await writeJsonAtomic(MANIFEST_PATH, manifest);
  console.log(JSON.stringify(manifest, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
