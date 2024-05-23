CREATE DATABASE caiolandia;
USE caiolandia;

CREATE TABLE rei(
	idRei INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45),
	linhagem CHAR(5)
);

CREATE TABLE reino(
	idReino INT AUTO_INCREMENT,
	nome VARCHAR(45),
	fkRei INT,
	fkAlianca INT,
	FOREIGN KEY (fkRei) REFERENCES rei(idRei),
	FOREIGN KEY (fkAlianca) REFERENCES reino(idReino),
	PRIMARY KEY (idReino, fkRei)
);

CREATE TABLE tropa(
	idTropa INT AUTO_INCREMENT,
	tipo VARCHAR(45),
	qtd INT,
	fkReino INT,
	FOREIGN KEY (fkReino) REFERENCES reino(idReino),
	PRIMARY KEY (idTropa, fkReino)
);

CREATE TABLE armaSecreta(
	idArmaSecreta INT AUTO_INCREMENT,
	fkReino INT,
    nome varchar(200),
	FOREIGN KEY (fkReino) REFERENCES reino(idReino),
	PRIMARY KEY (idArmaSecreta, fkReino)
);

CREATE TABLE guerra(
	idGuerra INT AUTO_INCREMENT,
	dataInicio DATE,
	dataFim DATE,
	vencedorGuerra VARCHAR(45),
	fkReino1 INT,
	fkReino2 INT,
	FOREIGN KEY (fkReino1) REFERENCES reino(idReino),
	FOREIGN KEY (fkReino2) REFERENCES reino(idReino),
    PRIMARY KEY (idGuerra, fkReino1, fkReino2)
);

CREATE TABLE conquista(
	idConquista INT PRIMARY KEY AUTO_INCREMENT,
	dataConquista DATE,
	descricao VARCHAR(255),
    tipo VARCHAR(45),
    qtd INT,
	fkGuerra INT,
	FOREIGN KEY (fkGuerra) REFERENCES guerra(idGuerra)
);

INSERT INTO rei (nome, linhagem) VALUES 
('Python', 'III'),
('Java Script', 'XIV'),
('PHPan', 'II'),
('Cobaldo', 'XVII'),
('Java', 'IV'),
('Perl', 'VI'),
('Haskell', 'V'),
('Scala', 'VIII'),
('Swift', 'VII'),
('Kotlin', 'IX');

select * from tropa;

INSERT INTO reino (nome, fkRei, fkAlianca) VALUES
('Pythondor', 1 , NULL),
('JavaScripto', 2, NULL),
('PHPlandia', 3, NULL),
('CoboWorld', 4, NULL),
('Javaland', 5, 1),
('PerlWorld', 6, 2),
('Reino Haskell', 7, 2),
('Scaland', 8, 2),
('Reino Swift', 9, 3),
('Kotlin Vile', 10, 4);


INSERT INTO tropa (tipo, qtd, fkReino) VALUES
('Arqueiro', 7000, 1), -- Pythondor
('Infantaria', 4500, 1), -- Pythondor
('Cavalaria', 9000, 1), -- Pythondor
('Infantaria', 5000, 2), -- JavaScripto
('Arqueiro', 6500, 2), -- JavaScripto
('Cavalaria', 3000, 2), -- JavaScripto
('Arqueiro', 3000, 3), -- PHPlandia
('Infantaria', 2500, 3), -- PHPlandia
('Cavalaria', 2000, 3), -- PHPlandia
('Arqueiro', 2000, 4), -- Coboworld
('Infantaria', 1200, 4), -- Coboworld
('Cavalaria', 4000, 4); -- Coboworld


INSERT INTO armaSecreta (fkReino, nome) VALUES
(1, 'Gráfico Lançador de Barras'), -- Pythondor
(2, 'Esfera de JavaScript'), -- JavaScripto
(3, 'Explosão de PHP'), -- PHPlandia
(4, 'Cálculo Mortal'), -- Coboworld
(1, 'Python Serpente de Fogo'), -- Pythondor
(2, 'Escudo de Código'), -- JavaScripto
(3, 'Lâmina de Script'), -- PHPlandia
(4, 'Algoritmo Assassino'), -- Coboworld
(1, 'Dart Venenoso'), -- Pythondor
(2, 'Rede de Variáveis'); -- JavaScripto

INSERT INTO guerra (dataInicio, dataFim, vencedorGuerra, fkReino1, fkReino2) VALUES
('2024-01-01', '2024-01-05', 'Pythondor', 1, 2), -- Pythondor vs JavaScripto
('2023-06-10', '2023-06-15', 'JavaScripto', 2, 3), -- JavaScripto vs PHPlandia
('2023-04-01', '2023-04-10', 'Pythondor', 1, 3), -- Pythondor vs PHPlandia
('2023-05-05', '2023-05-10', 'Coboworld', 4, 3), -- Coboworld vs PHPlandia
('2024-02-01', '2024-02-10', 'JavaScripto', 2, 4), -- JavaScripto vs Coboworld
('2023-03-15', '2023-03-20', 'Pythondor', 1, 4), -- Pythondor vs Coboworld
('2023-07-01', '2023-07-07', 'JavaScripto', 2, 1), -- JavaScripto vs Pythondor
('2023-08-10', '2023-08-15', 'Pythondor', 1, 3), -- Pythondor vs PHPlandia
('2023-09-01', '2023-09-05', 'Coboworld', 4, 2), -- Coboworld vs JavaScripto
('2023-10-01', '2023-10-07', 'JavaScripto', 2, 3); -- JavaScripto vs PHPlandia

