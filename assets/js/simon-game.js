import { playTone, playWrong } from "./sounds.js";

// STATEMANAGEMENT
export const state = {
    level: 0,
    points: 0,
    highscore: 0,
    sequence: [],
    playerInput: [],
    timer: true,
    timerTime: 1250,
    speedMode: false,
    playing: false,
    gameOver: false
}

const COLORS = ["green", "red", "yellow", "blue"];
const TONES = { green: 329.6, red: 220, yellow: 261.6, blue: 164.8 };
const roundInfo = document.querySelector(".round");
const toggelCards = document.querySelectorAll(".toggle-card");
const gameInfo = document.querySelector(".game-info");
const levelInfo = document.querySelector(".level>p");
const pointsInfo = document.querySelector(".points>p");
const highscoreInfo = document.querySelector(".highscore>p");
const startBtn = document.querySelector(".start-game-btn");
const playBtn = document.querySelectorAll(".play-btn");
const restartBtn = document.querySelector(".restart-btn");
const modal = document.querySelector(".game-over");
const sequenceDuration = state.sequence.length * getSeconds() + getLitDuration();

let sequenceClone;

startBtn.addEventListener("click", startGame);

initPlayerButtons();



function startGame() {

    console.log("game start 🚀");
    state.playing = true;

    //DISABLE START BUTTON
    startBtn.disabled = true;
    startBtn.classList.add("disabled");

    playStartJingle();
    state.sequence = [];
    state.playerInput = [];

    // DISABLE SETTINGS
    toggelCards.forEach(card => {
        //console.log(card);
        card.classList.add("disabled");
    });

    startRound();
}

function startRound() {

    //INFO TEXT UDATES
    state.level = state.level + 1;
    gameInfo.textContent = "Round " + state.level + " starts";
    gameInfo.style.color = "var(--green-lit)";

    //LEVEL UPDATE
    levelInfo.textContent = state.level;

    //DELAYED START OF THE GAME
    setTimeout(() => {
        game();
    }, 1000);

}

// GAME LOOP
function game() {

    if (!state.playing) {
        console.log(state.playing);
        return
    }

    //INFO TEXT UDPADTE
    gameInfo.textContent = "Watch and listen closely";
    gameInfo.style.color = "var(--color-text-muted)";

    //CREATE PLAY SEQUENCE
    simonSequence();
    console.log(state.sequence);
    sequenceClone = [...state.sequence];
    console.log(sequenceClone);
    roundInfo.textContent = sequenceClone.length;

    //SHOW SEQUENCE
    simonSays();

    setTimeout(() => {
        gameInfo.textContent = "Repeat what simon said";
        gameInfo.style.color = "var(--blue-lit)";

        buttonEnabled();

    }, sequenceDuration);
}


function playStartJingle() {
    const notes = [261.6, 329.6, 440];
    notes.forEach((freq, i) => {
        setTimeout(() => {
            playTone(freq, 0.2);
        }, i * 120);
    });
}

function simonSequence() {
    const randColor = Math.floor(Math.random() * 4);
    //console.log(randColor);
    state.sequence.push(COLORS[randColor]);
}

function simonSays() {

    //NO BUTTON CLICKS: 
    buttonDisabled();


    console.log("Length: " + state.sequence.length);

    for (let i = 0; i < state.sequence.length; i++) {
        let sound = TONES[state.sequence[i]];
        setTimeout(() => {
            playTone(sound);
            buttonLitOn(state.sequence[i]);

            setTimeout(() => {
                buttonLitOff(state.sequence[i]);
            }, getLitDuration());

        }, i * getSeconds());
    }
}

function buttonLitOn(color) {
    document.querySelector("." + color).classList.add("lit");
}

function buttonLitOff(color) {
    document.querySelector("." + color).classList.remove("lit");
}

function buttonDisabled() {
    playBtn.forEach(btn => {
        btn.classList.add("disabled");
    });
}

function buttonEnabled() {
    playBtn.forEach(btn => {
        btn.classList.remove("disabled");
    });
}

function initPlayerButtons() {
    playBtn.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            if (sequenceClone.length === 0) return;

            state.playerInput.push(COLORS[i]);
            console.log(state.playerInput);
            compareSequence(COLORS[i]);
            buttonDisabled();
            roundInfo.textContent = sequenceClone.length;
            setTimeout(() => {
                buttonEnabled();
                console.log("enable btn again");
            }, 100);
        });
    });
}


function compareSequence(input) {

    console.log("Compare Sequence: " + state.sequence);
    console.log("Player Input: " + state.playerInput);


    if (sequenceClone[0] === input) {
        sequenceClone.shift();
        console.log("CORRECT");
        console.log(sequenceClone);
        addPoints();
        buttonLitOn(input);
        playTone(TONES[input]);

        setTimeout(() => {
            buttonLitOff(input);
        }, getLitDuration());

        if (sequenceClone.length === 0) {
            console.log("Next Round");
            setTimeout(() => {
                startRound();
            }, getSeconds());

        }

    } else {
        console.log("GAME OVER");
        gameOver();

    }


}

function addPoints() {
    state.points += 10;
    pointsInfo.textContent = state.points;
}

function gameOver() {
    buttonDisabled();
    playWrong();
    error();
    openModal();
}

function error() {
    buttonDisabled();
    playBtn.forEach(btn => {
        btn.classList.add("error");
    });
    document.querySelector(".simon-board").classList.add("shake");
}

function openModal() {
    console.log("MODAL OPEN");

    modal.classList.remove("hidden");

    document.querySelector(".total-rounds").textContent = state.level;
    state.highscore = state.highscore > state.points ? state.highscore : state.points;

    document.querySelector(".highscore-modal").textContent = state.points;
    restartBtn.addEventListener("click", () => {
        resetGame();
    })
}

function resetGame() {

    playBtn.forEach(btn => {
        btn.classList.remove("error");
    });
    modal.classList.add("hidden");
    startBtn.classList.remove("disabled");
    startBtn.disabled = false;

    toggelCards.forEach(card => {
        //console.log(card);
        card.classList.remove("disabled");
    });

    highscoreInfo.textContent = state.highscore;
    state.level = 0;
    levelInfo.textContent = state.level;
    state.points = 0;
    pointsInfo.textContent = state.points;
    roundInfo.textContent = 0;
    state.sequence = [];
    state.playerInput = [];

}

function getSeconds() {
    return state.speedMode ? 500 : 1000;
}

function getLitDuration() {
    return getSeconds() * (state.speedMode ? 0.12 : 0.6);
}


