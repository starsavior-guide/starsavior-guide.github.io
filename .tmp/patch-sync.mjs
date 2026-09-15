import fs from 'node:fs';

const file = 'scripts/sync-new-espr.mjs';
let text = fs.readFileSync(file, 'utf8');

function replaceOnce(from, to, label) {
  if (!text.includes(from)) throw new Error(`Patch marker missing: ${label}`);
  text = text.replace(from, to);
}

replaceOnce(
  "  potentialsAdded: [],\n  filesCopied: []",
  "  potentialsAdded: [],\n  journeyBuffsAdded: [],\n  filesCopied: []",
  'report journey buffs'
);

replaceOnce(
`    const scannedSavior = scanSkillById.get(id);
    if (scannedSavior && !liveSkillIds.has(id)) {
      mergedSkills.saviors.push(deepClone(scannedSavior));
      copyReferencedData(scannedSavior);
    }
`,
`    const scannedSavior = scanSkillById.get(id);
    if (!scannedSavior) throw new Error(\`Scanned Savior skill archive is missing \${id}.\`);
    if ((scannedSavior.resonancePotentials || []).length !== 3) {
      throw new Error(\`Scanned Savior \${id} does not have exactly 3 resonance potentials.\`);
    }
    if (!(scannedSavior.skills || []).length) throw new Error(\`Scanned Savior \${id} has no skills.\`);
    for (const skill of [...(scannedSavior.skills || []), ...(scannedSavior.blossomSkills || [])]) {
      if (!(skill.levels || []).length) throw new Error(\`Scanned Savior \${id} skill \${skill.id} has no level data.\`);
      if (!skill.icon?.startsWith('./data/')) throw new Error(\`Scanned Savior \${id} skill \${skill.id} is not local-only.\`);
    }
    if (!liveSkillIds.has(id)) {
      mergedSkills.saviors.push(deepClone(scannedSavior));
      copyReferencedData(scannedSavior);
    }
`,
  'Savior completeness validation'
);

replaceOnce(
`  if (!Array.isArray(mergedArcana.arcanas)) mergedArcana.arcanas = [];
  if (!Array.isArray(mergedArcana.potentials)) mergedArcana.potentials = [];
`,
`  if (!Array.isArray(mergedArcana.arcanas)) mergedArcana.arcanas = [];
  if (!Array.isArray(mergedArcana.potentials)) mergedArcana.potentials = [];
  if (!Array.isArray(mergedArcana.journeyBuffs)) mergedArcana.journeyBuffs = [];
`,
  'Arcana journey buff array'
);

replaceOnce(
`  mergedArcana.potentials.sort((a, b) => Number(a.id) - Number(b.id));
  mergedArcana.lastNewSyncAt = now;
`,
`  mergedArcana.potentials.sort((a, b) => Number(a.id) - Number(b.id));

  // Journey buffs referenced by newly added Arcana events are append-only too.
  const liveJourneyBuffIds = new Set(mergedArcana.journeyBuffs.map((item) => Number(item.id)));
  const newJourneyBuffs = (scanArcanaArchive.journeyBuffs || [])
    .filter((item) => Number(item.id) && !liveJourneyBuffIds.has(Number(item.id)))
    .sort((a, b) => Number(a.id) - Number(b.id));
  for (const buff of newJourneyBuffs) {
    mergedArcana.journeyBuffs.push(deepClone(buff));
    copyReferencedData(buff);
    report.journeyBuffsAdded.push({ id: Number(buff.id), name: localizedText(buff.name, 'ko', '') });
  }
  mergedArcana.journeyBuffs.sort((a, b) => Number(a.id) - Number(b.id));
  mergedArcana.lastNewSyncAt = now;
`,
  'append Journey buffs'
);

replaceOnce(
`  potentialCountAdded: report.potentialsAdded.length
`,
`  potentialCountAdded: report.potentialsAdded.length,
  journeyBuffCountAdded: report.journeyBuffsAdded.length
`,
  'report Journey buff count'
);

fs.writeFileSync(file, text, 'utf8');