INSERT INTO conquista (dataConquista, tipo, qtd, fkGuerra) VALUES 
('2024-01-05', 'Território', 1, 1), -- Conquista de Pythondor vs JavaScripto
('2023-06-15', 'Tropas', 1000, 2), -- Conquista de JavaScripto vs PHPlandia
('2023-04-10', 'Território', 2, 3), -- Conquista de Pythondor vs PHPlandia
('2023-05-10', 'Suprimentos', 500, 4), -- Conquista de Coboworld vs PHPlandia
('2024-02-10', 'Cavalos de Guerra', 500, 5), -- Conquista de JavaScripto vs Coboworld
('2023-03-20', 'Alianças Estratégicas', 3, 6), -- Conquista de Pythondor vs Coboworld
('2023-07-07', 'Tesouros', 1000, 7), -- Conquista de JavaScripto vs Pythondor
('2023-08-15', 'Territórios Marítimos', 4, 8), -- Conquista de Pythondor vs PHPlandia
('2023-09-05', 'Tecnologia Avançada', 2, 9), -- Conquista de Coboworld vs JavaScripto
('2023-10-07', 'Novos Armamentos', 500, 10); -- Conquista de JavaScripto vs PHPlandia

SELECT nome FROM rei WHERE nome LIKE "P%" ORDER BY linhagem DESC LIMIT 3;
select nome, min(linhagem) from rei
group by nome limit 1;

SELECT rei.nome, linhagem FROM rei JOIN reino ON idRei = fkRei ORDER BY linhagem LIMIT 1;

SELECT reino.idReino, reino.nome, SUM(qtd) FROM tropa JOIN reino ON fkReino = idReino;

SELECT r1.nome, r2.nome FROM guerra 
	JOIN reino as r1 
	ON fkReino1 = r1.idReino
    JOIN reino as r2
    ON fkReino2 = r2.idReino 
    WHERE r1.nome = 'Pythondor' 
    OR r2.nome = 'Pythondor' 
    GROUP BY r1.nome, r2.nome;

SELECT nome FROM rei WHERE nome LIKE "P%" ORDER BY linhagem DESC LIMIT 3;

SELECT tipo, qtd FROM tropa
WHERE qtd >= 3000 AND qtd <= 7000
ORDER BY qtd ASC;

SELECT * FROM reino
WHERE nome LIKE '%a____'
ORDER BY nome DESC
LIMIT 2;

SELECT * FROM conquista
ORDER BY dataConquista DESC;

SELECT * FROM guerra
WHERE vencedorGuerra LIKE '%Pythondor%'
ORDER BY dataInicio;

SELECT * FROM conquista WHERE descricao LIKE "%tropas%";

SELECT nome FROM reino ORDER BY nome DESC;

SELECT MAX(dataConquista) AS 'Última conquista', MIN(dataConquista) AS 'Primeira conquista' FROM conquista
JOIN guerra on fkGuerra = idGuerra
WHERE vencedorGuerra LIKE '%JavaScripto%';

SELECT rei.nome, linhagem FROM rei JOIN reino ON idRei = fkRei ORDER BY linhagem LIMIT 1;

SELECT * FROM guerra
WHERE fkReino1 IN (2,4) AND fkReino2 IN (2,4)
ORDER BY dataInicio DESC;

SELECT rei.nome, reino.nome FROM rei
JOIN reino ON fkRei = idRei
ORDER BY reino.nome;

SELECT sum(qtd) as total_Tropas, max(tipo) as maior_tropa FROM tropa
where fkReino = 1;

SELECT reino.nome, guerra.dataInicio, conquista.descricao
FROM guerra
JOIN reino AS reino_js ON guerra.fkReino1 = reino_js.idReino
JOIN reino ON guerra.fkReino2 = reino.idReino
JOIN conquista ON guerra.idGuerra = conquista.fkGuerra
WHERE reino_js.nome = 'JavaScripto';

SELECT nome, SUM(qtd) FROM guerra
JOIN reino ON idReino IN (fkReino1, fkReino2)
JOIN tropa ON idReino = fkReino
GROUP BY nome;

SELECT 
	max(rei.linhagem) as maiorLinhagem
    FROM guerra
	JOIN reino 
    ON idReino IN (fkReino1, fkReino2)
    JOIN rei
    ON reino.fkRei = rei.idRei;
    
SELECT
	nome,
	sum(tropa.qtd)
	FROM tropa JOIN reino
    ON fkReino = idReino
    GROUP BY nome;
