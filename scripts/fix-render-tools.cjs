const fs = require("fs");
let js = fs.readFileSync("public/js/main.js", "utf-8");

// Find the broken renderTools function (from const SHOW to function renderRec)
const startMarker = "const SHOW = 10;";
const endMarker = "function renderRec()";
const startIdx = js.indexOf(startMarker);
const endIdx = js.indexOf(endMarker);

if (startIdx < 0 || endIdx < 0) {
  console.log("Markers not found");
  process.exit(1);
}

const newFunc = `const SHOW = 10;
  const isSearch = q.length > 0;
  const show = isSearch ? entries : entries.slice(0, SHOW);
  const rest = entries.length - show.length;
  grid.innerHTML = show.map(([id, t]) => \`<a class="tool-card" href="/tool/\${id}/">\${cardHTML(t)}</a>\`).join("");
  if (entries.length === 0) {
    grid.innerHTML = \`<p style="grid-column:1/-1;text-align:center;color:var(--text-mute);padding:40px 0;">\${currentLang === "zh" ? "暂时没有找到相关的 AI 工具..." : "No AI tools found..."}</p>\`;
  } else if (rest > 0 && !isSearch) {
    const link = cat !== "all" ? \`/best/\${cat}/\` : "/best/students/";
    const btnText = currentLang === "zh" ? "浏览全部 " + entries.length + " 个工具" : "Browse all " + entries.length + " tools";
    grid.insertAdjacentHTML("afterend", '<div style="text-align:center;padding:32px 0;"><a href="' + link + '" style="display:inline-block;background:var(--accent-color);color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;">' + btnText + ' &rarr;</a></div>');
  }
}
`;

js = js.substring(0, startIdx) + newFunc + "\n" + js.substring(endIdx);
fs.writeFileSync("public/js/main.js", js, "utf-8");
console.log("Fixed renderTools with proper template literals");
