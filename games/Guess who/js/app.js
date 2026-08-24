const cardElement = document.getElementById("card");
const questionElement = document.getElementById("question");
const cardNumberElement = document.getElementById("cardNumber");

const cluesList = document.getElementById("cluesList");
const controlsContainer = document.getElementById("controlsContainer");
const clueBtn = document.getElementById("clueBtn");
const showAnswerBtn = document.getElementById("showAnswerBtn");
const answerContentArea = document.getElementById("answerContentArea");
const answerText = document.getElementById("answerText");

const drawButton = document.getElementById("drawBtn");

const historyElement = document.getElementById("history");
const emptyHistory = document.getElementById("emptyHistory");

const clearHistoryButton = document.getElementById("clearHistory");
const cardCountElement = document.getElementById("cardCount");

const cluesIndicator = document.getElementById("cluesIndicator");
const revealedCountSpan = document.getElementById("revealedCount");
const totalCountSpan = document.getElementById("totalCount");

// Guess input elements
const guessArea = document.getElementById("guessArea");
const guessInput = document.getElementById("guessInput");
const guessSubmitBtn = document.getElementById("guessSubmitBtn");
const guessVerdict = document.getElementById("guessVerdict");
const verdictMessage = document.getElementById("verdictMessage");
const markCorrectBtn = document.getElementById("markCorrectBtn");
const markWrongBtn = document.getElementById("markWrongBtn");

// Card next button (shortcut on the card itself)
const cardNextBtn = document.getElementById("cardNextBtn");

// Score elements
const scoreCorrectEl = document.getElementById("scoreCorrect");
const scoreWrongEl   = document.getElementById("scoreWrong");
const scoreSkippedEl = document.getElementById("scoreSkipped");


let cards = [];
let history = [];
let currentCard = null;
let revealedCluesCount = 0;
let score = { correct: 0, wrong: 0, skipped: 0 };
let cardAnswered = false; // tracks if current card got a verdict


/* =========================
   LOAD CARDS
========================= */

async function loadCards() {
    try {
        const response = await fetch("data/cards.json");
        if (!response.ok) {
            throw new Error("Failed to load cards");
        }

        const data = await response.json();
        cards = data.cards || [];

        // Load saved state from localStorage
        const savedHistory = localStorage.getItem("history");
        history = savedHistory ? JSON.parse(savedHistory) : [];

        const savedScore = localStorage.getItem("score");
        score = savedScore ? JSON.parse(savedScore) : { correct: 0, wrong: 0, skipped: 0 };

        // Clear active card states so they do not persist on page refresh
        localStorage.removeItem("currentCard");
        localStorage.removeItem("revealedCluesCount");
        localStorage.removeItem("isAnswerShown");
        currentCard = null;
        revealedCluesCount = 0;
        cardAnswered = false;

        cardCountElement.textContent = cards.length;
        renderHistory();
        renderScore();

        // Active card is always cleared on reload
        questionElement.style.display = "block";
        questionElement.textContent = "اضغط على الزر بالأسفل لسحب كارت جديد وبدء اللعبة.";
        cluesList.style.display = "none";
        controlsContainer.style.display = "none";
        cluesIndicator.style.display = "none";
        answerContentArea.style.display = "none";
        cardNumberElement.textContent = "#";

        updateDrawButtonState();

    } catch (error) {
        console.error(error);
        questionElement.textContent = "عذراً، فشل تحميل الكروت.";
        drawButton.disabled = true;
    }
}


function updateDrawButtonState() {
    const usedIds = new Set(history.map(card => card.id));
    const availableCardsCount = cards.filter(card => !usedIds.has(card.id)).length;
    const noCards = (availableCardsCount === 0);
    drawButton.disabled = noCards;
    cardNextBtn.disabled = noCards;
}


/* =========================
   RENDER REVEALED CLUES
========================= */

function renderRevealedClues() {
    if (!currentCard || !currentCard.clues) return;

    cluesList.innerHTML = "";

    for (let i = 0; i < revealedCluesCount && i < currentCard.clues.length; i++) {
        const li = document.createElement("li");
        li.className = "clue-item";

        const bulb = document.createElement("span");
        bulb.textContent = "💡";

        const text = document.createElement("span");
        text.textContent = currentCard.clues[i];

        li.appendChild(bulb);
        li.appendChild(text);
        cluesList.appendChild(li);
    }

    revealedCountSpan.textContent = revealedCluesCount;
    totalCountSpan.textContent = currentCard.clues.length;

    clueBtn.disabled = (revealedCluesCount >= currentCard.clues.length);
}


/* =========================
   GET RANDOM UNUSED CARD
========================= */

function getRandomCard() {
    if (cards.length === 0) return null;

    const usedIds = new Set(history.map(card => card.id));
    const availableCards = cards.filter(card => !usedIds.has(card.id));

    if (availableCards.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * availableCards.length);
    return availableCards[randomIndex];
}


