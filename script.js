document.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
    document.getElementById('today-date').textContent = today.toLocaleDateString();

    // Eingabefelder
    const stopDateInput = document.getElementById('stop-date');
    const cigarettesPerDayInput = document.getElementById('cigarettes-per-day');
    const costPerPackInput = document.getElementById('cost-per-pack');
    const cigarettesPerPackInput = document.getElementById('cigarettes-per-pack');

    // Ausgabefelder
    const daysFreeSpan = document.getElementById('days-free');
    const moneySavedSpan = document.getElementById('money-saved');
    const progress = document.getElementById('progress');
    const co2AmountSpan = document.getElementById('co2-amount');
    const cigarettesAvoidedSpan = document.getElementById('cigarettes-avoided');
    const daysRemainingSpan = document.getElementById('days-remaining');

    const CO2_PER_CIGARETTE = 0.005; // kg CO₂ pro Zigarette
    const SEVEN_YEARS_DAYS = 7 * 365; // 7 Jahre in Tagen

    // Speichere Eingaben im Cache
    const inputs = [stopDateInput, cigarettesPerDayInput, costPerPackInput, cigarettesPerPackInput];
    inputs.forEach(input => {
        const cachedValue = localStorage.getItem(input.id);
        if (cachedValue) input.value = cachedValue;

        input.addEventListener('input', () => {
            localStorage.setItem(input.id, input.value);
            calculate();
        });
    });

    // "Heute"-Button
    document.getElementById('set-today').addEventListener('click', () => {
        stopDateInput.value = today.toLocaleDateString('de-DE');
        localStorage.setItem(stopDateInput.id, stopDateInput.value);
        calculate();
    });

    function calculate() {
        const stopDateParts = stopDateInput.value.split('.');
        const stopDate = new Date(`${stopDateParts[2]}-${stopDateParts[1]}-${stopDateParts[0]}`);
        const daysFree = Math.floor((today - stopDate) / (1000 * 60 * 60 * 24)) + 1;
        if (isNaN(daysFree) || daysFree < 0) return;

        const cigarettesPerDay = parseFloat(cigarettesPerDayInput.value);
        const costPerPack = parseFloat(costPerPackInput.value);
        const cigarettesPerPack = parseFloat(cigarettesPerPackInput.value);

        if (isNaN(cigarettesPerDay) || isNaN(costPerPack) || isNaN(cigarettesPerPack)) return;

        // Berechnungen
        const moneySaved = ((daysFree * cigarettesPerDay) / cigarettesPerPack) * costPerPack;
        const co2Saved = daysFree * cigarettesPerDay * CO2_PER_CIGARETTE;
        const cigarettesAvoided = daysFree * cigarettesPerDay;
        const progressPercent = Math.min((daysFree / SEVEN_YEARS_DAYS) * 100, 100);
        const daysRemaining = SEVEN_YEARS_DAYS - daysFree;

        // Ergebnisse anzeigen
        daysFreeSpan.textContent = daysFree;
        moneySavedSpan.textContent = moneySaved.toFixed(2);
        co2AmountSpan.textContent = co2Saved.toFixed(2);
        cigarettesAvoidedSpan.textContent = cigarettesAvoided;
        progress.style.width = `${progressPercent}%`;
        daysRemainingSpan.textContent = daysRemaining;
    }

    calculate();
});
