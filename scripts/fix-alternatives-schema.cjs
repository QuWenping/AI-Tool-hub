const fs = require('fs');
const filePath = 'src/pages/alternatives/[slug].astro';
let content = fs.readFileSync(filePath, 'utf-8');

// Add siteUrl, pageUrl, and Schema definitions after the faq array
const oldEnd = '];\n---';
const schemaCode = [
  '];',
  'const siteUrl = "https://thebestaitoolsreview.com";',
  'const pageUrl = siteUrl + "/alternatives/" + id + "/";',
  'const faqSchema = { "@context":"https://schema.org","@type":"FAQPage","url":pageUrl,"mainEntity": faq.map(f => ({ "@type":"Question","name":f.q,"acceptedAnswer":{"@type":"Answer","text":f.a} })) };',
  'const articleSchema = { "@context":"https://schema.org","@type":"Article","headline":"Best " + aName + " Alternatives in 2026","description":"Looking for " + aName + " alternatives? Top options ranked by use case, pricing, and hands-on testing.","author":{"@type":"Organization","name":"AI Tool Hub"},"publisher":{"@type":"Organization","name":"AI Tool Hub"},"mainEntityOfPage":pageUrl,"datePublished":"2026-07-14","dateModified":"2026-07-14" };',
  'const breadcrumbSchema = { "@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":siteUrl},{"@type":"ListItem","position":2,"name":aName,"item":siteUrl+"/tool/"+id+"/"},{"@type":"ListItem","position":3,"name":"Alternatives","item":pageUrl}] };',
  '---'
].join('\n');

content = content.replace(oldEnd, schemaCode);

// Add Fragment slot with Schema right after BaseLayout opening tag
const blOpen = content.indexOf('>', content.indexOf('<BaseLayout')) + 1;
const fragment = '\n  <Fragment slot="head">\n    <script type="application/ld+json" set:html={JSON.stringify(faqSchema)}></script>\n    <script type="application/ld+json" set:html={JSON.stringify(articleSchema)}></script>\n    <script type="application/ld+json" set:html={JSON.stringify(breadcrumbSchema)}></script>\n  </Fragment>\n';
content = content.substring(0, blOpen) + fragment + content.substring(blOpen);

// Add vs comparison link in related section (before the best category link)
const relatedSection = '<a class="related-card" href={"/best/" + aCat + "/"}>';
const vsLink = '<a class="related-card" href={"/alternatives/" + id + "/"} style="display:none;">\n          <div class="related-icon"><i class="fas fa-balance-scale"></i></div>\n          <div>\n            <h3>Comparisons</h3>\n            <p>Head-to-head comparisons</p>\n          </div>\n        </a>\n        <a class="related-card" href={"/best/" + aCat + "/"}>';
// Actually just add a link to the tool's vs pages if they exist
// Better approach: link to alternatives page itself is already there, add a link to /best/ category
// The vs links are already handled in the tool page. Let's just add the Schema.

content = content.replace(relatedSection, relatedSection); // no change needed here

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Alternatives template updated with Schema (FAQ + Article + Breadcrumb)');
