/* Stack Builder - deterministic client-side recommendation engine */
(function () {
  const ROLES = ["founder", "developer", "designer", "marketer"];
  const GOALS = ["save-time", "automate", "create-content", "generate-code"];
  const BUDGETS = ["free", "0-50", "50-200", "enterprise"];
  const STORAGE_KEY = "ai-tool-hub.stack.v1";

  const CAT_LABELS = { text: "Writing", image: "Image", code: "Coding", video: "Video", audio: "Audio", productivity: "Productivity" };

  const COPY = {
    progress: (n) => n === 0 ? "0 of 3 answered — pick your role to start"
                : n === 1 ? "1 of 3 answered — choose your goal next"
                : n === 2 ? "2 of 3 answered — one more, choose a budget"
                : "3 of 3 answered — your stack is ready",
    title: (role, goal) => `Your ${labelRole(role)} stack for ${labelGoal(goal)}`,
    summary: (role, goal, budget, count) => `${count} complementary tools tuned for ${labelRole(role).toLowerCase()} who want to ${labelGoal(goal).toLowerCase()} on a ${labelBudget(budget)} budget.`,
    cost: (val) => val === 0 ? "Free" : `≈$${val}/mo`,
    hours: (val) => `~${val} hrs/week`,
    share: { copy: "Copy share link", copied: "Copied!", failed: "Copy failed" }
  };

  const ROLE_LABEL = {
    founder: "founders",
    developer: "developers",
    designer: "designers",
    marketer: "marketers"
  };
  const GOAL_LABEL = {
    "save-time": "save time",
    "automate": "automate tasks",
    "create-content": "create content",
    "generate-code": "generate code"
  };
  const BUDGET_LABEL = {
    "free": "free",
    "0-50": "$0–50/mo",
    "50-200": "$50–200/mo",
    "enterprise": "enterprise"
  };

  function labelRole(k) { return ROLE_LABEL[k] || k; }
  function labelGoal(k) { return GOAL_LABEL[k] || k; }
  function labelBudget(k) { return BUDGET_LABEL[k] || k; }

  function currentLang() {
    return "en";
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
    if (progressLabel) progressLabel.textContent = COPY.progress(answered);

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
    if (titleEl) titleEl.textContent = COPY.title(state.role, state.goal);
    const summaryEl = root.querySelector("[data-stack-summary]");
    if (summaryEl) summaryEl.textContent = COPY.summary(state.role, state.goal, state.budget, stack.length);

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
        strong.textContent = t.name.en;
        const small = document.createElement("small");
        small.textContent = (t.stackRole.en) + " · " + (CAT_LABELS[t.cat] || t.cat);
        info.appendChild(strong);
        info.appendChild(small);
        const price = document.createElement("b");
        price.className = "stack-price";
        price.textContent = t.freeTier && t.monthlyCost === 0 ? "Free"
          : t.freeTier ? "Free tier"
          : "$" + t.monthlyCost + "/mo";
        a.appendChild(rank);
        a.appendChild(info);
        a.appendChild(price);
        listEl.appendChild(a);
      });
    }

    const totalCost = stack.reduce((sum, t) => sum + (t.freeTier && state.budget === "free" ? 0 : t.monthlyCost), 0);
    const totalHours = stack.reduce((sum, t) => sum + (t.hoursSaved || 0), 0);
    const costEl = root.querySelector("[data-stack-cost]");
    if (costEl) costEl.textContent = COPY.cost(totalCost);
    const hoursEl = root.querySelector("[data-stack-hours]");
    if (hoursEl) hoursEl.textContent = COPY.hours(totalHours);

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
    const original = COPY.share.copy;
    if (label) label.textContent = original;
    const done = (ok) => {
      if (!label) return;
      label.textContent = ok ? COPY.share.copied : COPY.share.failed;
      setTimeout(() => { label.textContent = COPY.share.copy; }, 1600);
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
