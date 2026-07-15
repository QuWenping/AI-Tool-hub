// ----- i18n on any page that has data-i18n-en / data-i18n-zh -----
let currentLang = localStorage.getItem("lang") || "zh";
let currentTheme = localStorage.getItem("theme") || "dark";

function loadHomeData() {
  const tEl = document.getElementById("tools-data");
  const cEl = document.getElementById("categories-data");
  if (!tEl) return false;
  try { window.__tools = JSON.parse(tEl.textContent || "{}"); } catch (e) { window.__tools = {}; }
  try { window.__categories = JSON.parse(cEl.textContent || "[]"); } catch (e) { window.__categories = []; }
  return true;
}

function applyI18n() {
  document.querySelectorAll("[data-i18n-en]").forEach(el => {
    const v = currentLang === "zh" ? el.getAttribute("data-i18n-zh") : el.getAttribute("data-i18n-en");
    if (v != null) el.textContent = v;
  });
  document.querySelectorAll("[data-i18n-placeholder-en]").forEach(el => {
    const v = currentLang === "zh" ? el.getAttribute("data-i18n-placeholder-zh") : el.getAttribute("data-i18n-placeholder-en");
    if (v != null) el.placeholder = v;
  });
  document.querySelectorAll("[data-i18n-en-rich]").forEach(el => {
    let arr = [];
    try { arr = JSON.parse(currentLang === "zh" ? el.getAttribute("data-i18n-zh-rich") : el.getAttribute("data-i18n-en-rich")) || []; } catch (e) { arr = []; }
    // Preserve <i> icon children (first child) for styled lists
    const hasIconChildren = el.classList.contains("feature-list") || el.classList.contains("use-case-list") || el.classList.contains("scenes-list");
    if (hasIconChildren) {
      el.innerHTML = arr.map(item => `<li><i class="fas ${el.classList.contains("use-case-list") ? "fa-check-circle" : "fa-check"}"></i> ${item}</li>`).join("");
    } else if (el.classList.contains("audience-tags")) {
      el.innerHTML = arr.map(item => `<span class="audience-tag">${item}</span>`).join("");
    } else {
      el.innerHTML = arr.map(item => `<li>${item}</li>`).join("");
    }
  });
}

function applyTheme(theme) {
  const icon = document.getElementById("theme-icon");
  if (theme === "light") {
    document.body.classList.add("light-theme");
    if (icon) icon.className = "fas fa-sun";
  } else {
    document.body.classList.remove("light-theme");
    if (icon) icon.className = "fas fa-moon";
  }
}

// ----- Homepage-only: tool card rendering -----
function cardHTML(t) {
  const labels = currentLang === "zh"
    ? { text: "写作", image: "图像", code: "编程", video: "视频", audio: "音频", productivity: "商业" }
    : { text: "Writing", image: "Image", code: "Code", video: "Video", audio: "Audio", productivity: "Business" };
  const catLabel = labels[t.cat] || t.cat;
  const featured = t.featured ? `<span class="featured-badge">${currentLang === "zh" ? "推荐" : "Featured"}</span>` : "";
  return `
    ${featured}
    <div class="tool-icon"><i class="fas ${t.icon || "fa-robot"}"></i></div>
    <h3>${t.name[currentLang]}</h3>
    <p>${t.short_desc[currentLang]}</p>
    <div class="tool-tag">${catLabel}</div>
  `;
}

function renderTools() {
  const grid = document.getElementById("tool-grid");
  if (!grid) return;
  const search = document.getElementById("search-input");
  const q = (search ? search.value : "").trim().toLowerCase();
  const activeCat = document.querySelector(".cat-btn.active");
  const cat = activeCat ? activeCat.dataset.category : "all";
  const entries = Object.entries(window.__tools || {}).filter(([id, t]) => {
    if (t.hidden) return false;
    const matchCat = cat === "all" || t.cat === cat;
    const name = (t.name[currentLang] || "").toLowerCase();
    const desc = (t.short_desc[currentLang] || "").toLowerCase();
    const matchSearch = !q || name.includes(q) || desc.includes(q);
    return matchCat && matchSearch;
  });
  entries.sort((a, b) => (b[1].featured ? 1 : 0) - (a[1].featured ? 1 : 0));
  const SHOW = 10;
  const isSearch = q.length > 0;
  const show = isSearch ? entries : entries.slice(0, SHOW);
  const rest = entries.length - show.length;
  grid.innerHTML = show.map(([id, t]) => <a class="tool-card" href="/tool//"></a>).join("");
  if (entries.length === 0) {
    grid.innerHTML = <p style="grid-column:1/-1;text-align:center;color:var(--text-mute);padding:40px 0;"></p>;
  } else if (rest > 0 && !isSearch) {
    const link = cat !== "all" ? /best// : "/best/students/";
    grid.insertAdjacentHTML("afterend", <div style="text-align:center;padding:32px 0;"><a href="" style="display:inline-block;background:var(--accent-color);color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;"> &rarr;</a></div>);
  }
}
function renderRec() {
  const grid = document.getElementById("rec-grid");
  if (!grid) return;
  const ids = ["cursor", "claude", "chatgpt", "midjourney", "gemini", "github-copilot", "perplexity", "runway", "elevenlabs", "suno"];
  grid.innerHTML = ids.map(id => {
    const t = window.__tools?.[id];
    if (!t) return "";
    return `<a class="tool-card rec-card" href="/tool/${id}/">${cardHTML(t)}</a>`;
  }).join("");
}

function bindHomeEvents() {
  const search = document.getElementById("search-input");
  if (search) search.addEventListener("input", renderTools);
  document.querySelectorAll(".cat-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderTools();
      const grid = document.getElementById("tool-grid");
      if (grid) grid.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
  document.querySelectorAll(".cat-hero-card").forEach(card => {
    card.addEventListener("click", () => {
      const cat = card.dataset.category;
      if (!cat) return;
      document.querySelectorAll(".cat-btn").forEach(b => b.classList.toggle("active", b.dataset.category === cat));
      renderTools();
      const grid = document.getElementById("tool-grid");
      if (grid) grid.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
  const browse = document.getElementById("cta-browse");
  if (browse) {
    browse.addEventListener("click", e => {
      e.preventDefault();
      const grid = document.getElementById("tool-grid");
      if (grid) grid.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}

function bindGlobalEvents() {
  const langSelect = document.getElementById("lang-select");
  if (langSelect) {
    langSelect.value = currentLang;
    langSelect.addEventListener("change", e => {
      currentLang = e.target.value;
      localStorage.setItem("lang", currentLang);
      applyI18n();
      if (document.getElementById("tool-grid")) {
        renderTools();
        renderRec();
      }
    });
  }
  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      currentTheme = currentTheme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", currentTheme);
      applyTheme(currentTheme);
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  loadHomeData();
  applyTheme(currentTheme);
  applyI18n();
  bindGlobalEvents();
  if (document.getElementById("tool-grid")) {
    bindHomeEvents();
    renderTools();
    renderRec();
  }
});
