const coin = document.getElementById("coin");
const flipBtn = document.getElementById("flipBtn");

const resultText = document.getElementById("resultText");
const resultSubtext = document.getElementById("resultSubtext");

const totalFlips = document.getElementById("totalFlips");
const headsCount = document.getElementById("headsCount");
const tailsCount = document.getElementById("tailsCount");

const headsPercentage = document.getElementById("headsPercentage");
const tailsPercentage = document.getElementById("tailsPercentage");

const headsBar = document.getElementById("headsBar");
const tailsBar = document.getElementById("tailsBar");

const distributionText =
    document.getElementById("distributionText");

const historyList =
    document.getElementById("historyList");

const emptyHistory =
    document.getElementById("emptyHistory");

const resetBtn =
    document.getElementById("resetBtn");


/* =========================
   DATA
========================= */

let gameData = {
    total: 0,
    heads: 0,
    tails: 0,
    history: []
};

const STORAGE_KEY = "coinFlipData";


/* =========================
   LOAD DATA
========================= */

function loadData() {

    const savedData =
        localStorage.getItem(STORAGE_KEY);

    if (!savedData) {
        return;
    }

    try {

        const parsed =
            JSON.parse(savedData);

        gameData = {
            total: parsed.total || 0,
            heads: parsed.heads || 0,
            tails: parsed.tails || 0,
            history: Array.isArray(parsed.history)
                ? parsed.history
                : []
        };

    } catch (error) {

        console.error(
            "Failed to load coin flip data:",
            error
        );

    }

    updateUI();
}


/* =========================
   SAVE DATA
========================= */

function saveData() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(gameData)
    );

}


/* =========================
   SOUND
========================= */

let audioCtx = null;

function playFlipSound() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc1.type = 'sine';
    osc2.type = 'sine';

    osc1.frequency.setValueAtTime(6000, audioCtx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(3000, audioCtx.currentTime + 0.1);
    
    osc2.frequency.setValueAtTime(8000, audioCtx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(4000, audioCtx.currentTime + 0.1);

    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(audioCtx.destination);

    osc1.start();
    osc2.start();
    
    osc1.stop(audioCtx.currentTime + 0.3);
    osc2.stop(audioCtx.currentTime + 0.3);
}


/* =========================
   FLIP COIN
========================= */

let currentRotation = 0;

function flipCoin() {

    if (flipBtn.disabled) {
        return;
    }

    flipBtn.disabled = true;

    playFlipSound();

    resultText.textContent = "Flipping...";
    resultSubtext.textContent =
        "The coin is in the air";

    const result =
        Math.random() < 0.5
            ? "heads"
            : "tails";


    currentRotation += 1800; // rotate 5 times
    
    const isTails = result === "tails";
    const currentIsTails = (currentRotation % 360) !== 0;

    if (isTails && !currentIsTails) {
        currentRotation += 180;
    } else if (!isTails && currentIsTails) {
        currentRotation += 180;
    }

    coin.style.transition = 'transform 1.2s ease-in-out';
    coin.style.transform = `rotateY(${currentRotation}deg)`;


    setTimeout(() => {

        finishFlip(result);

    }, 1200);

}


/* =========================
   FINISH FLIP
========================= */

function finishFlip(result) {

    gameData.total++;

    if (result === "heads") {

        gameData.heads++;

    } else {

        gameData.tails++;

    }


    const historyItem = {

        result: result,

        time: new Date().toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }
        )

    };


    /*
        Add newest result to beginning
    */
    gameData.history.unshift(
        historyItem
    );


    /*
        Keep only latest 20 results
    */
    if (gameData.history.length > 20) {

        gameData.history =
            gameData.history.slice(0, 20);

    }


    saveData();

    updateResult(result);

    updateUI();

    flipBtn.disabled = false;

}


/* =========================
   RESULT
========================= */

function updateResult(result) {

    if (result === "heads") {

        resultText.textContent = "Heads!";

        resultSubtext.textContent =
            "The coin landed on heads.";

    } else {

        resultText.textContent = "Tails!";

        resultSubtext.textContent =
            "The coin landed on tails.";

    }

}


/* =========================
   UPDATE UI
========================= */

