const fs = require('fs');
const existing = JSON.parse(fs.readFileSync('src/data/prompts.json','utf-8'));
const existingSlugs = new Set(existing.map(p => p.slug));

// Read new prompts from prompts-new.json
let newPrompts = [];
try { newPrompts = JSON.parse(fs.readFileSync('src/data/prompts-new.json','utf-8')); } catch(e) {}

const filtered = newPrompts.filter(p => !existingSlugs.has(p.slug));
const combined = [...existing, ...filtered];
fs.writeFileSync('src/data/prompts.json', JSON.stringify(combined, null, 2) + '\n', 'utf-8');
console.log('Existing:', existing.length, '| New:', filtered.length, '| Total:', combined.length);