/* =========================
   DRAW CARD
========================= */

function drawCard() {
    // If there's an active unanswered card, count it as skipped
    if (currentCard && !cardAnswered) {
        score.skipped++;
        localStorage.setItem("score", JSON.stringify(score));
        renderScore();
    }

    const card = getRandomCard();

    if (!card) {
        questionElement.style.display = "block";
        questionElement.textContent = "لقد شاهدت جميع الكروت!";
        cardNumberElement.textContent = "✓";
        drawButton.disabled = true;
        cardNextBtn.disabled = true;

        cluesList.style.display = "none";
        controlsContainer.style.display = "none";
        cluesIndicator.style.display = "none";
        answerContentArea.style.display = "none";
        guessArea.style.display = "none";

        currentCard = null;
        cardAnswered = false;
        localStorage.removeItem("currentCard");
        localStorage.removeItem("revealedCluesCount");
        localStorage.removeItem("isAnswerShown");
        return;
    }

    currentCard = card;
    revealedCluesCount = 1; // Start with one clue revealed
    localStorage.setItem("currentCard", JSON.stringify(card));
    localStorage.setItem("revealedCluesCount", "1");
    localStorage.setItem("isAnswerShown", "false");

    questionElement.style.display = "none";
    cluesList.style.display = "flex";
    controlsContainer.style.display = "flex";
    cluesIndicator.style.display = "inline-block";
    answerContentArea.style.display = "none";
    showAnswerBtn.style.display = "inline-flex";

    // Reset guess area
    guessArea.style.display = "block";
    guessInput.value = "";
    guessInput.classList.remove("correct", "wrong", "close");
    guessVerdict.style.display = "none";
    verdictMessage.textContent = "";
    cardAnswered = false;

    cardNumberElement.textContent = `#${card.id}`;

    renderRevealedClues();
    playCardAnimation();
    updateDrawButtonState();
}


/* =========================
   REVEAL NEXT CLUE
========================= */

function revealNextClue() {
    if (!currentCard || !currentCard.clues) return;

    if (revealedCluesCount < currentCard.clues.length) {
        revealedCluesCount++;
        localStorage.setItem("revealedCluesCount", revealedCluesCount.toString());
        renderRevealedClues();
    }
}


/* =========================
   CARD ANIMATION
========================= */

function playCardAnimation() {
    cardElement.classList.remove("animate");
    void cardElement.offsetWidth;
    cardElement.classList.add("animate");
}


/* =========================
   ADD TO HISTORY
========================= */

function addToHistory(card) {
    history.unshift(card);
    localStorage.setItem("history", JSON.stringify(history));
    renderHistory();
}


/* =========================
   RENDER HISTORY
========================= */

function renderHistory() {
    historyElement.innerHTML = "";

    if (history.length === 0) {
        historyElement.appendChild(emptyHistory);
        return;
    }

    history.forEach((card) => {
        const item = document.createElement("div");
        item.className = "history-item";

        const number = document.createElement("div");
        number.className = "history-number";
        number.textContent = `#${card.id}`;

        const details = document.createElement("div");
        details.style.display = "flex";
        details.style.flexDirection = "column";
        details.style.gap = "4px";

        const question = document.createElement("p");
        question.className = "history-question";
        question.textContent = card.clues ? card.clues[0] + "..." : "";

        const ans = document.createElement("small");
        ans.style.color = "#059669";
        ans.style.fontWeight = "700";
        ans.textContent = `الشخصية: ${card.answer}`;

        details.appendChild(question);
        details.appendChild(ans);

        item.appendChild(number);
        item.appendChild(details);

        historyElement.appendChild(item);
    });
}


/* =========================
   CLEAR HISTORY
========================= */

function clearHistory() {
    history = [];
    currentCard = null;
    revealedCluesCount = 0;
    cardAnswered = false;
    score = { correct: 0, wrong: 0, skipped: 0 };

    localStorage.removeItem("history");
    localStorage.removeItem("currentCard");
    localStorage.removeItem("revealedCluesCount");
    localStorage.removeItem("isAnswerShown");
    localStorage.removeItem("score");

    questionElement.style.display = "block";
    questionElement.textContent = "اضغط على الزر بالأسفل لسحب كارت جديد وبدء اللعبة.";
    cardNumberElement.textContent = "#";

    cluesList.style.display = "none";
    controlsContainer.style.display = "none";
    cluesIndicator.style.display = "none";
    answerContentArea.style.display = "none";
    guessArea.style.display = "none";

    renderHistory();
    renderScore();
    updateDrawButtonState();
}


/* =========================
   RENDER SCORE
========================= */

function renderScore() {
    scoreCorrectEl.textContent  = score.correct;
    scoreWrongEl.textContent    = score.wrong;
    scoreSkippedEl.textContent  = score.skipped;
}


