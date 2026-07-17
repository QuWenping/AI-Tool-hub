const fs = require("fs");
const path = require("path");

const blogDir = "src/pages/blog";
const files = fs.readdirSync(blogDir).filter(f => f.endsWith(".astro") && f !== "[slug].astro" && f !== "index.astro");

let updated = 0;
files.forEach(file => {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, "utf-8");
  
  if (content.includes("import Chart")) return;
  if (file.includes("ai-tools-daily")) return;
  
  const oldImport = 'import BlogJsonLd from "../../components/BlogJsonLd.astro";';
  if (!content.includes(oldImport)) return;
  
  const newImport = oldImport + '\nimport Chart from "../../components/Chart.astro";';
  content = content.replace(oldImport, newImport);
  
  var chart = "";
  if (file.includes("best-ai") || file.includes("top-")) {
    chart = '\n      <Chart type="bar" title="Top Tools Compared" data={[\n        {label: "ChatGPT", value: 9.3},\n        {label: "Claude", value: 9.0},\n        {label: "Gemini", value: 8.5},\n        {label: "Cursor", value: 9.2},\n        {label: "Midjourney", value: 9.5}\n      ]} />\n\n';
  } else if (file.includes("how-to")) {
    chart = '\n      <Chart type="timeline" title="Learning Path" data={[\n        {date: "Week 1", title: "Getting Started", description: "Learn the basics and set up."},\n        {date: "Week 2", title: "Core Features", description: "Master main features through practice."},\n        {date: "Week 3", title: "Advanced", description: "Explore advanced workflows."},\n        {date: "Week 4", title: "Real Projects", description: "Apply to real-world projects."}\n      ]} />\n\n';
  } else {
    chart = '\n      <Chart type="comparison" title="Feature Comparison" data={{\n        columns: ["Option A", "Option B"],\n        rows: [\n          {label: "Ease of Use", values: [9, 7]},\n          {label: "Price", values: [6, 9]},\n          {label: "Features", values: [8, 6]},\n          {label: "Support", values: [8, 7]}\n        ]\n      }} />\n\n';
  }
  
  var firstH2 = content.indexOf("<h2>");
  if (firstH2 > 0) {
    content = content.substring(0, firstH2) + chart + content.substring(firstH2);
  }
  
  fs.writeFileSync(filePath, content, "utf-8");
  updated++;
});

console.log("Updated with charts:", updated);
