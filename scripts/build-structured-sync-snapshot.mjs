import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SOURCE_ORIGIN = 'https://star-savior-arcana-db.pages.dev';
const SOURCE_DATA_ROOT = `${SOURCE_ORIGIN}/data`;
const ESPR_CDN = 'https://ss.esprcdn.dev';
const LANGUAGES = { ko: 'ko-KR', en: 'en-US', ja: 'ja-JP' };
const DISPLAY_LEVELS = [35, 40, 45, 50];

const PATHS = {
  saviorIndex: path.join(ROOT, 'data', 'saviors', 'index.json'),
  saviorArchive: path.join(ROOT, 'data', 'savior-skills', 'saviors.json'),
  saviorManifest: path.join(ROOT, 'data', 'savior-skills', 'manifest.json'),
  bloomIndex: path.join(ROOT, 'data', 'savior-bloom', 'index.json'),
  arcanaArchive: path.join(ROOT, 'data', 'arcanas', 'arcanas.json'),
  arcanaManifest: path.join(ROOT, 'data', 'arcanas', 'manifest.json')
};

const ATTR = {
  NUAT_ORDER: ['질서', 'order'],
  NUAT_CHAOS: ['혼돈', 'chaos'],
  NUAT_SUN: ['태양', 'sun'],
  NUAT_MOON: ['달', 'moon'],
  NUAT_STAR: ['별', 'star']
};
const CLASS = {
  NURT_STRIKER: '스트라이커',
  NURT_ASSASSIN: '어쌔신',
  NURT_RANGER: '레인저',
  NURT_CASTER: '캐스터',
  NURT_DEFENDER: '디펜더',
  NURT_SUPPORTER: '서포터'
};
const ATTACK = {
  UAT_SLASH: '참격',
  UAT_IMPACT: '충격',
  UAT_ELEMENT: '원소',
  UAT_SPIRIT: '정신'
};
const SKILL_TYPE_KO = { 0: '패시브', 1: '기본기', 2: '특수기', 3: '궁극기' };
const STATUS_ASSETS = [
  { code: 'JST_POWER', sourceName: '힘', file: 'power.webp' },
  { code: 'JST_HEALTH', sourceName: '체력', file: 'health.webp' },
  { code: 'JST_ENDURANCE', sourceName: '인내', file: 'endurance.webp' },
  { code: 'JST_FOCUS', sourceName: '집중', file: 'focus.webp' },
  { code: 'JST_PROTECT', sourceName: '보호', file: 'protect.webp' }
];
const STATUS_NAMES = {
  JST_POWER: { ko: '힘', en: 'Strength', ja: '力' },
  JST_HEALTH: { ko: '체력', en: 'Health', ja: '体力' },
  JST_ENDURANCE: { ko: '인내', en: 'Endurance', ja: '忍耐' },
  JST_FOCUS: { ko: '집중', en: 'Focus', ja: '集中' },
  JST_PROTECT: { ko: '보호', en: 'Protection', ja: '保護' }
};

const report = {
  source: SOURCE_ORIGIN,
  saviorsDiscovered: 0,
  arcanasDiscovered: 0,
  newSaviors: [],
  newArcanas: [],
  newPotentials: [],
  newJourneyBuffs: [],
  assetsDownloaded: []
};

