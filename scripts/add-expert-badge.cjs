const fs = require('fs');
const filePath = 'src/pages/best/[slug].astro';
let content = fs.readFileSync(filePath, 'utf-8');

const oldNote = '<p class="update-note"><em data-i18n="last_updated">Last updated</em>: July 2026 &middot; <span data-i18n="we_tested">{`We tested ${total} tools hands-on for 2+ weeks.`}</span></p>';
const newNote = oldNote + '\n      <div style="display:inline-flex;align-items:center;gap:6px;background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.3);border-radius:6px;padding:4px 12px;margin-top:8px;font-size:13px;font-weight:600;color:#22c55e;"><i class="fas fa-check-circle"></i> Expert Tested &middot; Updated July 2026</div>';

content = content.replace(oldNote, newNote);
fs.writeFileSync(filePath, content, 'utf-8');
console.log('Expert Tested badge added to best pages');
