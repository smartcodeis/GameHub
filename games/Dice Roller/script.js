/* =========================
   SOUND CONFIG
   Toggle or adjust volume easily:
   SOUND_ENABLED = false  →  silent
   SOUND_VOLUME  = 0–1    →  loudness
========================= */

const SOUND_ENABLED = true;
const SOUND_VOLUME  = 0.45;


/* =========================
   WEB AUDIO ENGINE
========================= */

let audioCtx = null;

function getAudioCtx() {
    if (!audioCtx) {
        audioCtx = new (
            window.AudioContext ||
            window.webkitAudioContext
        )();
    }
    return audioCtx;
}


/* Generate a single soft "click / rattle" burst */
function playClick(ctx, startTime, volume = 0.5, freq = 420) {

    const osc   = ctx.createOscillator();
    const gain  = ctx.createGain();
    const noise = createNoiseBuffer(ctx);

    /* Short noise burst */
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(volume * 0.25, startTime);
    noiseGain.gain.exponentialRampToValueAtTime(
        0.0001,
        startTime + 0.055
    );

    noise.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(startTime);
    noise.stop(startTime + 0.055);

    /* Tiny tonal click on top */
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, startTime);
    osc.frequency.exponentialRampToValueAtTime(
        freq * 0.4,
        startTime + 0.04
    );

    gain.gain.setValueAtTime(volume * 0.18, startTime);
    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        startTime + 0.04
    );

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + 0.04);
}


/* Generate a low "thud" settle sound */
function playSettle(ctx, startTime, volume = 0.45) {

    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(95, startTime);
    osc.frequency.exponentialRampToValueAtTime(
        48,
        startTime + 0.12
    );

    gain.gain.setValueAtTime(volume * 0.55, startTime);
    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        startTime + 0.13
    );

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + 0.13);


    /* Small noise crack */
    const noise = createNoiseBuffer(ctx);
    const ng    = ctx.createGain();
    ng.gain.setValueAtTime(volume * 0.12, startTime);
    ng.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.06);
    noise.connect(ng);
    ng.connect(ctx.destination);
    noise.start(startTime);
    noise.stop(startTime + 0.06);
}


/* Create short white-noise buffer source */
function createNoiseBuffer(ctx) {

    const bufLen = ctx.sampleRate * 0.07;
    const buf    = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const data   = buf.getChannelData(0);

    for (let i = 0; i < bufLen; i++) {
        data[i] = (Math.random() * 2 - 1);
    }

    const src = ctx.createBufferSource();
    src.buffer = buf;

    return src;
}


/* Play full roll sound: multiple rattles during roll + settle thud */
function playRollSound(rollDurationMs, delayMs = 0) {

    if (!SOUND_ENABLED) return;

    try {

        const ctx   = getAudioCtx();
        const now   = ctx.currentTime;
        const start = now + (delayMs / 1000);

        /* Master volume */
        const vol = Math.max(0, Math.min(1, SOUND_VOLUME));

        /* How many clicks to scatter across the roll duration */
        const dur     = rollDurationMs / 1000;
        const clicks  = 9;

        for (let i = 0; i < clicks; i++) {

            /* Space them: more at start (fast) fewer at end (slowing) */
            const progress  = i / (clicks - 1);
            const eased     = 1 - Math.pow(1 - progress, 1.7);
            const clickTime = start + eased * dur * 0.88;

            /* Slightly randomize frequency for realism */
            const freq = 380 + Math.random() * 180;

            /* Fade out volume toward end of roll */
            const clickVol = vol * (1 - progress * 0.4);

            playClick(ctx, clickTime, clickVol, freq);
        }

        /* Settle thud right when animation ends */
        playSettle(ctx, start + dur * 0.98, vol * 0.75);

    } catch (e) {
        /* Audio not available — silently ignore */
    }
}


/* =========================
   DOM REFERENCES
========================= */

const modeButtons =
    document.querySelectorAll(".mode-btn");

const modeLabel =
    document.getElementById("modeLabel");

const multipleControls =
    document.getElementById("multipleControls");

