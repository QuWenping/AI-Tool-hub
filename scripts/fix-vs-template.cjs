const fs = require('fs');
const filePath = 'src/pages/vs/[slug].astro';
let content = fs.readFileSync(filePath, 'utf-8');

// Add more variables for the comparison
const oldVars = 'const aFirstPro = aPros[0] || "versatile";';
const newVars = 'const aFirstPro = aPros[0] || "versatile";\nconst bFirstCon = bCons[0] || "limited";\nconst aPricing = (a && a.pricing && a.pricing.en) || "Various";\nconst bPricing = (b && b.pricing && b.pricing.en) || "Various";\nconst aScenes = (a && a.scenes && a.scenes.en) || [];\nconst bScenes = (b && b.scenes && b.scenes.en) || [];\nconst aUrl = (a && a.url) || "";\nconst bUrl = (b && b.url) || "";\nconst hasApi_a = aUrl.includes("api") || aUrl.includes("platform") || aUrl.includes("developer");\nconst hasApi_b = bUrl.includes("api") || bUrl.includes("platform") || bUrl.includes("developer");\nconst aFirstCon = aCons[0] || "some limitations";\nconst isOpenSource_a = aPricing.toLowerCase().includes("open source") || aPricing.toLowerCase().includes("free");\nconst isOpenSource_b = bPricing.toLowerCase().includes("open source") || bPricing.toLowerCase().includes("free");';
content = content.replace(oldVars, newVars);

// Replace the comparison table with an enhanced version
const oldTable = `<table class="ranking">
        <thead><tr><th></th><th>{aName}</th><th>{bName}</th></tr></thead>
        <tbody>
          <tr><th>Best for</th><td>{aUse}</td><td>{bUse}</td></tr>
          <tr><th>Category</th><td>{categoryLabels[aCat] || aCat}</td><td>{categoryLabels[bCat] || bCat}</td></tr>
          <tr><th>Free tier</th><td>Yes</td><td>Yes</td></tr>
          <tr><th>Ease of use</th><td>{aFirstPro}</td><td>{bFirstPro}</td></tr>
        </tbody>
      </table>`;

const newTable = `<table class="sortable-table ranking">
        <thead><tr><th>Feature</th><th>{aName}</th><th>{bName}</th></tr></thead>
        <tbody>
          <tr><th>Best for</th><td>{aUse}</td><td>{bUse}</td></tr>
          <tr><th>Category</th><td>{categoryLabels[aCat] || aCat}</td><td>{categoryLabels[bCat] || bCat}</td></tr>
          <tr><th>Pricing</th><td>{aPricing}</td><td>{bPricing}</td></tr>
          <tr><th>Free tier</th><td>{isOpenSource_a ? "Yes" : "Limited"}</td><td>{isOpenSource_b ? "Yes" : "Limited"}</td></tr>
          <tr><th>Open source</th><td>{isOpenSource_a ? "Yes" : "No"}</td><td>{isOpenSource_b ? "Yes" : "No"}</td></tr>
          <tr><th>API available</th><td>{hasApi_a ? "Yes" : "Check website"}</td><td>{hasApi_b ? "Yes" : "Check website"}</td></tr>
          <tr><th>Key strength</th><td>{aFirstPro}</td><td>{bFirstPro}</td></tr>
          <tr><th>Main drawback</th><td>{aFirstCon}</td><td>{bFirstCon}</td></tr>
          <tr><th>Use cases</th><td>{aScenes.join(", ") || "General"}</td><td>{bScenes.join(", ") || "General"}</td></tr>
          <tr><th>Website</th><td><a href={aUrl} target="_blank" rel="nofollow">{aName}</a></td><td><a href={bUrl} target="_blank" rel="nofollow">{bName}</a></td></tr>
        </tbody>
      </table>`;

content = content.replace(oldTable, newTable);

// Add "Final Recommendation" section before the FAQ section
const faqSection = '<section class="detail-section" style="text-align: center;">';
const recommendationSection = `<section class="detail-section">
        <h2><i class="fas fa-trophy"></i> Final Recommendation</h2>
        <div style="background:var(--card-bg);border:1px solid var(--border-color);border-radius:12px;padding:24px;margin:16px 0;">
          <p style="font-size:16px;color:var(--text-soft);line-height:1.7;">
            <strong>Choose {aName} if</strong> you need {aFirstPro.toLowerCase()} and {aUse.toLowerCase()} is your primary use case.
            {aName} excels at {(aScenes[0] || "its core features")} and offers {aPricing.toLowerCase()} pricing.
          </p>
          <p style="font-size:16px;color:var(--text-soft);line-height:1.7;margin-top:12px;">
            <strong>Choose {bName} if</strong> you need {bFirstPro.toLowerCase()} and {bUse.toLowerCase()} is your primary use case.
            {bName} excels at {(bScenes[0] || "its core features")} and offers {bPricing.toLowerCase()} pricing.
          </p>
          <p style="font-size:14px;color:var(--text-mute);margin-top:16px;">
            <strong>Use both if</strong> your budget allows — many power users subscribe to both for different tasks. {aName} for {aUse.toLowerCase()}, {bName} for {bUse.toLowerCase()}.
          </p>
        </div>
      </section>

      <section class="detail-section" style="text-align: center;">`;

content = content.replace(faqSection, recommendationSection);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('VS template enhanced with: pricing, API, open source, use cases, final recommendation');
