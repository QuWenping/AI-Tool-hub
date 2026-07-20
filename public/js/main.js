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
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
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
  const featured = t.featured
    ? `<span class="directory-featured">${currentLang === "zh" ? "推荐" : "Featured"}</span>`
    : "";
  const name = t.name?.[currentLang] || t.name?.en || "AI Tool";
  const description = t.short_desc?.[currentLang] || t.short_desc?.en || "";
  return `
    <div class="directory-tool-head">
      <span class="directory-tool-icon"><i class="fas ${t.icon || "fa-robot"}"></i></span>
      ${featured}
    </div>
    <h3>${name}</h3>
    <p>${description}</p>
    <div class="directory-tool-bottom">
      <span>${catLabel}</span>
      <span>${currentLang === "zh" ? "查看详情" : "View details"} <i class="fas fa-arrow-right"></i></span>
    </div>
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
  const SHOW = 12;
  const isSearch = q.length > 0;
  const show = isSearch ? entries : entries.slice(0, SHOW);
  const rest = entries.length - show.length;
  const more = document.getElementById("tool-grid-more");
  grid.innerHTML = show.map(([id, t]) => `<a class="directory-tool-card" href="/tool/${id}/">${cardHTML(t)}</a>`).join("");
  if (more) more.innerHTML = "";
  if (entries.length === 0) {
    grid.innerHTML = `<p class="directory-empty">${currentLang === "zh" ? "暂时没有找到相关的 AI 工具..." : "No AI tools found..."}</p>`;
  } else if (rest > 0 && !isSearch) {
    const link = cat !== "all" ? `/best/${cat}/` : "/best/students/";
    const btnText = currentLang === "zh" ? "浏览全部 " + entries.length + " 个工具" : "Browse all " + entries.length + " tools";
    if (more) more.innerHTML = `<a href="${link}">${btnText} <span aria-hidden="true">→</span></a>`;
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
}

function bindGlobalEvents() {
  const navToggle = document.getElementById("nav-toggle");
  const navigation = document.getElementById("site-navigation");
  if (navToggle && navigation) {
    const closeNavigation = () => {
      navigation.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      const icon = navToggle.querySelector("i");
      if (icon) icon.className = "fas fa-bars";
    };
    navToggle.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      const icon = navToggle.querySelector("i");
      if (icon) icon.className = isOpen ? "fas fa-times" : "fas fa-bars";
    });
    navigation.addEventListener("click", event => {
      if (event.target.closest("a")) closeNavigation();
    });
    document.addEventListener("click", event => {
      if (!navigation.contains(event.target) && !navToggle.contains(event.target)) closeNavigation();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1279) closeNavigation();
    });
  }

  const langSelect = document.getElementById("lang-select");
  if (langSelect) {
    langSelect.value = currentLang;
    langSelect.addEventListener("change", e => {
      currentLang = e.target.value;
      localStorage.setItem("lang", currentLang);
      applyI18n();
      if (document.getElementById("tool-grid")) {
        renderTools();
      }
      window.dispatchEvent(new CustomEvent("site-language-change", { detail: { lang: currentLang } }));
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
  }
});