const customControls =
    document.getElementById("customControls");

const diceContainer =
    document.getElementById("diceContainer");

const diceCount =
    document.getElementById("diceCount");

const sidesInput =
    document.getElementById("sidesInput");

const minusBtn =
    document.getElementById("minusBtn");

const plusBtn =
    document.getElementById("plusBtn");

const rollBtn =
    document.getElementById("rollBtn");

const totalContainer =
    document.getElementById("totalContainer");

const totalValue =
    document.getElementById("totalValue");

const historyList =
    document.getElementById("historyList");

const clearHistory =
    document.getElementById("clearHistory");


let currentMode = "single";
let rolling     = false;

let history =
    JSON.parse(
        localStorage.getItem("diceHistory")
    ) || [];


/* =========================
   DICE FACE DATA
========================= */

const pipPositions = {
    1: ["mc"],
    2: ["tl", "br"],
    3: ["tl", "mc", "br"],
    4: ["tl", "tr", "bl", "br"],
    5: ["tl", "tr", "mc", "bl", "br"],
    6: ["tl", "tr", "ml", "mr", "bl", "br"]
};


/*
    FACE MAPPING — which physical face shows which value.

    Physical faces defined in HTML:
        front  → .face.front   (translateZ +half)
        back   → .face.back    (rotateY 180 translateZ +half)
        right  → .face.right   (rotateY 90  translateZ +half)
        left   → .face.left    (rotateY -90 translateZ +half)
        top    → .face.top     (rotateX 90  translateZ +half)
        bottom → .face.bottom  (rotateX -90 translateZ +half)

    .show-N rotations bring the corresponding face forward:
        show-1 → front face forward
        show-2 → right face forward
        show-3 → left face forward
        show-4 → top face forward
        show-5 → bottom face forward
        show-6 → back face forward

    So result value goes on the face that will face the camera,
    and opposite face gets the "opposite" value (1↔6, 2↔5, 3↔4).
*/

const FACE_SLOT = {
    // value → which HTML face element receives that value
    1: "front",
    2: "right",
    3: "left",
    4: "top",
    5: "bottom",
    6: "back"
};

/*
    Classic dice opposite pairs: 1-6, 2-5, 3-4.
    Unused faces get realistic opposite values.
*/
const OPPOSITE = { 1:6, 6:1, 2:5, 5:2, 3:4, 4:3 };


/* =========================
   CREATE ONE DICE
========================= */

function createDice(value = 1, small = false) {

    const wrapper =
        document.createElement("div");

    wrapper.className = "dice-wrapper";

    if (small) {
        wrapper.classList.add("small");
    }

    const dice =
        document.createElement("div");

    dice.className   = "dice";
    dice.dataset.value = value;

    dice.innerHTML = `
        <div class="face front"></div>
        <div class="face back"></div>
        <div class="face right"></div>
        <div class="face left"></div>
        <div class="face top"></div>
        <div class="face bottom"></div>
    `;

    wrapper.appendChild(dice);
    diceContainer.appendChild(wrapper);

    setDiceValue(dice, value);

    return dice;
}


/* =========================
   DRAW FACE PIPS / NUMBER
========================= */

function setFaceValue(face, value) {

    face.innerHTML = "";

    /* Standard dice (1-6) → pip layout */
    if (value >= 1 && value <= 6) {

        pipPositions[value].forEach(pos => {

            const pip = document.createElement("span");
            pip.className = `pip ${pos}`;
            face.appendChild(pip);

        });

        return;
    }

    /* Custom dice (>6) → show number */
    const number = document.createElement("span");

    number.textContent        = value;
    number.style.gridColumn   = "1 / 4";
    number.style.gridRow      = "1 / 4";
    number.style.alignSelf    = "center";
    number.style.justifySelf  = "center";
    number.style.fontSize     = "30px";
    number.style.fontWeight   = "800";
    number.style.color        = "#22262c";

    face.appendChild(number);
}


/* =========================
   SET DICE VALUE
   Places result value on the correct face
   (the one that will face the camera for .show-N)
   and fills other faces realistically.
========================= */

