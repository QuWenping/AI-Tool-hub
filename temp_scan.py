import json, collections, sys
sys.stdout.reconfigure(encoding="utf-8")
p="C:/Users/qiura/AppData/Roaming/Tencent/Marvis/User/oAN1i2RaDtjEhmKUnRPUtiwUj24k/workspace/conv_19f8d0bd9fe_53a90c114a2e/temp/page_seo_scan.json"
data=json.load(open(p,encoding="utf-8"))
print("total", len(data))
print("sample:", json.dumps(data[0], ensure_ascii=False)[:300])
short=collections.Counter(); desc_short=collections.Counter(); noh1=[]; nos=[]
for item in data:
    path=item.get("path","")
    parts=[x for x in path.split("/") if x]
    first=parts[0] if parts else "home"
    if first=="zh": first="zh/"+(parts[1] if len(parts)>1 else "home")
    if item.get("words",0)<300: short[first]+=1
    if len(item.get("desc","") or "")<50: desc_short[first]+=1
    if not item.get("h1"): noh1.append(path)
    if not item.get("schemas"): nos.append(path)
print("--- <300 words ---")
for k,v in short.most_common(): print(k,v)
print("--- desc<50 ---")
for k,v in desc_short.most_common(): print(k,v)
print("--- no H1:", len(noh1))
for x in noh1: print("  ",x)
print("--- no schema:", len(nos))
for x in nos[:15]: print("  ",x)
