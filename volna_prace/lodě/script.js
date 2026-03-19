/**
 * KONFIGURACE HRY
 * Definice tvarů lodí pomocí relativních souřadnic [řádek, sloupec]
 */
const BOARD_SIZE = 10;
const SHIPS_CONFIG = [
    { 
        name: 'Parník', 
        count: 1, 
        //   x   x
        // x x x x x
        shape: [[0, 1], [0, 3], [1, 0], [1, 1], [1, 2], [1, 3], [1, 4]] 
    },
    { 
        name: 'Jachta', 
        count: 2, 
        //   x
        // x x x
        shape: [[0, 1], [1, 0], [1, 1], [1, 2]] 
    },
    { 
        name: 'Pramice', 
        count: 3, 
        // x x
        shape: [[0, 0], [0, 1]] 
    }
];

// STAVOVÉ PROMĚNNÉ
let board = [];            // Logická matice 10x10 (0 = voda, 1 = loď)
let turns = 0;             // Počítadlo tahů
let hits = 0;              // Počet úspěšných zásahů
let totalTargetCells = 0;  // Celkový počet políček, které tvoří lodě
let gameOver = false;

/**
 * Inicializace nové hry
 */
function initGame() {
    const boardElement = document.getElementById('game-board');
    if (!boardElement) return;

    // Resetování stavu
    boardElement.innerHTML = '';
    board = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(0));
    turns = 0;
    hits = 0;
    gameOver = false;
    totalTargetCells = 0;

    // Aktualizace UI
    document.getElementById('turn-count').textContent = turns;

    // 1. Rozmístění lodí do logického pole
    placeAllShips();

    // 2. Vytvoření vizuálního herního pole (HTML tlačítka)
    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
            const cell = document.createElement('button');
            cell.className = 'cell hidden';
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.setAttribute('aria-label', `Pole ${r + 1}, ${c + 1}`);
            cell.addEventListener('click', handleAttack);
            boardElement.appendChild(cell);
        }
    }
}

/**
 * Prochází konfiguraci a pokouší se náhodně umístit lodě
 */
function placeAllShips() {
    SHIPS_CONFIG.forEach(shipType => {
        totalTargetCells += (shipType.shape.length * shipType.count);

        for (let i = 0; i < shipType.count; i++) {
            let placed = false;
            let attempts = 0;

            while (!placed && attempts < 1000) {
                const startRow = Math.floor(Math.random() * BOARD_SIZE);
                const startCol = Math.floor(Math.random() * BOARD_SIZE);

                if (canPlaceShip(startRow, startCol, shipType.shape)) {
                    addShipToBoard(startRow, startCol, shipType.shape);
                    placed = true;
                }
                attempts++;
            }
        }
    });
}

/**
 * Kontroluje, zda lze loď umístit (hranice + nedotýkání se ostatních lodí)
 */
function canPlaceShip(startRow, startCol, shape) {
    for (const [dr, dc] of shape) {
        const r = startRow + dr;
        const c = startCol + dc;

        // Kontrola, zda je políčko lodi v herním poli
        if (r < 0 || r >= BOARD_SIZE || c < 0 || c >= BOARD_SIZE) return false;

        // Kontrola okolí 3x3 (včetně diagonál), aby se lodě nedotýkaly
        for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
            for (let colOffset = -1; colOffset <= 1; colOffset++) {
                const checkRow = r + rowOffset;
                const checkCol = c + colOffset;

                // Pokud je v okolí políčko, které je v rámci desky a už tam je loď (1)
                if (checkRow >= 0 && checkRow < BOARD_SIZE && 
                    checkCol >= 0 && checkCol < BOARD_SIZE) {
                    if (board[checkRow][checkCol] === 1) return false;
                }
            }
        }
    }
    return true;
}

/**
 * Zápis lodi do logického pole
 */
function addShipToBoard(startRow, startCol, shape) {
    for (const [dr, dc] of shape) {
        board[startRow + dr][startCol + dc] = 1;
    }
}

/**
 * Reakce na kliknutí hráče
 */
function handleAttack(event) {
    if (gameOver) return;

    const cell = event.target;
    // Ignorovat, pokud už bylo na políčko kliknuto
    if (cell.classList.contains('hit') || cell.classList.contains('miss')) return;

    const r = parseInt(cell.dataset.row);
    const c = parseInt(cell.dataset.col);

    turns++;
    document.getElementById('turn-count').textContent = turns;

    if (board[r][c] === 1) {
        // ZÁSAH
        cell.classList.add('hit');
        cell.classList.remove('hidden');
        cell.textContent = 'X';
        hits++;

        if (hits === totalTargetCells) {
            gameOver = true;
            alert(`Vítězství! Potopil jsi všechny lodě na ${turns} tahů.`);
        }
    } else {
        // MINUTÍ
        cell.classList.add('miss');
        cell.classList.remove('hidden');
        cell.textContent = '•';
    }
}

// Spuštění hry při načtení stránky
window.addEventListener('DOMContentLoaded', initGame);