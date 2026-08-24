const cardElement = document.getElementById("card");
const questionElement = document.getElementById("question");
const cardNumberElement = document.getElementById("cardNumber");

const drawButton = document.getElementById("drawBtn");

const historyElement = document.getElementById("history");
const emptyHistory = document.getElementById("emptyHistory");

const clearHistoryButton =
    document.getElementById("clearHistory");

const cardCountElement =
    document.getElementById("cardCount");

const langButtons = 
    document.querySelectorAll(".lang-btn");


let cards = [];
let history = JSON.parse(localStorage.getItem("randomCardHistory")) || [];
let currentCard = JSON.parse(localStorage.getItem("randomCardCurrent")) || null;

let allCardsData = { english: [], arabic: [] };
let currentLang = localStorage.getItem("randomCardLang") || "english";


/* =========================
   LOAD QUESTIONS
========================= */

async function loadCards() {

    try {

        const [engRes, arRes] = await Promise.all([
            fetch("../data/cards.json"),
            fetch("../data/arabiccards.json")
        ]);

        if (!engRes.ok || !arRes.ok) {
            throw new Error("Failed to load cards");
        }

        const engData = await engRes.json();
        const arData = await arRes.json();

        allCardsData.english = (engData.cards || []).map(c => ({...c, uniqueId: 'en_' + c.id}));
        allCardsData.arabic = (arData.cards || []).map(c => ({...c, uniqueId: 'ar_' + c.id}));

        if (currentCard) {
            questionElement.textContent = currentCard.question;
            cardNumberElement.textContent = `#${currentCard.id}`;
        }

        updateCardsForLanguage(currentLang);
        renderHistory();

    } catch (error) {

        console.error(error);

        questionElement.textContent =
            "Unable to load questions.";

        drawButton.disabled = true;
    }
}


function updateCardsForLanguage(lang) {
    
    currentLang = lang;
    localStorage.setItem("randomCardLang", currentLang);
    
    // Update active button
    langButtons.forEach(btn => {
        btn.classList.toggle("active", btn.dataset.lang === lang);
    });
    
    // Update cards pool
    if (lang === "english") {
        cards = [...allCardsData.english];
    } else if (lang === "arabic") {
        cards = [...allCardsData.arabic];
    } else if (lang === "all") {
        cards = [...allCardsData.english, ...allCardsData.arabic];
    }
    
    cardCountElement.textContent =
        cards.length;

    const usedIds = new Set(
        history.map(c => c.uniqueId || c.id)
    );
    const availableCards = cards.filter(c => !usedIds.has(c.uniqueId || c.id));

    drawButton.disabled =
        availableCards.length === 0;
}


/* =========================
   GET RANDOM UNUSED CARD
========================= */

function getRandomCard() {

    if (cards.length === 0) {
        return null;
    }


    // Get IDs of cards already shown
    const usedIds = new Set(
        history.map(card => card.uniqueId || card.id)
    );


    // Get only cards that haven't
    // been shown before
    const availableCards =
        cards.filter(
            card => !usedIds.has(card.uniqueId || card.id)
        );


    // All cards have been used
    if (availableCards.length === 0) {
        return null;
    }


    // Pick random card from
    // available cards only
    const randomIndex =
        Math.floor(
            Math.random() * availableCards.length
        );


    return availableCards[randomIndex];
}


/* =========================
   DRAW CARD
========================= */

function drawCard() {

    const card =
        getRandomCard();


    // No cards left
    if (!card) {

        questionElement.textContent =
            "You've seen all the cards!";

        cardNumberElement.textContent =
            "✓";

        drawButton.disabled = true;

        return;
    }


    currentCard = card;
    localStorage.setItem("randomCardCurrent", JSON.stringify(currentCard));


    // Display question
    questionElement.textContent =
        card.question;


    // Display card number
    cardNumberElement.textContent =
        `#${card.id}`;


    // Add card to history
    addToHistory(card);


    // Play animation
    playCardAnimation();


    // Check if this was the last card
    const usedIds = new Set(
        history.map(c => c.uniqueId || c.id)
    );
    const availableCards = cards.filter(c => !usedIds.has(c.uniqueId || c.id));

    if (availableCards.length === 0) {

        setTimeout(() => {

            drawButton.disabled = true;

        }, 500);
    }
}


/* =========================
   CARD ANIMATION
========================= */

function playCardAnimation() {

    // Remove animation
    cardElement.classList.remove("animate");


    // Force browser reflow
    void cardElement.offsetWidth;


    // Add animation again
    cardElement.classList.add("animate");
}


/* =========================
   ADD TO HISTORY
========================= */

function addToHistory(card) {

    history.unshift(card);
    localStorage.setItem("randomCardHistory", JSON.stringify(history));

    renderHistory();
}


/* =========================
   RENDER HISTORY
========================= */

function renderHistory() {

    historyElement.innerHTML = "";


    // No history
    if (history.length === 0) {

        historyElement.appendChild(
            emptyHistory
        );

        return;
    }


    history.forEach((card) => {

        const item =
            document.createElement("div");

        item.className =
            "history-item";


        const number =
            document.createElement("div");

        number.className =
            "history-number";

        number.textContent =
            `#${card.id}`;


        const question =
            document.createElement("p");

        question.className =
            "history-question";

        question.textContent =
            card.question;


        item.appendChild(number);
        item.appendChild(question);


        historyElement.appendChild(item);

    });
}


/* =========================
   CLEAR HISTORY
========================= */

function clearHistory() {

    history = [];
    currentCard = null;

    localStorage.removeItem("randomCardHistory");
    localStorage.removeItem("randomCardCurrent");


    // Reset card
    questionElement.textContent =
        "Press the button to draw a card.";


    cardNumberElement.textContent =
        "#";


    // Enable draw button again
    drawButton.disabled = cards.length === 0;


    // Re-render history
    renderHistory();
}


/* =========================
   EVENTS
========================= */

drawButton.addEventListener(
    "click",
    drawCard
);


clearHistoryButton.addEventListener(
    "click",
    clearHistory
);


langButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        if (currentLang !== btn.dataset.lang) {
            updateCardsForLanguage(btn.dataset.lang);
        }
    });
});


/* =========================
   INITIALIZE APP
========================= */

loadCards();