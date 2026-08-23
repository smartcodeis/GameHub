const cars = [
    {
        brand: "BMW",
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg"
    },
    {
        brand: "Mercedes-Benz",
        logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg"
    },
    {
        brand: "Audi",
        logo: "https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg"
    },
    {
        brand: "Toyota",
        logo: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg"
    },
    {
        brand: "Volkswagen",
        logo: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Volkswagen_logo_2019.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original"
    },
    {
        brand: "Ford",
        logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg"
    },
    {
        brand: "Porsche",
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Porsche_hood_emblem.png?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled"
    },
    {
        brand: "Ferrari",
        logo: "https://logos-world.net/wp-content/uploads/2020/07/Ferrari-Scuderia-Logo.png"
    },
    {
        brand: "Lamborghini",
        logo: "https://i.pinimg.com/736x/a5/06/ef/a506ef2adff89c5397cbd63c7ffb3d1c.jpg"
    },
    {
        brand: "Tesla",
        logo: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Tesla_T_symbol.svg"
    },
    {
        brand: "Nissan",
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/23/Nissan_2020_logo.svg"
    },
    {
        brand: "Honda",
        logo: "https://upload.wikimedia.org/wikipedia/commons/archive/3/38/20161102193557%21Honda.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original"
    },
    {
        brand: "Hyundai",
        logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/hyundai-icon.png"
    },
    {
        brand: "Mitsubishi",
        logo: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Mitsubishi_logo.svg"
    },
    {
        brand: "Kia",
        logo: "https://upload.wikimedia.org/wikipedia/commons/b/b6/KIA_logo3.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original"
    },
    {
        brand: "Mazda",
        logo: "https://www.svgrepo.com/show/446894/mazda.svg"
    },
    {
        brand: "Subaru",
        logo: "https://logo-teka.com/wp-content/uploads/2025/07/subaru-sign-logo.svg"
    },
    {
        brand: "Chevrolet",
        logo: "https://images.seeklogo.com/logo-png/2/1/chevrolet-logo-png_seeklogo-29486.png"
    },
    {
        brand: "Maserati",
        logo: "https://www.svgrepo.com/show/446892/maserati.svg"
    },
    {
        brand: "Bentley",
        logo: "https://www.svgrepo.com/show/330046/bentley.svg"
    },
    {
        brand: "Rolls-Royce",
        logo: "https://www.svgrepo.com/show/446917/rolls-royce.svg"
    },
    {
        brand: "Peugeot",
        logo: "https://www.svgrepo.com/show/446905/peugeot.svg"
    },
    {
        brand: "Renault",
        logo: "https://www.svgrepo.com/show/446915/renault.svg"
    },
    {
        brand: "DS Automobiles",
        logo: "https://upload.wikimedia.org/wikipedia/commons/9/99/DS_Automobiles_2009_logo.svg"
    },
    {
        brand: "Opel",
        logo: "https://www.svgrepo.com/show/446907/opel.svg"
    },
    {
        brand: "Suzuki",
        logo: "https://www.svgrepo.com/show/306818/suzuki.svg"
    },
    {
        brand: "Isuzu",
        logo: "https://www.svgrepo.com/show/446879/isuzu.svg"
    },
    {
        brand: "Lexus",
        logo: "https://www.svgrepo.com/show/446890/lexus.svg"
    },
    {
        brand: "Maybach",
        logo: "https://www.svgrepo.com/show/446893/maybach.svg"
    },
    {
        brand: "Dodge",
        logo: "https://www.svgrepo.com/show/303429/dodge-ram-logo.svg"
    },
    {
        brand: "Citroën",
        logo: "https://www.svgrepo.com/show/446951/citroen.svg"
    },
    {
        brand: "Bugatti",
        logo: "https://www.svgrepo.com/show/330098/bugatti.svg"
    },
    {
        brand: "Jaguar",
        logo: "https://www.svgrepo.com/show/446884/jaguar.svg"
    },
    {
        brand: "Changan",
        logo: "https://upload.wikimedia.org/wikipedia/commons/0/00/Changan_icon.svg"
    },
    {
        brand: "Škoda",
        logo: "https://www.svgrepo.com/show/306730/skoda.svg"
    },
    {
        brand: "SEAT",
        logo: "https://img.logo.dev/seat.com?token=live_6a1a28fd-6420-4492-aeb0-b297461d9de2&size=128&retina=true&format=png"
    },
    {
        brand: "Cupra",
        logo: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Cupra_symbol.svg"
    },
    {
        brand: "Lada",
        logo: "https://www.svgrepo.com/show/330811/lada.svg"
    }
];


