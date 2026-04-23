-- Tabulka receptů
CREATE TABLE recepty (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nazev VARCHAR(100) NOT NULL,
    doba_pripravy INT NOT NULL,
    obtiznost INT NOT NULL
);

-- Tabulka ingrediencí
CREATE TABLE ingredience (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nazev VARCHAR(100) NOT NULL
);

-- Vazební tabulka (M:N)
CREATE TABLE recepty_ingredience (
    recept_id INT NOT NULL,
    ingredience_id INT NOT NULL,
    mnozstvi VARCHAR(50) NOT NULL,
    PRIMARY KEY (recept_id, ingredience_id),
    FOREIGN KEY (recept_id) REFERENCES recepty(id) ON DELETE CASCADE,
    FOREIGN KEY (ingredience_id) REFERENCES ingredience(id) ON DELETE CASCADE
);