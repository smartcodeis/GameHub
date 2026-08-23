const minInput = document.getElementById("min");
const maxInput = document.getElementById("max");
const excludeInput = document.getElementById("exclude");

const generateBtn = document.getElementById("generateBtn");

const result = document.getElementById("result");

const historyContainer = document.getElementById("history");
const historyCount = document.getElementById("historyCount");

const clearBtn = document.getElementById("clearBtn");
const error = document.getElementById("error");


let history = [];


// =========================
// GENERATE RANDOM NUMBER
// =========================

function generateRandomNumber() {

    error.textContent = "";

    const min = Number(minInput.value);
    const max = Number(maxInput.value);

    // Validation
    if (
        minInput.value === "" ||
        maxInput.value === ""
    ) {
        showError("Please enter both minimum and maximum.");
        return;
    }

    if (min > max) {
        showError("Minimum cannot be greater than maximum.");
        return;
    }


    // Get excluded numbers
    const excludeText = excludeInput.value.trim();

    let excluded = [];

    if (excludeText) {

        excluded = excludeText
            .split(",")
            .map(value => value.trim())
            .filter(value => value !== "")
            .map(Number);

        if (excluded.some(Number.isNaN)) {
            showError("Exclude numbers must contain only numbers.");
            return;
        }
    }


    // Create available numbers
    const availableNumbers = [];

    for (let i = min; i <= max; i++) {

        if (!excluded.includes(i)) {
            availableNumbers.push(i);
        }
    }


    // No numbers available
    if (availableNumbers.length === 0) {
        showError("There are no available numbers.");
        return;
    }


    // Random number
    const randomIndex = Math.floor(
        Math.random() * availableNumbers.length
    );

    const randomNumber = availableNumbers[randomIndex];


    // Show result
    showResult(randomNumber);

    // Add to history
    addToHistory(randomNumber);
}


// =========================
// SHOW RESULT
// =========================

function showResult(number) {

    result.classList.remove("animate");

    // Force animation restart
    void result.offsetWidth;

    result.textContent = number;

    result.classList.add("animate");
}


// =========================
// HISTORY
// =========================

function addToHistory(number) {

    const item = {
        number: number,
        time: new Date()
    };

    history.unshift(item);

    // Keep last 50
    if (history.length > 50) {
        history.pop();
    }

    renderHistory();
}


function renderHistory() {

    historyCount.textContent =
        `${history.length} ${history.length === 1 ? "result" : "results"}`;


    if (history.length === 0) {

        historyContainer.innerHTML = `
            <div class="empty-history">
                <div class="empty-icon">⌁</div>
                <p>No numbers generated yet</p>
                <span>Your results will appear here.</span>
            </div>
        `;

        return;
    }


    historyContainer.innerHTML = "";


    history.forEach(item => {

        const historyItem =
            document.createElement("div");

        historyItem.className = "history-item";


        const number =
            document.createElement("span");

        number.className = "history-number";

        number.textContent = item.number;


        const time =
            document.createElement("span");

        time.className = "history-time";

        time.textContent =
            formatTime(item.time);


        historyItem.appendChild(number);

        historyItem.appendChild(time);

        historyContainer.appendChild(historyItem);
    });
}


// =========================
// TIME
// =========================

function formatTime(date) {

    return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}


// =========================
// ERROR
// =========================

function showError(message) {

    error.textContent = message;
}


// =========================
// CLEAR HISTORY
// =========================

clearBtn.addEventListener("click", () => {

    history = [];

    renderHistory();
});


// =========================
// GENERATE BUTTON
// =========================

generateBtn.addEventListener(
    "click",
    generateRandomNumber
);


// =========================
// ENTER KEY
// =========================

[minInput, maxInput, excludeInput].forEach(input => {

    input.addEventListener("keydown", event => {

        if (event.key === "Enter") {
            generateRandomNumber();
        }

    });

});


// Initial render
renderHistory();