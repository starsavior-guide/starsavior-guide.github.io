from pathlib import Path
import re

INDEX = Path('index.html')
APP = Path('app.js')
STYLES = Path('styles.css')
IMG_SRC = './images/guide-mascot.webp?v=20260915'

index = INDEX.read_text(encoding='utf-8')
old_icon = '<span class="newbie-equipment-notice-icon" aria-hidden="true">i</span>'
new_icon = f'<img class="overview-mascot newbie-equipment-notice-mascot" src="{IMG_SRC}" alt="" aria-hidden="true">'
if old_icon in index:
    index = index.replace(old_icon, new_icon, 1)
elif 'newbie-equipment-notice-mascot' not in index:
    raise SystemExit('Beginner guide icon marker not found')
INDEX.write_text(index, encoding='utf-8')

app = APP.read_text(encoding='utf-8')
image_line = f'<img class="overview-mascot" src="{IMG_SRC}" alt="" aria-hidden="true">'

if 'overview-mascot-layout' not in app:
    equipment_pattern = re.compile(
        r'<div class="equipment-panel-inner">(?P<gap>\s*)'
        r'(?P<title><h2 class="equipment-section-title">장비 개요</h2>)'
    )
    app, equipment_count = equipment_pattern.subn(
        lambda m: '<div class="equipment-panel-inner overview-mascot-layout">'
        + m.group('gap') + image_line + m.group('gap') + m.group('title'),
        app,
    )

    arcana_pattern = re.compile(
        r'<div class="equipment-panel-inner">(?P<gap>\s*)'
        r'(?P<title><h2 class="equipment-section-title">[^<]*overviewTitle[^<]*</h2>)'
    )
    app, arcana_count = arcana_pattern.subn(
        lambda m: '<div class="equipment-panel-inner overview-mascot-layout">'
        + m.group('gap') + image_line + m.group('gap') + m.group('title'),
        app,
    )

    if equipment_count < 1:
        raise SystemExit('Equipment overview marker not found')
    if arcana_count < 1:
        raise SystemExit('Arcana overview marker not found')
else:
    print('overview blocks already patched')

APP.write_text(app, encoding='utf-8')

styles = STYLES.read_text(encoding='utf-8')
marker = '/* overview mascot cards 2026-09-15 */'
if marker not in styles:
    styles += f'''

{marker}
.overview-mascot {{
  display: block;
  width: 112px;
  height: 112px;
  object-fit: contain;
  border-radius: 18px;
}}

.newbie-equipment-notice-mascot {{
  flex: 0 0 112px;
  width: 112px;
  height: 112px;
  align-self: center;
}}

.overview-mascot-layout {{
  display: grid;
  grid-template-columns: 112px minmax(0, 1fr);
  grid-template-areas:
    "mascot title"
    "mascot list";
  column-gap: 24px;
  row-gap: 14px;
  align-items: start;
}}

.overview-mascot-layout > .overview-mascot {{
  grid-area: mascot;
  align-self: center;
}}

.overview-mascot-layout > .equipment-section-title {{
  grid-area: title;
  margin: 0;
  align-self: end;
}}

.overview-mascot-layout > .equipment-overview-list {{
  grid-area: list;
  margin-top: 0;
  margin-bottom: 0;
}}

@media (max-width: 620px) {{
  .overview-mascot {{
    width: 78px;
    height: 78px;
    border-radius: 14px;
  }}

  .newbie-equipment-notice-mascot {{
    flex-basis: 78px;
    width: 78px;
    height: 78px;
  }}

  .overview-mascot-layout {{
    grid-template-columns: 78px minmax(0, 1fr);
    column-gap: 14px;
    row-gap: 10px;
  }}

  .overview-mascot-layout > .equipment-section-title {{
    font-size: 20px;
  }}
}}

@media (max-width: 390px) {{
  .overview-mascot {{
    width: 68px;
    height: 68px;
  }}

  .newbie-equipment-notice-mascot {{
    flex-basis: 68px;
    width: 68px;
    height: 68px;
  }}

  .overview-mascot-layout {{
    grid-template-columns: 68px minmax(0, 1fr);
    column-gap: 12px;
  }}
}}
'''
STYLES.write_text(styles, encoding='utf-8')

print('overview mascot patch applied')
