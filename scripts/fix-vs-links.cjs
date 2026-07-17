const fs = require("fs");
const filePath = "src/pages/vs/[slug].astro";
let content = fs.readFileSync(filePath, "utf-8");

const oldSection = '<div style="margin-top:32px;padding:20px;background:var(--card-bg);border:1px solid var(--border-color);border-radius:12px;">';
const newSection = '<section style="margin-top:24px;">\n      <h2>Related Comparisons & Alternatives</h2>\n      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;">\n        <a href={"/alternatives/" + m.a + "/"} style="text-decoration:none;color:inherit;background:var(--card-bg);border:1px solid var(--border-color);border-radius:10px;padding:14px;display:block;"><strong>{aName}</strong> alternatives</a>\n        <a href={"/alternatives/" + m.b + "/"} style="text-decoration:none;color:inherit;background:var(--card-bg);border:1px solid var(--border-color);border-radius:10px;padding:14px;display:block;"><strong>{bName}</strong> alternatives</a>\n      </div>\n    </section>\n\n    <div style="margin-top:32px;padding:20px;background:var(--card-bg);border:1px solid var(--border-color);border-radius:12px;">';

content = content.replace(oldSection, newSection);
fs.writeFileSync(filePath, content, "utf-8");
console.log("VS page: added alternatives cross-links");