const TOTAL_QUESTIONS = cars.length;

/* =========================
   STORAGE KEYS
========================= */

const STORAGE_KEYS = {
    usedCars: "carGame_usedCars",
    history: "carGame_history"
};


/* =========================
   GAME VARIABLES
========================= */

let questions = [];
let currentQuestion = 0;
let score = 0;

let answerChecked = false;
let scoreAdded = false;

// History الخاصة باللعبة الحالية
let currentGameHistory = [];


/* =========================
   ELEMENTS
========================= */

const carLogo =
    document.getElementById("carLogo");

const answerInput =
    document.getElementById("answerInput");

const checkBtn =
    document.getElementById("checkBtn");

const correctAnswer =
    document.getElementById("correctAnswer");

const answerText =
    document.getElementById("answerText");

const decisionArea =
    document.getElementById("decisionArea");

const rightBtn =
    document.getElementById("rightBtn");

const wrongBtn =
    document.getElementById("wrongBtn");

const nextBtn =
    document.getElementById("nextBtn");

const scoreElement =
    document.getElementById("score");

const currentQuestionElement =
    document.getElementById("currentQuestion");

const totalQuestionsElement =
    document.getElementById("totalQuestions");

const progressBar =
    document.getElementById("progressBar");

const percentage =
    document.getElementById("percentage");

const gameArea =
    document.getElementById("gameArea");

const endScreen =
    document.getElementById("endScreen");

const finalScore =
    document.getElementById("finalScore");

const finalTotal =
    document.getElementById("finalTotal");

const message =
    document.getElementById("message");

const playAgain =
    document.getElementById("playAgain");

const historyList =
    document.getElementById("historyList");

const resetBtn =
    document.getElementById("resetBtn");


/* =========================
   SHUFFLE
========================= */

function shuffle(array) {

    return [...array].sort(
        () => Math.random() - 0.5
    );

}


/* =========================
   USED CARS
========================= */

function getUsedCars() {

    try {

        return JSON.parse(
            localStorage.getItem(
                STORAGE_KEYS.usedCars
            )
        ) || [];

    } catch (error) {

        console.error(
            "Error reading used cars:",
            error
        );

        return [];

    }

}


function saveUsedCars(usedCars) {

    try {

        localStorage.setItem(
            STORAGE_KEYS.usedCars,
            JSON.stringify(usedCars)
        );

    } catch (error) {

        console.error(
            "Error saving used cars:",
            error
        );

    }

}


/* =========================
   GET SAVED HISTORY
========================= */

function getHistory() {

    try {

        const history =
            localStorage.getItem(
                STORAGE_KEYS.history
            );

        if (!history) {
            return [];
        }

        return JSON.parse(history);

    } catch (error) {

        console.error(
            "Error reading history:",
            error
        );

        return [];

    }

}


/* =========================
   SAVE HISTORY
========================= */

function saveHistory(history) {

    try {

        localStorage.setItem(
            STORAGE_KEYS.history,
            JSON.stringify(history)
        );

    } catch (error) {

        console.error(
            "Error saving history:",
            error
        );

    }

}


/* =========================
   GET NEW QUESTIONS
========================= */

function getNewQuestions() {

    let usedCars = getUsedCars();

    if (usedCars.length >= cars.length) {

        usedCars = [];

        saveUsedCars([]);

    }

    const availableCars =
        cars.filter(
            car => !usedCars.includes(car.brand)
        );

    const shuffledCars =
        shuffle(availableCars);

    // استخدام كل العربيات المتاحة
    const selectedCars = shuffledCars;

    const newUsedCars = [
        ...usedCars,
        ...selectedCars.map(
            car => car.brand
        )
    ];

    saveUsedCars(newUsedCars);

    return selectedCars;
}


/* =========================
   START GAME
========================= */

function startGame() {

    questions =
        getNewQuestions();


    currentQuestion = 0;

    score = 0;

    answerChecked = false;

    scoreAdded = false;


    // مسح History اللعبة الحالية
    currentGameHistory = [];


    scoreElement.textContent =
        score;


    totalQuestionsElement.textContent =
        questions.length;


    finalTotal.textContent =
        questions.length;


    gameArea.classList.remove(
        "hidden"
    );


    endScreen.classList.add(
        "hidden"
    );


    showQuestion();


    // عرض History
    renderHistory();

}


