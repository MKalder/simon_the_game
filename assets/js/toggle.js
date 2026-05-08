document.querySelectorAll('.toggle-card').forEach(card => {
    const checkbox = card.querySelector('input[type="checkbox"]');

    const update = () => {
        card.classList.toggle('active', checkbox.checked);
    };

    checkbox.addEventListener('change', update);

    // Allow clicking the card (but not the switch itself) to toggle
    card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            checkbox.checked = !checkbox.checked;
            checkbox.dispatchEvent(new Event('change'));
        }
    });
});