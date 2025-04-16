const gridSize = 5;
let robotX = 0;
let robotY = 0;
let direction = 2; // 0 = nahoru, 1 = vpravo, 2 = dolů, 3 = vlevo

function createGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = '';
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.id = `cell-${x}-${y}`;
      grid.appendChild(cell);
    }
  }
  renderRobot();
}

function renderRobot() {
  document.querySelectorAll(".cell").forEach(c => c.innerHTML = '');
  const robotCell = document.getElementById(`cell-${robotX}-${robotY}`);
  const robotDiv = document.createElement("div");
  robotDiv.className = "robot";
  robotDiv.textContent = ['↑','→','↓','←'][direction];
  robotCell.appendChild(robotDiv);
}

function poloz(barva = null) {
    const cell = document.getElementById(`cell-${robotX}-${robotY}`);
    
    if (barva) {
      // Pokud je zadaná barva – nastavíme ji jako pozadí buňky
      cell.style.backgroundColor = barva;
    } else {
      // Jinak přidáme značku (malý červený puntík jako předtím)
      const marker = document.createElement("div");
      marker.className = "marker";
      cell.appendChild(marker);
    }
}

function vlevobok() {
  direction = (direction + 3) % 4;
  renderRobot();
}

function krok() {
  let newX = robotX;
  let newY = robotY;

  switch (direction) {
    case 0:
      newY--;
      break;
    case 1:
      newX++;
      break;
    case 2:
      newY++;
      break;
    case 3:
      newX--;
      break;
  }

  // zůstaň na místě, pokud by Karel vypadl z gridu
  if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize) {
    robotX = newX;
    robotY = newY;
  }

  renderRobot();
}

function reset() {
  robotX = 0;
  robotY = 0;
  direction = 2;
  createGrid();
}

function spustPrikazy() {
    const text = document.getElementById("commands").value.trim();
    const prikazy = text.split('\n');
  
    for (let prikaz of prikazy) {
      const lower = prikaz.toLowerCase().trim();
  
      if (lower.startsWith("polož")) {
        // Získáme případnou barvu (část po "polož")
        const parts = prikaz.split(" ");
        if (parts.length > 1) {
          const barva = parts.slice(1).join(" ").trim();
          poloz(barva);
        } else {
          poloz();
        }
      } else if (lower === "vlevobok") {
        vlevobok();
      } else if (lower === "krok") {
        krok();
      } else if (lower === "reset") {
        reset();
      } else {
        alert(`Neznámý příkaz: "${prikaz}"`);
      }
    }

  renderRobot();
}

window.onload = () => {
  createGrid();
};