function setDiceValue(dice, value) {

    const faceName = FACE_SLOT[value] || "front";

    /*
        Fill all 6 faces with sensible values.
        The "winner" face gets the result.
        Opposite face gets the standard opposite.
        Remaining 4 faces get other values 1-6.
    */

    const faceEls = {
        front:  dice.querySelector(".front"),
        back:   dice.querySelector(".back"),
        right:  dice.querySelector(".right"),
        left:   dice.querySelector(".left"),
        top:    dice.querySelector(".top"),
        bottom: dice.querySelector(".bottom")
    };

    if (value >= 1 && value <= 6) {

        /* Result face */
        setFaceValue(faceEls[faceName], value);

        /* Opposite face */
        const oppFace = getOppositeFace(faceName);
        setFaceValue(faceEls[oppFace], OPPOSITE[value]);

        /* Fill remaining 4 faces with remaining numbers */
        const remaining = [1,2,3,4,5,6].filter(
            n => n !== value && n !== OPPOSITE[value]
        );

        const sideFaces = Object.keys(faceEls).filter(
            f => f !== faceName && f !== oppFace
        );

        sideFaces.forEach((f, i) => {
            setFaceValue(faceEls[f], remaining[i]);
        });

    } else {

        /* Custom dice — show number on all visible faces */
        Object.values(faceEls).forEach(face => {
            setFaceValue(face, value);
        });

    }

    /* Remove old show-N, add correct one */
    for (let n = 1; n <= 6; n++) {
        dice.classList.remove(`show-${n}`);
    }

    if (value >= 1 && value <= 6) {
        dice.classList.add(`show-${value}`);
    }
}


/* Returns the CSS face name that is geometrically opposite */
function getOppositeFace(faceName) {
    const opposites = {
        front:  "back",
        back:   "front",
        right:  "left",
        left:   "right",
        top:    "bottom",
        bottom: "top"
    };
    return opposites[faceName];
}


/* =========================
   MODE BUTTONS
========================= */

modeButtons.forEach(button => {

    button.addEventListener("click", () => {

        if (rolling) return;

        modeButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        currentMode = button.dataset.mode;

        updateMode();
    });

});


function updateMode() {

    multipleControls.classList.add("hidden");
    customControls.classList.add("hidden");
    totalContainer.classList.add("hidden");


    if (currentMode === "single") {

        modeLabel.textContent = "Single Dice";

        diceContainer.innerHTML = "";

        createDice(1);
    }


    if (currentMode === "multiple") {

        modeLabel.textContent = "Multiple Dice";

        multipleControls.classList.remove("hidden");
        totalContainer.classList.remove("hidden");

        createMultipleDice();
    }


    if (currentMode === "custom") {

        modeLabel.textContent = "Custom Dice";

        customControls.classList.remove("hidden");

        diceContainer.innerHTML = "";

        createDice(1);
    }

}


/* =========================
   MULTIPLE DICE
========================= */

function createMultipleDice() {

    diceContainer.innerHTML = "";

    const count = Number(diceCount.value);

    for (let i = 0; i < count; i++) {
        createDice(1, true);
    }
}


/* =========================
   +/- BUTTONS
========================= */

minusBtn.addEventListener("click", () => {

    if (rolling) return;

    let value = Number(diceCount.value);

    if (value > 2) {
        value--;
        diceCount.value = value;
        createMultipleDice();
    }
});


plusBtn.addEventListener("click", () => {

    if (rolling) return;

    let value = Number(diceCount.value);

    if (value < 12) {
        value++;
        diceCount.value = value;
        createMultipleDice();
    }
});


diceCount.addEventListener("change", () => {

    if (rolling) return;

    let value = Number(diceCount.value);
    value = Math.max(2, Math.min(12, value));
    diceCount.value = value;

    createMultipleDice();
});


/* =========================
   ROLL
========================= */

rollBtn.addEventListener("click", rollDice);


