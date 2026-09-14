import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SCAN_ROOT = path.resolve(process.argv[2] || process.env.SCAN_ROOT || '');

if (!SCAN_ROOT || SCAN_ROOT === ROOT) {
  throw new Error('Pass the temporary ESPR scan root as argv[2] or SCAN_ROOT.');
}
if (!fs.existsSync(SCAN_ROOT)) {
  throw new Error(`Temporary ESPR scan root does not exist: ${SCAN_ROOT}`);
}

const now = new Date().toISOString();
const report = {
  saviorsAdded: [],
  arcanasAdded: [],
  potentialsAdded: [],
  filesCopied: []
};

function deepClone(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value));
}

function readJson(root, rel, fallback = null) {
  const filename = path.join(root, rel);
  try {
    return JSON.parse(fs.readFileSync(filename, 'utf8'));
  } catch (error) {
    if (fallback !== null) return deepClone(fallback);
    throw new Error(`Could not read ${filename}: ${error.message}`);
  }
}

function writeJson(rel, value) {
  const filename = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(filename), { recursive: true });
  fs.writeFileSync(filename, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function copyRelative(rel, { optional = false } = {}) {
  const clean = String(rel || '').replace(/^\.\//, '').replaceAll('\\', '/');
  if (!clean || clean.includes('..') || path.isAbsolute(clean)) {
    if (optional) return false;
    throw new Error(`Unsafe repository path: ${rel}`);
  }
  const src = path.join(SCAN_ROOT, clean);
  const dest = path.join(ROOT, clean);
  if (!fs.existsSync(src)) {
    if (optional) return false;
    throw new Error(`Expected scanned file is missing: ${clean}`);
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  report.filesCopied.push(clean);
  return true;
}

function collectDataRefs(value, output = new Set()) {
  if (typeof value === 'string') {
    const rel = value.replace(/^\.\//, '');
    if (rel.startsWith('data/') && !rel.includes('..')) output.add(rel);
    return output;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectDataRefs(item, output);
    return output;
  }
  if (value && typeof value === 'object') {
    for (const child of Object.values(value)) collectDataRefs(child, output);
  }
  return output;
}

function copyReferencedData(...values) {
  const refs = new Set();
  for (const value of values) collectDataRefs(value, refs);
  for (const rel of refs) copyRelative(rel, { optional: true });
}

function numericIdsFromIndex(index) {
  return new Set(
    Object.keys(index || {})
      .filter((key) => /^\d+$/.test(key))
      .map(Number)
  );
}

function countSaviorArchive(archive) {
  const saviors = Array.isArray(archive?.saviors) ? archive.saviors : [];
  return {
    saviorCount: saviors.length,
    skillCount: saviors.reduce((sum, item) => sum + (item.skills?.length || 0), 0),
    blossomSkillCount: saviors.reduce((sum, item) => sum + (item.blossomSkills?.length || 0), 0),
    resonancePotentialCount: saviors.reduce((sum, item) => sum + (item.resonancePotentials?.length || 0), 0),
    buffCount: new Set(
      saviors.flatMap((item) => [...(item.skills || []), ...(item.blossomSkills || [])]
        .flatMap((skill) => (skill.buffs || []).map((buff) => buff.strId || buff.id).filter(Boolean)))
    ).size
  };
}

function countArcanaArchive(archive) {
  const arcanas = Array.isArray(archive?.arcanas) ? archive.arcanas : [];
  return {
    arcanaCount: arcanas.length,
    eventCount: arcanas.reduce((sum, arcana) => sum + (arcana.events?.length || 0), 0),
    choiceCount: arcanas.reduce(
      (sum, arcana) => sum + (arcana.events || []).reduce((inner, event) => inner + (event.choices?.length || 0), 0),
      0
    ),
    potentialCount: Array.isArray(archive?.potentials) ? archive.potentials.length : 0,
    journeyBuffCount: Array.isArray(archive?.journeyBuffs) ? archive.journeyBuffs.length : 0
  };
}

function normalizedAppElement(value) {
  return ({ '태양': 'sun', '달': 'moon', '별': 'star', '질서': 'order', '혼돈': 'chaos' })[value] || String(value || '').toLowerCase();
}

function normalizedAttackType(value) {
  if (value === '타격') return '충격';
  if (value === '마법') return '원소';
  return value || '';
}

function localizedText(value, language, fallback = '') {
  if (value && typeof value === 'object') return String(value[language] || value.ko || fallback || '');
  return String(value || fallback || '');
}

function safeSaviorKey(raw, id) {
  const value = String(raw || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return value || `espr-${id}`;
}

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function insertAfterMarker(text, marker, insertion) {
  const index = text.indexOf(marker);
  if (index < 0) throw new Error(`Could not find app.js marker: ${marker}`);
  const at = index + marker.length;
  return `${text.slice(0, at)}${insertion}${text.slice(at)}`;
}

function saviorObjectName(profile, scanned, id) {
  return String(profile?.name || localizedText(scanned?.name, 'ko', `ESPR ${id}`));
}

function addSaviorsToApp(newIds, scanIndex, scanSkillArchive) {
  if (!newIds.length) return;
  const appPath = path.join(ROOT, 'app.js');
  let app = fs.readFileSync(appPath, 'utf8');
  const scannedById = new Map((scanSkillArchive.saviors || []).map((item) => [Number(item.id), item]));

  for (const id of newIds) {
    const indexEntry = scanIndex[String(id)] || {};
    const profile = indexEntry.profile || {};
    const scanned = scannedById.get(id) || {};
    const key = safeSaviorKey(indexEntry.slug || indexEntry.key, id);

    if (!new RegExp(`^[ \\t]*[\"']${escapeRegex(key)}[\"']\\s*:\\s*${id}\\s*,?`, 'm').test(app)) {
      app = insertAfterMarker(app, 'const SAVIOR_DETAIL_IDS = {', `\n  ${JSON.stringify(key)}: ${id},`);
    }

    const saviorIdPattern = new RegExp(`[\"']id[\"']\\s*:\\s*[\"']${escapeRegex(key)}[\"']`);
    if (!saviorIdPattern.test(app)) {
      const saviorObject = {
        id: key,
        name: profile.name || localizedText(scanned.name, 'ko', `ESPR ${id}`),
        subtitle: profile.affiliation || localizedText(scanned.title, 'ko', ''),
        affiliation: profile.affiliation || localizedText(scanned.title, 'ko', ''),
        grade: profile.grade || scanned.rank || 'SSR',
        element: normalizedAppElement(profile.element),
        className: profile.className || '',
        role: profile.className || '',
        attackType: normalizedAttackType(profile.attackType),
        image: profile.illustration || profile.portrait || '',
        summary: 'ESPR 신규 등록 구원자입니다. PVE 세팅 정보는 미정입니다.',
        guideUrl: indexEntry.source || `https://ss.espr.gg/ko/database/characters/${indexEntry.slug || key}`
      };
      const pretty = JSON.stringify(saviorObject, null, 2)
        .split('\n')
        .map((line) => `  ${line}`)
        .join('\n');
      app = insertAfterMarker(app, 'const SAVIORS = [', `\n${pretty},`);
    }

    const koName = saviorObjectName(profile, scanned, id);
    const enName = localizedText(scanned.name, 'en', '');
    const jaName = localizedText(scanned.name, 'ja', '');
    const koSubtitle = profile.affiliation || localizedText(scanned.title, 'ko', '');
    const enSubtitle = localizedText(scanned.title, 'en', '');
    const jaSubtitle = localizedText(scanned.title, 'ja', '');
    const i18nMarker = `// AUTO_ESPR_I18N_${id}`;
    if (!app.includes(i18nMarker)) {
      const lines = [i18nMarker];
      if (koName && enName) lines.push(`I18N_DATA.saviorNames.en[${JSON.stringify(koName)}] = ${JSON.stringify(enName)};`);
      if (koName && jaName) lines.push(`I18N_DATA.saviorNames.ja[${JSON.stringify(koName)}] = ${JSON.stringify(jaName)};`);
      if (koSubtitle && enSubtitle) lines.push(`I18N_DATA.subtitles.en[${JSON.stringify(koSubtitle)}] = ${JSON.stringify(enSubtitle)};`);
      if (koSubtitle && jaSubtitle) lines.push(`I18N_DATA.subtitles.ja[${JSON.stringify(koSubtitle)}] = ${JSON.stringify(jaSubtitle)};`);
      app = app.replace('const SAVIORS = [', `${lines.join('\n')}\n\nconst SAVIORS = [`);
    }
  }

  fs.writeFileSync(appPath, app, 'utf8');
}

// Savior: append only IDs that do not exist in the live repository.
const liveSaviorIndex = readJson(ROOT, 'data/saviors/index.json', {});
const scanSaviorIndex = readJson(SCAN_ROOT, 'data/saviors/index.json', {});
const liveSaviorIds = numericIdsFromIndex(liveSaviorIndex);
const scanSaviorIds = [...numericIdsFromIndex(scanSaviorIndex)].sort((a, b) => a - b);
const newSaviorIds = scanSaviorIds.filter((id) => !liveSaviorIds.has(id));

const liveSkillArchive = readJson(ROOT, 'data/savior-skills/saviors.json', { saviors: [] });
const scanSkillArchive = readJson(SCAN_ROOT, 'data/savior-skills/saviors.json', { saviors: [] });
const liveSkillIds = new Set((liveSkillArchive.saviors || []).map((item) => Number(item.id)));
const scanSkillById = new Map((scanSkillArchive.saviors || []).map((item) => [Number(item.id), item]));

if (newSaviorIds.length) {
  const mergedIndex = deepClone(liveSaviorIndex);
  const mergedSkills = deepClone(liveSkillArchive);
  if (!Array.isArray(mergedSkills.saviors)) mergedSkills.saviors = [];

  for (const id of newSaviorIds) {
    const indexEntry = scanSaviorIndex[String(id)];
    if (!indexEntry) throw new Error(`Scanned Savior index is missing ${id}.`);
    mergedIndex[String(id)] = deepClone(indexEntry);
    copyRelative(`data/saviors/${id}.html`, { optional: true });
    copyReferencedData(indexEntry);

    const scannedSavior = scanSkillById.get(id);
    if (scannedSavior && !liveSkillIds.has(id)) {
      mergedSkills.saviors.push(deepClone(scannedSavior));
      copyReferencedData(scannedSavior);
    }

    report.saviorsAdded.push({ id, name: indexEntry.profile?.name || scannedSavior?.name?.ko || '', slug: indexEntry.slug || '' });
  }

  mergedSkills.saviors.sort((a, b) => Number(a.id) - Number(b.id));
  mergedSkills.lastNewSyncAt = now;
  writeJson('data/saviors/index.json', mergedIndex);
  writeJson('data/savior-skills/saviors.json', mergedSkills);

  const liveBloomIndex = readJson(ROOT, 'data/savior-bloom/index.json', {});
  const scanBloomIndex = readJson(SCAN_ROOT, 'data/savior-bloom/index.json', {});
  let bloomChanged = false;
  for (const id of newSaviorIds) {
    if (!scanBloomIndex[String(id)] || liveBloomIndex[String(id)]) continue;
    liveBloomIndex[String(id)] = deepClone(scanBloomIndex[String(id)]);
    copyRelative(`data/savior-bloom/${id}.html`, { optional: true });
    copyReferencedData(scanBloomIndex[String(id)]);
    bloomChanged = true;
  }
  if (bloomChanged) writeJson('data/savior-bloom/index.json', liveBloomIndex);

  const skillManifest = readJson(ROOT, 'data/savior-skills/manifest.json', {});
  Object.assign(skillManifest, countSaviorArchive(mergedSkills), { lastNewSyncAt: now });
  writeJson('data/savior-skills/manifest.json', skillManifest);

  addSaviorsToApp(newSaviorIds, scanSaviorIndex, scanSkillArchive);
}

// Arcana: append only IDs that do not exist in the live repository.
const liveArcanaArchive = readJson(ROOT, 'data/arcanas/arcanas.json', { arcanas: [], potentials: [] });
const scanArcanaArchive = readJson(SCAN_ROOT, 'data/arcanas/arcanas.json', { arcanas: [], potentials: [] });
const liveArcanaIds = new Set((liveArcanaArchive.arcanas || []).map((item) => Number(item.id)));
const newArcanas = (scanArcanaArchive.arcanas || [])
  .filter((item) => Number(item.id) && !liveArcanaIds.has(Number(item.id)))
  .sort((a, b) => Number(a.id) - Number(b.id));

if (newArcanas.length) {
  const mergedArcana = deepClone(liveArcanaArchive);
  if (!Array.isArray(mergedArcana.arcanas)) mergedArcana.arcanas = [];
  if (!Array.isArray(mergedArcana.potentials)) mergedArcana.potentials = [];

  for (const arcana of newArcanas) {
    mergedArcana.arcanas.push(deepClone(arcana));
    copyReferencedData(arcana);
    report.arcanasAdded.push({ id: Number(arcana.id), name: localizedText(arcana.name, 'ko', '') });
  }
  mergedArcana.arcanas.sort((a, b) => Number(a.id) - Number(b.id));

  // New potentials are append-only as well. Existing potential records are never overwritten.
  const livePotentialIds = new Set(mergedArcana.potentials.map((item) => Number(item.id)));
  const newPotentials = (scanArcanaArchive.potentials || [])
    .filter((item) => Number(item.id) && !livePotentialIds.has(Number(item.id)))
    .sort((a, b) => Number(a.id) - Number(b.id));
  for (const potential of newPotentials) {
    mergedArcana.potentials.push(deepClone(potential));
    copyReferencedData(potential);
    report.potentialsAdded.push({ id: Number(potential.id), name: localizedText(potential.name, 'ko', '') });
  }
  mergedArcana.potentials.sort((a, b) => Number(a.id) - Number(b.id));
  mergedArcana.lastNewSyncAt = now;
  writeJson('data/arcanas/arcanas.json', mergedArcana);

  const arcanaManifest = readJson(ROOT, 'data/arcanas/manifest.json', {});
  Object.assign(arcanaManifest, countArcanaArchive(mergedArcana), { lastNewSyncAt: now });
  writeJson('data/arcanas/manifest.json', arcanaManifest);
}

console.log(JSON.stringify({
  ...report,
  saviorCountAdded: report.saviorsAdded.length,
  arcanaCountAdded: report.arcanasAdded.length,
  potentialCountAdded: report.potentialsAdded.length
}, null, 2));
