/* Stack Builder - deterministic client-side recommendation engine */
(function () {
  const ROLES = ["founder", "developer", "designer", "marketer"];
  const GOALS = ["save-time", "automate", "create-content", "generate-code"];
  const BUDGETS = ["free", "0-50", "50-200", "enterprise"];
  const STORAGE_KEY = "ai-tool-hub.stack.v1";

  const CAT_LABELS = {
    en: { text: "Writing", image: "Images", code: "Coding", video: "Video", audio: "Audio", productivity: "Business" },
    zh: { text: "写作", image: "图像", code: "编程", video: "视频", audio: "音频", productivity: "商业" }
  };

  const COPY = {
    progress: {
      en: (n) => n === 0 ? "0 of 3 answered — pick your role to start"
                : n === 1 ? "1 of 3 answered — choose your goal next"
                : n === 2 ? "2 of 3 answered — one more, choose a budget"
                : "3 of 3 answered — your stack is ready",
      zh: (n) => n === 0 ? "已完成 0 / 3 — 请先选择角色"
                : n === 1 ? "已完成 1 / 3 — 请选择你的目标"
                : n === 2 ? "已完成 2 / 3 — 再选一个预算即可"
                : "已完成 3 / 3 — 推荐组合已就绪"
    },
    title: {
      en: (role, goal) => `Your ${labelRole(role, "en")} stack for ${labelGoal(goal, "en")}`,
      zh: (role, goal) => `${labelRole(role, "zh")}的${labelGoal(goal, "zh")}工具栈`
    },
    summary: {
      en: (role, goal, budget, count) => `${count} complementary tools tuned for ${labelRole(role, "en").toLowerCase()} who want to ${labelGoal(goal, "en").toLowerCase()} on a ${labelBudget(budget, "en")} budget.`,
      zh: (role, goal, budget, count) => `${count} 款互补 AI 工具，针对希望在${labelBudget(budget, "zh")}预算下${labelGoal(goal, "zh")}的${labelRole(role, "zh")}。`
    },
    cost: {
      en: (val) => val === 0 ? "Free" : `≈$${val}/mo`,
      zh: (val) => val === 0 ? "免费" : `约 $${val}/月`
    },
    hours: {
      en: (val) => `~${val} hrs/week`,
      zh: (val) => `每周约 ${val} 小时`
    },
    share: {
      en: { copy: "Copy share link", copied: "Copied!", failed: "Copy failed" },
      zh: { copy: "复制分享链接", copied: "已复制", failed: "复制失败" }
    }
  };

  const ROLE_LABEL = {
    founder: { en: "founders", zh: "创业者" },
    developer: { en: "developers", zh: "开发者" },
    designer: { en: "designers", zh: "设计师" },
    marketer: { en: "marketers", zh: "营销人员" }
  };
  const GOAL_LABEL = {
    "save-time": { en: "save time", zh: "节省时间" },
    "automate": { en: "automate tasks", zh: "自动化工作" },
    "create-content": { en: "create content", zh: "创作内容" },
    "generate-code": { en: "generate code", zh: "生成代码" }
  };
  const BUDGET_LABEL = {
    "free": { en: "free", zh: "免费" },
    "0-50": { en: "$0–50/mo", zh: "0–50 美元/月" },
    "50-200": { en: "$50–200/mo", zh: "50–200 美元/月" },
    "enterprise": { en: "enterprise", zh: "企业级" }
  };

  function labelRole(k, l) { return (ROLE_LABEL[k] && ROLE_LABEL[k][l]) || k; }
  function labelGoal(k, l) { return (GOAL_LABEL[k] && GOAL_LABEL[k][l]) || k; }
  function labelBudget(k, l) { return (BUDGET_LABEL[k] && BUDGET_LABEL[k][l]) || k; }

  function currentLang() {
    try {
      const v = localStorage.getItem("lang");
      return v === "en" ? "en" : "zh";
    } catch (_e) { return "zh"; }
  }

  function loadCatalog() {
    const el = document.getElementById("stack-catalog");
    if (!el) return [];
    try {
      const raw = JSON.parse(el.textContent || "[]");
      return Array.isArray(raw) ? raw.filter(t => t && t.id && t.href) : [];
    } catch (_e) { return []; }
  }

  function scoreCandidate(t, role, goal, budget) {
    let score = 0;
    if (t.goals.includes(goal)) score += 40;
    if (t.roles.includes(role)) score += 30;
    if (budget === "free" && !t.freeTier) return -1;
    if (budget === "0-50" && t.monthlyCost > 50 && !t.freeTier) score -= 5;
    if (budget === "50-200" && t.monthlyCost > 200) score -= 10;
    if (budget === "enterprise" && (t.cat === "productivity" || t.goals.includes("automate"))) score += 5;
    if (budget === "free" && t.freeTier && t.monthlyCost === 0) score += 8;
    if (budget === "0-50" && t.monthlyCost <= 30) score += 4;
    score += (t.priority || 0) * 3;
    return score;
  }

  function pickStack(catalog, role, goal, budget) {
    const scored = catalog
      .map(t => ({ t, s: scoreCandidate(t, role, goal, budget) }))
      .filter(x => x.s >= 0)
      .sort((a, b) => b.s - a.s || (a.t.monthlyCost - b.t.monthlyCost));

    const chosen = [];
    const usedCats = new Set();
    for (const { t } of scored) {
      if (chosen.length >= 3) break;
      if (usedCats.has(t.cat)) continue;
      chosen.push(t);
      usedCats.add(t.cat);
    }
    if (chosen.length < 3) {
      for (const { t } of scored) {
        if (chosen.length >= 3) break;
        if (chosen.find(c => c.id === t.id)) continue;
        chosen.push(t);
      }
    }
    return chosen.slice(0, 3);
  }

  function readState() {
    const params = new URLSearchParams(window.location.search);
    const state = {
      role: sanitize(params.get("role"), ROLES),
      goal: sanitize(params.get("goal"), GOALS),
      budget: sanitize(params.get("budget"), BUDGETS)
    };
    if (state.role && state.goal && state.budget) return state;
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return {
        role: state.role || sanitize(saved.role, ROLES),
        goal: state.goal || sanitize(saved.goal, GOALS),
        budget: state.budget || sanitize(saved.budget, BUDGETS)
      };
    } catch (_e) { return state; }
  }

  function sanitize(v, allowed) {
    return typeof v === "string" && allowed.indexOf(v) >= 0 ? v : null;
  }

  function persistState(state) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_e) {}
    const params = new URLSearchParams(window.location.search);
    ["role", "goal", "budget"].forEach(k => {
      if (state[k]) params.set(k, state[k]); else params.delete(k);
    });
    const q = params.toString();
    const newUrl = window.location.pathname + (q ? "?" + q : "") + "#finder";
    if (newUrl !== window.location.pathname + window.location.search + window.location.hash) {
      history.replaceState(null, "", newUrl);
    }
  }

  function clearPersistence() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (_e) {}
    const params = new URLSearchParams(window.location.search);
    ["role", "goal", "budget"].forEach(k => params.delete(k));
    const q = params.toString();
    history.replaceState(null, "", window.location.pathname + (q ? "?" + q : ""));
  }

  function catToDirectoryCat(cat) {
    return cat === "text" || cat === "image" || cat === "code" || cat === "video" || cat === "audio" || cat === "productivity"
      ? cat
      : "all";
  }

  const state = { role: null, goal: null, budget: null };
  let catalog = [];

  function init() {
    const root = document.getElementById("stack-builder");
    if (!root) return;
    catalog = loadCatalog();
    if (catalog.length === 0) return;

    const options = root.querySelectorAll(".finder-option");
    options.forEach(btn => {
      btn.addEventListener("click", () => {
        const group = btn.dataset.stackGroup;
        const value = btn.dataset.stackValue;
        if (!group || !value) return;
        state[group] = value;
        applyState();
      });
    });

    const resetBtn = root.querySelector("[data-stack-reset]");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        state.role = null; state.goal = null; state.budget = null;
        clearPersistence();
        applyState({ skipPersist: true });
      });
    }

    const shareBtn = root.querySelector("[data-stack-share]");
    if (shareBtn) shareBtn.addEventListener("click", () => handleShare(shareBtn));

    const restored = readState();
    state.role = restored.role;
    state.goal = restored.goal;
    state.budget = restored.budget;
    applyState({ skipPersist: true });

    window.addEventListener("site-language-change", () => render());
  }

  function applyState(opts) {
    opts = opts || {};
    document.querySelectorAll("#stack-builder .finder-option").forEach(btn => {
      const group = btn.dataset.stackGroup;
      const value = btn.dataset.stackValue;
      const selected = state[group] === value;
      btn.classList.toggle("selected", selected);
      btn.setAttribute("aria-pressed", String(selected));
    });
    render();
    if (!opts.skipPersist && (state.role || state.goal || state.budget)) {
      persistState(state);
    }
  }

  function render() {
    const lang = currentLang();
    const root = document.getElementById("stack-builder");
    if (!root) return;
    const answered = ["role", "goal", "budget"].filter(k => state[k]).length;

    const bar = root.querySelector("[data-stack-progress-bar]");
    if (bar) bar.style.width = Math.round((answered / 3) * 100) + "%";
    const progressLabel = root.querySelector("[data-stack-progress-label]");
    if (progressLabel) progressLabel.textContent = COPY.progress[lang](answered);

    const resultEl = root.querySelector("[data-stack-result]");
    const pendingEl = root.querySelector("[data-stack-pending]");
    const readyEl = root.querySelector("[data-stack-ready]");
    const complete = answered === 3;
    if (resultEl) resultEl.setAttribute("data-status", complete ? "ready" : "pending");
    if (pendingEl) pendingEl.hidden = complete;
    if (readyEl) readyEl.hidden = !complete;

    if (!complete) return;

    const stack = pickStack(catalog, state.role, state.goal, state.budget);
    if (stack.length === 0) return;

    const titleEl = root.querySelector("[data-stack-title]");
    if (titleEl) titleEl.textContent = COPY.title[lang](state.role, state.goal);
    const summaryEl = root.querySelector("[data-stack-summary]");
    if (summaryEl) summaryEl.textContent = COPY.summary[lang](state.role, state.goal, state.budget, stack.length);

    const listEl = root.querySelector("[data-stack-list]");
    if (listEl) {
      listEl.innerHTML = "";
      stack.forEach((t, i) => {
        const a = document.createElement("a");
        a.href = t.href;
        a.className = "stack-item";
        const rank = document.createElement("span");
        rank.className = "stack-rank";
        rank.textContent = String(i + 1);
        const info = document.createElement("div");
        info.className = "stack-item-info";
        const strong = document.createElement("strong");
        strong.textContent = t.name[lang] || t.name.en;
        const small = document.createElement("small");
        small.textContent = (t.stackRole[lang] || t.stackRole.en) + " · " + (CAT_LABELS[lang][t.cat] || t.cat);
        info.appendChild(strong);
        info.appendChild(small);
        const price = document.createElement("b");
        price.className = "stack-price";
        price.textContent = t.freeTier && t.monthlyCost === 0 ? (lang === "zh" ? "免费" : "Free")
          : t.freeTier ? (lang === "zh" ? "含免费额度" : "Free tier")
          : "$" + t.monthlyCost + (lang === "zh" ? "/月" : "/mo");
        a.appendChild(rank);
        a.appendChild(info);
        a.appendChild(price);
        listEl.appendChild(a);
      });
    }

    const totalCost = stack.reduce((sum, t) => sum + (t.freeTier && state.budget === "free" ? 0 : t.monthlyCost), 0);
    const totalHours = stack.reduce((sum, t) => sum + (t.hoursSaved || 0), 0);
    const costEl = root.querySelector("[data-stack-cost]");
    if (costEl) costEl.textContent = COPY.cost[lang](totalCost);
    const hoursEl = root.querySelector("[data-stack-hours]");
    if (hoursEl) hoursEl.textContent = COPY.hours[lang](totalHours);

    const exploreEl = root.querySelector("[data-stack-explore]");
    if (exploreEl) {
      const targetCat = pickPrimaryCategory(stack);
      exploreEl.setAttribute("href", "#all-tools");
      exploreEl.dataset.stackTargetCat = targetCat;
    }
  }

  function pickPrimaryCategory(stack) {
    const counts = {};
    stack.forEach(t => { counts[t.cat] = (counts[t.cat] || 0) + 1; });
    let best = "all", max = 0;
    Object.keys(counts).forEach(k => { if (counts[k] > max) { max = counts[k]; best = k; } });
    return catToDirectoryCat(best);
  }

  function handleShare(btn) {
    const lang = currentLang();
    const url = window.location.origin + window.location.pathname + window.location.search + "#finder";
    const label = btn.querySelector("span");
    const original = COPY.share[lang].copy;
    if (label) label.textContent = original;
    const done = (ok) => {
      if (!label) return;
      label.textContent = ok ? COPY.share[lang].copied : COPY.share[lang].failed;
      setTimeout(() => { label.textContent = COPY.share[currentLang()].copy; }, 1600);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => done(true), () => done(false));
    } else {
      try {
        const ta = document.createElement("textarea");
        ta.value = url;
        ta.style.position = "fixed";
        ta.style.top = "-1000px";
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        done(ok);
      } catch (_e) { done(false); }
    }
  }

  function boot() {
    // Run after main.js's own DOMContentLoaded listener to avoid applyI18n
    // overwriting our dynamic strings on initial load.
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => setTimeout(init, 0));
    } else {
      setTimeout(init, 0);
    }
  }

  boot();
})();
