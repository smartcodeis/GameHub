const startBtn = document.getElementById("startBtn");
const reactionArea = document.getElementById("reactionArea");

const statusText = document.getElementById("status");
const reactionIcon = document.getElementById("reactionIcon");
const reactionTitle = document.getElementById("reactionTitle");
const reactionText = document.getElementById("reactionText");

const currentScore = document.getElementById("currentScore");
const averageScore = document.getElementById("averageScore");
const attemptsElement = document.getElementById("attempts");
const bestScore = document.getElementById("bestScore");

const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistory");

let gameState = "idle";
let startTime = 0;
let timeoutId = null;

let history = JSON.parse(
    localStorage.getItem("reactionHistory") || "[]"
);

/* =========================
   INITIALIZE
========================= */

renderHistory();
updateStats();

/* =========================
   START GAME
========================= */

startBtn.addEventListener("click", startGame);

function startGame() {

    if (gameState === "waiting" || gameState === "ready") {
        return;
    }

    clearTimeout(timeoutId);

    gameState = "waiting";

    currentScore.textContent = "--";

    reactionArea.className = "reaction-area waiting";

    reactionIcon.textContent = "⏳";
    reactionTitle.textContent = "Wait...";
    reactionText.textContent = "Don't click until it turns green";

    statusText.textContent = "Get ready...";

    startBtn.textContent = "Waiting...";

    const randomDelay =
        Math.floor(Math.random() * 2500) + 1500;

    timeoutId = setTimeout(() => {

        gameState = "ready";

        startTime = performance.now();

        reactionArea.className = "reaction-area ready";

        reactionIcon.textContent = "⚡";
        reactionTitle.textContent = "CLICK!";
        reactionText.textContent = "Click as fast as you can";

        statusText.textContent = "GO!";

        startBtn.textContent = "Test Running";

    }, randomDelay);
}

/* =========================
   REACTION CLICK
========================= */

reactionArea.addEventListener("click", handleReaction);

function handleReaction() {

    // Clicked too early
    if (gameState === "waiting") {

        clearTimeout(timeoutId);

        gameState = "idle";

        reactionArea.className = "reaction-area";

        reactionIcon.textContent = "❌";
        reactionTitle.textContent = "Too Early!";
        reactionText.textContent = "You clicked before green";

        statusText.textContent = "Try again";

        startBtn.textContent = "Try Again";

        return;
    }

    // Correct reaction
    if (gameState === "ready") {

        const reactionTime =
            Math.round(performance.now() - startTime);

        finishTest(reactionTime);
    }
}

/* =========================
   FINISH TEST
========================= */

function finishTest(time) {

    gameState = "result";

    currentScore.textContent = time;

    const result = {
        time: time,
        date: new Date().toISOString()
    };

    history.unshift(result);

    // Keep last 20 attempts
    history = history.slice(0, 20);

    localStorage.setItem(
        "reactionHistory",
        JSON.stringify(history)
    );

    reactionArea.className = "reaction-area result";

    reactionIcon.textContent = getRatingIcon(time);
    reactionTitle.textContent = `${time} ms`;
    reactionText.textContent = getRating(time);

    statusText.textContent = "Reaction recorded";

    startBtn.textContent = "Try Again";

    updateStats();
    renderHistory();
}

/* =========================
   STATS
========================= */

function updateStats() {

    const times = history.map(item => item.time);

    attemptsElement.textContent = times.length;

    if (times.length === 0) {
        averageScore.textContent = "--";
        bestScore.textContent = "--";
        return;
    }

    const average =
        Math.round(
            times.reduce((sum, time) => sum + time, 0) /
            times.length
        );

    const best = Math.min(...times);

    averageScore.textContent = average;
    bestScore.textContent = best;
}

/* =========================
   RATING
========================= */

function getRating(time) {

    if (time < 200) {
        return "Insane reflexes!";
    }

    if (time < 250) {
        return "Excellent reaction!";
    }

    if (time < 300) {
        return "Very fast!";
    }

    if (time < 400) {
        return "Good reaction!";
    }

    if (time < 500) {
        return "Not bad!";
    }

    return "Keep practicing!";
}

function getRatingIcon(time) {

    if (time < 200) return "🔥";
    if (time < 300) return "⚡";
    if (time < 400) return "👏";
    return "👍";
}

/* =========================
   HISTORY
========================= */

function renderHistory() {

    if (history.length === 0) {

        historyList.innerHTML = `
            <div class="empty-history">
                <span>⏱</span>
                <p>No reaction times yet</p>
            </div>
        `;

        return;
    }

    historyList.innerHTML = history
        .map((item, index) => {

            const date = new Date(item.date);

            const formattedDate =
                date.toLocaleDateString([], {
                    month: "short",
                    day: "numeric"
                }) +
                " • " +
                date.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                });

            return `
                <div class="history-item">

                    <div class="history-left">

                        <div class="history-number">
                            ${index + 1}
                        </div>

                        <div>
                            <div class="history-time">
                                ${item.time} ms
                            </div>

                            <div class="history-date">
                                ${formattedDate}
                            </div>
                        </div>

                    </div>

                    <div class="history-rating">
                        ${getRating(item.time)}
                    </div>

                </div>
            `;

        })
        .join("");
}

/* =========================
   CLEAR HISTORY
========================= */

clearHistoryBtn.addEventListener("click", () => {

    if (history.length === 0) {
        return;
    }

    const confirmed =
        confirm("Clear all reaction history?");

    if (!confirmed) {
        return;
    }

    history = [];

    localStorage.removeItem("reactionHistory");

    currentScore.textContent = "--";

    updateStats();
    renderHistory();

    resetGame();
});

/* =========================
   RESET
========================= */

function resetGame() {

    clearTimeout(timeoutId);

    gameState = "idle";

    reactionArea.className = "reaction-area";

    reactionIcon.textContent = "⚡";
    reactionTitle.textContent = "Ready?";
    reactionText.textContent =
        "Press the button below to start";

    statusText.textContent =
        "Press Start to begin";

    startBtn.textContent = "Start Test";
}