/* =========================
   YES / NO
========================= */

const result = document.getElementById("result");
const statusText = document.getElementById("status");

const decideBtn = document.getElementById("decideBtn");
const soundBtn = document.getElementById("soundBtn");
const clearBtn = document.getElementById("clearBtn");

const totalCount = document.getElementById("totalCount");
const yesCount = document.getElementById("yesCount");
const noCount = document.getElementById("noCount");

const yesPercentage = document.getElementById("yesPercentage");
const noPercentage = document.getElementById("noPercentage");

const yesBar = document.getElementById("yesBar");
const noBar = document.getElementById("noBar");

const percentageText = document.getElementById("percentageText");
const historyList = document.getElementById("historyList");


/* =========================
   STORAGE
========================= */

const STORAGE_KEY = "yesNoGameData";

const defaultData = {
    yes: 0,
    no: 0,
    history: [],
    sound: true
};

let data = loadData();


function loadData() {

    try {

        const saved =
            localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            return { ...defaultData };
        }

        const parsed = JSON.parse(saved);

        return {
            yes: parsed.yes || 0,
            no: parsed.no || 0,
            history: Array.isArray(parsed.history)
                ? parsed.history
                : [],
            sound:
                typeof parsed.sound === "boolean"
                    ? parsed.sound
                    : true
        };

    } catch (error) {

        console.error(
            "Failed to load saved data:",
            error
        );

        return { ...defaultData };
    }
}


/* =========================
   SAVE
========================= */

function saveData() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );
}


/* =========================
   SOUND
========================= */

let audioContext = null;


function playSound(type) {

    if (!data.sound) {
        return;
    }

    if (!audioContext) {
        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();
    }

    if (audioContext.state === "suspended") {
        audioContext.resume();
    }

    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();

    oscillator.connect(gain);
    gain.connect(audioContext.destination);


    /* =========================
       YES SOUND
    ========================= */

    if (type === "yes") {

        oscillator.type = "sine";

        oscillator.frequency.setValueAtTime(
            550,
            audioContext.currentTime
        );

        oscillator.frequency.exponentialRampToValueAtTime(
            850,
            audioContext.currentTime + 0.16
        );


        gain.gain.setValueAtTime(
            0.0001,
            audioContext.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.35,
            audioContext.currentTime + 0.025
        );

        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            audioContext.currentTime + 0.32
        );


        oscillator.start();

        oscillator.stop(
            audioContext.currentTime + 0.33
        );
    }


    /* =========================
       NO SOUND
    ========================= */

    else if (type === "no") {

        oscillator.type = "triangle";

        oscillator.frequency.setValueAtTime(
            380,
            audioContext.currentTime
        );

        oscillator.frequency.exponentialRampToValueAtTime(
            150,
            audioContext.currentTime + 0.2
        );


        gain.gain.setValueAtTime(
            0.0001,
            audioContext.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.35,
            audioContext.currentTime + 0.025
        );

        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            audioContext.currentTime + 0.35
        );


        oscillator.start();

        oscillator.stop(
            audioContext.currentTime + 0.36
        );
    }


    /* =========================
       TOGGLE SOUND
    ========================= */

    else {

        oscillator.type = "sine";

        oscillator.frequency.setValueAtTime(
            450,
            audioContext.currentTime
        );

        gain.gain.setValueAtTime(
            0.0001,
            audioContext.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.18,
            audioContext.currentTime + 0.02
        );

        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            audioContext.currentTime + 0.16
        );


        oscillator.start();

        oscillator.stop(
            audioContext.currentTime + 0.17
        );
    }
}


/* =========================
   DECISION
========================= */

function makeDecision() {

    if (decideBtn.disabled) {
        return;
    }

    decideBtn.disabled = true;

    result.classList.remove(
        "yes",
        "no",
        "show"
    );

    result.classList.add("deciding");

    result.querySelector("span").textContent = "?";

    statusText.textContent =
        "Thinking...";


    playSound("deciding");


    /* Fake suspense animation */

    let counter = 0;

    const shuffleInterval =
        setInterval(() => {

            result.querySelector("span").textContent =
                Math.random() > 0.5
                    ? "✓"
                    : "×";

            counter++;

            if (counter >= 8) {

                clearInterval(shuffleInterval);

                finishDecision();
            }

        }, 90);
}


/* =========================
   FINISH
========================= */

