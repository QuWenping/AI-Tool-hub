# Deployment Checklist — 上线前检查（每个 Sprint 收尾必跑）

**触发**：每完成一个阶段（Sprint）任务后，运行 `scripts/pre-deploy-check.mjs`。
**通过 → 推送 `origin/main`**（Vercel 自动构建上线 thebestaitoolsreview.com）。
**不通过 → 按报告修复，重跑直到全绿再推送。**

## 上线门槛（必须全部满足）

| # | 检查项 | 通过标准 | 阻塞推送? |
|---|---|---|---|
| 1 | `npm run build` | 退出码 0，无错误 | ✅ 阻塞 |
| 2 | Playwright 冒烟（4 类核心路由） | 全部 200、无 console error、无 body 横向溢出（1440/390） | ✅ 阻塞 |
| 3 | Git 工作树 | 已提交的改动全部 commit；未跟踪文件仅为本地草稿（不影响推送） | ✅ 阻塞（若有未 commit 的跟踪改动） |
| 4 | 本地领先 origin/main | `ahead > 0`（有内容可推） | ⚠️ 提示（无新提交则无需推送） |
| 5 | 远程可达 | `git ls-remote origin` 成功 | ✅ 阻塞 |

## 不阻塞但需关注的项

- `npx astro check`：项目历史遗留 ~115 个 TS 类型推断告警（JSON 导入联合类型导致）。
  Vercel 用 `astro build`（esbuild，不做完整 TS 检查），**不会**因此失败，故不阻塞推送。
  新代码不应新增此类告警；长期清理归入 P0-3 组件化重构。
- `astro(4000)` script inline 提示：JSON-LD `<script set:html>` 的既有写法，无害。

## 冒烟路由（脚本默认）

| 路由 | 代表页面类型 |
|---|---|
| `/` | 首页 |
| `/tool/chatgpt/` | Tool Detail（Sprint 4 重构） |
| `/vs/chatgpt-vs-claude/` | 比较页 |
| `/solutions/ai-for-architects/` | 行业场景页 |

## 执行

```powershell
node scripts/pre-deploy-check.mjs
# 退出码 0 → 可推送：
git push origin main
# 退出码非 0 → 按报告修复后重跑
```

## 推送后

- Vercel 自动构建；可在 Vercel dashboard 看构建日志。
- 构建产物：~2100+ 静态页 + sitemap-index.xml。
- 上线后人工抽查：首页 / 一个 tool 详情 / 一个 vs / 一个 solutions 的视觉与交互。
