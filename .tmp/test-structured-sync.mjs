import { promises as fs } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';

const REPO = process.cwd();
const SAVIOR_ID = 1058;
const ARCANA_ID = 7104901;

async function readJson(root, rel) {
  return JSON.parse(await fs.readFile(path.join(root, rel), 'utf8'));
}
async function writeJson(root, rel, value) {
  const file = path.join(root, rel);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}
async function copyFixture(root, includeApp = false) {
  await fs.mkdir(root, { recursive: true });
  await fs.cp(path.join(REPO, 'scripts'), path.join(root, 'scripts'), { recursive: true });
  await fs.cp(path.join(REPO, 'data'), path.join(root, 'data'), { recursive: true });
  if (includeApp) await fs.copyFile(path.join(REPO, 'app.js'), path.join(root, 'app.js'));
}
async function stripTargetIds(root) {
  const saviorIndex = await readJson(root, 'data/saviors/index.json');
  delete saviorIndex[String(SAVIOR_ID)];
  await writeJson(root, 'data/saviors/index.json', saviorIndex);

  const saviorSkills = await readJson(root, 'data/savior-skills/saviors.json');
  saviorSkills.saviors = (saviorSkills.saviors || []).filter((item) => Number(item.id) !== SAVIOR_ID);
  await writeJson(root, 'data/savior-skills/saviors.json', saviorSkills);

  const bloomIndex = await readJson(root, 'data/savior-bloom/index.json');
  delete bloomIndex[String(SAVIOR_ID)];
  await writeJson(root, 'data/savior-bloom/index.json', bloomIndex);

  const arcana = await readJson(root, 'data/arcanas/arcanas.json');
  arcana.arcanas = (arcana.arcanas || []).filter((item) => Number(item.id) !== ARCANA_ID);
  await writeJson(root, 'data/arcanas/arcanas.json', arcana);

  await fs.rm(path.join(root, 'data', 'savior-detail-assets', `${SAVIOR_ID}-portrait.webp`), { force: true });
  await fs.rm(path.join(root, 'data', 'savior-detail-assets', `${SAVIOR_ID}-illustration.webp`), { force: true });
  await fs.rm(path.join(root, 'data', 'arcana-assets', 'cards', `${ARCANA_ID}.webp`), { force: true });
}
function assert(condition, message) {
  if (!condition) throw new Error(message);
}
function allRewards(arcana) {
  return (arcana.events || []).flatMap((event) => (event.choices || []).flatMap((choice) => [
    ...(choice.successRewards || []).flat(),
    ...(choice.failureRewards || []).flat()
  ]));
}

const temp = await fs.mkdtemp(path.join(os.tmpdir(), 'starsavior-sync-test-'));
const scan = path.join(temp, 'scan');
const live = path.join(temp, 'live');
await copyFixture(scan, false);
await copyFixture(live, true);
await stripTargetIds(scan);
await stripTargetIds(live);

console.log('Building structured scan fixture...');
execFileSync('node', ['scripts/build-structured-sync-snapshot.mjs'], { cwd: scan, stdio: 'inherit' });

const scanIndex = await readJson(scan, 'data/saviors/index.json');
const scanSkills = await readJson(scan, 'data/savior-skills/saviors.json');
const scanArcana = await readJson(scan, 'data/arcanas/arcanas.json');
const savior = (scanSkills.saviors || []).find((item) => Number(item.id) === SAVIOR_ID);
const arcana = (scanArcana.arcanas || []).find((item) => Number(item.id) === ARCANA_ID);
assert(scanIndex[String(SAVIOR_ID)], 'Structured builder did not restore Amora index entry.');
assert(scanIndex[String(SAVIOR_ID)].profile?.attackType === '참격', 'Attack type mapping is wrong.');
assert(savior, 'Structured builder did not restore Amora skill archive.');
assert((savior.resonancePotentials || []).length === 3, 'Resonance potential count is not 3.');
assert((savior.skills || []).length >= 4, 'Expected four base skills.');
assert((savior.skills || []).every((skill) => (skill.levels || []).length > 0), 'A skill lost its level data.');
assert((savior.skills || []).some((skill) => (skill.levels || []).length >= 10), 'Lv.1-10 skill data was not retained.');
assert((savior.skills || []).some((skill) => (skill.buffs || []).length > 0), 'Skill buff/status-effect linkage is empty.');
assert(arcana, 'Structured builder did not restore the Arcana.');
assert((arcana.events || []).length > 0, 'Arcana events were not retained.');
assert(arcana.specialPotentialId != null, 'Arcana special potential linkage is missing.');
assert((await fs.stat(path.join(scan, scanIndex[String(SAVIOR_ID)].profile.portrait.replace(/^\.\//, ''))).size > 20, 'Portrait was not downloaded.');
assert((await fs.stat(path.join(scan, scanIndex[String(SAVIOR_ID)].profile.illustration.replace(/^\.\//, ''))).size > 20, 'Illustration was not downloaded.');
assert((await fs.stat(path.join(scan, arcana.image.replace(/^\.\//, ''))).size > 20, 'Arcana card image was not downloaded.');

const referencedJourneyBuffId = Number(allRewards(arcana).find((reward) => reward.type === 'RT_JOURNEY_BUFF')?.rewardId || 0);
const referencedPotentialId = Number(allRewards(arcana).find((reward) => reward.type === 'RT_SE_POTEN')?.rewardId || arcana.specialPotentialId || 0);
const liveArcanaBefore = await readJson(live, 'data/arcanas/arcanas.json');
if (referencedJourneyBuffId) liveArcanaBefore.journeyBuffs = (liveArcanaBefore.journeyBuffs || []).filter((item) => Number(item.id) !== referencedJourneyBuffId);
if (referencedPotentialId) liveArcanaBefore.potentials = (liveArcanaBefore.potentials || []).filter((item) => Number(item.id) !== referencedPotentialId);
await writeJson(live, 'data/arcanas/arcanas.json', liveArcanaBefore);

console.log('Running append-only merge in isolated live fixture...');
execFileSync('node', ['scripts/sync-new-espr.mjs', scan], { cwd: live, stdio: 'inherit' });
execFileSync('node', ['--check', 'app.js'], { cwd: live, stdio: 'inherit' });

const mergedIndex = await readJson(live, 'data/saviors/index.json');
const mergedSkills = await readJson(live, 'data/savior-skills/saviors.json');
const mergedArcana = await readJson(live, 'data/arcanas/arcanas.json');
assert(mergedIndex[String(SAVIOR_ID)], 'Merge did not add Savior index entry.');
assert((mergedSkills.saviors || []).some((item) => Number(item.id) === SAVIOR_ID), 'Merge did not add Savior skills.');
assert((mergedArcana.arcanas || []).some((item) => Number(item.id) === ARCANA_ID), 'Merge did not add Arcana.');
if (referencedJourneyBuffId) assert((mergedArcana.journeyBuffs || []).some((item) => Number(item.id) === referencedJourneyBuffId), 'Merge did not append required Journey buff.');
if (referencedPotentialId) assert((mergedArcana.potentials || []).some((item) => Number(item.id) === referencedPotentialId), 'Merge did not append required potential.');

console.log(JSON.stringify({
  ok: true,
  savior: { id: SAVIOR_ID, skills: savior.skills.map((skill) => ({ id: skill.id, levels: skill.levels.length, buffs: skill.buffs.length })), resonance: savior.resonancePotentials.length },
  arcana: { id: ARCANA_ID, events: arcana.events.length, specialPotentialId: arcana.specialPotentialId, referencedJourneyBuffId, referencedPotentialId }
}, null, 2));
