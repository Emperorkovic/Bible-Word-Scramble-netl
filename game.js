// Bible Word Scramble - Game Logic

let currentDiff = 'easy';
let currentCat = 'all';
let currentWord = null;
let score = 0;
let streak = 0;
let bestStreak = 0;
let round = 0;
let totalRounds = 10;
let correctCount = 0;
let hintUsed = false;
let timerInterval = null;
let timeLeft = 30;
let gameWords = [];
let usedWords = new Set();

// DOM refs
const scrambledEl = document.getElementById('scrambledWord');
const answerInput = document.getElementById('answerInput');
const submitBtn = document.getElementById('submitBtn');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score');
const streakEl = document.getElementById('streak');
const roundEl = document.getElementById('round');
const timerEl = document.getElementById('timer');
const hintBox = document.getElementById('hintBox');
const hintContent = document.getElementById('hintContent');
const hintText = document.getElementById('hintText');
const letterTilesEl = document.getElementById('letterTiles');
const progressBar = document.getElementById('progressBar');
const catBadge = document.getElementById('catBadge');
const endScreen = document.getElementById('endScreen');
const gameCard = document.getElementById('gameCard');

// Scramble a word
function scramble(word) {
  let arr = word.split('');
  let scrambled;
  let tries = 0;
  do {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    scrambled = arr.join('');
    tries++;
  } while (scrambled === word && tries < 20);
  return scrambled;
}

function getWordPool() {
  const db = WORD_DATABASE[currentDiff];
  let pool = [];
  if (currentCat === 'all') {
    Object.values(db).forEach(arr => pool.push(...arr));
  } else {
    pool = db[currentCat] || [];
    if (!pool.length) Object.values(db).forEach(arr => pool.push(...arr));
  }
  return pool.filter(w => !usedWords.has(w.word));
}

function startGame() {
  score = 0; streak = 0; bestStreak = 0; round = 0; correctCount = 0;
  usedWords.clear();
  updateScoreDisplay();
  endScreen.classList.add('hidden');
  gameCard.classList.remove('hidden');
  nextWord();
}

function nextWord() {
  if (round >= totalRounds) { endGame(); return; }
  round++;
  hintUsed = false;
  hintBox.classList.add('hidden');
  hintText.textContent = '💡 Tap for hint';
  answerInput.value = '';
  feedbackEl.textContent = '';
  answerInput.disabled = false;
  submitBtn.disabled = false;

  const pool = getWordPool();
  if (!pool.length) { usedWords.clear(); }
  const wordPool = getWordPool();
  if (!wordPool.length) { endGame(); return; }

  currentWord = wordPool[Math.floor(Math.random() * wordPool.length)];
  usedWords.add(currentWord.word);

  catBadge.textContent = currentCat === 'all' ? 'Scripture' : currentCat.charAt(0).toUpperCase() + currentCat.slice(1);

  const sc = scramble(currentWord.word);
  scrambledEl.textContent = sc;
  scrambledEl.classList.remove('correct-anim', 'wrong-anim');

  renderLetterTiles(sc);
  updateRoundDisplay();
  startTimer();
}

function renderLetterTiles(scrambled) {
  letterTilesEl.innerHTML = '';
  scrambled.split('').forEach((ch, i) => {
    const tile = document.createElement('span');
    tile.className = 'tile';
    tile.textContent = ch;
    tile.style.animationDelay = (i * 0.05) + 's';
    letterTilesEl.appendChild(tile);
  });
}

function startTimer() {
  clearInterval(timerInterval);
  const timeLimits = { easy: 40, medium: 30, hard: 20 };
  timeLeft = timeLimits[currentDiff];
  timerEl.textContent = timeLeft;
  timerEl.style.color = '';
  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 10) timerEl.style.color = '#c0392b';
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timeUp();
    }
  }, 1000);
}

function timeUp() {
  streak = 0;
  showFeedback(`⏰ Time's up! The word was ${currentWord.word}`, false);
  answerInput.disabled = true;
  submitBtn.disabled = true;
  updateScoreDisplay();
  setTimeout(nextWord, 2000);
}

function checkAnswer() {
  clearInterval(timerInterval);
  const answer = answerInput.value.trim().toUpperCase();
  if (!answer) return;
  answerInput.disabled = true;
  submitBtn.disabled = true;

  if (answer === currentWord.word) {
    const timeBonus = Math.floor(timeLeft * 2);
    const hintPenalty = hintUsed ? 5 : 0;
    const diffBonus = { easy: 10, medium: 20, hard: 35 }[currentDiff];
    const points = diffBonus + timeBonus - hintPenalty;
    score += points;
    streak++;
    correctCount++;
    if (streak > bestStreak) bestStreak = streak;
    scrambledEl.classList.add('correct-anim');
    showFeedback(`✅ Correct! +${points} pts — ${currentWord.verse}`, true);
  } else {
    streak = 0;
    scrambledEl.classList.add('wrong-anim');
    showFeedback(`❌ The word was: ${currentWord.word}`, false);
  }
  updateScoreDisplay();
  setTimeout(nextWord, 2200);
}

function showFeedback(msg, correct) {
  feedbackEl.textContent = msg;
  feedbackEl.className = 'feedback ' + (correct ? 'correct' : 'wrong');
}

function updateScoreDisplay() {
  scoreEl.textContent = score;
  streakEl.textContent = '🔥 ' + streak;
  roundEl.textContent = `${round} / ${totalRounds}`;
  progressBar.style.width = ((round / totalRounds) * 100) + '%';
}

