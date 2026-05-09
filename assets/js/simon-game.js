import { playTone } from "./sounds.js";

// STATEMANAGEMENT
export const state = {
    level: 0,
    points: 0,
    highscore: 0,
    sequence: [],
    playerInput: [],
    timer: true,
    timerTime: 5,
    speedMode: false,
    playing: false,
    gameOver: false
}

const SECONDS = state.speedMode ? 500 : 1000;
const litDuration = SECONDS * 0.6;
const COLORS = ["green", "red", "yellow", "blue"];

initPlayerButtons();

const startBtn = document.querySelector(".start-game");

startBtn.addEventListener("click", startGame);

function startGame() {

    console.log("game start 🚀");
    //playStartJingle();
    state.playing = true;

    // DISABLE SETTINGS
    document.querySelectorAll(".toggle-card").forEach(card => {
        //console.log(card);
        card.classList.add("disabled");
    });

    // GAME LOOP
    while (state.playing) {

        //INFO TEXT UDATES
        state.level = state.level + 1;
        const gameInfo = document.querySelector(".game-info");
        gameInfo.textContent = "Round " + state.level + " starts";
        gameInfo.style.color = "var(--green-lit)";

        // LEVEL UPDATE
        const levelInfo = document.querySelector(".level>p");
        levelInfo.textContent = state.level;

        //CREATE PLAY SEQUENCE
        simonSequence();
        console.log(state.sequence);
        simonSays();

        //PLAYER HAS TO REPLAY

        // setTimeout(() => {
        //     playerRepeat();
        // }, 2000);

        //UPDATE INFO GRAPHICS

        state.playing = false;
    }

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
    document.querySelectorAll(".play-btn").forEach(btn => {
        btn.classList.add("disabled");
    });
    const TONES = { green: 329.6, red: 220, yellow: 261.6, blue: 164.8 };


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
    document.querySelectorAll(".play-btn").forEach(btn => {
        btn.classList.remove("disabled");
    });
}

function buttonLitOn(color) {
    document.querySelector("." + color).classList.add("lit");
}

function buttonLitOff(color) {
    document.querySelector("." + color).classList.remove("lit");
}


function initPlayerButtons() {
    const playBtn = document.querySelectorAll(".play-btn");
    playBtn.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            state.playerInput.push(i);
            console.log(state.playerInput);
            buttonLitOn(COLORS[i]);

            setTimeout(() => {
                buttonLitOff(COLORS[i]);
            }, litDuration);

            //compareSequence(); // direkt hier aufrufen
        });
    });
}


