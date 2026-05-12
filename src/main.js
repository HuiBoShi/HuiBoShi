const languages = [
  {
    id: 'english',
    name: '英语',
    flag: '🇬🇧',
    tagline: '国际交流与职场表达',
    levels: [
      { code: 'A1', title: '入门生存英语', lessons: 18, focus: '问候、数字、基础句型' },
      { code: 'A2', title: '日常沟通英语', lessons: 24, focus: '购物、旅行、餐厅对话' },
      { code: 'B1', title: '职场表达英语', lessons: 30, focus: '会议、邮件、观点表达' },
      { code: 'B2', title: '高阶流利英语', lessons: 36, focus: '演讲、辩论、学术听力' },
    ],
  },
  {
    id: 'japanese',
    name: '日语',
    flag: '🇯🇵',
    tagline: '从五十音到商务会话',
    levels: [
      { code: 'N5', title: '五十音与基础寒暄', lessons: 20, focus: '假名、问候、助词入门' },
      { code: 'N4', title: '生活场景日语', lessons: 26, focus: '动词变形、购物交通' },
      { code: 'N3', title: '进阶阅读与听力', lessons: 32, focus: '复合句、新闻短文' },
      { code: 'N2', title: '商务与留学日语', lessons: 38, focus: '敬语、面试、论文表达' },
    ],
  },
  {
    id: 'korean',
    name: '韩语',
    flag: '🇰🇷',
    tagline: '韩流文化与生活沟通',
    levels: [
      { code: 'TOPIK I', title: '韩文字母与发音', lessons: 16, focus: '收音、基础词汇、礼貌语' },
      { code: 'TOPIK II-3', title: '旅游生活韩语', lessons: 24, focus: '点餐、问路、兴趣表达' },
      { code: 'TOPIK II-4', title: '影视听说训练', lessons: 30, focus: '连音、口语缩略、剧情复述' },
      { code: 'TOPIK II-5', title: '高阶写作与面试', lessons: 34, focus: '议论文、职场汇报' },
    ],
  },
];

const learningModules = [
  { id: 'vocab', icon: '🧠', title: '单词记忆', description: '间隔重复闪卡、例句联想与错词本自动复习。', sample: '今日 24 个核心词，预计 12 分钟完成。' },
  { id: 'grammar', icon: '📘', title: '语法练习', description: '选择、填空、改错和场景造句，即时解释语法点。', sample: '根据你的正确率推送 8 道薄弱题。' },
  { id: 'speaking', icon: '🎙️', title: '口语跟读', description: 'AI 发音评分、逐词高亮和语调曲线对比。', sample: '跟读 6 句旅行会话，目标评分 85+。' },
  { id: 'listening', icon: '🎧', title: '听力训练', description: '分速听写、关键词捕捉与真实语料精听。', sample: '3 段情景音频，支持慢速和原速切换。' },
];

const communityTopics = [
  { user: 'Mina', badge: '7 天连学', text: '日语 N4 助词终于不混了，推荐大家做错题复盘。' },
  { user: 'Alex', badge: '口语达人', text: '英语跟读模块的语调曲线很直观，今天拿到 91 分！' },
  { user: '서연', badge: '互助之星', text: '韩语收音练习可以先放慢速度，再逐步恢复原速。' },
];

const achievements = [
  { name: '连续学习 7 天', progress: 100 },
  { name: '完成首个级别课程', progress: 68 },
  { name: '社区互助 10 次', progress: 40 },
  { name: '口语评分突破 90', progress: 82 },
];

const state = {
  selectedLanguage: languages[0],
  currentModule: 'vocab',
  user: loadStoredUser(),
  form: { name: '', goal: '职场提升', minutes: 30 },
  completed: { lessons: 42, words: 1280, speaking: 21, listening: 33 },
};

function loadStoredUser() {
  try {
    return JSON.parse(localStorage.getItem('polyglot-user')) || null;
  } catch {
    return null;
  }
}

