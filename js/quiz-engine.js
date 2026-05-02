// LinguaPath - Quiz Engine
const QuizEngine = {
  questions: [], current: 0, answers: {}, timer: null, timeLeft: 0, started: false, submitted: false,

  init(quizType = 'all') {
    this.questions = quizType === 'all' ? [...QUESTIONS] : QUESTIONS.filter(q => q.quiz.toLowerCase().includes(quizType.toLowerCase()));
    this.current = 0; this.answers = {}; this.submitted = false; this.started = false;
    this.render();
  },

  start(duration = 600) {
    this.started = true; this.timeLeft = duration;
    this.renderQuestion();
    this.timer = setInterval(() => {
      this.timeLeft--;
      this.updateTimer();
      if (this.timeLeft <= 0) { clearInterval(this.timer); this.submit(); }
    }, 1000);
    document.getElementById('quiz-start')?.classList.add('hidden');
    document.getElementById('quiz-active')?.classList.remove('hidden');
  },

  updateTimer() {
    const el = document.getElementById('quiz-timer');
    if (!el) return;
    const m = Math.floor(this.timeLeft / 60), s = this.timeLeft % 60;
    el.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    if (this.timeLeft <= 60) el.classList.add('timer-danger');
  },

  renderQuestion() {
    const q = this.questions[this.current];
    const panel = document.getElementById('quiz-question');
    if (!panel || !q) return;

    let optionsHTML = '';
    if (q.type === 'fill') {
      const saved = this.answers[q.id] || '';
      optionsHTML = `<div class="fill-input-wrap"><input type="text" id="fill-answer" class="fill-input" placeholder="Type your answer..." value="${saved}" oninput="QuizEngine.answers[${q.id}]=this.value"></div>`;
    } else {
      const opts = q.options || [];
      optionsHTML = opts.map((o, i) => {
        const sel = this.answers[q.id] === i ? 'selected' : '';
        return `<button class="quiz-option ${sel}" onclick="QuizEngine.selectAnswer(${q.id},${i},this)">${String.fromCharCode(65+i)}. ${o}</button>`;
      }).join('');
    }

    panel.innerHTML = `
      <div class="question-header"><span class="question-num">Question ${this.current+1} of ${this.questions.length}</span><span class="question-type badge-${q.type}">${q.type === 'mc' ? 'Multiple Choice' : q.type === 'tf' ? 'True / False / NG' : 'Fill in Blank'}</span></div>
      <p class="question-text">${q.text}</p>
      <div class="options-grid">${optionsHTML}</div>`;
    this.renderNav();
  },

  selectAnswer(qId, idx, btn) {
    this.answers[qId] = idx;
    btn.parentElement.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  },

  navigate(dir) {
    this.current = Math.max(0, Math.min(this.questions.length - 1, this.current + dir));
    this.renderQuestion();
  },

  renderNav() {
    const nav = document.getElementById('quiz-nav');
    if (!nav) return;
    nav.innerHTML = this.questions.map((q, i) => {
      const answered = this.answers[q.id] !== undefined ? 'answered' : '';
      const active = i === this.current ? 'active' : '';
      return `<button class="nav-btn ${answered} ${active}" onclick="QuizEngine.current=${i};QuizEngine.renderQuestion()">${i+1}</button>`;
    }).join('');
  },

  submit() {
    if (this.submitted) return;
    this.submitted = true;
    clearInterval(this.timer);
    let correct = 0;
    this.questions.forEach(q => {
      if (q.type === 'fill') { if ((this.answers[q.id] || '').toLowerCase().trim() === q.answer.toLowerCase()) correct++; }
      else { if (this.answers[q.id] === q.correct) correct++; }
    });
    const score = Math.round((correct / this.questions.length) * 100);
    const xpEarned = correct * 10 + (score === 100 ? 50 : 0);
    Gamification.addXP(xpEarned, 'quiz');
    if (score === 100) Gamification.earnBadge(3);
    this.renderResults(correct, score, xpEarned);
  },

  renderResults(correct, score, xp) {
    const panel = document.getElementById('quiz-active');
    if (!panel) return;
    const emoji = score >= 90 ? '🎉' : score >= 70 ? '👏' : score >= 50 ? '💪' : '📚';
    panel.innerHTML = `
      <div class="quiz-results animate-scale">
        <div class="result-emoji">${emoji}</div>
        <h2>Quiz Complete!</h2>
        <div class="result-score">${score}%</div>
        <div class="result-details">
          <div class="result-item"><span>Correct</span><strong>${correct}/${this.questions.length}</strong></div>
          <div class="result-item"><span>XP Earned</span><strong>+${xp} XP</strong></div>
          <div class="result-item"><span>Time</span><strong>${this.formatTime()}</strong></div>
        </div>
        <div class="result-actions">
          <button class="btn btn-primary" onclick="QuizEngine.showReview()">Review Answers</button>
          <button class="btn btn-outline" onclick="QuizEngine.init()">Try Again</button>
        </div>
      </div>`;
  },

  showReview() {
    const panel = document.getElementById('quiz-active');
    if (!panel) return;
    let html = '<div class="review-container"><h2>Answer Review</h2>';
    this.questions.forEach((q, i) => {
      let userAns, correctAns, isCorrect;
      if (q.type === 'fill') {
        userAns = this.answers[q.id] || '(no answer)';
        correctAns = q.answer;
        isCorrect = userAns.toLowerCase().trim() === correctAns.toLowerCase();
      } else {
        userAns = q.options[this.answers[q.id]] || '(no answer)';
        correctAns = q.options[q.correct];
        isCorrect = this.answers[q.id] === q.correct;
      }
      html += `<div class="review-item ${isCorrect ? 'correct' : 'wrong'}">
        <div class="review-num">${i+1}</div>
        <div class="review-body"><p class="review-q">${q.text}</p>
        <p>Your answer: <strong>${userAns}</strong></p>
        ${!isCorrect ? `<p class="correct-answer">Correct: <strong>${correctAns}</strong></p>` : ''}
        <p class="review-explanation">${q.explanation}</p></div></div>`;
    });
    html += `<button class="btn btn-primary" onclick="QuizEngine.init()" style="margin-top:1.5rem">Back to Quiz</button></div>`;
    panel.innerHTML = html;
  },

  formatTime() {
    const used = 600 - this.timeLeft;
    const m = Math.floor(used / 60), s = used % 60;
    return `${m}m ${s}s`;
  },

  render() {
    const container = document.getElementById('quiz-container');
    if (!container) return;
    container.innerHTML = `
      <div id="quiz-start" class="quiz-start-screen">
        <h2>Choose Your Quiz</h2>
        <p>Select a program and test your knowledge</p>
        <div class="quiz-categories">
          <button class="quiz-cat-btn" onclick="QuizEngine.init('ielts');QuizEngine.start(600)"><span class="cat-icon">🌍</span><span>IELTS</span></button>
          <button class="quiz-cat-btn" onclick="QuizEngine.init('toefl');QuizEngine.start(600)"><span class="cat-icon">🎓</span><span>TOEFL</span></button>
          <button class="quiz-cat-btn" onclick="QuizEngine.init('toep');QuizEngine.start(600)"><span class="cat-icon">📝</span><span>TOEP</span></button>
          <button class="quiz-cat-btn" onclick="QuizEngine.init('all');QuizEngine.start(600)"><span class="cat-icon">📚</span><span>All Questions</span></button>
        </div>
      </div>
      <div id="quiz-active" class="hidden">
        <div class="quiz-toolbar"><div id="quiz-timer" class="quiz-timer">10:00</div><button class="btn btn-sm btn-danger" onclick="QuizEngine.submit()">Submit Quiz</button></div>
        <div class="quiz-layout"><div id="quiz-question" class="quiz-question-panel"></div><div id="quiz-nav" class="quiz-nav-panel"></div></div>
        <div class="quiz-controls"><button class="btn btn-outline" onclick="QuizEngine.navigate(-1)">← Previous</button><button class="btn btn-primary" onclick="QuizEngine.navigate(1)">Next →</button></div>
      </div>`;
  }
};

document.addEventListener('keydown', e => {
  if (!QuizEngine.started || QuizEngine.submitted) return;
  if (e.key >= '1' && e.key <= '4') {
    const idx = parseInt(e.key) - 1;
    const q = QuizEngine.questions[QuizEngine.current];
    if (q && q.options && idx < q.options.length) {
      QuizEngine.selectAnswer(q.id, idx, document.querySelectorAll('.quiz-option')[idx]);
      QuizEngine.renderQuestion();
    }
  }
  if (e.key === 'ArrowRight' || e.key === 'n') QuizEngine.navigate(1);
  if (e.key === 'ArrowLeft' || e.key === 'p') QuizEngine.navigate(-1);
});
