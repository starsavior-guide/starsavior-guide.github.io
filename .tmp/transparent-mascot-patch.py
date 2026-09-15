from pathlib import Path
import re

CACHE = "20260915t1"

index_path = Path("index.html")
index = index_path.read_text(encoding="utf-8")

# Bust cached home/share/favicon and guide-mascot references without changing their roles.
index = re.sub(r"home-button\.png\?v=[^\"'\s)]+", f"home-button.png?v={CACHE}", index)
index = re.sub(r"guide-mascot\.webp\?v=[^\"'\s)]+", f"guide-mascot.webp?v={CACHE}", index)

# The previous home icon fix forced a white square. The new supplied assets already have alpha,
# so allow the page/background to show through and remove the artificial image frames.
override = '''\n  <style id="transparent-mascot-overrides">\n    .brand-home-image,\n    .overview-mascot,\n    .newbie-equipment-notice-mascot {\n      border: 0 !important;\n      border-radius: 0 !important;\n      background: transparent !important;\n      box-shadow: none !important;\n    }\n\n    .brand-mark {\n      background-color: transparent !important;\n      background-image: url("./images/home-button.png?v=20260915t1") !important;\n    }\n  </style>\n'''

if 'id="transparent-mascot-overrides"' not in index:
    if "</head>" not in index:
        raise SystemExit("index.html head marker not found")
    index = index.replace("</head>", override + "\n</head>", 1)

index_path.write_text(index, encoding="utf-8")

app_path = Path("app.js")
app = app_path.read_text(encoding="utf-8")
app = re.sub(r"guide-mascot\.webp\?v=[^\"'`\\s)]+", f"guide-mascot.webp?v={CACHE}", app)
app_path.write_text(app, encoding="utf-8")

# Sanity checks: all intended public references use the fresh assets.
index_check = index_path.read_text(encoding="utf-8")
app_check = app_path.read_text(encoding="utf-8")
assert f"home-button.png?v={CACHE}" in index_check
assert f"guide-mascot.webp?v={CACHE}" in index_check
assert f"guide-mascot.webp?v={CACHE}" in app_check
assert 'id="transparent-mascot-overrides"' in index_check
print("transparent mascot references/styles patched")
