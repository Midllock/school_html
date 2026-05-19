// Možné symboly na válcích
const symbols = ['🍒', '🍋', '🍇', '💎', '7️⃣'];

// Výběr HTML prvků pro kontejnery se symboly
const reelSlotElements = [
    document.getElementById('reel1Slots'),
    document.getElementById('reel2Slots'),
    document.getElementById('reel3Slots')
];
const spinButton = document.getElementById('spin-btn');
const messageElement = document.getElementById('message');

// Funkce pro náhodný výběr symbolu
function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

// Počet symbolů, které se "přetočí" v animaci
const NUM_SLOTS_PER_REEL = 10;

// Hlavní funkce pro roztočení automatu
function spin() {
    // Deaktivujeme tlačítko a resetujeme zprávu
    spinButton.disabled = true;
    messageElement.textContent = "Točíme...";
    messageElement.className = "message";

    // Pole pro uložení výsledných symbolů
    let results = ['', '', ''];

    // Připravíme a spustíme animaci pro každý válec
    reelSlotElements.forEach((slotsContainer, index) => {
        // Vyčistíme předchozí obsah
        slotsContainer.innerHTML = '';
        
        // Získáme výherní symbol pro tento válec
        const winSymbol = getRandomSymbol();
        results[index] = winSymbol;

        // Vytvoříme pás symbolů pro animaci
        for (let i = 0; i <= NUM_SLOTS_PER_REEL; i++) {
            const slot = document.createElement('div');
            slot.classList.add('slot');
            
            // Poslední symbol je ten, na kterém se to zastaví (výhra)
            if (i === NUM_SLOTS_PER_REEL) {
                slot.textContent = winSymbol;
            } else {
                // Ostatní symboly jsou náhodné "křoví" pro efekt rotace
                slot.textContent = getRandomSymbol();
            }
            slotsContainer.appendChild(slot);
        }

        // Odstraníme starou třídu, aby se animace mohla spustit znovu
        slotsContainer.classList.remove('spinning');
        
        // Vynutíme překreslení (tzv. "reflow"), aby si prohlížeč všiml, že jsme třídu odebrali
        void slotsContainer.offsetWidth;

        // Přidáme třídu, která spustí CSS animaci rotace
        slotsContainer.classList.add('spinning');
    });

    // Vyhodnocení výhry po skončení nejdelší animace (válec 3, trvá 3s)
    setTimeout(() => {
        checkResult(results);
    }, 3000); 
}

// Funkce pro vyhodnocení výhry
function checkResult(results) {
    // Aktivujeme tlačítko zpět pro další hru
    spinButton.disabled = false;

    // Kontrola, zda jsou všechny tři symboly stejné
    if (results[0] === results[1] && results[1] === results[2]) {
        if (results[0] === '7️⃣') {
            messageElement.textContent = "JACKPOT! 👑 Všechny sedmičky!";
        } else {
            messageElement.textContent = `Výhra! Tři ${results[0]}! 🎉`;
        }
        messageElement.classList.add('win');
    } else {
        messageElement.textContent = "Zkus to znovu! ❌";
        messageElement.classList.add('lose');
    }
}

// Navázání funkce na kliknutí tlačítka
spinButton.addEventListener('click', spin);