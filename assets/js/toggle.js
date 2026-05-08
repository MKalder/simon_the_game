import { playTone } from "./sounds.js";

document.querySelectorAll('.toggle-card').forEach(card => {
    const checkbox = card.querySelector('input[type="checkbox"]');
    const isHelperCard = card.querySelector('.toggle-label')?.textContent.trim() === 'Helper';
    const roundDisplay = document.querySelector('.round');

    const update = () => {
        card.classList.toggle('active', checkbox.checked);

        if (checkbox.checked) {
            playTone(600, 0.12);
        } else {
            playTone(300, 0.12);
        }

        if (isHelperCard) {
            roundDisplay.classList.toggle('hidden', !checkbox.checked);
        }
    };

    checkbox.addEventListener('change', update);

    card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            checkbox.checked = !checkbox.checked;
            checkbox.dispatchEvent(new Event('change'));
        }
    });
});