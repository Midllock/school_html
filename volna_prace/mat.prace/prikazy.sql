INSERT INTO recepty (nazev, doba_pripravy, obtiznost) VALUES ('Svíčková', 150, 5);
-- Předpokládáme ID receptu 1 a ID ingrediencí 1 (Maso), 2 (Smetana)
INSERT INTO ingredience (nazev) VALUES ('Hovězí zadní'), ('Smetana');
INSERT INTO recepty_ingredience (recept_id, ingredience_id, mnozstvi) VALUES (1, 1, '1kg'), (1, 2, '250ml');

SELECT i.nazev 
FROM ingredience i
JOIN recepty_ingredience ri ON i.id = ri.ingredience_id
JOIN recepty r ON r.id = ri.recept_id
WHERE r.nazev = 'Svíčková'
ORDER BY i.nazev ASC;

SELECT obtiznost, COUNT(*) as pocet_receptu
FROM recepty
GROUP BY obtiznost;

DELETE FROM recepty_ingredience 
WHERE mnozstvi = '0';