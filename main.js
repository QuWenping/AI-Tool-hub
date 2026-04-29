const tools = [
    { name: "ChatGPT", desc: "由 OpenAI 开发的强大语言模型，支持对话、编程和内容创作。", cat: "text", url: "https://chatgpt.com", icon: "fa-comment-dots" },
    { name: "Midjourney", desc: "目前最顶级的 AI 图像生成工具，擅长艺术化和写实效果。", cat: "image", url: "https://midjourney.com", icon: "fa-palette" },
    { name: "Claude", desc: "Anthropic 开发的 AI，以更长上下文窗口和人性化回复著称。", cat: "text", url: "https://claude.ai", icon: "fa-brain" },
    { name: "GitHub Copilot", desc: "集成在编辑器中的 AI 编程助手，极大地提升开发速度。", cat: "code", url: "https://github.com/features/copilot", icon: "fa-code" },
    { name: "Runway Gen-2", desc: "领先的 AI 视频生成平台，支持文本转视频、图转视频。", cat: "video", url: "https://runwayml.com", icon: "fa-video" },
    { name: "Luma Dream Machine", desc: "高质量 3D 视频生成 AI，物理效果极其逼真。", cat: "video", url: "https://lumalabs.ai", icon: "fa-film" },
    { name: "Kimi", desc: "国产 AI 之光，擅长超长文本处理和精准分析。", cat: "text", url: "https://kimi.moonshot.cn", icon: "fa-moon" },
    { name: "ElevenLabs", desc: "最自然的 AI 语音克隆与合成平台，支持多国语言。", cat: "audio", url: "https://elevenlabs.io", icon: "fa-microphone" },
    { name: "Notion AI", desc: "将 AI 深度集成在笔记软件中，支持撰写、总结和重写。", cat: "productivity", url: "https://notion.so", icon: "fa-book-open" },
    { name: "Perplexity", desc: "AI 驱动的搜索引擎，实时联网并提供引用来源。", cat: "productivity", url: "https://perplexity.ai", icon: "fa-magnifying-glass" },
    { name: "v0.dev", desc: "Vercel 推出的 UI 生成 AI，通过描述直接生成 React 组件。", cat: "code", url: "https://v0.dev", icon: "fa-layer-group" },
    { name: "Suno AI", desc: "能够创作完整歌曲的 AI，包含歌词、旋律和人声。", cat: "audio", url: "https://suno.com", icon: "fa-music" },
];

const toolGrid = document.getElementById('tool-grid');
const searchInput = document.getElementById('search-input');
const catBtns = document.querySelectorAll('.cat-btn');

function renderTools(filterCat = 'all', searchTerm = '') {
    toolGrid.innerHTML = '';
    
    const filtered = tools.filter(t => {
        const matchCat = filterCat === 'all' || t.cat === filterCat;
        const matchSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            t.desc.toLowerCase().includes(searchTerm.toLowerCase());
        return matchCat && matchSearch;
    });

    filtered.forEach(t => {
        const card = document.createElement('a');
        card.href = t.url;
        card.target = '_blank';
        card.className = 'tool-card';
        card.innerHTML = `
            <div class="tool-icon"><i class="fas ${t.icon}"></i></div>
            <h3>${t.name}</h3>
            <p>${t.desc}</p>
            <div class="tool-tag">${t.cat === 'text' ? '文本' : t.cat === 'image' ? '图像' : t.cat === 'code' ? '编程' : t.cat === 'video' ? '视频' : t.cat === 'audio' ? '音频' : '效率'}</div>
        `;
        toolGrid.appendChild(card);
    });

    if (filtered.length === 0) {
        toolGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-mute);">暂时没有找到相关的 AI 工具...</p>';
    }
}

// 分类点击事件
catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        catBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderTools(btn.dataset.category);
    });
});

// 搜索实时过滤
searchInput.addEventListener('input', (e) => {
    const term = e.target.value;
    const activeCat = document.querySelector('.cat-btn.active').dataset.category;
    renderTools(activeCat, term);
});

// 初始化
renderTools();