function getTotals() {
  const totalLessons = state.selectedLanguage.levels.reduce((sum, level) => sum + level.lessons, 0);
  const lessonProgress = Math.min(100, Math.round((state.completed.lessons / totalLessons) * 100));
  const activeModule = learningModules.find((module) => module.id === state.currentModule);
  const completedLessons = state.completed.lessons;
  const currentLevel = state.selectedLanguage.levels.find((level, index) => {
    const threshold = state.selectedLanguage.levels.slice(0, index + 1).reduce((sum, item) => sum + item.lessons, 0);
    return completedLessons < threshold;
  }) || state.selectedLanguage.levels.at(-1);
  const minutes = Number(state.form.minutes);
  const intensity = minutes >= 45 ? '强化冲刺' : minutes >= 30 ? '稳步提升' : '轻量坚持';

  return {
    totalLessons,
    lessonProgress,
    activeModule,
    recommendedPath: {
      intensity,
      level: currentLevel,
      tasks: [
        `完成 ${currentLevel.code}「${currentLevel.title}」2 节微课`,
        `复习 ${activeModule.title} 中的个性化错题`,
        `参与 1 次 ${state.selectedLanguage.name} 学习小组讨论`,
      ],
    },
  };
}

function render() {
  const { lessonProgress, activeModule, recommendedPath } = getTotals();
  document.getElementById('root').innerHTML = `
    <main>
      <section class="hero">
        <nav class="nav" aria-label="主导航">
          <div class="brand">🌐 Polyglot Campus</div>
          <div class="nav-links">
            <a href="#courses">课程体系</a>
            <a href="#practice">互动学习</a>
            <a href="#community">社区成就</a>
          </div>
        </nav>
        <div class="hero-grid">
          <div class="hero-copy">
            <span class="eyebrow">✨ 沉浸式多语种学习平台</span>
            <h1>从入门到流利，用一条个性化路径学习英语、日语、韩语。</h1>
            <p>平台整合分级课程、互动练习、学习数据追踪、注册登录、智能推荐、社区互助与成就激励，让学习者每天都知道下一步该练什么。</p>
            <div class="hero-actions">
              <a class="primary-btn" href="#auth">📝 免费注册</a>
              <a class="secondary-btn" href="#practice">🎯 开始体验</a>
            </div>
          </div>
          <div class="dashboard-card" aria-label="学习进度概览">
            <div class="card-header"><span>${state.user ? `${state.user.name} 的学习仪表盘` : '游客体验仪表盘'}</span><span class="flame">🔥</span></div>
            <div class="progress-ring" style="--progress: ${lessonProgress}%"><strong>${lessonProgress}%</strong><span>${state.selectedLanguage.name} 课程进度</span></div>
            <div class="metric-grid">
              ${metric('累计单词', state.completed.words)}
              ${metric('口语跟读', state.completed.speaking)}
              ${metric('听力训练', state.completed.listening)}
            </div>
          </div>
        </div>
      </section>

      <section id="courses" class="section">
        <div class="section-heading"><span>01 / 分级课程体系</span><h2>主流语言全覆盖，课程按能力等级逐步解锁。</h2></div>
        <div class="language-tabs" role="tablist" aria-label="选择学习语言">
          ${languages.map((language) => `<button data-language="${language.id}" class="${state.selectedLanguage.id === language.id ? 'active' : ''}"><span>${language.flag}</span>${language.name}</button>`).join('')}
        </div>
        <div class="course-grid">
          ${state.selectedLanguage.levels.map((level, index) => `
            <article class="course-card">
              <div class="level-badge">Level ${index + 1} · ${level.code}</div>
              <h3>${level.title}</h3><p>${level.focus}</p>
              <div class="mini-progress"><span style="width: ${Math.min(100, Math.max(15, lessonProgress - index * 18))}%"></span></div>
              <small>${level.lessons} 节课 · ${state.selectedLanguage.tagline}</small>
            </article>`).join('')}
        </div>
      </section>

      <section id="practice" class="section split-section">
        <div>
          <div class="section-heading compact"><span>02 / 互动式学习模块</span><h2>单词、语法、口语、听力四线并进。</h2></div>
          <div class="module-list">
            ${learningModules.map((module) => `
              <button data-module="${module.id}" class="${state.currentModule === module.id ? 'module active' : 'module'}">
                <span class="module-icon">${module.icon}</span><span><strong>${module.title}</strong>${module.description}</span>
              </button>`).join('')}
          </div>
        </div>
        <article class="practice-panel">
          <div class="panel-icon">${activeModule.icon}</div><h3>${activeModule.title}</h3><p>${activeModule.sample}</p>
          <div class="exercise-box"><span>沉浸任务</span><strong>${state.selectedLanguage.name} · ${recommendedPath.level.code}</strong><p>${recommendedPath.tasks[1]}</p></div>
          <button class="primary-btn full" id="completePractice">✅ 完成一次练习</button>
        </article>
      </section>

      <section class="section analytics-section">
        <div class="section-heading compact"><span>03 / 学习进度追踪</span><h2>关键学习数据实时反馈，帮助用户坚持复盘。</h2></div>
        <div class="analytics-grid">
          ${progressCard('课程完成度', lessonProgress)}
          ${progressCard('词汇目标', Math.min(100, Math.round((state.completed.words / 1800) * 100)))}
          ${progressCard('听说训练', Math.min(100, Math.round(((state.completed.speaking + state.completed.listening) / 80) * 100)))}
        </div>
      </section>

      <section id="auth" class="section split-section auth-section">
        <div class="section-heading compact"><span>04 / 用户注册登录</span><h2>${state.user ? `欢迎回来，${state.user.name}` : '创建账号，保存学习目标和进度。'}</h2><p>本原型使用浏览器本地存储模拟注册/登录状态，便于快速体验学习闭环。</p></div>
        <form class="auth-card" id="authForm">
          <label>昵称<input id="nameInput" value="${escapeHtml(state.form.name)}" placeholder="请输入昵称" /></label>
          <label>学习目标<select id="goalInput">${['职场提升', '考试备考', '旅行交流', '兴趣文化'].map((goal) => `<option ${state.form.goal === goal ? 'selected' : ''}>${goal}</option>`).join('')}</select></label>
          <label>每日学习时长<input id="minutesInput" type="number" min="10" max="120" value="${state.form.minutes}" /></label>
          <button class="primary-btn full" type="submit">🔐 ${state.user ? '更新学习档案' : '注册 / 登录'}</button>
        </form>
      </section>

      <section class="section recommendation-section">
        <div class="section-heading compact"><span>05 / 个性化学习路径推荐</span><h2>${recommendedPath.intensity}路径：围绕「${state.user?.goal || state.form.goal}」动态安排任务。</h2></div>
        <div class="path-card"><span class="route-icon">🧭</span><div><strong>当前推荐级别：${state.selectedLanguage.name} ${recommendedPath.level.code}</strong><ul>${recommendedPath.tasks.map((task) => `<li>${task}</li>`).join('')}</ul></div></div>
      </section>

      <section id="community" class="section community-section">
        <div class="section-heading compact"><span>06 / 社区交流及成就激励</span><h2>和同伴一起打卡、提问、分享成果。</h2></div>
        <div class="community-grid">
          <div class="topics">${communityTopics.map((topic) => `<article class="topic"><span>💬</span><div><strong>${topic.user} · ${topic.badge}</strong><p>${topic.text}</p></div></article>`).join('')}</div>
          <div class="achievement-card"><h3>🏆 成就徽章</h3>${achievements.map((achievement) => `<div class="achievement"><span>${achievement.name}</span><div><i style="width: ${achievement.progress}%"></i></div></div>`).join('')}</div>
        </div>
      </section>
    </main>`;

  bindEvents();
}