function finishDecision() {

    const answer =
        Math.random() < 0.5
            ? "yes"
            : "no";


    result.classList.remove(
        "deciding"
    );


    result.classList.add(answer);


    result.querySelector("span").textContent =
        answer === "yes"
            ? "✓"
            : "×";


    statusText.textContent =
        answer === "yes"
            ? "The answer is YES!"
            : "The answer is NO!";


    result.classList.add("show");


    data[answer]++;


    data.history.unshift({
        result: answer,
        time: new Date().toISOString()
    });


    /* Keep last 50 */

    data.history =
        data.history.slice(0, 50);


    saveData();

    updateUI();

    playSound(answer);


    setTimeout(() => {

        decideBtn.disabled = false;

    }, 400);
}


/* =========================
   UPDATE UI
========================= */

function updateUI() {

    const total =
        data.yes + data.no;


    totalCount.textContent =
        total;

    yesCount.textContent =
        data.yes;

    noCount.textContent =
        data.no;


    let yesPercent = 0;
    let noPercent = 0;


    if (total > 0) {

        yesPercent =
            Math.round(
                (data.yes / total) * 100
            );

        noPercent =
            100 - yesPercent;
    }


    yesPercentage.textContent =
        `${yesPercent}%`;

    noPercentage.textContent =
        `${noPercent}%`;


    yesBar.style.width =
        `${yesPercent}%`;

    noBar.style.width =
        `${noPercent}%`;


    percentageText.textContent =
        `${data.yes} / ${data.no}`;


    renderHistory();


    soundBtn.textContent =
        data.sound
            ? "🔊"
            : "🔇";
}


/* =========================
   HISTORY
========================= */

function renderHistory() {

    if (!data.history.length) {

        historyList.innerHTML = `
            <div class="empty-history">
                <span>🎲</span>
                <p>No decisions yet</p>
                <small>Your results will appear here.</small>
            </div>
        `;

        return;
    }


    historyList.innerHTML =
        data.history
            .map((item) => {

                const isYes =
                    item.result === "yes";

                const date =
                    new Date(item.time);


                return `
                    <div class="history-item">

                        <div class="history-left">

                            <div
                                class="history-result ${item.result}"
                            >
                                ${isYes ? "✓" : "×"}
                            </div>

                            <div>

                                <div class="history-name">
                                    ${isYes ? "YES" : "NO"}
                                </div>

                                <div class="history-time">
                                    ${formatTime(date)}
                                </div>

                            </div>

                        </div>

                    </div>
                `;

            })
            .join("");
}


/* =========================
   FORMAT TIME
========================= */

function formatTime(date) {

    const now =
        new Date();

    const diff =
        now - date;


    const seconds =
        Math.floor(diff / 1000);

    const minutes =
        Math.floor(seconds / 60);

    const hours =
        Math.floor(minutes / 60);

    const days =
        Math.floor(hours / 24);


    if (seconds < 10) {
        return "Just now";
    }

    if (seconds < 60) {
        return `${seconds}s ago`;
    }

    if (minutes < 60) {
        return `${minutes}m ago`;
    }

    if (hours < 24) {
        return `${hours}h ago`;
    }

    if (days < 7) {
        return `${days}d ago`;
    }


    return date.toLocaleDateString(
        undefined,
        {
            day: "numeric",
            month: "short"
        }
    );
}


/* =========================
   SOUND TOGGLE
========================= */

soundBtn.addEventListener(
    "click",
    () => {

        data.sound =
            !data.sound;

        saveData();

        updateUI();


        if (data.sound) {
            playSound("toggle");
        }
    }
);


/* =========================
   CLEAR HISTORY
========================= */

clearBtn.addEventListener(
    "click",
    () => {

        if (!data.history.length) {
            return;
        }


        const confirmed =
            confirm(
                "Clear all decisions and statistics?"
            );


        if (!confirmed) {
            return;
        }


        data.yes = 0;
        data.no = 0;
        data.history = [];


        result.classList.remove(
            "yes",
            "no",
            "show"
        );

        result.querySelector("span")
            .textContent = "?";

        statusText.textContent =
            "Ask yourself a question...";


        saveData();

        updateUI();
    }
);


/* =========================
   DECIDE BUTTON
========================= */

decideBtn.addEventListener(
    "click",
    makeDecision
);


/* =========================
   KEYBOARD
========================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.code === "Space" ||
            event.code === "Enter"
        ) {

            if (
                document.activeElement.tagName !==
                "BUTTON"
            ) {

                event.preventDefault();

                makeDecision();
            }
        }
    }
);


/* =========================
   INITIALIZE
========================= */

updateUI();


/* Update relative history times */

setInterval(
    renderHistory,
    30000
);