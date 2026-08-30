import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.env.ARCANA_BACKUP_ROOT || process.cwd());
const SOURCE_PAGE = "https://star-savior-arcana-db.pages.dev/arcana";
const SOURCE_ORIGIN = new URL(SOURCE_PAGE).origin;
const OUT_DIR = path.join(ROOT, "data", "journey");
const ASSET_DIR = path.join(ROOT, "data", "journey-assets");
const META_PATH = path.join(OUT_DIR, "backup-meta.json");
const AUDIT_PATH = path.join(OUT_DIR, "arcana-source-audit.json");
const ASSET_MANIFEST_PATH = path.join(OUT_DIR, "arcana-assets.json");

const LANGUAGES = [
  { key: "ko", locale: "ko-KR" },
  { key: "en", locale: "en-US" },
  { key: "ja", locale: "ja-JP" }
];

// These labels are the constants used by the source /arcana renderer.
// The source only defines Korean and English reward-type labels, so other
// languages intentionally fall back to English instead of inventing text.
const REWARD_TYPE_LABELS = {
  RT_STAMINA: { "ko-KR": "스태미나", "en-US": "Stamina" },
  RT_CONDITION: { "ko-KR": "컨디션", "en-US": "Condition" },
  RT_POTEN_POINT: { "ko-KR": "잠재력 포인트", "en-US": "Potential Point" },
  RT_SE_POTEN: { "ko-KR": "잠재력", "en-US": "Potential" },
  RT_JOURNEY_BUFF: { "ko-KR": "여정 버프 획득", "en-US": "Buff" },
  RT_STAT: { "ko-KR": "스탯", "en-US": "Stat" }
};

const STAT_LABELS = {
  JST_POWER: { "ko-KR": "힘", "en-US": "Strength" },
  JST_HEALTH: { "ko-KR": "체력", "en-US": "Vitality" },
  JST_ENDURANCE: { "ko-KR": "인내", "en-US": "Endurance" },
  JST_FOCUS: { "ko-KR": "집중", "en-US": "Focus" },
  JST_PROTECT: { "ko-KR": "보호", "en-US": "Protection" }
};

const SUPPORTED_REWARD_TYPES = new Set([
  "RT_STAMINA",
  "RT_CONDITION",
  "RT_POTEN_POINT",
  "RT_SE_POTEN",
  "RT_JOURNEY_BUFF",
  "RT_STAT"
]);

const assetPromises = new Map();
const assetManifest = new Map();

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function readJsonIfExists(file, fallback) {
  return fs.existsSync(file) ? readJson(file) : fallback;
}

function atomicWriteJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const temp = `${file}.tmp-${process.pid}`;
  fs.writeFileSync(temp, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  fs.renameSync(temp, file);
}

function localized(value, locale) {
  if (typeof value === "string") return value.trim();
  if (!value || typeof value !== "object") return "";
  const candidate = value[locale] ?? value["en-US"] ?? value["ko-KR"] ?? Object.values(value)[0] ?? "";
  return String(candidate || "").trim();
}

function sourceLabel(table, locale, fallback = "") {
  return localized(table, locale) || fallback;
}

