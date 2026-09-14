import fs from 'node:fs';

const INDEX_PATH = 'index.html';
let html = fs.readFileSync(INDEX_PATH, 'utf8');

const oldBrand = '<span class="brand-mark" aria-hidden="true">✦</span>';
const newBrand = '<span class="brand-mark" aria-hidden="true"><img src="./images/home-button.png" alt=""></span>';
if (html.includes(oldBrand)) {
  html = html.replace(oldBrand, newBrand);
} else if (!html.includes('images/home-button.png')) {
  throw new Error('Could not find the existing home brand mark.');
}

html = html.replace(/\n\s*<button class="nav-item" type="button" data-section="cosmo">코스모 게이트<\/button>/, '');
if (/data-section="cosmo"/.test(html)) {
  throw new Error('Cosmo Gate top navigation button still exists.');
}

const styleId = 'ui-fixes-20260915';
const css = `
  <style id="${styleId}">
    /* Custom home button image: user-provided image, no generated artwork. */
    .brand-mark {
      overflow: hidden;
      padding: 0 !important;
      background: #fff !important;
      border-color: color-mix(in srgb, var(--accent) 32%, var(--line)) !important;
      box-shadow: none !important;
    }
    .brand-mark img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      border-radius: inherit;
    }

    /* Make the two Savior detail toggles use one identical box/button design. */
    .savior-source-section {
      padding: 0 !important;
      overflow: hidden !important;
    }
    .savior-source-detail {
      width: 100% !important;
      overflow: hidden;
      border-radius: inherit;
    }
    .savior-detail-toggle,
    .savior-illustration-details > summary {
      display: flex !important;
      width: 100% !important;
      min-height: 58px !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 10px !important;
      padding: 14px 18px !important;
      border: 0 !important;
      border-radius: 0 !important;
      background: linear-gradient(180deg, color-mix(in srgb, var(--surface-3) 90%, white 5%), var(--surface-2)) !important;
      color: var(--text) !important;
      font-size: clamp(17px, 2vw, 21px) !important;
      font-weight: 950 !important;
      line-height: 1.3 !important;
      text-decoration: none !important;
      cursor: pointer;
      user-select: none;
    }
    .savior-detail-toggle:hover,
    .savior-illustration-details > summary:hover {
      border-color: transparent !important;
      color: var(--text) !important;
      background: linear-gradient(180deg, color-mix(in srgb, var(--surface-3) 82%, var(--accent) 8%), var(--surface-2)) !important;
    }
    .savior-detail-chevron,
    .savior-illustration-chevron {
      font-size: 20px !important;
      line-height: 1 !important;
    }

    /* Light theme contrast fixes. Dark theme is intentionally untouched. */
    html[data-theme="light"] {
      --bg: #eef3f9;
      --surface: #ffffff;
      --surface-2: #f5f7fb;
      --surface-3: #edf2f8;
      --text: #152033;
      --muted: #58667b;
      --faint: #778398;
      --line: #d3dbe6;
      --line-strong: #b9c5d4;
      --accent: #4d7fda;
      --accent-soft: rgba(77, 127, 218, 0.12);
      --shadow: 0 20px 55px rgba(50, 72, 105, 0.11);
    }
    html[data-theme="light"] .nav-item.is-active::after {
      background: #4d7fda !important;
    }
    html[data-theme="light"] .filter-chip,
    html[data-theme="light"] .detail-badge,
    html[data-theme="light"] .main-content-chip {
      border-color: #d0d8e4;
      background: #f6f8fb;
      color: #536176;
    }
    html[data-theme="light"] .detail-badge.attribute {
      border-color: color-mix(in srgb, var(--element) 58%, #c4ccd8) !important;
      background: color-mix(in srgb, var(--element) 12%, #ffffff) !important;
      color: color-mix(in srgb, var(--element) 78%, #263244) !important;
    }
    html[data-theme="light"] .detail-hero[data-element="order"] .detail-badge.attribute {
      border-color: #c7a14c !important;
      background: #fff8e6 !important;
      color: #8b6515 !important;
    }

    html[data-theme="light"] .growth-priority-card.tier-0 { --priority-color: #d63b51; }
    html[data-theme="light"] .growth-priority-card.tier-05 { --priority-color: #c56c18; }
    html[data-theme="light"] .growth-priority-card.tier-1 { --priority-color: #a77b0b; }
    html[data-theme="light"] .growth-priority-card.tier-2 { --priority-color: #357ab7; }
    html[data-theme="light"] .growth-priority-card.tier-3 { --priority-color: #438a51; }
    html[data-theme="light"] .growth-priority-card.tier-4 { --priority-color: #68768a; }
    html[data-theme="light"] .growth-priority-card {
      border-color: #cbd4df !important;
      background:
        linear-gradient(115deg, color-mix(in srgb, var(--priority-color) 10%, transparent), transparent 58%),
        #f8fafc !important;
      box-shadow: inset 4px 0 0 var(--priority-color) !important;
    }
    html[data-theme="light"] .growth-priority-label {
      color: #536176 !important;
    }

    /* White line-art icons were disappearing on a light background. */
    html[data-theme="light"] .equipment-set-icon,
    html[data-theme="light"] .journey-stat-priority-item img {
      background: #2f3b50 !important;
      border: 1px solid #aeb9c8 !important;
      border-radius: 9px !important;
      padding: 5px !important;
      box-shadow: inset 0 0 0 1px rgba(255,255,255,.05) !important;
    }
    html[data-theme="light"] .build-set-note,
    html[data-theme="light"] .eyebrow {
      color: #4d7fda !important;
    }

    html[data-theme="light"] .savior-detail-toggle,
    html[data-theme="light"] .savior-illustration-details > summary {
      background: linear-gradient(180deg, #f7f9fc, #eef2f7) !important;
      color: #172033 !important;
    }
    html[data-theme="light"] .savior-detail-toggle:hover,
    html[data-theme="light"] .savior-illustration-details > summary:hover {
      background: linear-gradient(180deg, #f1f5fb, #e9eef6) !important;
    }
  </style>
`;

if (!html.includes(`id="${styleId}"`)) {
  if (!html.includes('</head>')) throw new Error('index.html has no closing head tag.');
  html = html.replace('</head>', `${css}\n</head>`);
}

fs.writeFileSync(INDEX_PATH, html, 'utf8');
console.log('Applied light-theme fixes, unified detail buttons, replaced home button, and removed Cosmo Gate top tab.');
