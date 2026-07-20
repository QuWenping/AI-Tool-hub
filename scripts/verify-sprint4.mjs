import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("console", m => { if (m.type()==="error") errors.push(m.text()); });
page.on("pageerror", e => errors.push("PAGEERROR: "+e.message));
await page.goto("http://localhost:4321/tool/chatgpt/", { waitUntil: "networkidle" });
const res = await page.evaluate(() => {
  const out = {};
  const main = document.querySelector(".article-main");
  const toc = document.querySelector(".article-toc");
  out.hasArticleMain = !!main;
  out.hasArticleToc = !!toc;
  out.tocItems = toc ? toc.querySelectorAll("a").length : 0;
  out.mainWidth = Math.round(main ? main.getBoundingClientRect().width : 0);
  out.tocWidth = Math.round(toc ? toc.getBoundingClientRect().width : 0);
  const h1 = document.querySelector(".tool-detail-header h1");
  out.h1FontSize = h1 ? getComputedStyle(h1).fontSize : null;
  const h2 = document.querySelector(".detail-section h2");
  out.h2FontSize = h2 ? getComputedStyle(h2).fontSize : null;
  const lede = document.querySelector(".tool-detail .lede");
  out.ledeFontSize = lede ? getComputedStyle(lede).fontSize : null;
  out.bodyOverflowX = document.body.scrollWidth > document.body.clientWidth + 2;
  out.lightboxScript = !!document.querySelector('script[src="/js/lightbox.js"]');
  out.galleryDataLightbox = !!document.querySelector(".screenshot-gallery[data-lightbox]");
  const firstTocHref = toc ? toc.querySelector("a").getAttribute("href") : null;
  out.firstTocHref = firstTocHref;
  out.firstTocTargetExists = firstTocHref ? !!document.querySelector(firstTocHref) : false;
  // all toc targets exist
  if (toc) {
    const hrefs = [...toc.querySelectorAll("a")].map(a => a.getAttribute("href"));
    out.allTocTargetsExist = hrefs.every(h => !!document.querySelector(h));
    out.tocHrefs = hrefs;
  }
  return out;
});
console.log(JSON.stringify(res, null, 2));
console.log("CONSOLE_ERRORS:", JSON.stringify(errors));

// Mobile viewport check
await page.setViewportSize({ width: 390, height: 844 });
const mob = await page.evaluate(() => ({
  bodyOverflowX: document.body.scrollWidth > document.body.clientWidth + 2,
  tocHidden: getComputedStyle(document.querySelector(".article-toc")).display === "none",
  h1FontSize: getComputedStyle(document.querySelector(".tool-detail-header h1")).fontSize,
}));
console.log("MOBILE:", JSON.stringify(mob, null, 2));

// Lightbox functional test (desktop): find a screenshot gallery image and click
await page.setViewportSize({ width: 1440, height: 900 });
const lb = await page.evaluate(() => {
  const img = document.querySelector(".screenshot-gallery img");
  if (!img) return { hasGalleryImg: false };
  img.click();
  const overlay = document.querySelector(".lb-overlay");
  return {
    hasGalleryImg: true,
    overlayCreated: !!overlay,
    overlayVisible: overlay ? !overlay.hidden : false,
    overlayImgSrc: overlay && overlay.querySelector(".lb-img") ? overlay.querySelector(".lb-img").src : null
  };
});
console.log("LIGHTBOX:", JSON.stringify(lb, null, 2));
await browser.close();
