"""
Phase 2 cleanup: Simplify redundant pageLang === "zh" ? t("x") : t("x") patterns,
fix concatenation patterns, and handle remaining manual cases.
"""
import re
from pathlib import Path

BASE = Path(r"C:\Users\qiura\Projects\active\AIToolHub\src\pages")

def fix_file(relpath):
    p = BASE / relpath
    if not p.exists():
        return
    content = p.read_text(encoding="utf-8")
    original = content

    # 1. Simplify: pageLang === "zh" ? t("X") : t("X") → t("X")
    content = re.sub(
        r'pageLang\s*===\s*"zh"\s*\?\s*t\("([^"]+)"\)\s*:\s*t\("([^"]+)"\)',
        lambda m: f't("{m.group(1)}")' if m.group(1) == m.group(2) else m.group(0),
        content
    )

    # 2. Simplify: lang === "zh" ? t("X") : t("X") → t("X")
    content = re.sub(
        r'lang\s*===\s*"zh"\s*\?\s*t\("([^"]+)"\)\s*:\s*t\("([^"]+)"\)',
        lambda m: f't("{m.group(1)}")' if m.group(1) == m.group(2) else m.group(0),
        content
    )

    # 3. Simplify template: {pageLang === "zh" ? t("X") : t("X")} → {t("X")}
    content = re.sub(
        r'\{pageLang\s*===\s*"zh"\s*\?\s*t\("([^"]+)"\)\s*:\s*t\("([^"]+)"\)\}',
        lambda m: f'{{t("{m.group(1)}")}}' if m.group(1) == m.group(2) else m.group(0),
        content
    )
    content = re.sub(
        r'\{lang\s*===\s*"zh"\s*\?\s*t\("([^"]+)"\)\s*:\s*t\("([^"]+)"\)\}',
        lambda m: f'{{t("{m.group(1)}")}}' if m.group(1) == m.group(2) else m.group(0),
        content
    )

    if content != original:
        p.write_text(content, encoding="utf-8")
        print(f"  CLEANED: {relpath}")
    else:
        print(f"  OK: {relpath}")

files = [
    "tool/[slug].astro",
    "zh/tool/[slug].astro",
    "best/[slug].astro",
    "zh/best/[slug].astro",
    "vs/[slug].astro",
    "zh/vs/[slug].astro",
    "solutions/[slug].astro",
    "zh/solutions/[slug].astro",
    "category/[slug].astro",
    "blog/[slug].astro",
    "zh/blog/[slug].astro",
]

for f in files:
    fix_file(f)
