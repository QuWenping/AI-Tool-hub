/* ============================================================
   AI Tool Hub — Pre-deploy check (run before `git push origin main`)
   Gates: build, Playwright smoke (4 routes x 2 viewports), git state.
   Exit 0 = safe to push. Non-zero = fix then re-run.
   ============================================================ */
import { execSync, spawn } from "node:child_process";
import { chromium } from "playwright";

const ROOT = process.cwd();
const PORT = 4322;
const ROUTES = ["/", "/tool/chatgpt/", "/vs/chatgpt-vs-claude/", "/solutions/ai-for-architecture/"];
const VIEWPORTS = [{ w: 1440, h: 900, label: "1440" }, { w: 390, h: 844, label: "390" }];

function step(name) { console.log("\n=== " + name + " ==="); }
function fail(msg) { console.error("FAIL: " + msg); process.exitCode = 1; }
function pass(msg) { console.log("OK: " + msg); }

let problems = 0;
const report = (ok, msg) => { (ok ? pass : fail)(msg); if (!ok) problems++; };

// ---- 1. Build ----
step("1) Production build (npm run build)");
try {
  execSync("npm run build", { cwd: ROOT, stdio: "inherit" });
  report(true, "build exited 0");
} catch (e) {
  report(false, "build failed (exit " + (e.status || "?") + ")");
  process.exit(1);
}

// ---- 2. Git state ----
step("2) Git state");
const git = (cmd) => { try { return execSync("git " + cmd, { cwd: ROOT }).toString().trim(); } catch { return null; } };
const status = git("status --porcelain") || "";
// Parallel-work aware: content-data files are Claude's domain (WIP there must
// not block an engineering push). Only uncommitted ENGINEERING files block.
const contentData = /tool-editorial\.json|\/tools\.json|\/matchups\.json|\/categories\.json|\/solutions\.json|\/posts\.json|\/prompts\.json|\/workflows\.json|\/templates\.json/;
const uncommittedTracked = status.split("\n").filter(l => l && !/^\?\?/.test(l));
const engUncommitted = uncommittedTracked.filter(l => !contentData.test(l));
const contentUncommitted = uncommittedTracked.filter(l => contentData.test(l));
report(engUncommitted.length === 0, engUncommitted.length
  ? "uncommitted ENGINEERING changes (commit or stash before push):\n" + engUncommitted.join("\n")
  : "no uncommitted engineering changes");
if (contentUncommitted.length) console.log("  (content-data WIP, not blocking — content side's domain): " + contentUncommitted.join(" "));
const untracked = status.split("\n").filter(l => /^\?\?/.test(l));
if (untracked.length) console.log("  (untracked, do not block push): " + untracked.join(" "));
const counts = (git("rev-list --left-right --count origin/main...HEAD") || "0\t0").split("\t");
const behind = parseInt(counts[0], 10) || 0;
const ahead = parseInt(counts[1], 10) || 0;
report(ahead > 0, ahead > 0 ? "local ahead of origin/main by " + ahead + " commit(s)" : "nothing to push (not ahead of origin/main)");
if (behind > 0) { report(false, "local is behind origin/main by " + behind + " — pull/rebase first"); }
const remote = git("ls-remote origin HEAD");
report(!!remote, remote ? "origin reachable" : "origin NOT reachable");

// ---- 3. Preview server ----
step("3) Start preview server (:" + PORT + ")");
const preview = spawn("node", ["node_modules/astro/astro.js", "preview", "--port", String(PORT)], { cwd: ROOT, stdio: "pipe" });
let ready = false;
await new Promise((resolve) => {
  const to = setTimeout(() => { console.log("  preview start timeout, attempting anyway"); resolve(); }, 15000);
  preview.stdout.on("data", (d) => { if (/Local|ready/i.test(d.toString()) && !ready) { ready = true; clearTimeout(to); setTimeout(resolve, 800); } });
  preview.stderr.on("data", () => {});
});
const base = "http://localhost:" + PORT;

// ---- 4. Playwright smoke ----
step("4) Playwright smoke (" + ROUTES.length + " routes x " + VIEWPORTS.length + " viewports)");
const browser = await chromium.launch();
let smokeFail = 0;
for (const r of ROUTES) {
  for (const v of VIEWPORTS) {
    const page = await browser.newPage({ viewport: { width: v.w, height: v.h } });
    const errors = [];
    page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
    page.on("pageerror", e => errors.push("PAGEERROR: " + e.message));
    let status = 0;
    try {
      const resp = await page.goto(base + r, { waitUntil: "networkidle", timeout: 30000 });
      status = resp ? resp.status() : 0;
      const overflow = await page.evaluate(() => document.body.scrollWidth > document.body.clientWidth + 2);
      const ok = status === 200 && errors.length === 0 && !overflow;
      if (!ok) smokeFail++;
      console.log((ok ? "  OK  " : "  FAIL ") + r + " @" + v.label + " status=" + status + " errors=" + errors.length + " overflow=" + overflow);
      if (!ok && errors.length) console.log("      " + errors.slice(0, 3).join(" | "));
    } catch (e) {
      smokeFail++;
      console.log("  FAIL " + r + " @" + v.label + " " + (e.message || "").split("\n")[0]);
    } finally {
      await page.close();
    }
  }
}
await browser.close();
report(smokeFail === 0, smokeFail === 0 ? "smoke all green" : smokeFail + " smoke check(s) failed");

// ---- shutdown preview ----
preview.kill("SIGTERM");
try { preview.kill("SIGKILL"); } catch {}

// ---- summary ----
step("SUMMARY");
console.log("blocking problems: " + problems + " | smoke failures: " + smokeFail);
if (problems === 0 && smokeFail === 0) {
  console.log("\n✅ Pre-deploy check PASSED — safe to run: git push origin main");
  process.exit(0);
} else {
  console.log("\n❌ Pre-deploy check FAILED — fix the issues above, then re-run.");
  process.exit(1);
}