function updateUI() {

    const total =
        gameData.total;

    const heads =
        gameData.heads;

    const tails =
        gameData.tails;


    /* Counters */

    totalFlips.textContent =
        total;

    headsCount.textContent =
        heads;

    tailsCount.textContent =
        tails;


    /* Percentages */

    const headsPercent =
        total === 0
            ? 0
            : Math.round(
                (heads / total) * 100
            );

    const tailsPercent =
        total === 0
            ? 0
            : Math.round(
                (tails / total) * 100
            );


    headsPercentage.textContent =
        `${headsPercent}%`;

    tailsPercentage.textContent =
        `${tailsPercent}%`;


    /* Distribution */

    headsBar.style.width =
        `${headsPercent}%`;

    tailsBar.style.width =
        `${tailsPercent}%`;


    distributionText.textContent =
        `${heads} Heads / ${tails} Tails`;


    renderHistory();

}


/* =========================
   HISTORY
========================= */

function renderHistory() {

    historyList.innerHTML = "";


    if (gameData.history.length === 0) {

        historyList.appendChild(
            createEmptyHistory()
        );

        return;
    }


    gameData.history.forEach(
        (item, index) => {

            const historyItem =
                document.createElement("div");

            historyItem.className =
                "history-item";


            const left =
                document.createElement("div");

            left.className =
                "history-left";


            const coinIcon =
                document.createElement("div");

            coinIcon.className =
                `history-coin ${item.result}`;


            coinIcon.textContent =
                item.result === "heads"
                    ? "H"
                    : "T";


            const info =
                document.createElement("div");


            const result =
                document.createElement("div");

            result.className =
                "history-result";


            result.textContent =
                item.result === "heads"
                    ? "Heads"
                    : "Tails";


            const time =
                document.createElement("div");

            time.className =
                "history-time";

            time.textContent =
                item.time;


            info.appendChild(result);

            info.appendChild(time);


            left.appendChild(coinIcon);

            left.appendChild(info);


            const number =
                document.createElement("span");

            number.className =
                "history-number";

            number.textContent =
                `#${gameData.total - index}`;


            historyItem.appendChild(left);

            historyItem.appendChild(number);


            historyList.appendChild(
                historyItem
            );

        }
    );

}


/* =========================
   EMPTY HISTORY
========================= */

function createEmptyHistory() {

    const empty =
        document.createElement("div");

    empty.className =
        "empty-history";


    empty.innerHTML = `
        <div class="empty-icon">
            <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="14" fill="#f5b83d" stroke="#d89a21" stroke-width="2"/>
                <circle cx="16" cy="16" r="10" stroke="#d89a21" stroke-width="1.5" stroke-dasharray="2 2"/>
                <text x="16" y="21.5" font-size="16" font-weight="900" fill="#6e4b08" text-anchor="middle">$</text>
            </svg>
        </div>

        <h3>No flips yet</h3>

        <p>
            Your recent coin flips will appear here.
        </p>
    `;


    return empty;

}


/* =========================
   RESET
========================= */

function resetGame() {

    if (gameData.total === 0) {
        return;
    }


    const confirmed =
        confirm(
            "Are you sure you want to reset all statistics?"
        );


    if (!confirmed) {
        return;
    }


    gameData = {

        total: 0,

        heads: 0,

        tails: 0,

        history: []

    };


    localStorage.removeItem(
        STORAGE_KEY
    );


    resultText.textContent =
        "Ready?";

    resultSubtext.textContent =
        "Flip the coin to get started";


    currentRotation = 0;
    coin.style.transition = 'transform 0.5s ease-in-out';
    coin.style.transform = `rotateY(0deg)`;


    updateUI();

}


/* =========================
   EVENTS
========================= */

flipBtn.addEventListener(
    "click",
    flipCoin
);

resetBtn.addEventListener(
    "click",
    resetGame
);


/*
    Keyboard support
    Space / Enter = Flip
*/
document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.code === "Space" ||
            event.code === "Enter"
        ) {

            /*
                Don't trigger when pressing
                inside an input/button.
            */
            if (
                document.activeElement.tagName ===
                "INPUT"
            ) {
                return;
            }


            event.preventDefault();

            flipCoin();

        }

    }
);


/* =========================
   INIT
========================= */

loadData();