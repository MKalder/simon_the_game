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

const startBtn = document.querySelector(".start-game");

startBtn.addEventListener("click", startGame);

function startGame() {

    console.log("game start 🚀");
    playStartJingle();
    state.playing = true;

    // DISABLE SETTINGS
    document.querySelectorAll(".toggle-card").forEach(card => {
        console.log(card);
        card.classList.add("disabled");
    });

    // GAME LOOP
    while (state.playing) {
        console.log("while loop");

        //INFO TEXT
        //Round X - start

        //UPDATE Level

        //PLAY SEQUENCE

        //PLAYER HAS TO REPLAY

        //EXIT STATEMENT 
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

}


