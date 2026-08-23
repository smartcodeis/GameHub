const levels = {
  easy: {
    rows: 4,
    cols: 4,
    pairs: 8
  },
  medium: {
    rows: 4,
    cols: 5,
    pairs: 10
  },
  hard: {
    rows: 6,
    cols: 6,
    pairs: 18
  }
};

const symbols = [
  "🍎", "🍕", "🚀", "🎮", "🐼", "🦊",
  "🌈", "⚡", "🎧", "🍩", "🐸", "🦄",
  "🌙", "🔥", "🍔", "⚽", "🎲", "💎"
];

const board = document.getElementById("gameBoard");
const timerEl = document.getElementById("timer");
const movesEl = document.getElementById("moves");
const bestEl = document.getElementById("best");
const messageEl = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");
const playAgainBtn = document.getElementById("playAgainBtn");
const winModal = document.getElementById("winModal");
const winText = document.getElementById("winText");
const levelButtons = document.querySelectorAll(".level");

let currentLevel = "easy";
let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedPairs = 0;
let seconds = 0;
let timer = null;
let started = false;

function shuffle(array) {
  const arr = [...array];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

function getBest() {
  return Number(localStorage.getItem(`memory-best-${currentLevel}`)) || null;
}

function updateBestDisplay() {
  const best = getBest();

  if (!best) {
    bestEl.textContent = "—";
    return;
  }

  bestEl.textContent = `${best.moves} / ${formatTime(best.time)}`;
}

function formatTime(value) {
  const mins = Math.floor(value / 60).toString().padStart(2, "0");
  const secs = (value % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

function updateTimer() {
  timerEl.textContent = formatTime(seconds);
}

function startTimer() {
  if (timer || started) return;

  started = true;

  timer = setInterval(() => {
    seconds++;
    updateTimer();
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  timer = null;
}

function createDeck() {
  const { pairs } = levels[currentLevel];
  const selected = symbols.slice(0, pairs);
  return shuffle([...selected, ...selected]);
}

function setupBoard() {
  const { rows, cols } = levels[currentLevel];

  board.innerHTML = "";
  board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

  cards = createDeck();

  cards.forEach((symbol, index) => {
    const card = document.createElement("button");
    card.className = "card";
    card.type = "button";
    card.dataset.symbol = symbol;
    card.dataset.index = index;

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-face card-front"></div>
        <div class="card-face card-back">${symbol}</div>
      </div>
    `;

    card.addEventListener("click", () => handleCardClick(card));
    board.appendChild(card);
  });
}

function handleCardClick(card) {
  if (
    lockBoard ||
    card === firstCard ||
    card.classList.contains("matched")
  ) {
    return;
  }

  startTimer();

  card.classList.add("flipped");

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  moves++;
  movesEl.textContent = moves;

  checkMatch();
}

function checkMatch() {
  const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;

  if (isMatch) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    matchedPairs++;
    resetTurn();

    if (matchedPairs === levels[currentLevel].pairs) {
      finishGame();
    }

    return;
  }

  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetTurn();
  }, 750);
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function finishGame() {
  stopTimer();

  const previousBest = getBest();
  const score = {
    moves,
    time: seconds
  };

  let isBest = false;

  if (
    !previousBest ||
    moves < previousBest.moves ||
    (moves === previousBest.moves && seconds < previousBest.time)
  ) {
    localStorage.setItem(
      `memory-best-${currentLevel}`,
      JSON.stringify(score)
    );

    isBest = true;
    updateBestDisplay();
  }

  messageEl.textContent = "All pairs matched!";

  winText.textContent = isBest
    ? `New best score! ${moves} moves in ${formatTime(seconds)}.`
    : `You finished in ${moves} moves and ${formatTime(seconds)}.`;

  setTimeout(() => {
    winModal.classList.remove("hidden");
  }, 450);
}

function startGame() {
  stopTimer();

  firstCard = null;
  secondCard = null;
  lockBoard = false;
  moves = 0;
  matchedPairs = 0;
  seconds = 0;
  started = false;

  movesEl.textContent = "0";
  timerEl.textContent = "00:00";
  messageEl.textContent = "Find all matching pairs.";

  updateBestDisplay();
  setupBoard();
}

function selectLevel(level) {
  currentLevel = level;

  levelButtons.forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.level === level
    );
  });

  winModal.classList.add("hidden");
  startGame();
}

levelButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (button.dataset.level !== currentLevel) {
      selectLevel(button.dataset.level);
    }
  });
});

restartBtn.addEventListener("click", startGame);
playAgainBtn.addEventListener("click", () => {
  winModal.classList.add("hidden");
  startGame();
});

startGame();