function metric(label, value) {
  return `<div class="metric"><strong>${value}</strong><span>${label}</span></div>`;
}

function progressCard(title, value) {
  return `<article class="progress-card"><span>${title}</span><strong>${value}%</strong><div class="bar"><i style="width: ${value}%"></i></div></article>`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

function bindEvents() {
  document.querySelectorAll('[data-language]').forEach((button) => {
    button.addEventListener('click', () => {
      state.selectedLanguage = languages.find((language) => language.id === button.dataset.language);
      render();
    });
  });

  document.querySelectorAll('[data-module]').forEach((button) => {
    button.addEventListener('click', () => {
      state.currentModule = button.dataset.module;
      render();
    });
  });

  document.getElementById('completePractice').addEventListener('click', () => {
    state.completed.lessons += 1;
    state.completed.words += state.currentModule === 'vocab' ? 24 : 8;
    state.completed.speaking += state.currentModule === 'speaking' ? 1 : 0;
    state.completed.listening += state.currentModule === 'listening' ? 1 : 0;
    render();
  });

  document.getElementById('authForm').addEventListener('submit', (event) => {
    event.preventDefault();
    state.form = {
      name: document.getElementById('nameInput').value,
      goal: document.getElementById('goalInput').value,
      minutes: Number(document.getElementById('minutesInput').value),
    };
    state.user = {
      name: state.form.name.trim() || '新同学',
      goal: state.form.goal,
      minutes: state.form.minutes,
    };
    localStorage.setItem('polyglot-user', JSON.stringify(state.user));
    render();
    document.getElementById('auth').scrollIntoView({ behavior: 'smooth' });
  });
}

render();
