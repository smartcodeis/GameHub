const participantInput =
    document.getElementById("participantInput");

const addParticipantBtn =
    document.getElementById("addParticipantBtn");

const participantsList =
    document.getElementById("participantsList");

const participantCount =
    document.getElementById("participantCount");

const startTournamentBtn =
    document.getElementById("startTournamentBtn");

const newTournamentBtn =
    document.getElementById("newTournamentBtn");

const setupScreen =
    document.getElementById("setupScreen");

const tournamentScreen =
    document.getElementById("tournamentScreen");

const statsScreen =
    document.getElementById("statsScreen");

const optionA =
    document.getElementById("optionA");

const optionB =
    document.getElementById("optionB");

const optionAText =
    document.getElementById("optionAText");

const optionBText =
    document.getElementById("optionBText");

const roundTitle =
    document.getElementById("roundTitle");

const roundSubtitle =
    document.getElementById("roundSubtitle");

const currentMatch =
    document.getElementById("currentMatch");

const totalMatches =
    document.getElementById("totalMatches");

const bracket =
    document.getElementById("bracket");

const matchArea =
    document.getElementById("matchArea");

const winnerArea =
    document.getElementById("winnerArea");

const winnerName =
    document.getElementById("winnerName");

const viewStatsBtn =
    document.getElementById("viewStatsBtn");

const statParticipants =
    document.getElementById("statParticipants");

const statMatches =
    document.getElementById("statMatches");

const statRounds =
    document.getElementById("statRounds");

const statWinner =
    document.getElementById("statWinner");

const resultsList =
    document.getElementById("resultsList");

const restartBtn =
    document.getElementById("restartBtn");

const backToTournamentBtn =
    document.getElementById("backToTournamentBtn");

const historyList =
    document.getElementById("historyList");

const clearHistoryBtn =
    document.getElementById("clearHistoryBtn");


/* =========================
   STATE
========================= */

let participants = [];

let currentRound = [];

let nextRound = [];

let currentMatchIndex = 0;

let roundNumber = 1;

let matchResults = [];

let tournamentStarted = false;

let tournamentWinner = null;


/* =========================
   PARTICIPANTS
========================= */

function addParticipant() {

    const name =
        participantInput.value.trim();

    if (!name) return;

    participants.push({
        id: crypto.randomUUID(),
        name
    });

    participantInput.value = "";

    renderParticipants();

    participantInput.focus();
}


function removeParticipant(id) {

    participants =
        participants.filter(
            participant =>
                participant.id !== id
        );

    renderParticipants();
}


