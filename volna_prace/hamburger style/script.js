document.addEventListener('DOMContentLoaded', () => {
    const hamburgerButton = document.querySelector('.hamburger');
    const navigationMenu = document.querySelector('.navigation-menu');

    if (hamburgerButton && navigationMenu) {
        hamburgerButton.addEventListener('click', () => {
            // Přepne třídu pro animaci hamburger ikony (na křížek/zpět)
            hamburgerButton.classList.toggle('is-active');
            
            // Přepne ARIA atribut pro přístupnost
            const isExpanded = hamburgerButton.getAttribute('aria-expanded') === 'true' || false;
            hamburgerButton.setAttribute('aria-expanded', !isExpanded);

            // Přepne třídu pro zobrazení/skrytí navigačního menu
            navigationMenu.classList.toggle('is-active');
        });
    } else {
        console.error('Chyba: Hamburger tlačítko nebo navigační menu nebylo nalezeno!');
    }
});