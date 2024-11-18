document.addEventListener('DOMContentLoaded', () => {
    // Tabs wechseln
    const tabs = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const PASSWORD_HASH = '5d41402abc4b2a76b9719d911017c592'; // SHA-256-Hash von "1216"

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Aktiven Tab setzen
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Inhalt anzeigen
            const target = tab.getAttribute('data-tab');
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === target) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Passwortschutz für Secret Project
    const passwordInput = document.getElementById('password');
    const passwordSubmit = document.getElementById('password-submit');
    const passwordError = document.getElementById('password-error');
    const secretContent = document.getElementById('secret-content');

    passwordSubmit.addEventListener('click', async () => {
        const inputHash = await hashPassword(passwordInput.value);
        if (inputHash === PASSWORD_HASH) {
            secretContent.style.display = 'block';
            passwordError.style.display = 'none';
        } else {
            passwordError.style.display = 'block';
            secretContent.style.display = 'none';
        }
    });

    // Funktion zum Hashen des Passworts
    async function hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(hashBuffer))
            .map(byte => byte.toString(16).padStart(2, '0'))
            .join('');
    }

    // Standardmäßig den Rauchen-Tab anzeigen
    document.querySelector('.tab-button[data-tab="smoking"]').click();
});
