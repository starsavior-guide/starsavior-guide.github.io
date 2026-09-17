import fs from 'node:fs';

const index = JSON.parse(fs.readFileSync('data/saviors/index.json', 'utf8'));
const archive = JSON.parse(fs.readFileSync('data/savior-skills/saviors.json', 'utf8'));
const byId = new Map((archive.saviors || []).map((item) => [Number(item.id), item]));
const appPath = 'app.js';
let app = fs.readFileSync(appPath, 'utf8');

const normalizedElement = (value) => ({ 태양: 'sun', 달: 'moon', 별: 'star', 질서: 'order', 혼돈: 'chaos' })[value] || '';
const normalizedAttack = (value) => ({ 타격: '충격', 마법: '원소' })[value] || value || '';
const safeKey = (entry, id) => String(entry.slug || entry.key || `espr-${id}`)
  .replace(/^espr-/, '').toLowerCase().replace(/[^a-z0-9_-]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || `espr-${id}`;
const escapeRegex = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const insertAfter = (text, marker, insertion) => {
  const index = text.indexOf(marker);
  if (index < 0) throw new Error(`app.js marker not found: ${marker}`);
  const at = index + marker.length;
  return `${text.slice(0, at)}${insertion}${text.slice(at)}`;
};

const added = [];
for (const [rawId, entry] of Object.entries(index)) {
  if (!/^\d+$/.test(rawId) || !entry?.slug) continue;
  const id = Number(rawId);
  const savior = byId.get(id);
  if (!savior) continue;
  const key = safeKey(entry, id);
  const profile = entry.profile || {};

  if (!new RegExp(`^[ \\t]*["']${escapeRegex(key)}["']\\s*:\\s*${id}\\s*,?`, 'm').test(app)) {
    app = insertAfter(app, 'const SAVIOR_DETAIL_IDS = {', `\n  ${JSON.stringify(key)}: ${id},`);
  }
  if (!new RegExp(`["']id["']\\s*:\\s*["']${escapeRegex(key)}["']`).test(app)) {
    const object = {
      id: key,
      name: profile.name || savior.name?.ko || `ESPR ${id}`,
      subtitle: profile.affiliation || savior.title?.ko || '',
      affiliation: profile.affiliation || savior.title?.ko || '',
      grade: profile.grade || savior.rank || 'SSR',
      element: normalizedElement(profile.element),
      className: profile.className || '',
      role: profile.className || '',
      attackType: normalizedAttack(profile.attackType),
      image: profile.illustration || profile.portrait || '',
      summary: 'ESPR 신규 등록 구원자입니다. PVE 세팅 정보는 미정입니다.',
      guideUrl: entry.source || `https://ss.espr.gg/ko/database/characters/${entry.slug}`
    };
    const pretty = JSON.stringify(object, null, 2).split('\n').map((line) => `  ${line}`).join('\n');
    app = insertAfter(app, 'const SAVIORS = [', `\n${pretty},`);
    added.push({ id, key, name: object.name });
  }

  const marker = `// AUTO_ESPR_I18N_${id}`;
  if (!app.includes(marker)) {
    const lines = [marker];
    if (savior.name?.en) lines.push(`I18N_DATA.saviorNames.en[${JSON.stringify(profile.name || savior.name.ko)}] = ${JSON.stringify(savior.name.en)};`);
    if (savior.name?.ja) lines.push(`I18N_DATA.saviorNames.ja[${JSON.stringify(profile.name || savior.name.ko)}] = ${JSON.stringify(savior.name.ja)};`);
    if (savior.title?.en) lines.push(`I18N_DATA.subtitles.en[${JSON.stringify(profile.affiliation || savior.title.ko)}] = ${JSON.stringify(savior.title.en)};`);
    if (savior.title?.ja) lines.push(`I18N_DATA.subtitles.ja[${JSON.stringify(profile.affiliation || savior.title.ko)}] = ${JSON.stringify(savior.title.ja)};`);
    app = app.replace('const SAVIORS = [', `${lines.join('\n')}\n\nconst SAVIORS = [`);
  }
}

fs.writeFileSync(appPath, app, 'utf8');
console.log(JSON.stringify({ added }, null, 2));
