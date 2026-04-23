// Dynamické filtrování
const searchInput = document.getElementById('searchInput');
const recipeCards = document.getElementsByClassName('recipe-card');

searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    Array.from(recipeCards).forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = title.includes(term) ? 'block' : 'none';
    });
});

// Přidávání receptu
const form = document.getElementById('recipeForm');
const grid = document.getElementById('recipeGrid');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    
    const newCard = document.createElement('article');
    newCard.className = 'recipe-card';
    newCard.innerHTML = `
        <h3>${name}</h3>
        <p>Obtížnost:</p>
        <div class="progress-bar"><div class="progress" style="width: 50%;"></div></div>
        <button class="btn-ingredience">Ingredience</button>
    `;
    
    grid.appendChild(newCard);
    form.reset();
});