const fs = require("fs");
const filePath = "src/pages/index.astro";
let content = fs.readFileSync(filePath, "utf-8");

// Check if leaderboard already exists
if (content.includes("leaderboard-section")) {
  console.log("Leaderboard already exists, skipping");
  process.exit(0);
}

const insertMarker = '<section class="categories">';
const leaderboard = `<section class="leaderboard-section" style="margin:32px 0;">
      <h2 class="section-main-title" style="text-align:center;margin-bottom:8px;">AI Tools Leaderboard 2026</h2>
      <p style="text-align:center;color:var(--text-mute);font-size:14px;margin-bottom:32px;">
        <span style="display:inline-flex;align-items:center;gap:4px;background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.3);border-radius:6px;padding:2px 10px;font-size:12px;font-weight:600;color:#22c55e;">
          <i class="fas fa-check-circle"></i> Expert Tested
        </span>
        &middot; Updated July 2026 &middot; Hands-on tested for 2+ weeks
      </p>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;">
        <div style="background:var(--card-bg);border:1px solid var(--border-color);border-radius:16px;padding:24px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px;">
            <i class="fas fa-code" style="color:var(--accent-color);font-size:20px;"></i>
            <h3 style="font-size:16px;font-weight:700;margin:0;">Best AI Coding Tools</h3>
          </div>
          <div style="display:grid;gap:10px;">
            <a href="/tool/cursor/" style="text-decoration:none;color:inherit;display:flex;align-items:center;gap:8px;">
              <span style="font-size:13px;font-weight:700;color:var(--accent-color);width:20px;">#1</span>
              <div style="flex:1;"><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:2px;"><span style="font-weight:600;">Cursor</span><span style="color:#22c55e;font-weight:600;">9.2</span></div><div style="height:4px;background:var(--bg-color);border-radius:2px;overflow:hidden;"><div style="width:92%;height:100%;background:#22c55e;border-radius:2px;"></div></div></div>
            </a>
            <a href="/tool/claude/" style="text-decoration:none;color:inherit;display:flex;align-items:center;gap:8px;">
              <span style="font-size:13px;font-weight:700;color:var(--accent-color);width:20px;">#2</span>
              <div style="flex:1;"><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:2px;"><span style="font-weight:600;">Claude</span><span style="color:#22c55e;font-weight:600;">9.0</span></div><div style="height:4px;background:var(--bg-color);border-radius:2px;overflow:hidden;"><div style="width:90%;height:100%;background:#22c55e;border-radius:2px;"></div></div></div>
            </a>
            <a href="/tool/github-copilot/" style="text-decoration:none;color:inherit;display:flex;align-items:center;gap:8px;">
              <span style="font-size:13px;font-weight:700;color:var(--accent-color);width:20px;">#3</span>
              <div style="flex:1;"><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:2px;"><span style="font-weight:600;">GitHub Copilot</span><span style="color:#22c55e;font-weight:600;">8.5</span></div><div style="height:4px;background:var(--bg-color);border-radius:2px;overflow:hidden;"><div style="width:85%;height:100%;background:#22c55e;border-radius:2px;"></div></div></div>
            </a>
            <a href="/tool/windsurf/" style="text-decoration:none;color:inherit;display:flex;align-items:center;gap:8px;">
              <span style="font-size:13px;font-weight:700;color:var(--accent-color);width:20px;">#4</span>
              <div style="flex:1;"><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:2px;"><span style="font-weight:600;">Windsurf</span><span style="color:#f59e0b;font-weight:600;">8.0</span></div><div style="height:4px;background:var(--bg-color);border-radius:2px;overflow:hidden;"><div style="width:80%;height:100%;background:#f59e0b;border-radius:2px;"></div></div></div>
            </a>
            <a href="/tool/deepseek/" style="text-decoration:none;color:inherit;display:flex;align-items:center;gap:8px;">
              <span style="font-size:13px;font-weight:700;color:var(--accent-color);width:20px;">#5</span>
              <div style="flex:1;"><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:2px;"><span style="font-weight:600;">DeepSeek</span><span style="color:#f59e0b;font-weight:600;">7.5</span></div><div style="height:4px;background:var(--bg-color);border-radius:2px;overflow:hidden;"><div style="width:75%;height:100%;background:#f59e0b;border-radius:2px;"></div></div></div>
            </a>
          </div>
          <a href="/best/code/" style="display:block;text-align:center;margin-top:12px;font-size:13px;color:var(--accent-color);font-weight:600;">View all coding tools</a>
        </div>
        <div style="background:var(--card-bg);border:1px solid var(--border-color);border-radius:16px;padding:24px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px;">
            <i class="fas fa-image" style="color:var(--accent-color);font-size:20px;"></i>
            <h3 style="font-size:16px;font-weight:700;margin:0;">Best AI Image Generators</h3>
          </div>
          <div style="display:grid;gap:10px;">
            <a href="/tool/midjourney/" style="text-decoration:none;color:inherit;display:flex;align-items:center;gap:8px;"><span style="font-size:13px;font-weight:700;color:var(--accent-color);width:20px;">#1</span><div style="flex:1;"><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:2px;"><span style="font-weight:600;">Midjourney</span><span style="color:#22c55e;font-weight:600;">9.5</span></div><div style="height:4px;background:var(--bg-color);border-radius:2px;overflow:hidden;"><div style="width:95%;height:100%;background:#22c55e;border-radius:2px;"></div></div></div></a>
            <a href="/tool/flux/" style="text-decoration:none;color:inherit;display:flex;align-items:center;gap:8px;"><span style="font-size:13px;font-weight:700;color:var(--accent-color);width:20px;">#2</span><div style="flex:1;"><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:2px;"><span style="font-weight:600;">Flux</span><span style="color:#22c55e;font-weight:600;">9.0</span></div><div style="height:4px;background:var(--bg-color);border-radius:2px;overflow:hidden;"><div style="width:90%;height:100%;background:#22c55e;border-radius:2px;"></div></div></div></a>
            <a href="/tool/ideogram/" style="text-decoration:none;color:inherit;display:flex;align-items:center;gap:8px;"><span style="font-size:13px;font-weight:700;color:var(--accent-color);width:20px;">#3</span><div style="flex:1;"><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:2px;"><span style="font-weight:600;">Ideogram</span><span style="color:#22c55e;font-weight:600;">8.5</span></div><div style="height:4px;background:var(--bg-color);border-radius:2px;overflow:hidden;"><div style="width:85%;height:100%;background:#22c55e;border-radius:2px;"></div></div></div></a>
            <a href="/tool/comfyui/" style="text-decoration:none;color:inherit;display:flex;align-items:center;gap:8px;"><span style="font-size:13px;font-weight:700;color:var(--accent-color);width:20px;">#4</span><div style="flex:1;"><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:2px;"><span style="font-weight:600;">ComfyUI</span><span style="color:#f59e0b;font-weight:600;">8.0</span></div><div style="height:4px;background:var(--bg-color);border-radius:2px;overflow:hidden;"><div style="width:80%;height:100%;background:#f59e0b;border-radius:2px;"></div></div></div></a>
            <a href="/tool/leonardo/" style="text-decoration:none;color:inherit;display:flex;align-items:center;gap:8px;"><span style="font-size:13px;font-weight:700;color:var(--accent-color);width:20px;">#5</span><div style="flex:1;"><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:2px;"><span style="font-weight:600;">Leonardo AI</span><span style="color:#f59e0b;font-weight:600;">7.8</span></div><div style="height:4px;background:var(--bg-color);border-radius:2px;overflow:hidden;"><div style="width:78%;height:100%;background:#f59e0b;border-radius:2px;"></div></div></div></a>
          </div>
          <a href="/best/image/" style="display:block;text-align:center;margin-top:12px;font-size:13px;color:var(--accent-color);font-weight:600;">View all image tools</a>
        </div>
        <div style="background:var(--card-bg);border:1px solid var(--border-color);border-radius:16px;padding:24px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px;">
            <i class="fas fa-video" style="color:var(--accent-color);font-size:20px;"></i>
            <h3 style="font-size:16px;font-weight:700;margin:0;">Best AI Video Generators</h3>
          </div>
          <div style="display:grid;gap:10px;">
            <a href="/tool/runway/" style="text-decoration:none;color:inherit;display:flex;align-items:center;gap:8px;"><span style="font-size:13px;font-weight:700;color:var(--accent-color);width:20px;">#1</span><div style="flex:1;"><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:2px;"><span style="font-weight:600;">Runway</span><span style="color:#22c55e;font-weight:600;">9.0</span></div><div style="height:4px;background:var(--bg-color);border-radius:2px;overflow:hidden;"><div style="width:90%;height:100%;background:#22c55e;border-radius:2px;"></div></div></div></a>
            <a href="/tool/kling/" style="text-decoration:none;color:inherit;display:flex;align-items:center;gap:8px;"><span style="font-size:13px;font-weight:700;color:var(--accent-color);width:20px;">#2</span><div style="flex:1;"><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:2px;"><span style="font-weight:600;">Kling</span><span style="color:#22c55e;font-weight:600;">8.5</span></div><div style="height:4px;background:var(--bg-color);border-radius:2px;overflow:hidden;"><div style="width:85%;height:100%;background:#22c55e;border-radius:2px;"></div></div></div></a>
            <a href="/tool/sora/" style="text-decoration:none;color:inherit;display:flex;align-items:center;gap:8px;"><span style="font-size:13px;font-weight:700;color:var(--accent-color);width:20px;">#3</span><div style="flex:1;"><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:2px;"><span style="font-weight:600;">Sora</span><span style="color:#f59e0b;font-weight:600;">8.2</span></div><div style="height:4px;background:var(--bg-color);border-radius:2px;overflow:hidden;"><div style="width:82%;height:100%;background:#f59e0b;border-radius:2px;"></div></div></div></a>
            <a href="/tool/pika/" style="text-decoration:none;color:inherit;display:flex;align-items:center;gap:8px;"><span style="font-size:13px;font-weight:700;color:var(--accent-color);width:20px;">#4</span><div style="flex:1;"><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:2px;"><span style="font-weight:600;">Pika</span><span style="color:#f59e0b;font-weight:600;">7.8</span></div><div style="height:4px;background:var(--bg-color);border-radius:2px;overflow:hidden;"><div style="width:78%;height:100%;background:#f59e0b;border-radius:2px;"></div></div></div></a>
            <a href="/tool/luma/" style="text-decoration:none;color:inherit;display:flex;align-items:center;gap:8px;"><span style="font-size:13px;font-weight:700;color:var(--accent-color);width:20px;">#5</span><div style="flex:1;"><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:2px;"><span style="font-weight:600;">Luma</span><span style="color:#f59e0b;font-weight:600;">7.5</span></div><div style="height:4px;background:var(--bg-color);border-radius:2px;overflow:hidden;"><div style="width:75%;height:100%;background:#f59e0b;border-radius:2px;"></div></div></div></a>
          </div>
          <a href="/best/video/" style="display:block;text-align:center;margin-top:12px;font-size:13px;color:var(--accent-color);font-weight:600;">View all video tools</a>
        </div>
        <div style="background:var(--card-bg);border:1px solid var(--border-color);border-radius:16px;padding:24px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px;">
            <i class="fas fa-pen" style="color:var(--accent-color);font-size:20px;"></i>
            <h3 style="font-size:16px;font-weight:700;margin:0;">Best AI Writing & Chat</h3>
          </div>
          <div style="display:grid;gap:10px;">
            <a href="/tool/chatgpt/" style="text-decoration:none;color:inherit;display:flex;align-items:center;gap:8px;"><span style="font-size:13px;font-weight:700;color:var(--accent-color);width:20px;">#1</span><div style="flex:1;"><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:2px;"><span style="font-weight:600;">ChatGPT</span><span style="color:#22c55e;font-weight:600;">9.3</span></div><div style="height:4px;background:var(--bg-color);border-radius:2px;overflow:hidden;"><div style="width:93%;height:100%;background:#22c55e;border-radius:2px;"></div></div></div></a>
            <a href="/tool/claude/" style="text-decoration:none;color:inherit;display:flex;align-items:center;gap:8px;"><span style="font-size:13px;font-weight:700;color:var(--accent-color);width:20px;">#2</span><div style="flex:1;"><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:2px;"><span style="font-weight:600;">Claude</span><span style="color:#22c55e;font-weight:600;">9.0</span></div><div style="height:4px;background:var(--bg-color);border-radius:2px;overflow:hidden;"><div style="width:90%;height:100%;background:#22c55e;border-radius:2px;"></div></div></div></a>
            <a href="/tool/gemini/" style="text-decoration:none;color:inherit;display:flex;align-items:center;gap:8px;"><span style="font-size:13px;font-weight:700;color:var(--accent-color);width:20px;">#3</span><div style="flex:1;"><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:2px;"><span style="font-weight:600;">Gemini</span><span style="color:#22c55e;font-weight:600;">8.5</span></div><div style="height:4px;background:var(--bg-color);border-radius:2px;overflow:hidden;"><div style="width:85%;height:100%;background:#22c55e;border-radius:2px;"></div></div></div></a>
            <a href="/tool/perplexity/" style="text-decoration:none;color:inherit;display:flex;align-items:center;gap:8px;"><span style="font-size:13px;font-weight:700;color:var(--accent-color);width:20px;">#4</span><div style="flex:1;"><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:2px;"><span style="font-weight:600;">Perplexity</span><span style="color:#f59e0b;font-weight:600;">8.0</span></div><div style="height:4px;background:var(--bg-color);border-radius:2px;overflow:hidden;"><div style="width:80%;height:100%;background:#f59e0b;border-radius:2px;"></div></div></div></a>
            <a href="/tool/jasper/" style="text-decoration:none;color:inherit;display:flex;align-items:center;gap:8px;"><span style="font-size:13px;font-weight:700;color:var(--accent-color);width:20px;">#5</span><div style="flex:1;"><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:2px;"><span style="font-weight:600;">Jasper</span><span style="color:#f59e0b;font-weight:600;">7.5</span></div><div style="height:4px;background:var(--bg-color);border-radius:2px;overflow:hidden;"><div style="width:75%;height:100%;background:#f59e0b;border-radius:2px;"></div></div></div></a>
          </div>
          <a href="/best/text/" style="display:block;text-align:center;margin-top:12px;font-size:13px;color:var(--accent-color);font-weight:600;">View all writing tools</a>
        </div>
      </div>
      <div style="text-align:center;margin-top:24px;">
        <a href="/best/ai-agents/" style="display:inline-block;background:var(--accent-color);color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;margin-right:8px;">Explore AI Agents</a>
        <a href="/workflows/" style="display:inline-block;background:var(--card-bg);color:var(--text-color);border:1px solid var(--border-color);padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">Browse Workflows</a>
      </div>
    </section>

    `;

content = content.replace(insertMarker, leaderboard + insertMarker);
fs.writeFileSync(filePath, content, "utf-8");
console.log("Homepage updated with leaderboard. Size:", content.length);
