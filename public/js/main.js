// ----- i18n strings -----
const i18n = {
  zh: {
    search_placeholder: "搜索 AI 工具...",
    cat_all: "全部", cat_text: "文本创作", cat_image: "图像生成", cat_code: "编程助手", cat_video: "视频制作", cat_audio: "音频处理", cat_prod: "商业效率",
    ad_sponsored: "赞助", ad_top_text: "广告位招租 | 欢迎顶级 AI 工具品牌合作，请联系洽谈。", ad_learn_more: "联系我们",
    cta_browse: "浏览工具", cta_start_free: "免费开始",
    hero_subtitle: "为写作、编程、图像与商业精选的 AI 工具集",
    value_title: "为什么选择 AI Tool Hub?",
    value_item1: "精挑细选", value_item1_desc: "拒绝垃圾信息，每款工具均经过人工实测。",
    value_item2: "深度评测", value_item2_desc: "不只是链接，提供真实的场景分析与优缺点对比。",
    value_item3: "实时更新", value_item3_desc: "捕捉 AI 领域最前沿的动态，第一时间同步更新。",
    rec_title: "本周推荐工具", rec_desc: "根据社区热度和实用度筛选出的顶尖AI神器",
    all_title: "全部 AI 工具", all_desc: "按分类筛选或按名称搜索，找到最适合的 AI 工具。",
    popular_comparisons_title: "热门对比", popular_categories_title: "热门分类",
    category_labels: { text: "文本", image: "图像", code: "编程", video: "视频", audio: "音频", productivity: "商业" },
    featured_badge: "推荐", read_more: "阅读评测", no_results: "暂时没有找到相关的 AI 工具..."
  },
  en: {
    search_placeholder: "Search AI tools...",
    cat_all: "All", cat_text: "Writing", cat_image: "Images", cat_code: "Coding", cat_video: "Video", cat_audio: "Audio", cat_prod: "Business",
    ad_sponsored: "Sponsored", ad_top_text: "Ad space available | Contact us for premium AI brand partnerships.", ad_learn_more: "Contact Us",
    cta_browse: "Browse Tools", cta_start_free: "Start Free",
    hero_subtitle: "Curated AI tools for writing, coding, design and business - hand-tested by our team.",
    value_title: "Why AI Tool Hub?",
    value_item1: "Curated", value_item1_desc: "No spam. Each tool is manually tested for quality.",
    value_item2: "Deep Reviews", value_item2_desc: "More than links; providing real-world analysis and pros/cons.",
    value_item3: "Real-time", value_item3_desc: "Catch the latest dynamics in AI and keep updated instantly.",
    rec_title: "Recommended this Week", rec_desc: "Top AI tools selected by community heat and utility.",
    all_title: "All AI tools", all_desc: "Filter by category or search by name to find the right AI tool.",
    popular_comparisons_title: "Popular comparisons", popular_categories_title: "Popular categories",
    category_labels: { text: "Writing", image: "Image", code: "Code", video: "Video", audio: "Audio", productivity: "Business" },
    featured_badge: "Featured", read_more: "Read review", no_results: "No AI tools found..."
  }
};

// ----- Global state -----
let currentLang = localStorage.getItem("lang") || "zh";
let currentTheme = localStorage.getItem("theme") || "dark";
let currentCat = "all";
let currentSearch = "";

let tools = {};
let categoryLabels = {};

// ----- Load data from embedded JSON on homepage -----
function loadData() {
  const tEl = document.getElementById("tools-data");
  const cEl = document.getElementById("categories-data");
  if (tEl) {
    try { tools = JSON.parse(tEl.textContent || "{}"); } catch (e) { tools = {}; }
  }
  if (cEl) {
    try { JSON.parse(cEl.textContent || "[]"); } catch (e) { /* noop */ }
  }
}

// ----- i18n application -----
function t(key) { return (i18n[currentLang] && i18n[currentLang][key]) || key; }
function updateText() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const k = el.getAttribute("data-i18n");
    const v = t(k);
    if (v) el.textContent = v;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const k = el.getAttribute("data-i18n-placeholder");
    const v = t(k);
    if (v) el.placeholder = v;
  });
}

// ----- Theme -----
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

// ----- Card rendering -----
function cardHTML(id, t) {
  const labels = i18n[currentLang].category_labels;
  const catLabel = labels[t.cat] || t.cat;
  const featured = t.featured ? `<span class="featured-badge">${i18n[currentLang].featured_badge}</span>` : "";
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
  const q = currentSearch.trim().toLowerCase();
  const entries = Object.entries(tools).filter(([id, t]) => {
    if (t.hidden) return false;
    const matchCat = currentCat === "all" || t.cat === currentCat;
    const name = (t.name[currentLang] || "").toLowerCase();
    const desc = (t.short_desc[currentLang] || "").toLowerCase();
    const matchSearch = !q || name.includes(q) || desc.includes(q);
    return matchCat && matchSearch;
  });
  entries.sort((a, b) => (b[1].featured ? 1 : 0) - (a[1].featured ? 1 : 0));

  grid.innerHTML = entries.map(([id, t]) =>
    `<a class="tool-card" href="/tool/${id}/">${cardHTML(id, t)}</a>`
  ).join("");

  if (entries.length === 0) {
    grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:var(--text-mute);padding:40px 0;">${i18n[currentLang].no_results}</p>`;
  }
}

function renderRec() {
  const grid = document.getElementById("rec-grid");
  if (!grid) return;
  const ids = ["elevenlabs", "chatgpt", "claude", "midjourney", "cursor"];
  grid.innerHTML = ids.map(id => {
    const t = tools[id];
    if (!t) return "";
    return `<a class="tool-card rec-card" href="/tool/${id}/">${cardHTML(id, t)}</a>`;
  }).join("");
}

// ----- Event bindings -----
function bindEvents() {
  const langSelect = document.getElementById("lang-select");
  if (langSelect) {
    langSelect.value = currentLang;
    langSelect.addEventListener("change", e => {
      currentLang = e.target.value;
      localStorage.setItem("lang", currentLang);
      updateText();
      renderTools();
      renderRec();
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
  const search = document.getElementById("search-input");
  if (search) {
    search.addEventListener("input", e => {
      currentSearch = e.target.value;
      renderTools();
    });
  }
  document.querySelectorAll(".cat-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCat = btn.dataset.category || "all";
      renderTools();
      const grid = document.getElementById("tool-grid");
      if (grid) grid.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
  document.querySelectorAll(".cat-hero-card").forEach(card => {
    card.addEventListener("click", () => {
      const cat = card.dataset.category;
      if (!cat) return;
      currentCat = cat;
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

// ----- Init -----
window.addEventListener("DOMContentLoaded", () => {
  loadData();
  applyTheme(currentTheme);
  updateText();
  bindEvents();
  if (document.getElementById("tool-grid")) {
    renderTools();
    renderRec();
  }
});
