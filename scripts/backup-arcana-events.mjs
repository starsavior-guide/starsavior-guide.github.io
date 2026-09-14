import crypto from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.env.ARCANA_BACKUP_ROOT || process.cwd());
const ARCANA_PATH = path.join(ROOT, "data", "arcanas", "arcanas.json");
const JOURNEY_ROOT = path.join(ROOT, "data", "journey");
const META_PATH = path.join(JOURNEY_ROOT, "backup-meta.json");
const AUDIT_PATH = path.join(JOURNEY_ROOT, "arcana-source-audit.json");
const SOURCE_PAGE = "https://ss.espr.gg/ko/database/arcanas";
const LANGUAGES = ["ko", "en", "ja"];

const SIMPLE_LABELS = {
  ko: { RT_STAMINA: "스태미나", RT_CONDITION: "컨디션", RT_POTEN_POINT: "잠재력 포인트" },
  en: { RT_STAMINA: "Stamina", RT_CONDITION: "Condition", RT_POTEN_POINT: "Potential Points" },
  ja: { RT_STAMINA: "スタミナ", RT_CONDITION: "コンディション", RT_POTEN_POINT: "潜在力ポイント" }
};

function sha256(value) {
  return crypto.createHash("sha256").update(String(value)).digest("hex");
}

function text(value, language) {
  if (typeof value === "string") return value;
  return String(value?.[language] ?? value?.ko ?? "");
}

function signed(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "";
  return number > 0 ? `+${number}` : String(number);
}

function rewardToJourney(reward, language, potentialById, buffById) {
  const base = {
    sourceType: reward.type,
    sourceId: reward.rewardId ?? null,
    sourceStat: reward.rewardStat ?? null,
    sourceMin: reward.min ?? null,
    sourceMax: reward.max ?? null,
    label: "",
    value: "",
    description: "",
    polarity: Number(reward.min) < 0 ? "negative" : "positive",
    effectTone: "positive",
    iconAssets: []
  };
  if (reward.type === "RT_STAT") {
    base.label = text(reward.statName, language) || reward.rewardStat || "Stat";
    base.value = signed(reward.min);
    return base;
  }
  if (reward.type === "RT_SE_POTEN") {
    const potential = potentialById.get(Number(reward.rewardId));
    base.label = text(potential?.name, language) || "Potential";
    base.description = text(potential?.description, language);
    base.polarity = "neutral";
    base.effectTone = "special";
    return base;
  }
  if (reward.type === "RT_JOURNEY_BUFF") {
    const buff = buffById.get(Number(reward.rewardId));
    base.label = text(buff?.name, language) || "Buff";
    base.description = text(buff?.description, language);
    base.value = reward.min != null ? `${reward.min}${language === "en" ? " turns" : language === "ja" ? "ターン" : "턴"}` : "";
    base.effectTone = buff?.isBuff === false ? "negative" : "positive";
    return base;
  }
  base.label = SIMPLE_LABELS[language]?.[reward.type] || reward.type;
  base.value = signed(reward.min);
  return base;
}

function convertEventGroups(arcana, language, potentialById, buffById) {
  return (arcana.events || []).map((event, eventIndex) => ({
    id: event.id ?? Number(`${arcana.id}${String(eventIndex + 1).padStart(2, "0")}`),
    reqClearId: null,
    title: text(event.name, language),
    choices: (event.choices || []).map((choice) => ({
      name: text(choice.name, language),
      automatic: !text(choice.name, language).trim(),
      recommended: true,
      successRewards: (choice.successRewards || []).map((group) => (group || []).map((reward) => rewardToJourney(reward, language, potentialById, buffById))),
      failureRewards: (choice.failureRewards || []).map((group) => (group || []).map((reward) => rewardToJourney(reward, language, potentialById, buffById)))
    }))
  }));
}

