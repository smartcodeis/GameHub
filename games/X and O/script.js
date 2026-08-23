const cells = document.querySelectorAll(".cell");

const status = document.getElementById("status");

const player1Card =
    document.getElementById("player1Card");

const player2Card =
    document.getElementById("player2Card");

const player1Symbol =
    document.getElementById("player1Symbol");

const player2Symbol =
    document.getElementById("player2Symbol");

const scorePlayer1 =
    document.getElementById("scorePlayer1");

const scorePlayer2 =
    document.getElementById("scorePlayer2");

const scoreDraws =
    document.getElementById("scoreDraws");

const newGameButton =
    document.getElementById("newGame");

const newRoundButton =
    document.getElementById("newRound");

const endRoundButton =
    document.getElementById("endRound");

const historyContainer =
    document.getElementById("history");

const clearHistoryButton =
    document.getElementById("clearHistory");

const winningLine =
    document.getElementById("winningLine");


/* =========================
   GAME
========================= */

let board = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
];

let currentPlayer = 1;

let gameActive = true;


/* =========================
   ROUND
========================= */

let roundNumber = 1;

let gameNumber = 1;


/*
    Player 1 / Player 2

    Game 1:
    P1 = X
    P2 = O

    Game 2:
    P1 = O
    P2 = X

    Game 3:
    P1 = X
    P2 = O
*/

let player1SymbolValue = "X";

let player2SymbolValue = "O";


/* SCORE */

let score = {

    player1: 0,

    player2: 0,

    draws: 0

};


/* =========================
   WINNING COMBINATIONS
========================= */

const winningCombinations = [

    {
        indexes: [0, 1, 2],

        line: {
            x: 0,
            y: 16.5,
            width: 100,
            rotation: 0
        }
    },

    {
        indexes: [3, 4, 5],

        line: {
            x: 0,
            y: 50,
            width: 100,
            rotation: 0
        }
    },

    {
        indexes: [6, 7, 8],

        line: {
            x: 0,
            y: 83.5,
            width: 100,
            rotation: 0
        }
    },

    {
        indexes: [0, 3, 6],

        line: {
            x: 16.5,
            y: 0,
            width: 100,
            rotation: 90
        }
    },

    {
        indexes: [1, 4, 7],

        line: {
            x: 50,
            y: 0,
            width: 100,
            rotation: 90
        }
    },

    {
        indexes: [2, 5, 8],

        line: {
            x: 83.5,
            y: 0,
            width: 100,
            rotation: 90
        }
    },

    {
        indexes: [0, 4, 8],

        line: {
            x: 0,
            y: 0,
            width: 141,
            rotation: 45
        }
    },

    {
        indexes: [2, 4, 6],

        line: {
            x: 100,
            y: 0,
            width: 141,
            rotation: 135
        }
    }

];


/* =========================
   LOCAL STORAGE
========================= */

let roundHistory =
    JSON.parse(
        localStorage.getItem("ticTacToeRounds")
    ) || [];


/* =========================
   INITIALIZE
========================= */

updatePlayers();

updateScore();

renderHistory();


/* =========================
   CELL CLICK
========================= */

cells.forEach(cell => {

    cell.addEventListener(
        "click",
        handleCellClick
    );

});


function handleCellClick(event) {

    if (!gameActive) {
        return;
    }


    const index =
        Number(event.target.dataset.index);


    if (board[index] !== "") {
        return;
    }


    const symbol =
        currentPlayer === 1
            ? player1SymbolValue
            : player2SymbolValue;


    board[index] = symbol;


    event.target.textContent =
        symbol;


    event.target.classList.add(
        symbol.toLowerCase()
    );


    checkGame();
}


/* =========================
   CHECK GAME
========================= */

function checkGame() {

    for (
        const combination
        of winningCombinations
    ) {

        const [a, b, c] =
            combination.indexes;


        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            const winnerSymbol =
                board[a];


            const winner =
                winnerSymbol === player1SymbolValue
                    ? 1
                    : 2;


            gameActive = false;


            /*
                UPDATE SCORE
            */

            if (winner === 1) {

                score.player1++;

            } else {

                score.player2++;

            }


            updateScore();


            status.textContent =
                `Player ${winner} Wins!`;


            drawWinningLine(
                combination.line
            );


            return;
        }

    }


    /*
        DRAW
    */

    if (!board.includes("")) {

        gameActive = false;


        score.draws++;


        updateScore();


        status.textContent =
            "It's a Draw!";


        return;
    }


    /*
        CHANGE PLAYER
    */

    currentPlayer =
        currentPlayer === 1
            ? 2
            : 1;


    updatePlayers();

}


/* =========================
   UPDATE PLAYERS
========================= */

function updatePlayers() {

    player1Symbol.textContent =
        player1SymbolValue;

    player2Symbol.textContent =
        player2SymbolValue;


    player1Card.classList.remove(
        "active"
    );

    player2Card.classList.remove(
        "active"
    );


    if (!gameActive) {
        return;
    }


    if (currentPlayer === 1) {

        status.textContent =
            "Player 1's Turn";

        player1Card.classList.add(
            "active"
        );

    } else {

        status.textContent =
            "Player 2's Turn";

        player2Card.classList.add(
            "active"
        );

    }

}


/* =========================
   UPDATE SCORE
========================= */

function updateScore() {

    scorePlayer1.textContent =
        score.player1;

    scorePlayer2.textContent =
        score.player2;

    scoreDraws.textContent =
        score.draws;
}


