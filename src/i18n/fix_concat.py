"""
Phase 3: Fix remaining concatenation patterns in tool/[slug].astro
"""
import re
from pathlib import Path

def fix_tool_page(filepath):
    p = Path(filepath)
    if not p.exists():
        return
    content = p.read_text(encoding="utf-8")
    original = content

    # 1. TOC label: "什么是 " + tName + "？" / "What is " + tNameEn + "?"
    content = content.replace(
        'label: pageLang === "zh" ? "什么是 " + tName + "？" : "What is " + tNameEn + "?"',
        'label: t("tocOverview", { name: tName })'
    )

    # 2. Inline heading: "什么是 " : "What is "}{tName}?
    content = content.replace(
        'pageLang === "zh" ? "什么是 " : "What is "}{tName}?',
        't("overviewHeading", { name: tName })}'
    )

    # 3. Verdict pick line
    content = re.sub(
        r'pageLang\s*===\s*"zh"\s*\?\s*"选择 "\s*:\s*"Pick "\s*\}\{tName\}\{pageLang\s*===\s*"zh"\s*\?\s*"，如果："\s*:\s*" if:"',
        't("verdictPick", { name: tName })}',
        content
    )

    # 4. Verdict skip line
    content = re.sub(
        r'pageLang\s*===\s*"zh"\s*\?\s*"不选 "\s*:\s*"Skip "\s*\}\{tName\}\{pageLang\s*===\s*"zh"\s*\?\s*"，如果："\s*:\s*" if:"',
        't("verdictSkip", { name: tName })}',
        content
    )

    # 5. Pricing visit link
    content = content.replace(
        'pageLang === "zh" ? `访问 ${tName} 官方定价页面 →` : `Visit the official ${tNameEn} pricing page →`',
        't("pricingVisit", { name: tName })'
    )

    # 6. Alternatives see all link
    content = content.replace(
        'pageLang === "zh" ? `查看 ${tName} 的全部替代品 →` : `See all ${tNameEn} alternatives →`',
        't("alternativesSeeAll", { name: tName })'
    )

    # 7. Alternatives heading: tName + " 的替代品" / "Alternatives to " + tNameEn
    old_alt_heading = 'pageLang === "zh" ? tName + " 的替代品" : "Alternatives to " + tNameEn'
    if old_alt_heading in content:
        content = content.replace(old_alt_heading, 't("alternativesHeading", { name: tName })')

    # 8. AI catalogued note block
    old_catalogued = '''        <p>{pageLang === "zh"
          ? "本页面是基于公开信息的 AI 编目摘要。我们的编辑团队尚未完成实际评测；基准测试、定价和结论更新将在真实测试后发布。"
          : "This page is an AI-catalogued summary based on public information. Our editorial team has not yet completed a hands-on review; benchmark, pricing and verdict updates will be published after real testing."}</p>'''
    if old_catalogued in content:
        content = content.replace(old_catalogued, '<p>{t("cataloguedNote")}</p>')

    if content != original:
        p.write_text(content, encoding="utf-8")
        print(f"  FIXED: {filepath}")
    else:
        print(f"  OK: {filepath}")

base = Path(r"C:\Users\qiura\Projects\active\AIToolHub\src\pages")
fix_tool_page(base / "tool/[slug].astro")
fix_tool_page(base / "zh/tool/[slug].astro")
