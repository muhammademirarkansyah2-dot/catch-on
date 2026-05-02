// LinguaPath - Main App
const App = {
  init() {
    this.initTheme();
    this.initNav();
    this.initScrollReveal();
    this.initMobileMenu();
    Gamification.updateStreak();
    if (document.getElementById('gamification-stats')) Gamification.renderStats('gamification-stats');
    if (document.getElementById('quiz-container')) QuizEngine.render();
    if (document.getElementById('courses-grid')) this.renderCourses();
    if (document.getElementById('pricing-grid')) this.renderPricing();
    if (document.getElementById('leaderboard-table')) this.renderLeaderboard();
    if (document.getElementById('progress-content')) this.renderProgress();
    if (document.getElementById('testimonials-track')) this.renderTestimonials();
    if (document.getElementById('hero-stats')) this.renderHeroStats();
    if (document.getElementById('featured-courses')) this.renderFeaturedCourses();
    this.initCounters();
  },

  // Theme
  initTheme() {
    const saved = localStorage.getItem('lp_theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      toggle.textContent = saved === 'dark' ? '☀️' : '🌙';
      toggle.addEventListener('click', () => {
        const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('lp_theme', next);
        toggle.textContent = next === 'dark' ? '☀️' : '🌙';
      });
    }
  },

  // Navbar scroll
  initNav() {
    const nav = document.querySelector('.navbar');
    if (!nav) return;
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    });
  },

  // Mobile menu
  initMobileMenu() {
    const burger = document.getElementById('menu-toggle');
    const menu = document.getElementById('nav-menu');
    if (burger && menu) {
      burger.addEventListener('click', () => {
        menu.classList.toggle('open');
        burger.classList.toggle('active');
      });
    }
  },

  // Scroll reveal
  initScrollReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
    }, { threshold: 0.1 });
    els.forEach(el => observer.observe(el));
  },

  // Animated counters
  initCounters() {
    document.querySelectorAll('[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count);
      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          let current = 0;
          const step = Math.ceil(target / 60);
          const interval = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(interval); }
            el.textContent = current.toLocaleString() + (el.dataset.suffix || '');
          }, 20);
          observer.disconnect();
        }
      });
      observer.observe(el);
    });
  },

  // Hero stats
  renderHeroStats() {
    const el = document.getElementById('hero-stats');
    if (!el) return;
    el.innerHTML = `
      <div class="hero-stat"><span class="hero-stat-num" data-count="5200" data-suffix="+">0</span><span class="hero-stat-label">Active Students</span></div>
      <div class="hero-stat"><span class="hero-stat-num" data-count="150" data-suffix="+">0</span><span class="hero-stat-label">Quiz Questions</span></div>
      <div class="hero-stat"><span class="hero-stat-num" data-count="98" data-suffix="%">0</span><span class="hero-stat-label">Satisfaction</span></div>
      <div class="hero-stat"><span class="hero-stat-num" data-count="12" data-suffix="">0</span><span class="hero-stat-label">Expert Instructors</span></div>`;
    this.initCounters();
  },

  // Featured courses (home)
  renderFeaturedCourses() {
    const el = document.getElementById('featured-courses');
    if (!el) return;
    el.innerHTML = COURSES.slice(0, 4).map(c => this.courseCard(c)).join('');
  },

  // Courses page
  renderCourses() {
    const el = document.getElementById('courses-grid');
    if (!el) return;
    const filter = document.getElementById('course-filter')?.value || 'all';
    const filtered = filter === 'all' ? COURSES : COURSES.filter(c => c.category.toLowerCase() === filter.toLowerCase());
    el.innerHTML = filtered.length ? filtered.map(c => this.courseCard(c)).join('') : '<p class="empty-state">No courses found for this filter.</p>';
  },

  courseCard(c) {
    return `<div class="course-card hover-lift reveal">
      <div class="course-img" style="background-image:url('${c.image}')"><span class="course-badge">${c.category}</span></div>
      <div class="course-body">
        <h3 class="course-title">${c.title}</h3>
        <p class="course-desc">${c.description}</p>
        <div class="course-meta"><span>⭐ ${c.rating}</span><span>👤 ${c.students.toLocaleString()}</span><span>📦 ${c.modules} modules</span></div>
        <div class="course-footer"><span class="course-price">Rp ${c.price.toLocaleString()}</span><button class="btn btn-sm btn-primary">Enroll Now</button></div>
      </div></div>`;
  },

  // Pricing
  renderPricing() {
    const el = document.getElementById('pricing-grid');
    if (!el) return;
    el.innerHTML = PACKAGES.map(p => `
      <div class="price-card ${p.popular ? 'popular' : ''} hover-lift reveal">
        ${p.popular ? '<div class="popular-tag">Most Popular</div>' : ''}
        <h3 class="price-name">${p.name}</h3>
        <div class="price-amount">Rp ${p.price.toLocaleString()}<span>/${p.duration}</span></div>
        <ul class="price-features">${p.features.map(f => `<li>✓ ${f}</li>`).join('')}</ul>
        <button class="btn ${p.popular ? 'btn-primary' : 'btn-outline'} btn-block">Get Started</button>
      </div>`).join('');
  },

  // Leaderboard
  renderLeaderboard() {
    const el = document.getElementById('leaderboard-table');
    if (!el) return;
    el.innerHTML = LEADERBOARD.map(u => {
      const medal = u.rank <= 3 ? ['🥇','🥈','🥉'][u.rank-1] : `#${u.rank}`;
      return `<div class="lb-row ${u.rank <= 3 ? 'top-three' : ''} reveal">
        <div class="lb-rank">${medal}</div>
        <div class="lb-avatar">${u.avatar}</div>
        <div class="lb-info"><span class="lb-name">${u.name}</span><span class="lb-program">${u.program}</span></div>
        <div class="lb-stats"><span class="lb-xp">⚡ ${u.xp.toLocaleString()} XP</span><span class="lb-streak">🔥 ${u.streak}d</span></div>
        <div class="lb-level">Lv.${u.level}</div>
      </div>`;
    }).join('');
  },

  // Testimonials
  renderTestimonials() {
    const el = document.getElementById('testimonials-track');
    if (!el) return;
    el.innerHTML = TESTIMONIALS.map(t => `
      <div class="testimonial-card">
        <div class="testimonial-avatar">${t.avatar}</div>
        <p class="testimonial-text">"${t.text}"</p>
        <div class="testimonial-author"><strong>${t.name}</strong><span>${t.score}</span></div>
      </div>`).join('');
  },

  // Progress dashboard
  renderProgress() {
    const el = document.getElementById('progress-content');
    if (!el) return;
    const u = USER_PROFILE;
    const pct = Math.round((u.xp % (u.level * 100)) / (u.level * 100) * 100);

    // Skills radar as bars
    const skills = Object.entries(u.skills).map(([k,v]) => `
      <div class="skill-row"><span class="skill-name">${k.charAt(0).toUpperCase()+k.slice(1)}</span>
      <div class="skill-bar"><div class="skill-fill" style="width:${v}%">${v}%</div></div></div>`).join('');

    // Weekly chart as CSS bars
    const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    const maxXP = Math.max(...u.weeklyXP);
    const chart = u.weeklyXP.map((xp,i) => `
      <div class="chart-col"><div class="chart-bar" style="height:${(xp/maxXP)*100}%"><span>${xp}</span></div><div class="chart-label">${days[i]}</div></div>`).join('');

    // Badges
    const badges = BADGES.map(b => {
      const earned = u.recentActivity ? b.earned : false;
      return `<div class="badge-item ${earned ? 'earned' : 'locked'}"><span class="badge-icon">${b.icon}</span><span class="badge-name">${b.name}</span></div>`;
    }).join('');

    // Activity
    const activity = u.recentActivity.map(a => `
      <div class="activity-row"><div class="activity-dot"></div><div class="activity-body"><strong>${a.action}</strong><p>${a.detail}</p></div><div class="activity-meta"><span class="activity-xp">+${a.xp} XP</span><span>${a.time}</span></div></div>`).join('');

    el.innerHTML = `
      <div class="progress-grid">
        <div class="pg-stats" id="gamification-stats"></div>
        <div class="pg-section reveal"><h3>Skill Breakdown</h3><div class="skills-chart">${skills}</div></div>
        <div class="pg-section reveal"><h3>Weekly XP</h3><div class="weekly-chart">${chart}</div></div>
        <div class="pg-section reveal"><h3>Badge Collection</h3><div class="badge-grid">${badges}</div></div>
        <div class="pg-section reveal"><h3>Recent Activity</h3><div class="activity-list">${activity}</div></div>
      </div>`;
    Gamification.renderStats('gamification-stats');
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
