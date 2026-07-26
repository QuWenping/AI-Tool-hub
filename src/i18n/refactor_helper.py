"""
One-shot migration helper: reads an Astro file, replaces all pageLang==="zh" ternaries
with t("key") calls, using pre-built en.json lookup.
"""
import re
import json
import sys
from pathlib import Path

EN = Path(__file__).parent / "en.json"

with open(EN, "r", encoding="utf-8") as f:
    en_data = json.load(f)

# Build reverse map: en_val -> key per namespace
rev = {}
for ns, vals in en_data.items():
    if isinstance(vals, dict):
        for k, v in vals.items():
            if isinstance(v, str) and v:
                rev[v] = (ns, k)

def lookup(zh, en):
    """Try to find key; first by en value, then by zh in en.json."""
    if en in rev:
        ns, key = rev[en]
        return key, ns
    return None, None

TERNARY = re.compile(
    r'(pageLang|lang)\s*===\s*"zh"\s*\?\s*"([^"\\]*(?:\\.[^"\\]*)*)"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"'
)

SKIP_VALS = {"zh", "en", "zh-CN", "en-US", "zh_CN", "en_US"}

def process_file(filepath: str, namespace: str):
    p = Path(filepath)
    if not p.exists():
        print(f"  SKIP not found: {filepath}")
        return

    content = p.read_text(encoding="utf-8")
    original = content

    def replacer(m):
        lang_var = m.group(1)
        zh_val = m.group(2)
        en_val = m.group(3)

        # Skip language codes
        if zh_val in SKIP_VALS or en_val in SKIP_VALS:
            return m.group(0)

        key, ns_found = lookup(zh_val, en_val)
        if key is None:
            print(f"  UNMATCHED: \"{zh_val}\" / \"{en_val}\"")
            return m.group(0)

        return f'{lang_var} === "zh" ? t("{key}") : t("{key}")' if lang_var == "pageLang" else f'lang === "zh" ? t("{key}") : t("{key}")'

    # Also handle template syntax: {pageLang === "zh" ? "x" : "y"}
    TPL = re.compile(
        r'\{(pageLang|lang)\s*===\s*"zh"\s*\?\s*"([^"\\]*(?:\\.[^"\\]*)*)"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"\}'
    )

    def tpl_replacer(m):
        lang_var = m.group(1)
        zh_val = m.group(2)
        en_val = m.group(3)

        if zh_val in SKIP_VALS or en_val in SKIP_VALS:
            return m.group(0)

        key, ns_found = lookup(zh_val, en_val)
        if key is None:
            print(f"  TPL_UNMATCHED: \"{zh_val}\" / \"{en_val}\"")
            return m.group(0)

        return f'{{t("{key}")}}'

    content = TERNARY.sub(replacer, content)
    content = TPL.sub(tpl_replacer, content)

    if content != original:
        # Add import if not already there
        if "getTranslations" not in content:
            # Insert after last import line in frontmatter
            import_line = f'import {{ getTranslations }} from "../../utils/i18n";'
            # Adjust path for zh/ pages
            if "/zh/" in filepath:
                import_line = f'import {{ getTranslations }} from "../../../utils/i18n";'

            # Add t = getTranslations after pageLang line
            if "const t = getTranslations" not in content:
                # Insert after pageLang declaration
                ns_arg = f'"{namespace}"'
                t_line = f'const t = getTranslations({ns_arg}, pageLang);'
                content = content.replace(
                    'const pageLang = Astro.currentLocale || "en";',
                    f'const pageLang = Astro.currentLocale || "en";\n{t_line}\n'
                )
                content = content.replace(
                    'const pageLang = "zh";',
                    f'const pageLang = "zh";\n{t_line}\n'
                )
                # Add import
                content = re.sub(
                    r'(import\s+[^;]+;\s*\n)(?!import)',
                    f'\\1{import_line}\n',
                    content,
                    count=1
                )

        p.write_text(content, encoding="utf-8")
        print(f"  DONE: {filepath}")
    else:
        print(f"  NO_CHANGE: {filepath}")

if __name__ == "__main__":
    base = Path(r"C:\Users\qiura\Projects\active\AIToolHub\src\pages")

    pages = [
        ("best/[slug].astro", "best"),
        ("tool/[slug].astro", "tool"),
        ("vs/[slug].astro", "vs"),
        ("solutions/[slug].astro", "solutions"),
        ("category/[slug].astro", "category"),
        ("blog/[slug].astro", "blog"),
        # zh mirrors
        ("zh/best/[slug].astro", "best"),
        ("zh/tool/[slug].astro", "tool"),
        ("zh/vs/[slug].astro", "vs"),
        ("zh/solutions/[slug].astro", "solutions"),
        ("zh/blog/[slug].astro", "blog"),
    ]

    for rel, ns in pages:
        process_file(str(base / rel), ns)
