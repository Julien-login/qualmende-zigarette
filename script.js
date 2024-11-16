document.addEventListener('DOMContentLoaded', () => {
    // Set today's date
    const today = new Date();
    document.getElementById('today-date').textContent = today.toLocaleDateString();

    // Inputs
    const stopDateInput = document.getElementById('stop-date');
    const cigarettesPerDayInput = document.getElementById('cigarettes-per-day');
    const costPerPackInput = document.getElementById('cost-per-pack');
    const cigarettesPerPackInput = document.getElementById('cigarettes-per-pack');

    // Outputs
    const daysFreeSpan = document.getElementById('days-free');
    const moneySavedSpan = document.getElementById('money-saved');
    const progress = document.getElementById('progress');
    const co2AmountSpan = document.getElementById('co2-amount');

    const CO2_PER_CIGARETTE = 0.005; // kg CO₂ pro Zigarette
    const SEVEN_YEARS_DAYS = 7 * 365; // 7 Jahre in Tagen

    function calculate() {
        const stopDate = new Date(stopDateInput.value.split('.').reverse().join('-'));
        const daysFree = Math.floor((today - stopDate) / (1000 * 60 * 60 * 24));
        if (isNaN(daysFree) || daysFree < 0) return;

        const cigarettesPerDay = parseFloat(cigarettesPerDayInput.value);
        const costPerPack = parseFloat(costPerPackInput.value);
        const cigarettesPerPack = parseFloat(cigarettesPerPackInput.value);

        if (isNaN(cigarettesPerDay) || isNaN(costPerPack) || isNaN(cigarettesPerPack)) return;

        // Berechnungen
        const moneySaved = ((daysFree * cigarettesPerDay) / cigarettesPerPack) * costPerPack;
        const co2Saved = daysFree * cigarettesPerDay * CO2_PER_CIGARETTE;
        const progressPercent = Math.min((daysFree / SEVEN_YEARS_DAYS) * 100, 100);

        // Ergebnisse anzeigen
        daysFreeSpan.textContent = daysFree;
        moneySavedSpan.textContent = moneySaved.toFixed(2);
        co2AmountSpan.textContent = co2Saved.toFixed(2);
        progress.style.width = `${progressPercent}%`;
    }

    // Event Listener für Eingaben
    stopDateInput.addEventListener('input', calculate);
    cigarettesPerDayInput.addEventListener('input', calculate);
    costPerPackInput.addEventListener('input', calculate);
    cigarettesPerPackInput.addEventListener('input', calculate);
});
