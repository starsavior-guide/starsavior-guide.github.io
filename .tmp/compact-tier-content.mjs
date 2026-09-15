import { readFileSync, writeFileSync } from 'node:fs';

const appPath = 'app.js';
let app = readFileSync(appPath, 'utf8');

const pattern = /    <section class="content-section growth-priority-section" id="growth-priority">[\s\S]*?(?=    <section class="content-section journey-stat-priority-section" id="journey-stat-priority">)/g;
const matches = app.match(pattern) || [];
if (!matches.length) throw new Error('Growth priority section marker not found.');

const replacement = `    <section class="savior-quick-summary" id="growth-priority">
      <div class="savior-tier-compact \${escapeHtml(growthPriority.level)}">
        <span class="savior-tier-label">PVE</span>
        <strong>\${escapeHtml(growthPriority.tier)}</strong>
        \${growthPriority.note
          ? `<span class="savior-tier-note">\${escapeHtml(growthPriority.note)}</span>`
          : ""}
      </div>
      <div class="savior-content-compact">
        <h2>주 사용 콘텐츠</h2>
        <div class="main-content-chips">
          \${mainContents.map((content) => `
            <span class="main-content-chip \${content === "없음" ? "is-empty" : ""}">
              \${escapeHtml(content)}
            </span>
          `).join("")}
        </div>
      </div>
    </section>

`;

app = app.replace(pattern, replacement);
writeFileSync(appPath, app, 'utf8');
console.log(`Replaced ${matches.length} growth-priority section(s).`);

const cssPath = 'styles.css';
let css = readFileSync(cssPath, 'utf8');
const marker = '/* compact tier + main content 2026-09-15 */';
if (!css.includes(marker)) {
  css += `\n\n${marker}\n.savior-quick-summary {\n  display: grid;\n  grid-template-columns: 108px minmax(0, 1fr);\n  gap: 12px;\n  margin-bottom: 16px;\n}\n\n.savior-tier-compact,\n.savior-content-compact {\n  min-width: 0;\n  border: 1px solid var(--line-strong);\n  border-radius: 14px;\n  background: var(--surface);\n}\n\n.savior-tier-compact {\n  --priority-color: var(--muted);\n  position: relative;\n  display: flex;\n  min-height: 92px;\n  flex-direction: column;\n  justify-content: center;\n  padding: 14px 14px 13px;\n  overflow: hidden;\n}\n\n.savior-tier-compact::before {\n  position: absolute;\n  inset: 0;\n  content: \"\";\n  background: linear-gradient(135deg, color-mix(in srgb, var(--priority-color) 14%, transparent), transparent 68%);\n  pointer-events: none;\n}\n\n.savior-tier-label,\n.savior-tier-compact strong,\n.savior-tier-note {\n  position: relative;\n  z-index: 1;\n}\n\n.savior-tier-label {\n  color: var(--muted);\n  font-size: 11px;\n  font-weight: 950;\n  letter-spacing: 0.03em;\n}\n\n.savior-tier-compact strong {\n  margin-top: 3px;\n  color: var(--priority-color);\n  font-size: 27px;\n  font-weight: 950;\n  letter-spacing: -0.045em;\n  line-height: 1.05;\n}\n\n.savior-tier-note {\n  margin-top: 5px;\n  color: var(--muted);\n  font-size: 10px;\n  font-weight: 850;\n  line-height: 1.25;\n}\n\n.savior-tier-compact.tier-0 { --priority-color: #ff6678; }\n.savior-tier-compact.tier-05 { --priority-color: #ffad58; }\n.savior-tier-compact.tier-1 { --priority-color: #ffd76b; }\n.savior-tier-compact.tier-2 { --priority-color: #88c7ff; }\n.savior-tier-compact.tier-3 { --priority-color: #92d69a; }\n.savior-tier-compact.tier-4 { --priority-color: #9ca7b9; }\n.savior-tier-compact.tier-unrated { --priority-color: var(--muted); }\n\n.savior-content-compact {\n  display: flex;\n  min-height: 92px;\n  flex-direction: column;\n  justify-content: center;\n  gap: 10px;\n  padding: 14px 16px;\n}\n\n.savior-content-compact h2 {\n  margin: 0;\n  color: var(--text);\n  font-size: 14px;\n  font-weight: 950;\n  letter-spacing: -0.02em;\n}\n\n.savior-content-compact .main-content-chips {\n  gap: 7px;\n}\n\n.savior-content-compact .main-content-chip {\n  min-height: 31px;\n  padding: 6px 10px;\n  font-size: 12px;\n}\n\n@media (max-width: 620px) {\n  .savior-quick-summary {\n    grid-template-columns: 92px minmax(0, 1fr);\n    gap: 8px;\n    margin-bottom: 12px;\n  }\n\n  .savior-tier-compact,\n  .savior-content-compact {\n    min-height: 88px;\n    border-radius: 12px;\n  }\n\n  .savior-tier-compact {\n    padding: 12px 11px;\n  }\n\n  .savior-tier-compact strong {\n    font-size: 24px;\n  }\n\n  .savior-content-compact {\n    gap: 8px;\n    padding: 12px 11px;\n  }\n\n  .savior-content-compact h2 {\n    font-size: 13px;\n  }\n\n  .savior-content-compact .main-content-chips {\n    gap: 6px;\n  }\n\n  .savior-content-compact .main-content-chip {\n    min-height: 29px;\n    padding: 5px 8px;\n    font-size: 11px;\n  }\n}\n`;
  writeFileSync(cssPath, css, 'utf8');
}