/* =========================
   SHOW QUESTION
========================= */

function showQuestion() {

    answerChecked = false;

    scoreAdded = false;


    const question =
        questions[currentQuestion];


    // عرض اللوجو
    carLogo.src =
        question.logo;


    carLogo.alt =
        question.brand + " Logo";


    // رقم السؤال
    currentQuestionElement.textContent =
        currentQuestion + 1;


    // Progress
    const progress =
        (currentQuestion / questions.length) * 100;


    progressBar.style.width =
        `${progress}%`;


    percentage.textContent =
        `${Math.round(progress)}%`;


    // Reset input
    answerInput.value = "";

    answerInput.disabled = false;


    // Reset buttons
    checkBtn.style.display =
        "block";


    correctAnswer.classList.add(
        "hidden"
    );


    decisionArea.classList.add(
        "hidden"
    );


    nextBtn.style.display =
        "none";


    // Focus
    setTimeout(() => {

        answerInput.focus();

    }, 100);

}


/* =========================
   CHECK ANSWER
========================= */

checkBtn.addEventListener(
    "click",
    () => {

        if (answerChecked) {
            return;
        }


        answerChecked = true;


        const question =
            questions[currentQuestion];


        // عرض الإجابة الصحيحة
        answerText.textContent =
            question.brand;


        correctAnswer.classList.remove(
            "hidden"
        );


        // إظهار الاختيار
        decisionArea.classList.remove(
            "hidden"
        );


        // إخفاء Check
        checkBtn.style.display =
            "none";


        // منع تعديل الإجابة
        answerInput.disabled = true;

    }
);


/* =========================
   ENTER
========================= */

answerInput.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {

            checkBtn.click();

        }

    }
);


/* =========================
   ADD ANSWER TO HISTORY
========================= */

function addAnswerToHistory(isCorrect) {

    const question =
        questions[currentQuestion];


    const userAnswer =
        answerInput.value.trim();


    const historyItem = {

        question:
            currentQuestion + 1,

        brand:
            question.brand,

        userAnswer:
            userAnswer || "No answer",

        correct:
            isCorrect

    };


    currentGameHistory.push(
        historyItem
    );


    // تحديث الـHistory فوراً
    renderHistory();

}


/* =========================
   RIGHT
========================= */

rightBtn.addEventListener(
    "click",
    () => {

        if (scoreAdded) {
            return;
        }


        scoreAdded = true;


        // زيادة السكور
        score++;


        scoreElement.textContent =
            score;


        // إضافة للسجل
        addAnswerToHistory(true);


        // Next
        showNextButton();

    }
);


/* =========================
   WRONG
========================= */

wrongBtn.addEventListener(
    "click",
    () => {

        if (scoreAdded) {
            return;
        }


        scoreAdded = true;


        // لا نزود السكور


        // إضافة للسجل
        addAnswerToHistory(false);


        // Next
        showNextButton();

    }
);


/* =========================
   SHOW NEXT BUTTON
========================= */

function showNextButton() {

    decisionArea.classList.add(
        "hidden"
    );


    nextBtn.style.display =
        "block";


    if (
        currentQuestion ===
        questions.length - 1
    ) {

        nextBtn.textContent =
            "See Result 🏆";

    } else {

        nextBtn.textContent =
            "Next →";

    }

}


/* =========================
   NEXT
========================= */

nextBtn.addEventListener(
    "click",
    () => {

        currentQuestion++;


        if (
            currentQuestion >=
            questions.length
        ) {

            showEndScreen();

        } else {

            showQuestion();

        }

    }
);


/* =========================
   SAVE COMPLETED GAME
========================= */

function saveCompletedGame() {

    const history =
        getHistory();


    const gameResult = {

        score:
            score,

        total:
            questions.length,

        date:
            new Date().toLocaleString(),

        answers:
            [...currentGameHistory]

    };


    history.unshift(
        gameResult
    );


    // الاحتفاظ بآخر 20 لعبة
    if (history.length > 20) {

        history.pop();

    }


    saveHistory(history);

}


/* =========================
   END SCREEN
========================= */