function buildSearchText(entry) {
  const values = [entry.arcanaName, entry.savior];
  for (const event of entry.eventGroups || []) {
    values.push(event.title);
    for (const choice of event.choices || []) {
      values.push(choice.name);
      for (const groups of [choice.successRewards || [], choice.failureRewards || []]) {
        for (const group of groups) for (const reward of group || []) values.push(reward.label, reward.value, reward.description);
      }
    }
  }
  return values.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
}

async function main() {
  const archive = JSON.parse(await fs.readFile(ARCANA_PATH, "utf8"));
  if (!Array.isArray(archive.arcanas) || !archive.arcanas.length) throw new Error("Canonical Arcana archive is missing.");
  const potentialById = new Map((archive.potentials || []).map((item) => [Number(item.id), item]));
  const buffById = new Map((archive.journeyBuffs || []).map((item) => [Number(item.id), item]));
  const capturedAt = new Date().toISOString();
  const outputHashes = {};
  const generalJourneyHashes = {};

  for (const language of LANGUAGES) {
    const file = path.join(JOURNEY_ROOT, language, "journey.json");
    const previous = JSON.parse(await fs.readFile(file, "utf8"));
    if (!Array.isArray(previous.events)) throw new Error(`${language}: general Journey events are missing.`);
    generalJourneyHashes[language] = sha256(JSON.stringify(previous.events));
    const previousById = new Map((previous.arcana || []).map((item) => [Number(item.arcanaId), item]));

    const arcana = archive.arcanas.map((source) => {
      const old = previousById.get(Number(source.id));
      const eventGroups = old?.eventGroups?.length
        ? old.eventGroups
        : convertEventGroups(source, language, potentialById, buffById);
      const entry = {
        kind: "arcana",
        source: `${archive.sourceOrigin || "https://ss.espr.gg"}/${language}/database/arcanas`,
        arcanaId: Number(source.id),
        arcanaName: text(source.name, language),
        title: `[${language === "en" ? "Arcana" : language === "ja" ? "アルカナ" : "아르카나"}]${text(source.name, language)}`,
        grade: source.rarity,
        savior: text(source.character, language),
        mainStat: text(source.mainStat, language),
        eventGroups
      };
      entry.searchText = buildSearchText(entry);
      return entry;
    });

    const output = {
      ...previous,
      arcana,
      events: previous.events,
      arcanaSource: archive.sourcePage || SOURCE_PAGE,
      arcanaCapturedAt: archive.capturedAt || capturedAt
    };
    if (sha256(JSON.stringify(output.events)) !== generalJourneyHashes[language]) throw new Error(`${language}: general Journey events changed.`);
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, `${JSON.stringify(output, null, 2)}\n`, "utf8");
    outputHashes[language] = sha256(JSON.stringify(output.arcana));
  }

  const audit = {
    source: archive.sourcePage || SOURCE_PAGE,
    capturedAt,
    canonicalArcanaCapturedAt: archive.capturedAt || null,
    counts: {
      arcanas: archive.arcanas.length,
      events: archive.arcanas.reduce((sum, item) => sum + (item.events?.length || 0), 0)
    },
    languages: LANGUAGES,
    generalJourneyFrozen: true,
    generalJourneyHashes,
    arcanaOutputHashes: outputHashes
  };
  await fs.writeFile(AUDIT_PATH, `${JSON.stringify(audit, null, 2)}\n`, "utf8");
  let meta = {};
  try { meta = JSON.parse(await fs.readFile(META_PATH, "utf8")); } catch {}
  meta = {
    ...meta,
    capturedAt,
    sources: { ...(meta.sources || {}), arcana: archive.sourcePage || SOURCE_PAGE },
    arcana: { source: archive.sourcePage || SOURCE_PAGE, generalJourneyFrozen: true, canonicalArchive: "data/arcanas/arcanas.json" }
  };
  await fs.writeFile(META_PATH, `${JSON.stringify(meta, null, 2)}\n`, "utf8");
  console.log(JSON.stringify(audit, null, 2));
}

main().catch((error) => {
  console.error(error?.stack || error?.message || String(error));
  process.exitCode = 1;
});