function renderParticipants() {

    participantCount.textContent =
        participants.length;

    if (participants.length === 0) {

        participantsList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">+</div>
                <p>No participants yet</p>
                <span>
                    Add at least 2 participants to start.
                </span>
            </div>
        `;

    } else {

        participantsList.innerHTML =
            participants.map(
                participant => `
                    <div class="participant">

                        <span>
                            ${escapeHTML(participant.name)}
                        </span>

                        <button
                            class="remove-participant"
                            onclick="removeParticipant('${participant.id}')"
                        >
                            ×
                        </button>

                    </div>
                `
            ).join("");
    }

    startTournamentBtn.disabled =
        participants.length < 2;
}


/* =========================
   START TOURNAMENT
========================= */

function startTournament() {

    if (participants.length < 2)
        return;

    tournamentStarted = true;

    matchResults = [];

    tournamentWinner = null;

    roundNumber = 1;

    currentMatchIndex = 0;

    currentRound =
        shuffle(
            participants.map(p => ({
                id: p.id,
                name: p.name
            }))
        );

    nextRound = [];

    setupScreen.classList.add("hidden");

    statsScreen.classList.add("hidden");

    tournamentScreen.classList.remove("hidden");

    winnerArea.classList.add("hidden");

    matchArea.classList.remove("hidden");

    renderBracket();

    prepareRound();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================
   ROUND
========================= */

function prepareRound() {

    currentMatchIndex = 0;

    nextRound = [];

    const matches =
        Math.ceil(currentRound.length / 2);

    totalMatches.textContent =
        matches;

    roundTitle.textContent =
        getRoundName(
            currentRound.length
        );

    roundSubtitle.textContent =
        "Choose your favorite.";

    showCurrentMatch();
}


function showCurrentMatch() {

    if (
        currentMatchIndex >=
        Math.floor(currentRound.length / 2)
    ) {

        finishRound();

        return;
    }


    const index =
        currentMatchIndex * 2;

    const playerA =
        currentRound[index];

    const playerB =
        currentRound[index + 1];


    optionAText.textContent =
        playerA.name;

    optionBText.textContent =
        playerB.name;

    currentMatch.textContent =
        currentMatchIndex + 1;

    optionA.disabled = false;
    optionB.disabled = false;

    optionA.style.opacity = "1";
    optionB.style.opacity = "1";

    optionA.style.borderColor = "";
    optionA.style.background = "";
    optionB.style.borderColor = "";
    optionB.style.background = "";
}


/* =========================
   SELECT WINNER
========================= */

function chooseWinner(winnerIndex) {

    const index =
        currentMatchIndex * 2;

    const playerA =
        currentRound[index];

    const playerB =
        currentRound[index + 1];

    const winner =
        winnerIndex === 0
            ? playerA
            : playerB;

    const loser =
        winnerIndex === 0
            ? playerB
            : playerA;


    matchResults.push({
        round: roundNumber,
        winner: winner.name,
        loser: loser.name
    });


    nextRound.push(winner);


    optionA.disabled = true;
    optionB.disabled = true;


    const selectedButton =
        winnerIndex === 0
            ? optionA
            : optionB;

    const otherButton =
        winnerIndex === 0
            ? optionB
            : optionA;


    selectedButton.style.borderColor =
        "var(--success)";

    selectedButton.style.background =
        "rgba(49,211,145,0.1)";

    otherButton.style.opacity =
        "0.35";


    setTimeout(() => {

        currentMatchIndex++;

        renderBracket();

        showCurrentMatch();

    }, 550);
}


/* =========================
   FINISH ROUND
========================= */

function finishRound() {

    /*
        Odd participant:
        Automatically advances.
    */

    if (currentRound.length % 2 !== 0) {

        const byePlayer =
            currentRound[
            currentRound.length - 1
            ];

        nextRound.push(byePlayer);

        matchResults.push({
            round: roundNumber,
            winner: byePlayer.name,
            loser: "BYE"
        });
    }


    if (nextRound.length === 1) {

        finishTournament(
            nextRound[0]
        );

        return;
    }


    currentRound =
        nextRound;

    roundNumber++;

    renderBracket();

    prepareRound();
}


/* =========================
   FINISH TOURNAMENT
========================= */

function finishTournament(winner) {

    tournamentWinner =
        winner;

    matchArea.classList.add("hidden");

    winnerArea.classList.remove("hidden");

    winnerName.textContent =
        winner.name;

    roundTitle.textContent =
        "Tournament Complete";

    roundSubtitle.textContent =
        "We have a winner!";


    saveTournamentHistory();

    renderBracket();
}


/* =========================
   BRACKET
========================= */

function renderBracket() {

    if (!tournamentStarted)
        return;


    const allRounds =
        buildBracketRounds();


    bracket.innerHTML =
        allRounds.map(
            round => `

                <div class="bracket-round">

                    <h4>
                        ${round.name}
                    </h4>

                    <div class="bracket-matches">

                        ${round.matches.map(
                match => `

                            <div class="bracket-match">

                                <div class="
                                    bracket-player
                                    ${match.winner === match.a
                        ? "winner"
                        : ""}
                                ">
                                    ${escapeHTML(match.a)}
                                </div>

                                <div class="
                                    bracket-player
                                    ${match.winner === match.b
                        ? "winner"
                        : ""}
                                ">
                                    ${escapeHTML(match.b)}
                                </div>

                            </div>

                        `).join("")}

                    </div>

                </div>

            `
        ).join("");
}


function buildBracketRounds() {

    const rounds = [];

    let players =
        participants.map(
            p => p.name
        );

    let round = 1;

    while (players.length > 1) {

        const matches = [];

        for (
            let i = 0;
            i < players.length;
            i += 2
        ) {

            const a =
                players[i];

            const b =
                players[i + 1] || "BYE";


            const result =
                matchResults.find(
                    result =>
                        result.round === round &&
                        (
                            (
                                result.winner === a &&
                                result.loser === b
                            ) ||
                            (
                                result.winner === b &&
                                result.loser === a
                            ) ||
                            (
                                result.winner === a &&
                                result.loser === "BYE"
                            )
                        )
                );


            matches.push({
                a,
                b,
                winner:
                    result
                        ? result.winner
                        : null
            });
        }


        rounds.push({
            name: getRoundName(
                players.length
            ),
            matches
        });


        players =
            Array(
                Math.ceil(
                    players.length / 2
                )
            ).fill("TBD");

        round++;
    }


    return rounds;
}


/* =========================
   STATS
========================= */

function renderStats() {

    statParticipants.textContent =
        participants.length;

    statMatches.textContent =
        matchResults.filter(
            result =>
                result.loser !== "BYE"
        ).length;

    statRounds.textContent =
        Math.ceil(
            Math.log2(
                participants.length
            )
        );

    statWinner.textContent =
        tournamentWinner
            ? tournamentWinner.name
            : "-";


    resultsList.innerHTML =
        matchResults.map(
            result => `

                <div class="result-row">

                    <span class="result-round">
                        ${getRoundNameFromNumber(
                result.round
            )}
                    </span>

                    <span>
                        ${escapeHTML(
                result.winner
            )}
                    </span>

                    <span class="result-vs">
                        ${result.loser === "BYE"
                    ? "BYE"
                    : "vs"}
                    </span>

                    <span class="
                        ${result.loser === "BYE"
                    ? "result-winner"
                    : ""}
                    ">
                        ${escapeHTML(
                        result.loser
                    )}
                    </span>

                </div>

            `
        ).join("");
}


/* =========================
   HISTORY
========================= */

function getHistory() {

    return JSON.parse(
        localStorage.getItem(
            "decisionTournamentHistory"
        ) || "[]"
    );
}


function saveTournamentHistory() {

    const history =
        getHistory();

    history.unshift({
        id: Date.now(),

        winner:
            tournamentWinner.name,

        participants:
            participants.length,

        participantNames:
            participants.map(p => p.name),

        matches:
            matchResults.filter(
                result =>
                    result.loser !== "BYE"
            ).length,

        date:
            new Date().toLocaleString()
    });


    localStorage.setItem(
        "decisionTournamentHistory",
        JSON.stringify(
            history.slice(0, 20)
        )
    );


    renderHistory();
}


function renderHistory() {

    const history =
        getHistory();


    if (history.length === 0) {

        historyList.innerHTML = `
            <div class="no-history">
                No previous tournaments.
            </div>
        `;

        return;
    }


    historyList.innerHTML =
        history.map(
            item => `

                <div class="history-item">

                    <div class="history-info">

                        <h4>
                            ${escapeHTML(
                item.winner
            )}
                        </h4>

                        <p>
                            ${item.date}
                            ·
                            ${item.participants}
                            participants
                            ·
                            ${item.matches}
                            matches
                        </p>

                    </div>

                    <div class="history-actions" style="display: flex; flex-direction: column; align-items: flex-end; gap: 10px;">
                        <div class="history-winner">
                            🏆 Winner
                        </div>
                        ${item.participantNames ? `
                        <button class="secondary-btn" style="padding: 6px 12px; font-size: 13px;" onclick="reuseTournament(${item.id})">
                            Open again
                        </button>
                        ` : ''}
                    </div>

                </div>

            `
        ).join("");
}


/* =========================
   REUSE TOURNAMENT
========================= */

function reuseTournament(id) {

    const history = getHistory();
    
    const tournament = history.find(item => item.id === id);
    
    if (!tournament || !tournament.participantNames) return;

    resetTournament();

    participants = tournament.participantNames.map(name => ({
        id: crypto.randomUUID(),
        name
    }));

    renderParticipants();
}


/* =========================
   NEW TOURNAMENT
========================= */

function resetTournament() {

    participants = [];

    currentRound = [];

    nextRound = [];

    matchResults = [];

    tournamentWinner = null;

    tournamentStarted = false;

    roundNumber = 1;

    currentMatchIndex = 0;


    participantInput.value = "";

    tournamentScreen.classList.add("hidden");

    statsScreen.classList.add("hidden");

    setupScreen.classList.remove("hidden");

    winnerArea.classList.add("hidden");

    matchArea.classList.remove("hidden");

    renderParticipants();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================
   HELPERS
========================= */

function shuffle(array) {

    const result =
        [...array];

    for (
        let i = result.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );

        [
            result[i],
            result[j]
        ] = [
                result[j],
                result[i]
            ];
    }

    return result;
}


function getRoundName(count) {

    if (count <= 2)
        return "Final";

    if (count <= 4)
        return "Semi Finals";

    if (count <= 8)
        return "Quarter Finals";

    if (count <= 16)
        return "Round of 16";

    if (count <= 32)
        return "Round of 32";

    return `Round of ${count}`;
}


function getRoundNameFromNumber(number) {

    const maxRounds =
        Math.ceil(
            Math.log2(
                participants.length
            )
        );

    const remaining =
        maxRounds - number + 1;

    if (remaining === 1)
        return "Final";

    if (remaining === 2)
        return "Semi Final";

    if (remaining === 3)
        return "Quarter Final";

    return `Round ${number}`;
}


function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent = value;

    return div.innerHTML;
}


/* =========================
   EVENTS
========================= */

addParticipantBtn.addEventListener(
    "click",
    addParticipant
);


participantInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter"
        ) {
            addParticipant();
        }
    }
);


startTournamentBtn.addEventListener(
    "click",
    startTournament
);


optionA.addEventListener(
    "click",
    () => chooseWinner(0)
);


optionB.addEventListener(
    "click",
    () => chooseWinner(1)
);


newTournamentBtn.addEventListener(
    "click",
    resetTournament
);


restartBtn.addEventListener(
    "click",
    resetTournament
);


viewStatsBtn.addEventListener(
    "click",
    () => {

        renderStats();

        tournamentScreen.classList.add(
            "hidden"
        );

        statsScreen.classList.remove(
            "hidden"
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
);


backToTournamentBtn.addEventListener(
    "click",
    () => {

        statsScreen.classList.add(
            "hidden"
        );

        tournamentScreen.classList.remove(
            "hidden"
        );
    }
);


clearHistoryBtn.addEventListener(
    "click",
    () => {

        localStorage.removeItem(
            "decisionTournamentHistory"
        );

        renderHistory();
    }
);


/* =========================
   INITIALIZE
========================= */

renderParticipants();

renderHistory();