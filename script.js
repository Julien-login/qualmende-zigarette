document.addEventListener('DOMContentLoaded', () => {
    // Setze das heutige Datum
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
    const tarAvoidedSpan = document.getElementById('tar-avoided');
    const lungImprovementSpan = document.getElementById('lung-improvement-text');
    const daysRemainingSpan = document.getElementById('days-remaining');

    const CO2_PER_CIGARETTE = 0.005; // kg CO₂ pro Zigarette
    const TAR_PER_CIGARETTE = 0.001; // kg Teer pro Zigarette
    const SEVEN_YEARS_DAYS = 7 * 365; // 7 Jahre in Tagen

    function calculate() {
        const stopDateParts = stopDateInput.value.split('.');
        const stopDate = new Date(`${stopDateParts[2]}-${stopDateParts[1]}-${stopDateParts[0]}`);
        const daysFree = Math.floor((today - stopDate) / (1000 * 60 * 60 * 24)) + 1; // +1, um den Starttag einzubeziehen
        if (isNaN(daysFree) || daysFree < 0) return;

        const cigarettesPerDay = parseFloat(cigarettesPerDayInput.value);
        const costPerPack = parseFloat(costPerPackInput.value);
        const cigarettesPerPack = parseFloat(cigarettesPerPackInput.value);

        if (isNaN(cigarettesPerDay) || isNaN(costPerPack) || isNaN(cigarettesPerPack)) return;

        // Berechnungen
        const moneySaved = ((daysFree * cigarettesPerDay) / cigarettesPerPack) * costPerPack;
        const co2Saved = daysFree * cigarettesPerDay * CO2_PER_CIGARETTE;
        const cigarettesAvoided = daysFree * cigarettesPerDay;
        const tarAvoided = cigarettesAvoided * TAR_PER_CIGARETTE;
        const progressPercent = Math.min((daysFree / SEVEN_YEARS_DAYS) * 100, 100);
        const daysRemaining = SEVEN_YEARS_DAYS - daysFree;

        // Lungenverbesserung basierend auf medizinischen Daten
        let lungImprovement = '';
        if (daysFree <= 1) {
            lungImprovement = 'Nach 12 Stunden sinkt der Kohlenmonoxid-Spiegel im Blut auf Normalwerte.';
        } else if (daysFree <= 3) {
            lungImprovement = 'Nach 2-3 Tagen verbessert sich die Lungenfunktion.';
        } else if (daysFree <= 90) {
            lungImprovement = 'Nach 1-9 Monaten gehen Hustenanfälle und Kurzatmigkeit zurück.';
        } else if (daysFree <= 365) {
            lungImprovement = 'Nach 1 Jahr halbiert sich das Risiko für koronare Herzkrankheiten.';
        } else if (daysFree <= 1825) {
            lungImprovement = 'Nach 5 Jahren reduziert sich das Schlaganfallrisiko auf das eines Nichtrauchers.';
        } else if (daysFree <= 2555) {
            lungImprovement = 'Nach 7 Jahren hat sich die Zellregeneration weitgehend abgeschlossen.';
        } else {
            lungImprovement = 'Ihre Lunge hat signifikante Verbesserungen erfahren.';
        }

        // Ergebnisse anzeigen
        daysFreeSpan.textContent = daysFree;
        moneySavedSpan.textContent = moneySaved.toFixed(2);
        co2AmountSpan.textContent = co2Saved.toFixed(2);
        cigarettesAvoidedSpan.textContent = cigarettesAvoided;
        tarAvoidedSpan.textContent = tarAvoided.toFixed(3);
        lungImprovementSpan.textContent = lungImprovement;
        progress.style.width = `${progressPercent}%`;
        daysRemainingSpan.textContent = daysRemaining;
    }

    // Event Listener für Eingaben
    stopDateInput.addEventListener('input', calculate);
    cigarettesPerDayInput.addEventListener('input', calculate);
    costPerPackInput.addEventListener('input', calculate);
    cigarettesPerPackInput.addEventListener('input', calculate);
});
