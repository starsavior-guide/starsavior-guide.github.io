from pathlib import Path


def replace_once(text, old, new, label):
    if old not in text:
        raise SystemExit(f"marker not found: {label}")
    return text.replace(old, new, 1)

# Savior list: move total count beside the page title and remove the large summary card.
index_path = Path("index.html")
index = index_path.read_text(encoding="utf-8")
index = replace_once(
    index,
    '            <h1 id="list-title">구원자</h1>',
    '''            <div class="database-title-line">\n              <h1 id="list-title">구원자</h1>\n              <span class="database-count-badge" aria-label="등록된 구원자">\n                <strong id="total-count">0</strong><span id="total-count-unit">명</span>\n              </span>\n            </div>''',
    "savior title",
)
index = replace_once(
    index,
    '''          <div class="database-summary">\n            <span>등록된 구원자</span>\n            <strong id="total-count">0</strong>\n          </div>\n''',
    "",
    "savior summary card",
)
index_path.write_text(index, encoding="utf-8")

# App: localize Savior count unit, move Arcana total count beside the title,
# and remove the large Arcana count card.
app_path = Path("app.js")
app = app_path.read_text(encoding="utf-8")
app = replace_once(
    app,
    '''  totalCount.textContent = String(SAVIORS.length);\n  emptyState.hidden = filtered.length > 0;''',
    '''  totalCount.textContent = String(SAVIORS.length);\n  const totalCountUnit = document.querySelector("#total-count-unit");\n  if (totalCountUnit) {\n    totalCountUnit.textContent = currentLanguage === "ko" ? "명" : currentLanguage === "ja" ? "人" : "";\n  }\n  emptyState.hidden = filtered.length > 0;''',
    "savior total unit",
)
app = replace_once(
    app,
    '''function createArcanaDatabaseMarkup() {\n  return `''',
    '''function createArcanaDatabaseMarkup() {\n  const totalUnit = currentLanguage === "ko" ? "장" : currentLanguage === "ja" ? "枚" : "";\n  return `''',
    "arcana function header",
)
app = replace_once(
    app,
    '''          <h1>${escapeHtml(arcanaUi("title"))}</h1>''',
    '''          <div class="database-title-line">\n            <h1>${escapeHtml(arcanaUi("title"))}</h1>\n            <span class="database-count-badge" aria-label="${escapeHtml(arcanaUi("registered"))}">\n              <strong id="arcana-total-count">${getPublishedArcanas().length}</strong>${totalUnit ? `<span>${escapeHtml(totalUnit)}</span>` : ""}\n            </span>\n          </div>''',
    "arcana title",
)
app = replace_once(
    app,
    '''      <div class="arcana-db-count arcana-db-count-wide">\n        <span>${escapeHtml(arcanaUi("registered"))}</span>\n        <strong id="arcana-total-count">${getPublishedArcanas().length}</strong>\n      </div>\n\n''',
    "",
    "arcana summary card",
)
app_path.write_text(app, encoding="utf-8")

# Visual-only refinement: keep the original UI, add breathing room around the compact tier row,
# and style the small total-count badge beside list titles.
css_path = Path("styles.css")
css = css_path.read_text(encoding="utf-8")
marker = "/* title count badges + quick summary spacing 2026-09-15 */"
if marker not in css:
    css += '''\n\n/* title count badges + quick summary spacing 2026-09-15 */\n.database-title-line {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 12px;\n}\n\n.database-count-badge {\n  display: inline-flex;\n  min-height: 34px;\n  align-items: center;\n  gap: 2px;\n  padding: 5px 11px;\n  border: 1px solid var(--line);\n  border-radius: 999px;\n  background: var(--surface-2);\n  color: var(--muted);\n  font-size: 12px;\n  font-weight: 850;\n  line-height: 1;\n}\n\n.database-count-badge strong {\n  color: var(--text);\n  font-size: 15px;\n  font-weight: 950;\n}\n\n.savior-quick-summary {\n  margin-top: 18px;\n  margin-bottom: 20px;\n}\n\n@media (max-width: 620px) {\n  .database-title-line {\n    gap: 9px;\n  }\n\n  .database-count-badge {\n    min-height: 30px;\n    padding: 4px 9px;\n    font-size: 11px;\n  }\n\n  .database-count-badge strong {\n    font-size: 14px;\n  }\n\n  .savior-quick-summary {\n    margin-top: 16px;\n    margin-bottom: 18px;\n  }\n}\n'''
    css_path.write_text(css, encoding="utf-8")

print("Patched Savior/Arcana total counts and Savior quick-summary spacing.")
