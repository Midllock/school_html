const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");
const winScreen = document.getElementById("win-screen");
const timerDisplay = document.getElementById("timer-display");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const finalTimeText = document.getElementById("final-time-text");
const scoreList = document.getElementById("score-list");

const cols = 15;
const rows = 15;
const w = canvas.width / cols;

let grid = [];
let player = { i: 0, j: 0 };
let gameActive = false;

// Proměnné pro časomíru
let startTime;
let timerInterval;
let currentTimeStr = "0.0";

class Cell {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.walls = [true, true, true, true];
        this.visited = false;
    }
    show() {
        let x = this.i * w;
        let y = this.j * w;
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.beginPath();
        if (this.walls[0]) { ctx.moveTo(x, y); ctx.lineTo(x + w, y); }
        if (this.walls[1]) { ctx.moveTo(x + w, y); ctx.lineTo(x + w, y + w); }
        if (this.walls[2]) { ctx.moveTo(x + w, y + w); ctx.lineTo(x, y + w); }
        if (this.walls[3]) { ctx.moveTo(x, y + w); ctx.lineTo(x, y); }
        ctx.stroke();
    }
}

function index(i, j) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) return -1;
    return i + j * cols;
}

function generateMaze() {
    grid = [];
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            grid.push(new Cell(i, j));
        }
    }

    let current = grid[0];
    current.visited = true;
    let stack = [];

    while (true) {
        let neighbors = [];
        let top = grid[index(current.i, current.j - 1)];
        let right = grid[index(current.i + 1, current.j)];
        let bottom = grid[index(current.i, current.j + 1)];
        let left = grid[index(current.i - 1, current.j)];

        if (top && !top.visited) neighbors.push(top);
        if (right && !right.visited) neighbors.push(right);
        if (bottom && !bottom.visited) neighbors.push(bottom);
        if (left && !left.visited) neighbors.push(left);

        if (neighbors.length > 0) {
            let next = neighbors[Math.floor(Math.random() * neighbors.length)];
            stack.push(current);
            let x = current.i - next.i;
            if (x === 1) { current.walls[3] = false; next.walls[1] = false; }
            else if (x === -1) { current.walls[1] = false; next.walls[3] = false; }
            let y = current.j - next.j;
            if (y === 1) { current.walls[0] = false; next.walls[2] = false; }
            else if (y === -1) { current.walls[2] = false; next.walls[0] = false; }
            current = next;
            current.visited = true;
        } else if (stack.length > 0) {
            current = stack.pop();
        } else {
            break;
        }
    }
}

function drawGame() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < grid.length; i++) { grid[i].show(); }
    
    // Cíl
    ctx.fillStyle = "#28a745";
    ctx.fillRect((cols - 1) * w + 4, (rows - 1) * w + 4, w - 8, w - 8);
    // Hráč
    ctx.fillStyle = "#007bff";
    ctx.fillRect(player.i * w + 6, player.j * w + 6, w - 12, w - 12);
}

// ---- LOGIKA ČASOMÍRY ----
function updateTimer() {
    let now = Date.now();
    let diff = (now - startTime) / 1000;
    currentTimeStr = diff.toFixed(1); // Uloží čas na 1 desetinné místo
    timerDisplay.innerText = `Čas: ${currentTimeStr} s`;
}

function startGame() {
    startBtn.disabled = true; // Zablokuje tlačítko start
    restartBtn.disabled = false; // Odblokuje restart
    winScreen.classList.add("hidden");
    
    player = { i: 0, j: 0 };
    generateMaze();
    drawGame();
    gameActive = true;
    
    // Zapnutí stopek
    clearInterval(timerInterval);
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 100);

    // Odfokusování tlačítek, aby šly šipky
    startBtn.blur();
    restartBtn.blur();
}

function restartGame() {
    // 1. Zastaví čas a vynuluje text
    clearInterval(timerInterval);
    timerDisplay.innerText = "Čas: 0.0 s";
    
    // 2. Vypne hru (aby nešlo chodit šipkami po prázdné ploše)
    gameActive = false;
    
    // 3. Vymaže bludiště a vrátí uvítací text
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#333";
    ctx.font = "20px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Klikni na Start!", canvas.width / 2, canvas.height / 2);

    // 4. Přepne tlačítka do původního stavu
    startBtn.disabled = false; // Povolí kliknout na Start
    restartBtn.disabled = true;  // Zablokuje tlačítko Restart (už je restartováno)
    winScreen.classList.add("hidden"); // Pro jistotu skryje výherní obrazovku
}

// ---- DATABÁZE (LocalStorage) ----
function loadDatabase() {
    let scores = JSON.parse(localStorage.getItem("mazeScores")) || [];
    scoreList.innerHTML = "";
    if (scores.length === 0) {
        scoreList.innerHTML = "<li>Žádné časy</li>";
    } else {
        scores.forEach((score, index) => {
            scoreList.innerHTML += `<li>${index + 1}. ${score} s</li>`;
        });
    }
}

function saveScore(time) {
    let scores = JSON.parse(localStorage.getItem("mazeScores")) || [];
    scores.push(parseFloat(time));
    scores.sort((a, b) => a - b); // Seřadí od nejrychlejšího
    scores = scores.slice(0, 5); // Nechá jen Top 5
    localStorage.setItem("mazeScores", JSON.stringify(scores));
    loadDatabase();
}

function clearDatabase() {
    localStorage.removeItem("mazeScores");
    loadDatabase();
}

// Ovládání šipkami
window.addEventListener("keydown", function(e) {
    if (!gameActive) return;

    if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }

    let currentCell = grid[index(player.i, player.j)];
    let moved = false;

    if (e.key === "ArrowUp" && !currentCell.walls[0]) { player.j--; moved = true; }
    else if (e.key === "ArrowRight" && !currentCell.walls[1]) { player.i++; moved = true; }
    else if (e.key === "ArrowDown" && !currentCell.walls[2]) { player.j++; moved = true; }
    else if (e.key === "ArrowLeft" && !currentCell.walls[3]) { player.i--; moved = true; }

    if (moved) {
        drawGame();
        
        // Konec hry (výhra)
        if (player.i === cols - 1 && player.j === rows - 1) {
            gameActive = false;
            clearInterval(timerInterval); // Zastaví čas
            
            // Nastaví text do win okna
            finalTimeText.innerText = `Tvůj čas: ${currentTimeStr} s`;
            winScreen.classList.remove("hidden");
            
            // Uloží do databáze
            saveScore(currentTimeStr);
            
            startBtn.disabled = false; // Povolí znovuspuštění novou hrou
        }
    }
});

// Prvotní vykreslení
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "#333";
ctx.font = "20px sans-serif";
ctx.textAlign = "center";
ctx.fillText("Klikni na Start!", canvas.width / 2, canvas.height / 2);

// Načtení databáze po zapnutí stránky
loadDatabase();