function rollDice() {

    if (rolling) return;

    rolling = true;
    rollBtn.disabled = true;


    const diceElements = [
        ...document.querySelectorAll(".dice")
    ];


    let sides = 6;

    if (currentMode === "custom") {

        sides = Number(sidesInput.value);
        sides = Math.max(2, Math.min(100, sides));
        sidesInput.value = sides;
    }


    const results = [];


    /* ── Per-dice animation parameters ── */

    diceElements.forEach((dice, index) => {

        /*
            Stagger: each die is slightly offset in
            both duration and start delay so they
            don't all move identically.
            Total roll still lands within ~1 second.
        */

        const baseDuration   = 980;  /* ms */
        const durationJitter = randomNumber(-40, 40);
        const delayMs        = index * randomNumber(20, 45);

        const rollDuration = baseDuration + durationJitter;

        /* Pass to CSS via custom properties */
        dice.style.setProperty(
            "--roll-duration",
            `${rollDuration}ms`
        );

        dice.style.setProperty(
            "--roll-delay",
            `${delayMs}ms`
        );

        /* Remove previous show-N and rolling classes */
        for (let n = 1; n <= 6; n++) {
            dice.classList.remove(`show-${n}`);
        }

        dice.classList.remove("rolling");

        /* Force reflow to restart animation */
        void dice.offsetWidth;

        dice.classList.add("rolling");

        /* Play sound per die (slightly staggered) */
        playRollSound(rollDuration, delayMs);


        /* ─── Settle this die when its animation ends ─── */

        const result = randomNumber(1, sides);
        results.push(result);

        /*
            Set value slightly before animation ends
            so the transition that follows the rolling class
            removal is already targeting the right face.
        */
        setTimeout(() => {

            /* Update pip face content */
            setDiceValue(dice, result);

        }, delayMs + rollDuration * 0.72);


        /* Remove rolling → CSS transition takes over → eases to show-N */
        setTimeout(() => {

            dice.classList.remove("rolling");

            /*
                Force a reflow so the browser registers
                the animation end before enabling transition.
                This ensures a smooth ease to the final angle.
            */
            void dice.offsetWidth;

            /* Clear the inline transition override (from rolling) */
            dice.style.transition = "";

        }, delayMs + rollDuration);

    });


    /* ── Update UI after all dice settled ── */

    const maxDelay =
        (diceElements.length - 1) * 45 + 980 + 60;

    setTimeout(() => {

        const total = results.reduce(
            (sum, v) => sum + v, 0
        );

        if (currentMode === "multiple") {
            totalValue.textContent = total;
        }

        saveHistory(results, sides, total);

        rolling          = false;
        rollBtn.disabled = false;

    }, maxDelay);
}


/* =========================
   RANDOM
========================= */

function randomNumber(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;
}


/* =========================
   HISTORY — SAVE
========================= */

function saveHistory(results, sides, total) {

    const item = {
        results: results,
        sides:   sides,
        total:   total,
        time:    new Date().toLocaleTimeString(
            [],
            { hour: "2-digit", minute: "2-digit" }
        )
    };

    history.unshift(item);

    if (history.length > 50) {
        history = history.slice(0, 50);
    }

    localStorage.setItem(
        "diceHistory",
        JSON.stringify(history)
    );

    renderHistory();
}


/* =========================
   HISTORY — UI
========================= */

function renderHistory() {

    if (!history.length) {

        historyList.innerHTML = `
            <div class="empty-history">
                No rolls yet.
            </div>
        `;

        return;
    }

    historyList.innerHTML =
        history.map(item => `
            <div class="history-item">

                <div>

                    <div class="history-result">
                        ${item.results.join(" • ")}
                    </div>

                    <div class="history-details">
                        ${item.results.length}
                        dice × D${item.sides}
                        · ${item.time}
                    </div>

                </div>

                ${item.results.length > 1
                    ? `<strong>${item.total}</strong>`
                    : ""
                }

            </div>
        `).join("");
}


/* =========================
   CLEAR HISTORY
========================= */

clearHistory.addEventListener("click", () => {

    history = [];

    localStorage.removeItem("diceHistory");

    renderHistory();
});


/* =========================
   INITIALIZE
========================= */

updateMode();

renderHistory();