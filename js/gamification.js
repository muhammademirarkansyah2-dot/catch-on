// LinguaPath - Gamification System
const Gamification = {
  getState() {
    const def = { xp: 2450, level: 8, streak: 12, longestStreak: 18, badges: [1,2,3,6,9], quizCount: 34, perfectQuiz: 1, freezeCount: 2, lastActive: new Date().toDateString() };
    try { return JSON.parse(localStorage.getItem('lp_gamification')) || def; } catch { return def; }
  },
  save(state) { localStorage.setItem('lp_gamification', JSON.stringify(state)); },
  
  addXP(amount, source = 'quiz') {
    const state = this.getState();
    state.xp += amount;
    while (state.xp >= this.xpForLevel(state.level + 1)) { state.xp -= this.xpForLevel(state.level + 1); state.level++; this.showToast(`🎉 Level Up! You're now Level ${state.level}`, 'level'); }
    this.save(state);
    this.showToast(`+${amount} XP earned!`, 'xp');
    return state;
  },
  
  xpForLevel(level) { return level * 100; },
  
  updateStreak() {
    const state = this.getState();
    const today = new Date().toDateString();
    if (state.lastActive === today) return state;
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (state.lastActive === yesterday) { state.streak++; } else if (state.lastActive !== today) { state.streak = 1; }
    state.longestStreak = Math.max(state.longestStreak, state.streak);
    state.lastActive = today;
    this.save(state);
    return state;
  },
  
  earnBadge(badgeId) {
    const state = this.getState();
    if (!state.badges.includes(badgeId)) {
      state.badges.push(badgeId);
      this.save(state);
      const badge = BADGES.find(b => b.id === badgeId);
      if (badge) this.showToast(`${badge.icon} Badge Earned: ${badge.name}!`, 'badge');
    }
  },
  
  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type} animate-toast`;
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 4200);
  },
  
  renderStats(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const s = this.getState();
    const pct = Math.round((s.xp / this.xpForLevel(s.level + 1)) * 100);
    el.innerHTML = `
      <div class="stat-card"><div class="stat-icon">⚡</div><div class="stat-value">${s.xp.toLocaleString()}</div><div class="stat-label">Total XP</div></div>
      <div class="stat-card"><div class="stat-icon">📊</div><div class="stat-value">${s.level}</div><div class="stat-label">Level</div><div class="xp-bar"><div class="xp-fill" style="width:${pct}%"></div></div></div>
      <div class="stat-card"><div class="stat-icon animate-flame">🔥</div><div class="stat-value">${s.streak}</div><div class="stat-label">Day Streak</div></div>
      <div class="stat-card"><div class="stat-icon">🏆</div><div class="stat-value">${s.badges.length}</div><div class="stat-label">Badges</div></div>`;
  }
};
