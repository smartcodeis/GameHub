const cells = document.querySelectorAll(".cell");

const levelEl = document.getElementById("level");
const patternLengthEl = document.getElementById("patternLength");
const highScoreEl = document.getElementById("highScore");
const statusEl = document.getElementById("status");
const messageEl = document.getElementById("message");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const gameOver = document.getElementById("gameOver");
const finalLevel = document.getElementById("finalLevel");
const finalHighScore = document.getElementById("finalHighScore");

let level = 1;
let pattern = [];
let playerPattern = [];

let isShowingPattern = false;
let gameStarted = false;

let highScore = Number(localStorage.getItem("patternMemoryHighScore")) || 0;

highScoreEl.textContent = highScore;


// ================================
// START GAME
// ================================

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);

function startGame() {
    gameOver.classList.add("hidden");

    level = 1;
    pattern = [];
    playerPattern = [];

    gameStarted = true;
    isShowingPattern = false;

    updateUI();

    messageEl.textContent = "Watch carefully...";
    statusEl.textContent = "WATCH";

    disableCells();

    createPattern();
}


// ================================
// CREATE PATTERN
// ================================

function createPattern() {
    playerPattern = [];

    const patternLength = getPatternLength();

    pattern = [];

    while (pattern.length < patternLength) {
        const randomIndex = Math.floor(Math.random() * cells.length);

        /*
         * Don't allow the same cell twice
         * in a row.
         */
        if (
            pattern.length === 0 ||
            pattern[pattern.length - 1] !== randomIndex
        ) {
            pattern.push(randomIndex);
        }
    }

    updateUI();

    showPattern();
}


// ================================
// DIFFICULTY
// ================================

function getPatternLength() {
    /*
     * Level 1 = 3
     * Level 2 = 4
     * Level 3 = 5
     * ...
     */

    return Math.min(3 + level - 1, 16);
}

function getFlashSpeed() {
    /*
     * Gets slightly faster every level.
     */

    return Math.max(260, 650 - level * 25);
}

function getPauseSpeed() {
    return Math.max(80, 180 - level * 5);
}


// ================================
// SHOW PATTERN
// ================================

async function showPattern() {
    isShowingPattern = true;
    disableCells();

    const flashSpeed = getFlashSpeed();
    const pauseSpeed = getPauseSpeed();

    await sleep(500);

    for (let i = 0; i < pattern.length; i++) {
        const index = pattern[i];
        const cell = cells[index];

        cell.classList.add("active");

        await sleep(flashSpeed);

        cell.classList.remove("active");

        await sleep(pauseSpeed);
    }

    isShowingPattern = false;

    enableCells();

    statusEl.textContent = "YOUR TURN";
    messageEl.textContent = "Repeat the pattern!";
}


// ================================
// PLAYER CLICK
// ================================

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        if (!gameStarted || isShowingPattern) {
            return;
        }

        const clickedIndex = Number(cell.dataset.index);

        handlePlayerClick(clickedIndex, cell);
    });
});


function handlePlayerClick(index, cell) {
    const currentPosition = playerPattern.length;

    /*
     * Wrong move
     */
    if (index !== pattern[currentPosition]) {
        cell.classList.add("wrong");

        setTimeout(() => {
            cell.classList.remove("wrong");
        }, 350);

        endGame();
        return;
    }

    /*
     * Correct move
     */
    playerPattern.push(index);

    cell.classList.add("correct");

    setTimeout(() => {
        cell.classList.remove("correct");
    }, 180);

    /*
     * Finished the entire pattern
     */
    if (playerPattern.length === pattern.length) {
        disableCells();

        statusEl.textContent = "CORRECT";
        messageEl.textContent = "Nice! Next level...";

        level++;

        /*
         * Update high score immediately
         */
        const reachedLevel = level - 1;

        if (reachedLevel > highScore) {
            highScore = reachedLevel;

            localStorage.setItem(
                "patternMemoryHighScore",
                highScore
            );
        }

        updateUI();

        setTimeout(() => {
            statusEl.textContent = "WATCH";
            messageEl.textContent = "New pattern...";
            createPattern();
        }, 800);
    }
}


// ================================
// GAME OVER
// ================================

function endGame() {
    gameStarted = false;
    isShowingPattern = false;

    disableCells();

    const score = level;

    /*
     * If player loses on Level 1,
     * score should remain 0.
     */
    const finalScore = Math.max(0, score - 1);

    if (finalScore > highScore) {
        highScore = finalScore;

        localStorage.setItem(
            "patternMemoryHighScore",
            highScore
        );
    }

    finalLevel.textContent = finalScore;
    finalHighScore.textContent = highScore;

    highScoreEl.textContent = highScore;

    setTimeout(() => {
        gameOver.classList.remove("hidden");
    }, 450);
}


// ================================
// UI
// ================================

function updateUI() {
    levelEl.textContent = level;
    patternLengthEl.textContent = getPatternLength();
    highScoreEl.textContent = highScore;
}


// ================================
// CELL CONTROLS
// ================================

function disableCells() {
    cells.forEach(cell => {
        cell.disabled = true;
    });
}

function enableCells() {
    cells.forEach(cell => {
        cell.disabled = false;
    });
}


// ================================
// UTILITY
// ================================

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}


// ================================
// INITIAL STATE
// ================================

disableCells();

updateUI();
statusEl.textContent = "READY";
messageEl.textContent = "Press Start to begin";