function showEndScreen() {

    gameArea.classList.add(
        "hidden"
    );


    endScreen.classList.remove(
        "hidden"
    );


    // Final Score
    finalScore.textContent =
        score;


    finalTotal.textContent =
        questions.length;


    // Progress
    progressBar.style.width =
        "100%";


    percentage.textContent =
        "100%";


    // النسبة
    const result =
        (score / questions.length) * 100;


    // الرسالة
    if (result === 100) {

        message.textContent =
            "🔥 Perfect! You're a car expert!";

    } else if (result >= 80) {

        message.textContent =
            "🏎️ Excellent! You really know cars!";

    } else if (result >= 50) {

        message.textContent =
            "👍 Good job! Keep going!";

    } else {

        message.textContent =
            "😅 Try again and improve your score!";

    }


    // حفظ اللعبة كاملة
    saveCompletedGame();


    // تحديث History
    renderHistory();

}


/* =========================
   RENDER HISTORY
========================= */

function renderHistory() {

    historyList.innerHTML = "";


    /*
        لو مفيش إجابات
        في اللعبة الحالية
        ومفيش ألعاب قديمة
    */

    const savedGames =
        getHistory();


    if (
        currentGameHistory.length === 0 &&
        savedGames.length === 0
    ) {

        historyList.innerHTML = `
            <div class="history-empty">
                No games played yet.
            </div>
        `;

        return;

    }


    /* =========================
       CURRENT GAME
    ========================= */

    if (currentGameHistory.length > 0) {

        const currentTitle =
            document.createElement("div");


        currentTitle.className =
            "history-current-title";


        currentTitle.innerHTML = `
            🎮 Current Game
        `;


        historyList.appendChild(
            currentTitle
        );


        currentGameHistory.forEach(
            (game) => {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "history-item";


                const status =
                    game.correct
                        ? "✅ Correct"
                        : "❌ Wrong";


                const statusClass =
                    game.correct
                        ? "correct-history"
                        : "wrong-history";


                item.innerHTML = `

                    <div>

                        <div class="history-score">

                            ${game.question}.
                            ${game.brand}

                        </div>

                        <div class="history-date">

                            Your answer:
                            <strong>
                                ${escapeHTML(
                    game.userAnswer
                )}
                            </strong>

                        </div>

                    </div>

                    <div class="${statusClass}">

                        ${status}

                    </div>

                `;


                historyList.appendChild(
                    item
                );

            }
        );


        // Current score
        const currentScore =
            document.createElement(
                "div"
            );


        currentScore.className =
            "current-history-score";


        currentScore.innerHTML = `

            <strong>
                Current Score:
            </strong>

            ${score} / ${currentGameHistory.length}

        `;


        historyList.appendChild(
            currentScore
        );

    }


    /* =========================
       PREVIOUS GAMES
    ========================= */

    if (savedGames.length > 0) {

        const previousTitle =
            document.createElement(
                "div"
            );


        previousTitle.className =
            "history-current-title";


        previousTitle.innerHTML = `
            📜 Previous Games
        `;


        historyList.appendChild(
            previousTitle
        );


        savedGames.forEach(
            (game, index) => {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "history-item";


                const pct =
                    Math.round(
                        (
                            game.score /
                            game.total
                        ) * 100
                    );


                let color;


                if (pct === 100) {

                    color =
                        "#2ecc71";

                } else if (pct >= 80) {

                    color =
                        "#00c6ff";

                } else if (pct >= 50) {

                    color =
                        "#f39c12";

                } else {

                    color =
                        "#e74c3c";

                }


                item.innerHTML = `

                    <div>

                        <div
                            class="history-score"
                            style="color: ${color}"
                        >

                            Game #${savedGames.length - index}

                            —
                            ${game.score}
                            /
                            ${game.total}

                        </div>


                        <div class="history-date">

                            ${game.date}

                        </div>

                    </div>


                    <div class="history-number">

                        ${pct}%

                    </div>

                `;


                historyList.appendChild(
                    item
                );

            }
        );

    }

}


/* =========================
   ESCAPE HTML
========================= */

function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text;


    return div.innerHTML;

}


/* =========================
   PLAY AGAIN
========================= */

playAgain.addEventListener(
    "click",
    () => {

        startGame();

    }
);


/* =========================
   RESET HISTORY
========================= */

resetBtn.addEventListener(
    "click",
    () => {

        const confirmed =
            confirm(
                "Are you sure you want to reset history?"
            );


        if (!confirmed) {
            return;
        }


        // مسح الألعاب القديمة
        localStorage.removeItem(
            STORAGE_KEYS.history
        );


        // مسح History اللعبة الحالية
        currentGameHistory = [];


        // تحديث الشاشة
        renderHistory();

    }
);


/* =========================
   INITIALIZE
========================= */

renderHistory();

startGame();