function sleep(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }
function deepClone(value) { return value == null ? value : JSON.parse(JSON.stringify(value)); }
function sourceIconFilename(value) { return String(value || '').replace(/[\\/:*?"<>|\s]/g, ''); }
function escapeRegExp(value) { return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function htmlEscape(value) {
  return String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

async function readJson(filename, fallback) {
  try { return JSON.parse(await fs.readFile(filename, 'utf8')); }
  catch (error) {
    if (fallback !== undefined) return deepClone(fallback);
    throw error;
  }
}

async function writeJson(filename, value) {
  await fs.mkdir(path.dirname(filename), { recursive: true });
  const temp = `${filename}.tmp-${process.pid}`;
  await fs.writeFile(temp, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  await fs.rename(temp, filename);
}

async function fetchWithRetry(url, options = {}) {
  let lastError;
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45_000);
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'user-agent': 'starsavior-guide-structured-sync/1.0',
          ...(options.headers || {})
        },
        signal: controller.signal
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response;
    } catch (error) {
      lastError = error;
      if (attempt < 4) await sleep(650 * attempt);
    } finally {
      clearTimeout(timeout);
    }
  }
  throw new Error(`${url}: ${lastError?.message || 'request failed'}`);
}

async function fetchJson(name) {
  const response = await fetchWithRetry(`${SOURCE_DATA_ROOT}/${name}`, { headers: { accept: 'application/json' } });
  const type = response.headers.get('content-type') || '';
  if (!type.includes('json')) throw new Error(`${name}: expected JSON, got ${type || 'unknown content type'}`);
  return response.json();
}

async function downloadFirstAvailable(urls, destination, label) {
  await fs.mkdir(path.dirname(destination), { recursive: true });
  try {
    const existing = await fs.stat(destination);
    if (existing.size > 20) return destination;
  } catch {}

  let lastError;
  for (const url of urls.filter(Boolean)) {
    try {
      const response = await fetchWithRetry(url);
      const type = response.headers.get('content-type') || '';
      if (!type.startsWith('image/')) throw new Error(`not an image (${type || 'unknown'})`);
      const bytes = Buffer.from(await response.arrayBuffer());
      if (bytes.length < 20) throw new Error('empty image');
      await fs.writeFile(destination, bytes);
      report.assetsDownloaded.push(path.relative(ROOT, destination).replaceAll('\\', '/'));
      return destination;
    } catch (error) {
      lastError = error;
    }
  }
  throw new Error(`${label}: ${lastError?.message || 'all image sources failed'}`);
}

function localized(source, label) {
  if (!source || typeof source !== 'object') throw new Error(`${label}: localized object is missing`);
  const out = {};
  for (const [language, locale] of Object.entries(LANGUAGES)) {
    const value = source[locale];
    if (typeof value !== 'string') throw new Error(`${label}: ${locale} is missing`);
    out[language] = value;
  }
  return out;
}

function formatBirthday(birth) {
  const month = Number(birth?.month || 0);
  const day = Number(birth?.day || 0);
  if (!month || !day) return '';
  return `${String(month).padStart(2, '0')}월 ${String(day).padStart(2, '0')}일`;
}

function sourceSkillIcon(savior, skill, blossomed) {
  const type = SKILL_TYPE_KO[skill.type];
  if (!type) throw new Error(`skill ${skill.id}: unsupported skill type ${skill.type}`);
  const characterName = `${savior.name[LANGUAGES.ko]}(${savior.title[LANGUAGES.ko]})`;
  const filename = `${characterName}_${blossomed ? 'blossom_' : ''}${type}.webp`;
  return `${SOURCE_ORIGIN}/images/icon/skills/${encodeURIComponent(filename)}`;
}

function sourceBuffIcon(buff) {
  return `${SOURCE_ORIGIN}/images/icon/buff/${encodeURIComponent(`${sourceIconFilename(buff.name[LANGUAGES.ko])}.webp`)}`;
}

function findSkillBuffs(skill, buffs) {
  const descriptions = skill.levels?.at(-1)?.skill_desc || {};
  return buffs.filter((buff) => Object.values(LANGUAGES).some((locale) => {
    const name = buff.name?.[locale];
    const description = descriptions?.[locale];
    if (!name || !description || !description.includes(name)) return false;
    return new RegExp(`<b><color=#[0-9a-fA-F]{6}>${escapeRegExp(name)}`, 'u').test(description);
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

function archiveSkill(skill, sourceBuffs) {
  if (!Array.isArray(skill.levels) || !skill.levels.length) throw new Error(`skill ${skill.id}: levels are missing`);
  return {
    id: skill.id,
    type: skill.type,
    target: skill.target,
    cooltime: skill.cooltime || 0,
    break: skill.break || 0,
    nova: skill.nova || 0,
    name: localized(skill.name, `skill ${skill.id} name`),
    novaDescription: localized(skill.nova_desc, `skill ${skill.id} Nova description`),
    icon: `./data/savior-skill-assets/skills/${skill.id}.webp`,
    buffs: findSkillBuffs(skill, sourceBuffs).map(archiveBuff),
    levels: skill.levels.map((level) => ({
      level: level.level,
      skillDescription: localized(level.skill_desc, `skill ${skill.id} level ${level.level} skill description`),
      levelDescription: localized(level.level_desc || level.skill_desc, `skill ${skill.id} level ${level.level} level description`)
    }))
  };
}

function archiveResonance(resonance, potentialByStrId, saviorId) {
  const potential = potentialByStrId.get(resonance.potential);
  if (!potential) throw new Error(`Savior ${saviorId}: resonance potential ${resonance.potential} is missing`);
  return {
    step: resonance.step,
    unlockLevel: resonance.unlock_level,
    id: potential.id,
    strId: potential.str_id,
    name: localized(potential.name, `potential ${potential.id} name`),
    description: localized(potential.desc, `potential ${potential.id} description`)
  };
}

function archiveSavior(savior, sourceBuffs, potentialByStrId) {
  const resonancePotentials = (savior.resonances || [])
    .filter((item) => item.potential)
    .map((item) => archiveResonance(item, potentialByStrId, savior.id));
  if (resonancePotentials.length !== 3) {
    throw new Error(`Savior ${savior.id}: expected 3 resonance potentials, got ${resonancePotentials.length}`);
  }
  const skills = (savior.skills || []).map((skill) => archiveSkill(skill, sourceBuffs));
  const blossomSkills = (savior.blossom?.skills || []).map((skill) => archiveSkill(skill, sourceBuffs));
  if (!skills.length) throw new Error(`Savior ${savior.id}: no skills`);
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
}

function profileFromSource(savior) {
  const attr = ATTR[savior.attr];
  const className = CLASS[savior.class];
  const attackType = ATTACK[savior.atk_type];
  if (!attr) throw new Error(`Savior ${savior.id}: unsupported attr ${savior.attr}`);
  if (!className) throw new Error(`Savior ${savior.id}: unsupported class ${savior.class}`);
  if (!attackType) throw new Error(`Savior ${savior.id}: unsupported attack type ${savior.atk_type}`);
  return {
    name: savior.name?.[LANGUAGES.ko] || '',
    grade: savior.rank || 'SSR',
    element: attr[0],
    className,
    attackType,
    description: savior.inst?.desc?.[LANGUAGES.ko] || '',
    birthday: formatBirthday(savior.inst?.birth),
    height: savior.inst?.height != null ? `${savior.inst.height}cm` : '',
    origin: savior.inst?.origin?.[LANGUAGES.ko] || '',
    affiliation: savior.inst?.team?.[LANGUAGES.ko] || savior.title?.[LANGUAGES.ko] || '',
    cvKr: savior.inst?.cv_ko?.[LANGUAGES.ko] || '',
    cvJp: savior.inst?.cv_jp?.[LANGUAGES.ko] || '',
    illustration: `./data/savior-detail-assets/${savior.id}-illustration.webp`,
    portrait: `./data/savior-detail-assets/${savior.id}-portrait.webp`
  };
}

function saviorSnapshotHtml(savior, archived, profile, capturedAt) {
  const journey = savior.journey_base_stat || {};
  const journeyRows = [
    ['힘', journey.str], ['체력', journey.hp], ['인내', journey.end], ['집중', journey.focus], ['보호', journey.prot]
  ].filter(([, value]) => value != null).map(([name, value]) => `<div><span>${name}</span> <strong>${htmlEscape(value)}</strong></div>`).join('\n');
  const resonance = archived.resonancePotentials.map((item) => `<div><strong>Lv.${htmlEscape(item.step)} ${htmlEscape(item.name.ko)}</strong><p>${htmlEscape(item.description.ko)}</p></div>`).join('\n');
  return `<!doctype html>\n<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${htmlEscape(profile.name)}</title></head><body>\n<main class="snapshot-root">\n<h2>${htmlEscape(profile.name)}</h2><p>${htmlEscape(profile.description)}</p>\n<section><h3>여정 스테이터스</h3>${journeyRows}</section>\n<section><h3>공명 잠재력</h3>${resonance}</section>\n</main><div data-captured-at="${htmlEscape(capturedAt)}"></div>\n</body></html>\n`;
}

function potentialBackgroundKey(potential) {
  if (potential.type === '일반 잠재력') return 'yellow';
  if (potential.type === '특수 잠재력') {
    if (Number(potential.unitId) !== 0) return 'red';
    if (String(potential.class || '')) return 'blue';
  }
  return 'special';
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
  const promote = Number(effect.promote_per_level || 1);
  const step = Math.floor((level - Number(effect.unlock_level || 0)) / promote);
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
    values[String(level)] = { value, display: isRate ? `${(value / 100).toFixed(2)}%` : String(value) };
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
  const archived = { type: reward.type, min: reward.min, max: reward.max };
  if (reward.reward_stat) {
    const stat = STATUS_NAMES[reward.reward_stat];
    if (!stat) throw new Error(`arcana ${arcanaId}: unsupported reward stat ${reward.reward_stat}`);
    archived.rewardStat = reward.reward_stat;
    archived.statName = stat;
    const asset = STATUS_ASSETS.find((item) => item.code === reward.reward_stat);
    archived.icon = `./data/arcana-assets/status/${asset.file}`;
  }
  if (reward.reward_id != null) archived.rewardId = reward.reward_id;
  if (reward.type === 'RT_SE_POTEN' && !potentialById.has(Number(reward.reward_id))) {
    throw new Error(`arcana ${arcanaId}: potential reward ${reward.reward_id} missing`);
  }
  if (reward.type === 'RT_JOURNEY_BUFF' && !buffById.has(Number(reward.reward_id))) {
    throw new Error(`arcana ${arcanaId}: journey buff reward ${reward.reward_id} missing`);
  }
  return archived;
}

function archiveRewardGroups(groups, potentialById, buffById, arcanaId) {
  return (groups || []).map((alternatives) => alternatives.map((reward) => archiveReward(reward, potentialById, buffById, arcanaId)));
}

function archiveArcana(arcana, potentialByName, potentialById, buffById) {
  const specialPotential = arcana.sp_potential ? potentialByName.get(arcana.sp_potential[LANGUAGES.ko]) : null;
  if (arcana.sp_potential && !specialPotential) throw new Error(`arcana ${arcana.id}: special potential missing`);
  const mainStatAsset = STATUS_ASSETS.find((item) => item.sourceName === arcana.main_stat?.[LANGUAGES.ko]);
  const archived = {
    id: arcana.id,
    name: localized(arcana.name, `arcana ${arcana.id} name`),
    character: localized(arcana.char_name, `arcana ${arcana.id} character`),
    rarity: arcana.rarity,
    mainStat: localized(arcana.main_stat, `arcana ${arcana.id} main stat`),
    assists: (arcana.assists || [])
      .filter((assist) => typeof assist?.[LANGUAGES.ko] === 'string')
      .map((assist, index) => localized(assist, `arcana ${arcana.id} assist ${index}`)),
    image: `./data/arcana-assets/cards/${arcana.id}.webp`,
    mainStatIcon: mainStatAsset ? `./data/arcana-assets/status/${mainStatAsset.file}` : '',
    specialPotentialId: specialPotential?.id || null,
    uniqueEffect: archiveUniqueEffect(arcana.unique_effect, arcana.id),
    effects: {
      journeyStart: (arcana.journey_start_stats || []).map((effect, index) => archiveGrowthEffect(effect, `arcana ${arcana.id} journey ${index}`)),
      training: (arcana.training_effects || []).map((effect, index) => archiveGrowthEffect(effect, `arcana ${arcana.id} training ${index}`)),
      telepathy: (arcana.telepathy_effects || []).map((effect, index) => archiveGrowthEffect(effect, `arcana ${arcana.id} telepathy ${index}`)),
      supportQuest: (arcana.support_quest_effects || []).map((effect, index) => archiveGrowthEffect(effect, `arcana ${arcana.id} support ${index}`))
    },
    events: (arcana.events || []).map((event) => ({
      id: event.id,
      name: localized(event.name, `arcana ${arcana.id} event ${event.id} name`),
      choices: (event.choices || []).map((choice) => ({
        name: choice.name ? localized(choice.name, `arcana ${arcana.id} event ${event.id} choice`) : { ko: '', en: '', ja: '' },
        successRewards: archiveRewardGroups(choice.success_rewards, potentialById, buffById, arcana.id),
        failureRewards: archiveRewardGroups(choice.failure_rewards, potentialById, buffById, arcana.id)
      }))
    }))
  };
  if (archived.events.length !== (arcana.events || []).length) throw new Error(`arcana ${arcana.id}: event count mismatch`);
  return archived;
}

function countSaviorArchive(archive) {
  const saviors = archive.saviors || [];
  return {
    saviorCount: saviors.length,
    skillCount: saviors.reduce((sum, item) => sum + (item.skills?.length || 0), 0),
    blossomSkillCount: saviors.reduce((sum, item) => sum + (item.blossomSkills?.length || 0), 0),
    resonancePotentialCount: saviors.reduce((sum, item) => sum + (item.resonancePotentials?.length || 0), 0),
    buffCount: new Set(saviors.flatMap((item) => [...(item.skills || []), ...(item.blossomSkills || [])].flatMap((skill) => (skill.buffs || []).map((buff) => buff.strId)))).size
  };
}

function countArcanaArchive(archive) {
  const arcanas = archive.arcanas || [];
  return {
    arcanaCount: arcanas.length,
    eventCount: arcanas.reduce((sum, item) => sum + (item.events?.length || 0), 0),
    choiceCount: arcanas.reduce((sum, item) => sum + (item.events || []).reduce((inner, event) => inner + (event.choices?.length || 0), 0), 0),
    potentialCount: (archive.potentials || []).length,
    journeyBuffCount: (archive.journeyBuffs || []).length
  };
}

async function main() {
  const [sourceSaviors, sourceArcanas, sourcePotentials, sourceBuffs, sourceJourneyBuffs] = await Promise.all([
    fetchJson('saviors.json'), fetchJson('arcanas.json'), fetchJson('potentials.json'), fetchJson('buffs.json'), fetchJson('journey_buffs.json')
  ]);
  if (![sourceSaviors, sourceArcanas, sourcePotentials, sourceBuffs, sourceJourneyBuffs].every(Array.isArray)) {
    throw new Error('Structured source returned invalid data.');
  }

  report.saviorsDiscovered = sourceSaviors.length;
  report.arcanasDiscovered = sourceArcanas.length;

  const saviorIndex = await readJson(PATHS.saviorIndex, {});
  const saviorArchive = await readJson(PATHS.saviorArchive, { saviors: [] });
  const bloomIndex = await readJson(PATHS.bloomIndex, {});
  const arcanaArchive = await readJson(PATHS.arcanaArchive, { arcanas: [], potentials: [], journeyBuffs: [] });

  const liveSaviorIds = new Set(Object.keys(saviorIndex).filter((key) => /^\d+$/.test(key)).map(Number));
  const liveArcanaIds = new Set((arcanaArchive.arcanas || []).map((item) => Number(item.id)));
  const sourceSaviorIds = new Set(sourceSaviors.map((item) => Number(item.id)));
  const sourceArcanaIds = new Set(sourceArcanas.map((item) => Number(item.id)));

  const missingSaviors = [...liveSaviorIds].filter((id) => !sourceSaviorIds.has(id));
  const missingArcanas = [...liveArcanaIds].filter((id) => !sourceArcanaIds.has(id));
  if (missingSaviors.length) throw new Error(`Structured source is missing live Savior IDs: ${missingSaviors.join(', ')}`);
  if (missingArcanas.length) throw new Error(`Structured source is missing live Arcana IDs: ${missingArcanas.join(', ')}`);

  const potentialByStrId = new Map(sourcePotentials.map((item) => [item.str_id, item]));
  const potentialById = new Map(sourcePotentials.map((item) => [Number(item.id), item]));
  const potentialByName = new Map(sourcePotentials.map((item) => [item.name?.[LANGUAGES.ko], item]));
  const journeyBuffById = new Map(sourceJourneyBuffs.map((item) => [Number(item.id), item]));

  if (!Array.isArray(saviorArchive.saviors)) saviorArchive.saviors = [];
  const archivedSaviorIds = new Set(saviorArchive.saviors.map((item) => Number(item.id)));
  const newSaviors = sourceSaviors.filter((item) => !liveSaviorIds.has(Number(item.id))).sort((a, b) => Number(a.id) - Number(b.id));
  const capturedAt = new Date().toISOString();

  for (const savior of newSaviors) {
    const id = Number(savior.id);
    const archived = archiveSavior(savior, sourceBuffs, potentialByStrId);
    const profile = profileFromSource(savior);
    const key = `source-${id}`;

    const portraitDest = path.join(ROOT, 'data', 'savior-detail-assets', `${id}-portrait.webp`);
    const illustrationDest = path.join(ROOT, 'data', 'savior-detail-assets', `${id}-illustration.webp`);
    await downloadFirstAvailable([
      `${ESPR_CDN}/images/characters/portrait/${id}.webp`,
      `${SOURCE_ORIGIN}/images/characters/portrait/${id}.webp`
    ], portraitDest, `Savior ${id} portrait`);
    await downloadFirstAvailable([
      `${ESPR_CDN}/images/characters/illustration/${id}.ui.webp`,
      `${SOURCE_ORIGIN}/images/characters/illustration/${id}.ui.webp`
    ], illustrationDest, `Savior ${id} illustration`);

    const skillPairs = [
      ...(savior.skills || []).map((skill) => [skill, false]),
      ...(savior.blossom?.skills || []).map((skill) => [skill, true])
    ];
    const requiredBuffs = new Map();
    for (const [skill, blossomed] of skillPairs) {
      await downloadFirstAvailable([
        sourceSkillIcon(savior, skill, blossomed)
      ], path.join(ROOT, 'data', 'savior-skill-assets', 'skills', `${skill.id}.webp`), `skill ${skill.id} icon`);
      for (const buff of findSkillBuffs(skill, sourceBuffs)) requiredBuffs.set(buff.str_id, buff);
    }
    for (const buff of requiredBuffs.values()) {
      await downloadFirstAvailable([
        sourceBuffIcon(buff)
      ], path.join(ROOT, 'data', 'savior-skill-assets', 'buffs', `${buff.str_id}.webp`), `buff ${buff.str_id} icon`);
    }

    saviorIndex[String(id)] = {
      key,
      id,
      file: `./${id}.html`,
      source: `${SOURCE_ORIGIN}/savior/${id}`,
      capturedAt,
      profile
    };
    if (!archivedSaviorIds.has(id)) {
      saviorArchive.saviors.push(archived);
      archivedSaviorIds.add(id);
    }

    const snapshot = saviorSnapshotHtml(savior, archived, profile, capturedAt);
    await fs.mkdir(path.join(ROOT, 'data', 'saviors'), { recursive: true });
    await fs.writeFile(path.join(ROOT, 'data', 'saviors', `${id}.html`), snapshot, 'utf8');
    if (archived.blossomSkills.length) {
      bloomIndex[String(id)] = { key, id, file: `./${id}.html`, source: `${SOURCE_ORIGIN}/savior/${id}`, capturedAt, mode: 'bloom-text-only' };
      await fs.mkdir(path.join(ROOT, 'data', 'savior-bloom'), { recursive: true });
      await fs.writeFile(path.join(ROOT, 'data', 'savior-bloom', `${id}.html`), snapshot, 'utf8');
    }
    report.newSaviors.push({ id, name: profile.name, skills: archived.skills.length, blossomSkills: archived.blossomSkills.length, resonancePotentials: archived.resonancePotentials.length });
  }

  saviorArchive.saviors.sort((a, b) => Number(a.id) - Number(b.id));
  if (newSaviors.length) {
    saviorIndex._meta = { ...(saviorIndex._meta || {}), sourceOrigin: SOURCE_ORIGIN, capturedAt, languages: Object.keys(LANGUAGES), localOnly: true };
    bloomIndex._meta = { ...(bloomIndex._meta || {}), sourceRoot: `${SOURCE_ORIGIN}/savior`, generatedAt: capturedAt, count: Object.keys(bloomIndex).filter((key) => /^\d+$/.test(key)).length, mode: 'bloom-text-only' };
    saviorArchive.structuredSyncSource = SOURCE_ORIGIN;
    saviorArchive.structuredSyncAt = capturedAt;
    await writeJson(PATHS.saviorIndex, saviorIndex);
    await writeJson(PATHS.saviorArchive, saviorArchive);
    await writeJson(PATHS.bloomIndex, bloomIndex);
    const manifest = await readJson(PATHS.saviorManifest, {});
    Object.assign(manifest, countSaviorArchive(saviorArchive), { structuredSyncSource: SOURCE_ORIGIN, structuredSyncAt: capturedAt });
    await writeJson(PATHS.saviorManifest, manifest);
  }

  if (!Array.isArray(arcanaArchive.arcanas)) arcanaArchive.arcanas = [];
  if (!Array.isArray(arcanaArchive.potentials)) arcanaArchive.potentials = [];
  if (!Array.isArray(arcanaArchive.journeyBuffs)) arcanaArchive.journeyBuffs = [];
  const currentPotentialIds = new Set(arcanaArchive.potentials.map((item) => Number(item.id)));
  const currentJourneyBuffIds = new Set(arcanaArchive.journeyBuffs.map((item) => Number(item.id)));
  const newArcanas = sourceArcanas.filter((item) => !liveArcanaIds.has(Number(item.id))).sort((a, b) => Number(a.id) - Number(b.id));
  const requiredPotentialIds = new Set();
  const requiredJourneyBuffIds = new Set();

  for (const arcana of newArcanas) {
    if (arcana.sp_potential) {
      const potential = potentialByName.get(arcana.sp_potential[LANGUAGES.ko]);
      if (!potential) throw new Error(`arcana ${arcana.id}: special potential lookup failed`);
      requiredPotentialIds.add(Number(potential.id));
    }
    for (const event of arcana.events || []) {
      for (const choice of event.choices || []) {
        for (const group of [...(choice.success_rewards || []), ...(choice.failure_rewards || [])]) {
          for (const reward of group) {
            if (reward.type === 'RT_SE_POTEN') requiredPotentialIds.add(Number(reward.reward_id));
            if (reward.type === 'RT_JOURNEY_BUFF') requiredJourneyBuffIds.add(Number(reward.reward_id));
          }
        }
      }
    }
  }

  for (const id of [...requiredPotentialIds].sort((a, b) => a - b)) {
    if (currentPotentialIds.has(id)) continue;
    const source = potentialById.get(id);
    if (!source) throw new Error(`potential ${id}: source entry missing`);
    const archived = archivePotential(source);
    arcanaArchive.potentials.push(archived);
    await downloadFirstAvailable([
      `${SOURCE_ORIGIN}/images/icon/potential/${encodeURIComponent(`${sourceIconFilename(source.name[LANGUAGES.ko])}.webp`)}`
    ], path.join(ROOT, 'data', 'arcana-assets', 'potentials', `${id}.webp`), `potential ${id} icon`);
    currentPotentialIds.add(id);
    report.newPotentials.push({ id, name: archived.name.ko });
  }

  for (const id of [...requiredJourneyBuffIds].sort((a, b) => a - b)) {
    if (currentJourneyBuffIds.has(id)) continue;
    const source = journeyBuffById.get(id);
    if (!source) throw new Error(`journey buff ${id}: source entry missing`);
    const archived = archiveJourneyBuff(source);
    arcanaArchive.journeyBuffs.push(archived);
    await downloadFirstAvailable([
      `${SOURCE_ORIGIN}/images/icon/journey_buff/${encodeURIComponent(`${sourceIconFilename(source.name[LANGUAGES.ko])}.webp`)}`
    ], path.join(ROOT, 'data', 'arcana-assets', 'journey-buffs', `${id}.webp`), `journey buff ${id} icon`);
    currentJourneyBuffIds.add(id);
    report.newJourneyBuffs.push({ id, name: archived.name.ko });
  }

  for (const arcana of newArcanas) {
    const id = Number(arcana.id);
    const archived = archiveArcana(arcana, potentialByName, potentialById, journeyBuffById);
    arcanaArchive.arcanas.push(archived);
    const filename = `${sourceIconFilename(arcana.name[LANGUAGES.ko])}.webp`;
    await downloadFirstAvailable([
      `${SOURCE_ORIGIN}/images/cards/${encodeURIComponent(filename)}`,
      `${ESPR_CDN}/images/arcanas/illustration/${id}.webp`
    ], path.join(ROOT, 'data', 'arcana-assets', 'cards', `${id}.webp`), `Arcana ${id} card`);
    report.newArcanas.push({ id, name: archived.name.ko, events: archived.events.length, specialPotentialId: archived.specialPotentialId });
  }

  arcanaArchive.arcanas.sort((a, b) => Number(a.id) - Number(b.id));
  arcanaArchive.potentials.sort((a, b) => Number(a.id) - Number(b.id));
  arcanaArchive.journeyBuffs.sort((a, b) => Number(a.id) - Number(b.id));
  if (newArcanas.length) {
    arcanaArchive.structuredSyncSource = SOURCE_ORIGIN;
    arcanaArchive.structuredSyncAt = capturedAt;
    await writeJson(PATHS.arcanaArchive, arcanaArchive);
    const manifest = await readJson(PATHS.arcanaManifest, {});
    Object.assign(manifest, countArcanaArchive(arcanaArchive), { structuredSyncSource: SOURCE_ORIGIN, structuredSyncAt: capturedAt });
    await writeJson(PATHS.arcanaManifest, manifest);
  }

  console.log(JSON.stringify(report, null, 2));
}

main().catch((error) => {
  console.error(error?.stack || error?.message || String(error));
  process.exitCode = 1;
});
