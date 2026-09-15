from pathlib import Path


def replace_once(text, old, new, label):
    if old not in text:
        raise SystemExit(f"marker not found: {label}")
    return text.replace(old, new, 1)

# Remove Savior title count badge and return to a clean title-only heading.
index_path = Path("index.html")
index = index_path.read_text(encoding="utf-8")
index = replace_once(
    index,
    '''            <div class="database-title-line">\n              <h1 id="list-title">구원자</h1>\n              <span class="database-count-badge" aria-label="등록된 구원자">\n                <strong id="total-count">0</strong><span id="total-count-unit">명</span>\n              </span>\n            </div>''',
    '            <h1 id="list-title">구원자</h1>',
    "savior title count badge",
)
index_path.write_text(index, encoding="utf-8")

# Remove JS dependencies on the Savior total-count element, and remove Arcana title count badge.
app_path = Path("app.js")
app = app_path.read_text(encoding="utf-8")
app = replace_once(
    app,
    'const totalCount = document.querySelector("#total-count");\n',
    '',
    "totalCount declaration",
)
app = replace_once(
    app,
    '''  totalCount.textContent = String(SAVIORS.length);\n  const totalCountUnit = document.querySelector("#total-count-unit");\n  if (totalCountUnit) {\n    totalCountUnit.textContent = currentLanguage === "ko" ? "명" : currentLanguage === "ja" ? "人" : "";\n  }\n''',
    '',
    "savior total count update",
)
app = replace_once(
    app,
    '''function createArcanaDatabaseMarkup() {\n  const totalUnit = currentLanguage === "ko" ? "장" : currentLanguage === "ja" ? "枚" : "";\n  return `''',
    '''function createArcanaDatabaseMarkup() {\n  return `''',
    "arcana total unit",
)
app = replace_once(
    app,
    '''          <div class="database-title-line">\n            <h1>${escapeHtml(arcanaUi("title"))}</h1>\n            <span class="database-count-badge" aria-label="${escapeHtml(arcanaUi("registered"))}">\n              <strong id="arcana-total-count">${getPublishedArcanas().length}</strong>${totalUnit ? `<span>${escapeHtml(totalUnit)}</span>` : ""}\n            </span>\n          </div>''',
    '''          <h1>${escapeHtml(arcanaUi("title"))}</h1>''',
    "arcana title count badge",
)
app = replace_once(
    app,
    '''  const total = document.querySelector("#arcana-total-count");\n  const visible = document.querySelector("#arcana-visible-count");\n  if (total) total.textContent = String(getPublishedArcanas().length);\n  if (visible) visible.textContent = String(filtered.length);''',
    '''  const visible = document.querySelector("#arcana-visible-count");\n  if (visible) visible.textContent = String(filtered.length);''',
    "arcana total count update",
)
app_path.write_text(app, encoding="utf-8")

# Remove now-unused title badge CSS while preserving the quick-summary spacing.
css_path = Path("styles.css")
css = css_path.read_text(encoding="utf-8")
start_marker = "/* title count badges + quick summary spacing 2026-09-15 */"
start = css.find(start_marker)
if start < 0:
    raise SystemExit("marker not found: title count badge css")
replacement = '''/* quick summary spacing 2026-09-15 */\n.savior-quick-summary {\n  margin-top: 18px;\n  margin-bottom: 20px;\n}\n\n@media (max-width: 620px) {\n  .savior-quick-summary {\n    margin-top: 16px;\n    margin-bottom: 18px;\n  }\n}\n'''
css = css[:start].rstrip() + "\n\n" + replacement
css_path.write_text(css, encoding="utf-8")

print("Removed title count badges; retained filtered result counts and Savior summary spacing.")
