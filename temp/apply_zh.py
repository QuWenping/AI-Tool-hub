#!/usr/bin/env python3
"""Apply Chinese translations from translation JSON to tools.json"""

import json

# Load translations
with open(r"C:\Users\qiura\Projects\active\AIToolHub\temp\tool_zh.json", "r", encoding="utf-8") as f:
    zh_data = json.load(f)

# Load tools.json
path = r"C:\Users\qiura\Projects\active\AIToolHub\src\data\tools.json"
with open(path, "r", encoding="utf-8") as f:
    tools = json.load(f)

updated = 0
for tool_id, zh in zh_data.items():
    if tool_id not in tools:
        print(f"  WARNING: {tool_id} not in tools.json, skipping")
        continue
    tool = tools[tool_id]
    if tool.get('hidden'):
        continue
    
    for field, zh_val in zh.items():
        if zh_val is not None:
            tool[field]['zh'] = zh_val
    
    updated += 1

print(f"Applied zh translations to {updated} tools")

with open(path, "w", encoding="utf-8") as f:
    json.dump(tools, f, ensure_ascii=False, indent=2)

print("tools.json saved!")
