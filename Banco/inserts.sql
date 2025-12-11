INSERT INTO tbl_idioma (sigla, data_criacao, descricao, familia_linguistica, antes_de_cristo) VALUES
('PT', '1290-01-01', 'Língua portuguesa antiga, base do português moderno.', 'Indo-Europeia', FALSE),
('EN', '0950-01-01', 'Inglês antigo que evoluiu para o inglês médio e moderno.', 'Indo-Europeia', FALSE),
('LA', '0700-01-01', 'Latim clássico, origem de várias línguas românicas.', 'Itálica', FALSE),
('GR', '0500-01-01', 'Grego clássico, base da cultura ocidental.', 'Helênica', FALSE),
('HE', '1200-01-01', 'Hebraico antigo, amplamente utilizado em textos religiosos.', 'Semítica', TRUE);


-- =============================================================
-- 1) INSERT: Gêneros
-- =============================================================
INSERT INTO tbl_genero (nome, descricao, data_criacao) VALUES
('Drama', 'Narrativas emocionais intensas', '2025-10-28'),
('Ação', 'Filmes com sequências de combate', '2025-10-28'),
('Ficção Científica', 'Tramas envolvendo tecnologia e futuro', '2025-10-28');


-- =============================================================
-- 2) INSERT: Filmes
-- =============================================================
INSERT INTO tbl_filme 
(nome, data_lancamento, orcamento, duracao, trailer, capa, sinopse) VALUES
('Interstellar', '2014-11-07', 165000000.00, '02:49:00',
 'https://www.youtube.com/watch?v=zSWdZVtXT7E',
 'https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg',
 'Exploradores viajam por um buraco de minhoca para salvar a humanidade.'),
('The Matrix', '1999-03-31', 63000000.00, '02:16:00',
 'https://www.youtube.com/watch?v=vKQi3bBA1y8',
 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
 'Um hacker descobre que vive em uma simulação computadorizada.'),
('The Godfather', '1972-03-24', 6000000.00, '02:55:00',
 'https://www.youtube.com/watch?v=sY1S34973zA',
 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
 'A trajetória da família mafiosa Corleone.'),
('Avatar', '2009-12-18', 237000000.00, '02:42:00',
 'https://www.youtube.com/watch?v=5PSNL1qE6VY',
 'https://image.tmdb.org/t/p/w500/tCZWepD8b5qKYvD8ZzKX6aDkB6E.jpg',
 'Um ex-fuzileiro participa de um projeto científico em Pandora.'),
('Shrek', '2001-05-18', 60000000.00, '01:30:00',
 'https://www.youtube.com/watch?v=CwXOrWvPBPk',
 'https://image.tmdb.org/t/p/w500/2yYP0PQjG8zVqturh1BAqu2Tixl.jpg',
 'Um ogro embarca em uma missão para salvar uma princesa.');


-- =============================================================
-- 3) INSERT: Profissionais
-- =============================================================
INSERT INTO tbl_profissional
(nome, data_nascimento, nome_artistico, foto, data_falecimento, rede_social, biografia, sexo) VALUES
('Morgan Freeman', '1937-06-01', 'Morgan Freeman', 'morgan.jpg', NULL,
 'https://www.instagram.com/morganfreeman', 'Ator e narrador de voz marcante.', 'M'),
('Scarlett Johansson', '1984-11-22', 'Scarlett Johansson', 'scarlett.jpg', NULL,
 'https://www.instagram.com/scarlettjohanssonworld','Atriz conhecida pelo papel de Viúva Negra.', 'F'),
('Tom Hanks', '1956-07-09', 'Tom Hanks', 'tomhanks.jpg', NULL,
 'https://www.instagram.com/tomhanks','Ator amplamente premiado, protagonista de Forrest Gump.', 'M'),
('Heath Ledger', '1979-04-04', 'Heath Ledger', 'heath.jpg', '2008-01-22',
 'https://www.instagram.com/heathledger','Ator que marcou o cinema como Coringa.', 'M'),
('Anne Hathaway', '1982-11-12', 'Anne Hathaway', 'annehathaway.jpg', NULL,
 'https://www.instagram.com/annehathaway','Vencedora do Oscar por Os Miseráveis.', 'F');


-- =============================================================
-- 4) INSERT: Tipo de Distribuidora
-- =============================================================
INSERT INTO tbl_tipo_distribuidora (nome, descricao) VALUES
('Streaming', 'Distribuição digital em plataformas online.'),
('Global', 'Atuação internacional em múltiplos países.'),
('Nacional', 'Distribuidoras com atuação apenas no país.');


-- =============================================================
-- 5) INSERT: Nacionalidade
-- =============================================================
INSERT INTO tbl_nacionalidade (nome, sigla, data_criacao) VALUES
('Brasil', 'BR', '1822-09-07'),
('França', 'FR', '843-08-10'),
('Japão', 'JP', '660-02-11'),
('Alemanha', 'DE', '1871-01-18'),
('Estados Unidos', 'US', '1776-07-04');


-- =============================================================
-- 6) INSERT: Filme x Gênero
-- =============================================================
INSERT INTO tbl_filme_genero (id_filme, id_genero) VALUES
(1, 3),
(2, 1),
(3, 1),
(4, 1),
(5, 2);


-- =============================================================
-- 7) INSERT: Distribuidoras
-- =============================================================
INSERT INTO tbl_distribuidora 
(nome, data_fundacao, telefone, id_nacionalidade, id_tipo_distribuidora, email) 
VALUES
('Warner Bros', '1923-04-04', '(11) 2222-3333', 5, 1, 'contato@warner.com'),
('Disney', '1923-10-16', '(11) 4444-5555', 5, 2, 'contato@disney.com'),
('Paramount Pictures', '1912-05-08', '(11) 6666-7777', 5, 3, 'contato@paramount.com');


-- =============================================================
-- 8) INSERT: Profissional x idioma
-- =============================================================

INSERT INTO tbl_profissional_idioma (id_profissional, id_idioma)
VALUES (1, 3);

-- =============================================================
-- 9) INSERT: Profissional x nacionalidade
-- =============================================================

INSERT INTO tbl_profissional_nacionalidade (id_profissional, id_nacionalidade)
VALUES 
(1, 1),
(1, 3),
(2, 2),
(2, 5),
(3, 1),
(3, 4),
(4, 2),
(4, 3),
(5, 5),
(5, 4);

-- =============================================================
-- 10) INSERT: Evento
-- =============================================================
INSERT INTO tbl_estudio 
(nome, nome_fantasia, dublagem, produtora, ano_fundacao, email, telefone, id_nacionalidade)
VALUES
('Estúdios Globo', 'Globo Filmes', TRUE, TRUE, '1965-04-26', 'contato@globo.com', '(21) 4002-8922', 1),
('Warner Bros Studio', 'Warner Studios', FALSE, TRUE, '1923-04-04', 'contato@warner.com', '(11) 2222-3333', 5),
('Paramount Studio', 'Paramount', FALSE, TRUE, '1912-05-08', 'studio@paramount.com', '(11) 7777-8888', 5),
('Disney Toon Studio', 'Disney Toon', TRUE, TRUE, '1984-09-14', 'contact@disneytoon.com', '(11) 5555-6666', 5),
('Estúdio Ghibli', 'Ghibli', TRUE, TRUE, '1985-06-15', 'contato@ghibli.jp', '(81) 1234-5678', 3);