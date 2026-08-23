const startBtn = document.getElementById("startBtn");
const submitBtn = document.getElementById("submitBtn");
const answerInput = document.getElementById("answer");

const sequenceDisplay = document.getElementById("sequence");
const message = document.getElementById("message");
const result = document.getElementById("result");

const levelDisplay = document.getElementById("level");
const difficultyDisplay = document.getElementById("difficulty");
const sequenceLengthDisplay = document.getElementById("sequenceLength");
const bestScoreDisplay = document.getElementById("bestScore");

let sequence = [];
let level = 1;
let bestScore = Number(localStorage.getItem("sequenceBest")) || 0;
let isPlaying = false;

bestScoreDisplay.textContent = bestScore;

const difficultySettings = {
    easy: {
        name: "Easy",
        startLength: 3,
        speed: 900
    },

    medium: {
        name: "Medium",
        startLength: 4,
        speed: 700
    },

    hard: {
        name: "Hard",
        startLength: 5,
        speed: 500
    }
};

function getDifficulty() {
    if (level <= 3) {
        return difficultySettings.easy;
    }

    if (level <= 6) {
        return difficultySettings.medium;
    }

    return difficultySettings.hard;
}

function getSequenceLength() {
    const difficulty = getDifficulty();

    if (difficulty.name === "Easy") {
        return difficulty.startLength + (level - 1);
    }

    if (difficulty.name === "Medium") {
        return difficulty.startLength + (level - 4);
    }

    return difficulty.startLength + (level - 7);
}

function generateSequence() {
    sequence = [];

    const length = getSequenceLength();

    for (let i = 0; i < length; i++) {
        const number = Math.floor(Math.random() * 10);
        sequence.push(number);
    }
}

function updateStats() {
    const difficulty = getDifficulty();

    levelDisplay.textContent = level;
    difficultyDisplay.textContent = difficulty.name;
    sequenceLengthDisplay.textContent = getSequenceLength();
    bestScoreDisplay.textContent = bestScore;
}

function showNumber(number) {
    sequenceDisplay.innerHTML = "";

    const numberElement = document.createElement("div");

    numberElement.className = "number";
    numberElement.textContent = number;

    sequenceDisplay.appendChild(numberElement);
}

function clearNumber() {
    sequenceDisplay.innerHTML = "";
}

async function showSequence() {
    const difficulty = getDifficulty();

    message.textContent = "Memorize the sequence...";
    answerInput.disabled = true;
    submitBtn.disabled = true;

    for (const number of sequence) {
        showNumber(number);

        await wait(difficulty.speed);

        clearNumber();

        await wait(180);
    }

    message.textContent = "Now enter the sequence";
    answerInput.disabled = false;
    submitBtn.disabled = false;

    answerInput.focus();
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function startGame() {
    if (isPlaying) return;

    isPlaying = true;

    result.textContent = "";
    result.className = "";

    answerInput.value = "";

    startBtn.disabled = true;

    generateSequence();
    updateStats();

    showSequence();
}

function checkAnswer() {
    if (!isPlaying) return;

    const userAnswer = answerInput.value
        .replace(/\s/g, "")
        .trim();

    const correctAnswer = sequence.join("");

    if (userAnswer === correctAnswer) {
        handleCorrect();
    } else {
        handleWrong();
    }
}

function handleCorrect() {
    result.textContent = "✓ Correct! Great memory!";
    result.className = "result success";

    message.textContent = "Level completed!";

    if (level > bestScore) {
        bestScore = level;
        localStorage.setItem("sequenceBest", bestScore);
    }

    isPlaying = false;

    answerInput.disabled = true;
    submitBtn.disabled = true;

    level++;

    updateStats();

    startBtn.disabled = false;
    startBtn.textContent = "Next Level";
}

function handleWrong() {
    result.textContent = `✕ Wrong! Correct sequence: ${sequence.join(" ")}`;
    result.className = "result error";

    message.textContent = "Game Over";

    isPlaying = false;

    answerInput.disabled = true;
    submitBtn.disabled = true;

    startBtn.disabled = false;
    startBtn.textContent = "Try Again";

    level = 1;

    updateStats();
}

startBtn.addEventListener("click", startGame);

submitBtn.addEventListener("click", checkAnswer);

answerInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        checkAnswer();
    }
});

answerInput.addEventListener("input", () => {
    answerInput.value = answerInput.value.replace(/[^0-9]/g, "");
});

updateStats();