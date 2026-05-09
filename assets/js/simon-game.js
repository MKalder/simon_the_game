import { playTone } from "./sounds.js";

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

const SECONDS = state.speedMode ? 500 : 1000;
const litDuration = SECONDS * 0.6;
const COLORS = ["green", "red", "yellow", "blue"];
const TONES = { green: 329.6, red: 220, yellow: 261.6, blue: 164.8 };
const gameInfo = document.querySelector(".game-info");
const levelInfo = document.querySelector(".level>p");
const startBtn = document.querySelector(".start-game");
let sequenceClone;

initPlayerButtons();

startBtn.addEventListener("click", startGame);

function startGame() {

    console.log("game start 🚀");
    //HOW TO DELAY THE START
    playStartJingle();
    state.playing = true;
    state.playerInput = [];

    // DISABLE SETTINGS
    document.querySelectorAll(".toggle-card").forEach(card => {
        //console.log(card);
        card.classList.add("disabled");
    });

    round();
}

function round() {

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

    if (!state.playing) return;

    //INFO TEXT UDPADTE
    gameInfo.textContent = "Watch and listen closely";
    gameInfo.style.color = "var(--color-text-muted)";

    //CREATE PLAY SEQUENCE
    simonSequence();
    console.log(state.sequence);
    sequenceClone = [...state.sequence];
    console.log(sequenceClone);

    //SHOW SEQUENCE
    simonSays();

    //USER INPUT - COMPARING
    const sequenceDuration = state.sequence.length * SECONDS + litDuration;

    setTimeout(() => {
        gameInfo.textContent = "Repeat what simon said";
        gameInfo.style.color = "var(--blue-lit)";

        buttonEnabled();

        setTimeout(() => {
            //COUNTDOWN
        });

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
            }, litDuration);

        }, i * SECONDS);
    }
    // state.timerTime += 1000;
    //console.log("Timer: " + state.timerTime);
}

function buttonLitOn(color) {
    document.querySelector("." + color).classList.add("lit");
}

function buttonLitOff(color) {
    document.querySelector("." + color).classList.remove("lit");
}

function buttonDisabled() {
    document.querySelectorAll(".play-btn").forEach(btn => {
        btn.classList.add("disabled");
    });
}

function buttonEnabled() {
    document.querySelectorAll(".play-btn").forEach(btn => {
        btn.classList.remove("disabled");
    });
}

function initPlayerButtons() {
    const playBtn = document.querySelectorAll(".play-btn");
    playBtn.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            state.playerInput.push(COLORS[i]);
            console.log(state.playerInput);
            buttonLitOn(COLORS[i]);
            playTone(TONES[COLORS[i]]);

            setTimeout(() => {
                buttonLitOff(COLORS[i]);
            }, litDuration);

            compareSequence(COLORS[i]);
        });
    });
}


function userRepeat() {

}

// TODO: UI adaptors (modal, info text, stats)

function compareSequence(input) {

    console.log("Compare Sequence: " + state.sequence);
    console.log("Player Input: " + state.playerInput);

    if (sequenceClone[0] === input) {
        sequenceClone.shift();
        console.log("CORRECT");
        console.log(sequenceClone);
    } else {
        console.log("GAME OVER");
    }

    if (sequenceClone.length === 0) {
        console.log("Next Round");
        round();
    }

}



