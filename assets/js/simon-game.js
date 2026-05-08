import { playTone } from "./sounds.js";

const startBtn = document.querySelector(".start-game");

startBtn.addEventListener("click", startGame);

function startGame() {

    console.log("Game start");
    playStartJingle();


}

function playStartJingle() {
    const notes = [261.6, 329.6, 440];  // C4 → E4 → A4

    notes.forEach((freq, i) => {
        setTimeout(() => {
            playTone(freq, 0.2);
        }, i * 120);
    });
}