function stripRichText(value) {
  return String(value || "")
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\r/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function sourceAssetStem(value) {
  return String(value || "").replace(/[\\/:*?"<>|\s]/g, "");
}

function assertSourceUrl(value) {
  const url = new URL(value, SOURCE_PAGE);
  if (url.origin !== SOURCE_ORIGIN) {
    throw new Error(`External source is not allowed: ${url.href}`);
  }
  return url;
}

async function fetchSourceJson(pathname) {
  const url = assertSourceUrl(pathname);
  const response = await fetch(url, { headers: { accept: "application/json" } });
  if (!response.ok) throw new Error(`Source JSON failed: ${url.href} (HTTP ${response.status})`);
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch (error) {
    throw new Error(`Source JSON was invalid: ${url.href} (${error.message})`);
  }
  return { data, text, url: url.href };
}

function localAssetName(prefix, sourceName) {
  const safe = sourceAssetStem(sourceName).replace(/[^0-9A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ._,-]/g, "");
  if (!safe) throw new Error(`Could not create an asset filename from: ${sourceName}`);
  return `${prefix}-${safe}`;
}

async function downloadSourceAsset(sourcePath, filename) {
  const sourceUrl = assertSourceUrl(sourcePath).href;
  if (assetPromises.has(sourceUrl)) return assetPromises.get(sourceUrl);

  const task = (async () => {
    fs.mkdirSync(ASSET_DIR, { recursive: true });
    const target = path.join(ASSET_DIR, filename);
    let body;
    if (fs.existsSync(target) && fs.statSync(target).size >= 20) {
      body = fs.readFileSync(target);
    } else {
      const response = await fetch(sourceUrl, { headers: { accept: "image/*" } });
      if (!response.ok) throw new Error(`Arcana asset failed: ${sourceUrl} (HTTP ${response.status})`);
      body = Buffer.from(await response.arrayBuffer());
      if (body.length < 20) throw new Error(`Arcana asset was too small: ${sourceUrl}`);
      fs.writeFileSync(target, body);
    }

    assetManifest.set(filename, {
      source: sourceUrl,
      size: body.length,
      sha256: sha256(body)
    });
    return filename;
  })();

  assetPromises.set(sourceUrl, task);
  return task;
}

function potentialBackgroundName(potential) {
  if (String(potential?.type || "") === "일반 잠재력") return "bg_yellow.webp";
  if (String(potential?.type || "") === "특수 잠재력") {
    if (Number(potential?.unitId || 0) !== 0) return "bg_red.webp";
    if (String(potential?.class || "").trim()) return "bg_blue.webp";
    return "bg_special.webp";
  }
  throw new Error(`Unknown potential type: ${potential?.type || "(empty)"}`);
}

function numberRange(reward, signed = true) {
  const rawMin = Number(reward?.min);
  const rawMax = Number(reward?.max);
  const hasMin = Number.isFinite(rawMin);
  const hasMax = Number.isFinite(rawMax);
  if (!hasMin && !hasMax) return "";
  const min = hasMin ? rawMin : rawMax;
  const max = hasMax ? rawMax : min;
  const format = (value) => signed && value > 0 ? `+${value}` : String(value);
  return min === max ? format(min) : `${format(min)}~${format(max)}`;
}

function numericPolarity(reward) {
  const min = Number(reward?.min);
  const max = Number(reward?.max);
  if ((Number.isFinite(min) && min < 0) || (Number.isFinite(max) && max < 0)) return "negative";
  if (Number.isFinite(min) || Number.isFinite(max)) return "positive";
  return "neutral";
}

async function buildReward(reward, locale, potentialById, journeyBuffById) {
  const type = String(reward?.type || "");
  if (!SUPPORTED_REWARD_TYPES.has(type)) throw new Error(`Unsupported Arcana reward type: ${type}`);

  const base = {
    sourceType: type,
    sourceId: reward?.reward_id ?? null,
    sourceStat: reward?.reward_stat ?? null,
    sourceMin: reward?.min ?? null,
    sourceMax: reward?.max ?? null,
    label: "",
    value: "",
    description: "",
    polarity: numericPolarity(reward),
    effectTone: numericPolarity(reward),
    iconAssets: []
  };

  if (type === "RT_STAT") {
    const stat = STAT_LABELS[reward?.reward_stat];
    if (!stat) throw new Error(`Unknown Arcana stat reward: ${reward?.reward_stat || "(empty)"}`);
    base.label = sourceLabel(stat, locale, reward.reward_stat);
    base.value = numberRange(reward);
    return base;
  }

  if (type === "RT_SE_POTEN") {
    const potential = potentialById.get(Number(reward?.reward_id));
    if (!potential) throw new Error(`Arcana potential was not found: ${reward?.reward_id}`);
    const koreanName = localized(potential.name, "ko-KR");
    const logoStem = sourceAssetStem(koreanName);
    const background = potentialBackgroundName(potential);
    base.label = localized(potential.name, locale);
    base.description = stripRichText(localized(potential.desc, locale));
    base.polarity = "neutral";
    base.effectTone = "special";
    base.iconAssets = [
      await downloadSourceAsset(`/images/icon/potential/${background}`, localAssetName("arcana-potential", background)),
      await downloadSourceAsset(`/images/icon/potential/${logoStem}.webp`, localAssetName("arcana-potential", `${logoStem}.webp`))
    ];
    return base;
  }

  if (type === "RT_JOURNEY_BUFF") {
    const buff = journeyBuffById.get(Number(reward?.reward_id));
    if (!buff) throw new Error(`Arcana Journey buff was not found: ${reward?.reward_id}`);
    const koreanName = localized(buff.name, "ko-KR");
    const iconStem = sourceAssetStem(koreanName);
    const turns = numberRange(reward, false);
    base.label = `${sourceLabel(REWARD_TYPE_LABELS[type], locale, type)} · ${localized(buff.name, locale)}`;
    base.value = turns ? `${turns}${locale === "ko-KR" ? "턴" : " Turn"}` : "";
    base.description = stripRichText(localized(buff.desc, locale));
    base.polarity = buff.isBuff === false ? "negative" : "positive";
    base.effectTone = buff.isBuff === false ? "negative" : "positive";
    base.iconAssets = [
      await downloadSourceAsset(`/images/icon/journey_buff/${iconStem}.webp`, localAssetName("arcana-buff", `${iconStem}.webp`))
    ];
    return base;
  }

  base.label = sourceLabel(REWARD_TYPE_LABELS[type], locale, type);
  base.value = numberRange(reward);
  return base;
}

async function buildRewardGroups(groups, locale, potentialById, journeyBuffById) {
  return Promise.all((Array.isArray(groups) ? groups : []).map(async (group) => {
    if (!Array.isArray(group) || !group.length) throw new Error("Arcana reward group was empty or invalid.");
    return Promise.all(group.map((reward) => buildReward(reward, locale, potentialById, journeyBuffById)));
  }));
}

async function buildArcanaEntry(arcana, locale, potentialById, journeyBuffById) {
  const arcanaName = localized(arcana.name, locale);
  const savior = localized(arcana.char_name, locale);
  const eventGroups = [];

  for (const event of arcana.events || []) {
    const choices = [];
    for (let choiceIndex = 0; choiceIndex < (event.choices || []).length; choiceIndex++) {
      const choice = event.choices[choiceIndex];
      const name = localized(choice.name, locale);
      choices.push({
        name,
        automatic: !name,
        recommended: choiceIndex === 0,
        successRewards: await buildRewardGroups(choice.success_rewards, locale, potentialById, journeyBuffById),
        failureRewards: await buildRewardGroups(choice.failure_rewards, locale, potentialById, journeyBuffById)
      });
    }
    eventGroups.push({
      id: Number(event.id),
      reqClearId: Number(event.req_clear_id || 0) || null,
      title: localized(event.name, locale),
      choices
    });
  }

  const searchText = [
    arcanaName,
    savior,
    ...eventGroups.flatMap((event) => [
      event.title,
      ...event.choices.flatMap((choice) => [
        choice.name,
        ...[...choice.successRewards, ...choice.failureRewards]
          .flatMap((group) => group.flatMap((reward) => [reward.label, reward.value, reward.description]))
      ])
    ])
  ].filter(Boolean).join(" ");

  return {
    kind: "arcana",
    source: `${SOURCE_PAGE}/${Number(arcana.id)}`,
    arcanaId: Number(arcana.id),
    arcanaName,
    title: `[아르카나]${arcanaName}`,
    grade: String(arcana.rarity || ""),
    savior,
    mainStat: localized(arcana.main_stat, locale),
    eventGroups,
    searchText
  };
}

function rewardItemCount(groups) {
  return (groups || []).reduce((sum, group) => sum + (group || []).length, 0);
}

function validateLanguageOutput(sourceArcanas, outputArcana, locale, journeyBuffById) {
  if (outputArcana.length !== sourceArcanas.length) {
    throw new Error(`${locale}: Arcana count mismatch (${outputArcana.length} !== ${sourceArcanas.length})`);
  }

  for (let cardIndex = 0; cardIndex < sourceArcanas.length; cardIndex++) {
    const sourceCard = sourceArcanas[cardIndex];
    const outputCard = outputArcana[cardIndex];
    if (Number(outputCard.arcanaId) !== Number(sourceCard.id)) throw new Error(`${locale}: Arcana ID order mismatch at ${cardIndex}`);
    if (outputCard.arcanaName !== localized(sourceCard.name, locale)) throw new Error(`${locale}: Arcana name mismatch for ${sourceCard.id}`);
    if (outputCard.savior !== localized(sourceCard.char_name, locale)) throw new Error(`${locale}: Savior name mismatch for ${sourceCard.id}`);
    const sourceEvents = sourceCard.events || [];
    if (outputCard.eventGroups.length !== sourceEvents.length) throw new Error(`${locale}: Event count mismatch for ${sourceCard.id}`);

    for (let eventIndex = 0; eventIndex < sourceEvents.length; eventIndex++) {
      const sourceEvent = sourceEvents[eventIndex];
      const outputEvent = outputCard.eventGroups[eventIndex];
      const sourceChoices = sourceEvent.choices || [];
      if (Number(outputEvent.id) !== Number(sourceEvent.id)) throw new Error(`${locale}: Event ID mismatch for ${sourceEvent.id}`);
      if (outputEvent.title !== localized(sourceEvent.name, locale)) throw new Error(`${locale}: Event name mismatch for ${sourceEvent.id}`);
      if (outputEvent.choices.length !== sourceChoices.length) throw new Error(`${locale}: Choice count mismatch for event ${sourceEvent.id}`);

      for (let choiceIndex = 0; choiceIndex < sourceChoices.length; choiceIndex++) {
        const sourceChoice = sourceChoices[choiceIndex];
        const outputChoice = outputEvent.choices[choiceIndex];
        const expectedName = localized(sourceChoice.name, locale);
        if (outputChoice.name !== expectedName) throw new Error(`${locale}: Choice name mismatch for event ${sourceEvent.id}`);
        if (outputChoice.automatic !== !expectedName) throw new Error(`${locale}: Automatic-choice mismatch for event ${sourceEvent.id}`);
        if (outputChoice.recommended !== (choiceIndex === 0)) throw new Error(`${locale}: Recommended-choice mismatch for event ${sourceEvent.id}`);
        if (outputChoice.successRewards.length !== (sourceChoice.success_rewards || []).length) throw new Error(`${locale}: Success ownership mismatch for event ${sourceEvent.id}`);
        if (outputChoice.failureRewards.length !== (sourceChoice.failure_rewards || []).length) throw new Error(`${locale}: Failure ownership mismatch for event ${sourceEvent.id}`);
        if (rewardItemCount(outputChoice.successRewards) !== rewardItemCount(sourceChoice.success_rewards)) throw new Error(`${locale}: Success reward item mismatch for event ${sourceEvent.id}`);
        if (rewardItemCount(outputChoice.failureRewards) !== rewardItemCount(sourceChoice.failure_rewards)) throw new Error(`${locale}: Failure reward item mismatch for event ${sourceEvent.id}`);

        for (const outcome of [
          { name: "success", source: sourceChoice.success_rewards || [], output: outputChoice.successRewards },
          { name: "failure", source: sourceChoice.failure_rewards || [], output: outputChoice.failureRewards }
        ]) {
          outcome.source.forEach((sourceGroup, groupIndex) => {
            const outputGroup = outcome.output[groupIndex];
            if (outputGroup.length !== sourceGroup.length) {
              throw new Error(`${locale}: ${outcome.name} reward alternative count mismatch for event ${sourceEvent.id}`);
            }

            sourceGroup.forEach((reward, rewardIndex) => {
              const outputReward = outputGroup[rewardIndex];
              if (outputReward.sourceType !== reward.type) throw new Error(`${locale}: Reward type mismatch for event ${sourceEvent.id}`);
              if (outputReward.sourceId !== (reward.reward_id ?? null)) throw new Error(`${locale}: Reward ID mismatch for event ${sourceEvent.id}`);
              if (outputReward.sourceStat !== (reward.reward_stat ?? null)) throw new Error(`${locale}: Reward stat mismatch for event ${sourceEvent.id}`);
              if (outputReward.sourceMin !== (reward.min ?? null) || outputReward.sourceMax !== (reward.max ?? null)) {
                throw new Error(`${locale}: Reward range mismatch for event ${sourceEvent.id}`);
              }
              if (reward.type === "RT_SE_POTEN" && outputReward.iconAssets.length !== 2) throw new Error(`${locale}: Potential icon stack mismatch for event ${sourceEvent.id}`);
              if (reward.type === "RT_JOURNEY_BUFF" && outputReward.iconAssets.length !== 1) throw new Error(`${locale}: Journey buff icon mismatch for event ${sourceEvent.id}`);
              if (!["RT_SE_POTEN", "RT_JOURNEY_BUFF"].includes(reward.type) && outputReward.iconAssets.length !== 0) {
                throw new Error(`${locale}: Unexpected reward icon for event ${sourceEvent.id}`);
              }
              const expectedTone = reward.type === "RT_SE_POTEN"
                ? "special"
                : reward.type === "RT_JOURNEY_BUFF"
                  ? (journeyBuffById.get(Number(reward.reward_id))?.isBuff === false ? "negative" : "positive")
                  : numericPolarity(reward);
              if (outputReward.effectTone !== expectedTone) throw new Error(`${locale}: Reward effect color mismatch for event ${sourceEvent.id}`);
            });
          });
        }
      }
    }
  }
}

function collectSourceCounts(arcanas) {
  const counts = {
    cards: arcanas.length,
    events: 0,
    choices: 0,
    automaticChoices: 0,
    branchEvents: 0,
    choicesWithFailure: 0,
    successRewardGroups: 0,
    failureRewardGroups: 0,
    rewardItems: 0
  };

  for (const arcana of arcanas) {
    for (const event of arcana.events || []) {
      counts.events += 1;
      const choices = event.choices || [];
      const hasNamedChoice = choices.some((choice) => localized(choice.name, "ko-KR"));
      if (choices.length > 1 || hasNamedChoice) counts.branchEvents += 1;
      for (const choice of choices) {
        counts.choices += 1;
        if (!localized(choice.name, "ko-KR")) counts.automaticChoices += 1;
        if ((choice.failure_rewards || []).length) counts.choicesWithFailure += 1;
        counts.successRewardGroups += (choice.success_rewards || []).length;
        counts.failureRewardGroups += (choice.failure_rewards || []).length;
        counts.rewardItems += rewardItemCount(choice.success_rewards) + rewardItemCount(choice.failure_rewards);
      }
    }
  }
  return counts;
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) {
    throw new Error("data/journey is missing. General Journey is frozen, so Arcana backup will not create an empty replacement.");
  }
  fs.mkdirSync(ASSET_DIR, { recursive: true });

  const [arcanaSource, potentialSource, buffSource] = await Promise.all([
    fetchSourceJson("/data/arcanas.json"),
    fetchSourceJson("/data/potentials.json"),
    fetchSourceJson("/data/journey_buffs.json")
  ]);
  const arcanas = arcanaSource.data;
  const potentials = potentialSource.data;
  const journeyBuffs = buffSource.data;
  if (!Array.isArray(arcanas) || arcanas.length < 70) throw new Error(`Arcana source is too small: ${arcanas?.length || 0}`);
  if (!Array.isArray(potentials) || !Array.isArray(journeyBuffs)) throw new Error("Arcana reference data is invalid.");

  const uniqueIds = new Set(arcanas.map((arcana) => Number(arcana.id)));
  if (uniqueIds.size !== arcanas.length) throw new Error("Arcana source contains duplicate IDs.");
  const counts = collectSourceCounts(arcanas);
  if (counts.events < 150 || counts.choices < counts.events) throw new Error(`Arcana event source is too small: ${JSON.stringify(counts)}`);

  const potentialById = new Map(potentials.map((item) => [Number(item.id), item]));
  const journeyBuffById = new Map(journeyBuffs.map((item) => [Number(item.id), item]));
  const capturedAt = new Date().toISOString();
  const frozenEventHashes = {};
  const outputHashes = {};

  for (const language of LANGUAGES) {
    const langDir = path.join(OUT_DIR, language.key);
    const journeyPath = path.join(langDir, "journey.json");
    if (!fs.existsSync(journeyPath)) {
      throw new Error(`${language.key}: Existing journey.json is missing. General Journey remains frozen.`);
    }
    const previous = readJson(journeyPath);
    if (!Array.isArray(previous.events)) {
      throw new Error(`${language.key}: Existing general Journey events are missing or invalid.`);
    }
    const frozenEventsJson = JSON.stringify(previous.events);
    frozenEventHashes[language.key] = sha256(frozenEventsJson);

    const arcana = [];
    for (const sourceArcana of arcanas) {
      arcana.push(await buildArcanaEntry(sourceArcana, language.locale, potentialById, journeyBuffById));
    }
    validateLanguageOutput(arcanas, arcana, language.locale, journeyBuffById);

    const output = {
      ...previous,
      source: previous.source || SOURCE_PAGE,
      arcanaSource: SOURCE_PAGE,
      arcanaCapturedAt: capturedAt,
      arcana,
      events: previous.events
    };
    if (sha256(JSON.stringify(output.events)) !== frozenEventHashes[language.key]) {
      throw new Error(`${language.key}: General Journey changed before write.`);
    }
    atomicWriteJson(journeyPath, output);
    const written = readJson(journeyPath);
    if (sha256(JSON.stringify(written.events)) !== frozenEventHashes[language.key]) {
      throw new Error(`${language.key}: General Journey changed after write.`);
    }
    outputHashes[language.key] = sha256(JSON.stringify(written.arcana));
  }

  const sortedAssets = Object.fromEntries([...assetManifest.entries()].sort(([a], [b]) => a.localeCompare(b, "ko")));
  atomicWriteJson(ASSET_MANIFEST_PATH, {
    source: SOURCE_PAGE,
    capturedAt,
    assets: sortedAssets
  });

  const sourceDataSha256 = sha256([arcanaSource.text, potentialSource.text, buffSource.text].join("\n"));
  const audit = {
    source: SOURCE_PAGE,
    sourceFiles: [arcanaSource.url, potentialSource.url, buffSource.url],
    capturedAt,
    sourceDataSha256,
    counts: { ...counts, assets: assetManifest.size },
    languages: LANGUAGES.map((language) => language.key),
    generalJourneyFrozen: true,
    generalJourneyHashes: frozenEventHashes,
    arcanaOutputHashes: outputHashes
  };
  atomicWriteJson(AUDIT_PATH, audit);

  const previousMeta = readJsonIfExists(META_PATH, {});
  atomicWriteJson(META_PATH, {
    ...previousMeta,
    capturedAt,
    sources: { ...(previousMeta.sources || {}), arcana: SOURCE_PAGE },
    arcana: {
      source: SOURCE_PAGE,
      sourceDataSha256,
      counts: audit.counts,
      generalJourneyFrozen: true
    }
  });

  console.log(JSON.stringify(audit, null, 2));
}

main().catch((error) => {
  console.error(error?.stack || error?.message || String(error));
  process.exitCode = 1;
});