/* =========================
   GUESS / FUZZY MATCH
========================= */

function normalize(str) {
    return str
        .toLowerCase()
        .trim()
        // remove diacritics / tashkeel
        .replace(/[\u0610-\u061A\u064B-\u065F]/g, "")
        // collapse multiple spaces
        .replace(/\s+/g, " ");
}

function fuzzyMatch(guess, answer) {
    const g = normalize(guess);
    const a = normalize(answer);
    if (g === a) return "exact";

    // Contains check (e.g. "ميسي" matches "ليونيل ميسي")
    if (a.includes(g) || g.includes(a)) return "close";

    // Levenshtein distance for typo tolerance
    const dist = levenshtein(g, a);
    const threshold = Math.floor(a.length * 0.35); // allow ~35% error
    if (dist <= threshold) return "close";

    return "wrong";
}

function levenshtein(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, (_, i) =>
        Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
    );
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            dp[i][j] = a[i - 1] === b[j - 1]
                ? dp[i - 1][j - 1]
                : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        }
    }
    return dp[m][n];
}

function submitGuess() {
    if (!currentCard) return;
    const raw = guessInput.value.trim();
    if (!raw) return;

    const result = fuzzyMatch(raw, currentCard.answer);

    guessInput.classList.remove("correct", "wrong", "close");
    guessVerdict.style.display = "block";

    // Always reveal the correct answer first
    showAnswerBtn.style.display = "none";
    answerContentArea.style.display = "block";
    answerText.textContent = currentCard.answer;
    answerText.className = "answer-text";

    // Show hint message based on match quality, then let user decide
    if (result === "exact") {
        guessInput.classList.add("correct");
        verdictMessage.innerHTML =
            `<span class="verdict-icon correct">✓</span> متطابق تماماً! `;
    } else if (result === "close") {
        guessInput.classList.add("close");
        verdictMessage.innerHTML =
            `<span class="verdict-icon maybe">~</span> قريب جداً من الإجابة.:`;
    } else {
        guessInput.classList.add("wrong");
        verdictMessage.innerHTML =
            `<span class="verdict-icon wrong">✗</span> غلط :`;
    }

    // Always show the correct/wrong buttons — user has final say
    showVerdictButtons();
}

function showVerdictButtons() {
    document.getElementById("verdictActions").style.display = "flex";
}

function resolveGuess(isCorrect) {
    document.getElementById("verdictActions").style.display = "none";

    // Color the answer text based on user's decision
    answerText.className = "answer-text " + (isCorrect ? "answer-correct" : "answer-wrong");

    // Update score (only once per card)
    if (!cardAnswered) {
        if (isCorrect) score.correct++;
        else score.wrong++;
        cardAnswered = true;
        localStorage.setItem("score", JSON.stringify(score));
        renderScore();
    }

    const isAlreadyShown = localStorage.getItem("isAnswerShown") === "true";
    localStorage.setItem("isAnswerShown", "true");
    if (!isAlreadyShown) {
        addToHistory({ ...currentCard, guessResult: isCorrect ? "correct" : "wrong" });
    }
}

function revealAnswerAfterGuess(isCorrect) {
    const isAlreadyShown = localStorage.getItem("isAnswerShown") === "true";
    showAnswerBtn.style.display = "none";
    answerContentArea.style.display = "block";
    answerText.textContent = currentCard.answer;

    // Add result badge
    answerText.dataset.result = isCorrect ? "correct" : "wrong";
    answerText.className = "answer-text " + (isCorrect ? "answer-correct" : "answer-wrong");

    localStorage.setItem("isAnswerShown", "true");
    if (!isAlreadyShown) {
        addToHistory({ ...currentCard, guessResult: isCorrect ? "correct" : "wrong" });
    }
}


/* =========================
   EVENTS
========================= */

drawButton.addEventListener("click", drawCard);
cardNextBtn.addEventListener("click", drawCard);
clueBtn.addEventListener("click", revealNextClue);

guessSubmitBtn.addEventListener("click", submitGuess);
guessInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") submitGuess();
});

markCorrectBtn.addEventListener("click", () => resolveGuess(true));
markWrongBtn.addEventListener("click", () => resolveGuess(false));

showAnswerBtn.addEventListener("click", () => {
    if (!currentCard) return;
    const isAlreadyShown = localStorage.getItem("isAnswerShown") === "true";
    showAnswerBtn.style.display = "none";
    answerContentArea.style.display = "block";
    answerText.textContent = currentCard.answer;
    answerText.className = "answer-text";
    localStorage.setItem("isAnswerShown", "true");
    if (!isAlreadyShown) {
        addToHistory(currentCard);
    }
});

clearHistoryButton.addEventListener("click", clearHistory);


/* =========================
   INITIALIZE APP
========================= */

loadCards();