function updateRoundDisplay() {
  roundEl.textContent = `${round} / ${totalRounds}`;
  progressBar.style.width = (((round - 1) / totalRounds) * 100) + '%';
}

function endGame() {
  clearInterval(timerInterval);
  gameCard.classList.add('hidden');
  endScreen.classList.remove('hidden');

  const isPerfect = correctCount === totalRounds;
  const endCard = document.querySelector('.end-card');

  if (isPerfect) {
    endCard.classList.add('perfect-score');
    document.querySelector('.end-icon').textContent = '👑';
    document.querySelector('.end-card h2').innerHTML = 'PERFECT SCORE! 🏆';
    document.getElementById('endVerse').innerHTML = `
      <div class="perfect-banner">
        ⭐ 10/10 on ${currentDiff.toUpperCase()} mode! ⭐<br>
        <small>Screenshot & share with #BibleWordScramble 📸</small>
      </div>
    `;
    launchConfetti();
  } else {
    endCard.classList.remove('perfect-score');
    document.querySelector('.end-icon').textContent = '✝';
    document.querySelector('.end-card h2').textContent = 'Round Complete!';
    const verse = END_VERSES[Math.floor(Math.random() * END_VERSES.length)];
    document.getElementById('endVerse').innerHTML = `"${verse.text}" <em>— ${verse.ref}</em>`;
  }

  document.getElementById('finalScore').textContent = score;
  document.getElementById('finalCorrect').textContent = correctCount + '/' + totalRounds;
  document.getElementById('finalStreak').textContent = bestStreak;
  saveScore(score, correctCount);
}

function launchConfetti() {
  const colors = ['#c8961a', '#4a7c28', '#f5efd8', '#2d5016', '#e8b84b'];
  for (let i = 0; i < 80; i++) {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
      position:fixed;top:-10px;
      left:${Math.random() * 100}vw;
      width:${6 + Math.random() * 8}px;
      height:${6 + Math.random() * 8}px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
      animation:confettiFall ${2 + Math.random() * 3}s ease-in forwards;
      animation-delay:${Math.random() * 1.5}s;
      z-index:9999;pointer-events:none;
    `;
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 5000);
  }
}

function saveScore(sc, correct) {
  const scores = JSON.parse(localStorage.getItem('bws_scores') || '[]');
  scores.unshift({ score: sc, correct, diff: currentDiff, date: new Date().toLocaleDateString() });
  if (scores.length > 10) scores.pop();
  localStorage.setItem('bws_scores', JSON.stringify(scores));
  renderLeaderboard();
}

function renderLeaderboard() {
  const scores = JSON.parse(localStorage.getItem('bws_scores') || '[]');
  const el = document.getElementById('leaderboard');
  if (!scores.length) { el.innerHTML = '<p class="no-scores">Play a round to see your scores here!</p>'; return; }
  el.innerHTML = scores.map((s, i) => `
    <div class="lb-row">
      <span class="lb-rank">${i + 1}</span>
      <span class="lb-info">${s.diff.toUpperCase()} — ${s.date}</span>
      <span class="lb-correct">${s.correct}/10</span>
      <span class="lb-score">${s.score} pts</span>
    </div>
  `).join('');
}

// Word of the Day
function renderWordOfDay() {
  const dayIndex = Math.floor(Date.now() / 86400000) % WORD_OF_DAY_LIST.length;
  const wod = WORD_OF_DAY_LIST[dayIndex];
  document.getElementById('wodWord').textContent = wod.word;
  document.getElementById('wodMeaning').textContent = wod.meaning;
  document.getElementById('wodVerse').textContent = wod.verse;
}

// Event listeners
submitBtn.addEventListener('click', checkAnswer);
answerInput.addEventListener('keydown', e => { if (e.key === 'Enter') checkAnswer(); });

document.getElementById('hintBtn').addEventListener('click', () => {
  if (!hintUsed) { hintUsed = true; hintContent.textContent = '💡 ' + currentWord.hint; hintBox.classList.remove('hidden'); }
});

hintText.addEventListener('click', () => {
  hintContent.textContent = '💡 ' + currentWord.hint; hintBox.classList.remove('hidden');
});

document.getElementById('skipBtn').addEventListener('click', () => {
  clearInterval(timerInterval);
  streak = 0;
  showFeedback(`⏭ Skipped. The word was: ${currentWord.word}`, false);
  answerInput.disabled = true;
  submitBtn.disabled = true;
  updateScoreDisplay();
  setTimeout(nextWord, 1500);
});

document.getElementById('shuffleBtn').addEventListener('click', () => {
  const sc = scramble(currentWord.word);
  scrambledEl.textContent = sc;
  renderLetterTiles(sc);
});

document.getElementById('playAgainBtn').addEventListener('click', startGame);

document.getElementById('shareBtn').addEventListener('click', () => {
  const text = `I scored ${score} points on Bible Word Scramble! 🙏✝️ Can you beat me? Play at ${window.location.href}`;
  if (navigator.share) {
    navigator.share({ title: 'Bible Word Scramble', text });
  } else {
    navigator.clipboard.writeText(text).then(() => alert('Score copied to clipboard!'));
  }
});

// Difficulty tabs
document.querySelectorAll('.diff-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentDiff = btn.dataset.diff;
    startGame();
  });
});

// Category tabs
document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCat = btn.dataset.cat;
    startGame();
  });
});

// Hamburger
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobileNav').classList.toggle('open');
});

// Init
renderWordOfDay();
renderLeaderboard();
startGame();