/* =========================
   WINNING LINE
========================= */

function drawWinningLine(line) {

    const boardSize =
        document
            .querySelector(
                ".board-container"
            )
            .offsetWidth;


    const width =
        boardSize *
        (line.width / 100);


    winningLine.style.left =
        `${boardSize * (line.x / 100)}px`;


    winningLine.style.top =
        `${boardSize * (line.y / 100)}px`;


    winningLine.style.width =
        `${width}px`;


    winningLine.style.transform =
        `rotate(${line.rotation}deg)`;


    winningLine.style.opacity =
        "1";
}


/* =========================
   NEW GAME
========================= */

newGameButton.addEventListener(
    "click",
    startNewGame
);


function startNewGame() {

    /*
        Swap X and O

        لكن X ALWAYS STARTS
    */

    if (
        player1SymbolValue === "X"
    ) {

        player1SymbolValue = "O";

        player2SymbolValue = "X";

    } else {

        player1SymbolValue = "X";

        player2SymbolValue = "O";
    }


    gameNumber++;


    resetBoard();


    /*
        X ALWAYS STARTS

        نحدد مين اللاعب
        اللي معاه X
    */

    if (
        player1SymbolValue === "X"
    ) {

        currentPlayer = 1;

    } else {

        currentPlayer = 2;

    }


    gameActive = true;


    updatePlayers();

}


/* =========================
   RESET BOARD
========================= */

function resetBoard() {

    board = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ];


    cells.forEach(cell => {

        cell.textContent = "";

        cell.classList.remove(
            "x",
            "o"
        );

    });


    winningLine.style.opacity =
        "0";

    winningLine.style.width =
        "0";

}


/* =========================
   NEW ROUND
========================= */

newRoundButton.addEventListener(
    "click",
    startNewRound
);


function startNewRound() {

    /*
        لو في Round قديمة
        نحفظها في History
    */

    saveRoundToHistory();


    /*
        Round جديدة
    */

    roundNumber++;


    gameNumber = 1;


    /*
        Score جديد
    */

    score = {

        player1: 0,

        player2: 0,

        draws: 0

    };


    /*
        أول Game في الـ Round
        Player 1 = X

        X دايمًا يبدأ
    */

    player1SymbolValue = "X";

    player2SymbolValue = "O";

    currentPlayer = 1;


    gameActive = true;


    resetBoard();


    updateScore();

    updatePlayers();

    renderHistory();

}


/* =========================
   END ROUND
========================= */

endRoundButton.addEventListener(
    "click",
    endRound
);


function endRound() {

    if (
        score.player1 === 0 &&
        score.player2 === 0 &&
        score.draws === 0
    ) {

        alert(
            "Play at least one game first."
        );

        return;
    }


    saveRoundToHistory();


    alert(
        `Round ${roundNumber} ended!\n\n` +
        `Player 1: ${score.player1}\n` +
        `Player 2: ${score.player2}\n` +
        `Draws: ${score.draws}`
    );

}


/* =========================
   SAVE ROUND
========================= */

function saveRoundToHistory() {

    /*
        منع تكرار نفس الـ Round
        لو مفيش ماتشات
    */

    if (
        score.player1 === 0 &&
        score.player2 === 0 &&
        score.draws === 0
    ) {

        return;
    }


    const winner =
        getRoundWinner();


    const round = {

        round: roundNumber,

        player1Score:
            score.player1,

        player2Score:
            score.player2,

        draws:
            score.draws,

        winner:
            winner,

        date:
            new Date().toLocaleString()

    };


    roundHistory.unshift(round);


    localStorage.setItem(
        "ticTacToeRounds",
        JSON.stringify(
            roundHistory
        )
    );


    renderHistory();

}


/* =========================
   ROUND WINNER
========================= */

function getRoundWinner() {

    if (
        score.player1 >
        score.player2
    ) {

        return "Player 1";

    }


    if (
        score.player2 >
        score.player1
    ) {

        return "Player 2";

    }


    return "Draw";
}


/* =========================
   HISTORY
========================= */

function renderHistory() {

    historyContainer.innerHTML =
        "";


    if (
        roundHistory.length === 0
    ) {

        historyContainer.innerHTML = `

            <p class="empty-history">
                No rounds played yet.
            </p>

        `;

        return;
    }


    roundHistory.forEach(round => {

        const item =
            document.createElement(
                "div"
            );


        item.classList.add(
            "history-item"
        );


        let winnerClass =
            round.winner === "Draw"
                ? "history-draw"
                : "history-winner";


        item.innerHTML = `

            <div>

                <div class="history-round">
                    Round #${round.round}
                </div>

                <div class="history-score">

                    Player 1:
                    ${round.player1Score}

                    &nbsp; - &nbsp;

                    Player 2:
                    ${round.player2Score}

                    &nbsp;

                    (Draws:
                    ${round.draws})

                </div>

            </div>


            <div class="${winnerClass}">

                ${round.winner === "Draw"
                ? "Draw"
                : `${round.winner} Won`
            }

            </div>

        `;


        historyContainer.appendChild(
            item
        );

    });

}


/* =========================
   CLEAR HISTORY
========================= */

clearHistoryButton.addEventListener(
    "click",
    () => {

        const confirmed =
            confirm(
                "Clear all round history?"
            );


        if (!confirmed) {
            return;
        }


        roundHistory = [];


        localStorage.removeItem(
            "ticTacToeRounds"
        );


        renderHistory();

    }
);