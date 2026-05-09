import { playTone } from "./sounds.js";
import { state } from "./simon-game.js";

document.querySelectorAll('.toggle-card').forEach(card => {
    const checkbox = card.querySelector('input[type="checkbox"]');
    const roundDisplay = document.querySelector('.round');

    const update = (e) => {
        card.classList.toggle('active', checkbox.checked);
        const cardType = e.target.dataset.cardType; // "speed" oder "timer"

        toggleState(cardType, checkbox);

    }

    checkbox.addEventListener('change', update);

    card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            checkbox.checked = !checkbox.checked;
            checkbox.dispatchEvent(new Event('change'));
        }
    });
});

// function toggleState(cardType, checkbox) {

//     if (cardType === 'speed') {
//         console.log("speed toogle");
//         if (checkbox.checked) {
//             playTone(600, 0.12);
//             state.speedMode = true;
//             console.log("Speed state: " + state.speedMode);
//         } else {
//             playTone(300, 0.12);
//             state.speedMode = false;
//             console.log("Speed state: " + state.speedMode);
//         }
//     }

//     if (cardType === 'timer') {
//         console.log("timer toogle");
//         if (checkbox.checked) {
//             playTone(600, 0.12);
//             state.timer = true;
//             console.log("Timer state: " + state.timer);
//         } else {
//             playTone(300, 0.12);
//             state.timer = false;
//             console.log("Timer state: " + state.timer);
//         }
//     }

// }

function toggleState(cardType, checkbox) {
    const isChecked = checkbox.checked;

    // Map: welcher cardType steuert welchen State-Key
    const stateMap = {
        speed: 'speedMode',
        timer: 'timer'
    };

    const stateKey = stateMap[cardType];
    if (!stateKey) return; // unbekannter cardType → abbrechen

    playTone(isChecked ? 600 : 300, 0.12);
    state[stateKey] = isChecked;

    console.log(`${cardType} toggle → ${stateKey}: ${state[stateKey]}`);
}