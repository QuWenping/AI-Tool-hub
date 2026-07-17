const fs = require("fs");
const path = require("path");
const blogDir = "src/pages/blog";
const files = fs.readdirSync(blogDir).filter(f => f.endsWith(".astro") && f !== "[slug].astro" && f !== "index.astro");
let fixed = 0;
files.forEach(file => {
  const fp = path.join(blogDir, file);
  let content = fs.readFileSync(fp, "utf-8");
  if (content.includes("<TLDR") && !content.includes("import TLDR")) {
    // Add import after first import line
    const lines = content.split("\n");
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith("import ")) {
        lines.splice(i + 1, 0, 'import TLDR from "../../components/ui/TLDR.astro";');
        break;
      }
    }
    fs.writeFileSync(fp, lines.join("\n"), "utf-8");
    fixed++;
    console.log("Fixed:", file);
  }
});
console.log("Total fixed:", fixed);
