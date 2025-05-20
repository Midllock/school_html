
let clickCount = 0;
const btn = document.querySelector("button");
const headingElement = document.querySelector("h1");
if (btn && headingElement) {
    // Nastavíme transition jednou, aby se aplikovala na všechny změny
    headingElement.style.transition = "all 0.2s ease-in-out"; // Mírně delší pro lepší viditelnost

    btn.addEventListener("click", function() {
        clickCount++;
        btn.innerHTML = `Počet kliknutí: ${clickCount}`; // Popisnější text tlačítka

        // Generování náhodných barev a jejich použití
        // Použijeme Math.floor pro celá čísla a násobíme 256 pro rozsah 0-255
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        headingElement.style.color = `rgb(${r}, ${g}, ${b})`;
        headingElement.style.fontSize = "3rem";

        // Přechod je již nastaven, takže ho zde nemusíme znovu nastavovat
    });
} else {
    if (!btn) {
        console.error("Chyba: Tlačítko nebylo na stránce nalezeno.");
    }
    if (!headingElement) {
        console.error("Chyba: Nadpis <h1> nebyl na stránce nalezen.");
    }
}