-- Criação do banco de dados
CREATE DATABASE db_locadora_filme_ds2m_25_2_breno;
USE db_locadora_filme_ds2m_25_2_breno;


-- Criação da tabela filme
CREATE TABLE tbl_filme(
	id_filme        int             primary key auto_increment,
	nome            VARCHAR(100)     not null,
	data_lancamento DATE             not null,
	orcamento       DECIMAL(11,2)     not null,
	duracao         TIME,
	trailer         VARCHAR(200)     not null,
	capa            VARCHAR(200)     not null    
);
ALTER table tbl_filme add COLUMN sinopse Text null;
ALTER table tbl_filme MODIFY data_lancamento DATE null;

-- Insert de filmes

INSERT INTO tbl_filme 
(nome, data_lancamento, orcamento, duracao, trailer, capa, sinopse) 
VALUES('Avatar', '2009-12-18', 237000000.00, '02:42:00', 'https://www.youtube.com/watch?v=5PSNL1qE6VY', 'https://image.tmdb.org/t/p/w500/tCZWepD8b5qKYvD8ZzKX6aDkB6E.jpg', 'Um ex-fuzileiro naval é enviado à lua Pandora e se vê dividido entre seguir ordens e proteger o povo nativo.'),
('Titanic', '1997-12-19', 200000000.00, '03:14:00', 'https://www.youtube.com/watch?v=2e-eXJ6HgkQ', 'https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg', 'Um romance proibido nasce entre passageiros de diferentes classes a bordo do Titanic.'),
('The Dark Knight', '2008-07-18', 185000000.00, '02:32:00', 'https://www.youtube.com/watch?v=EXeTwQWrcwY', 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', 'Batman enfrenta o Coringa, um criminoso anárquico que quer mergulhar Gotham no caos.'),
('Avengers: Endgame', '2019-04-26', 356000000.00, '03:01:00', 'https://www.youtube.com/watch?v=TcMBFSGVi1c', 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg', 'Após Thanos eliminar metade do universo, os Vingadores tentam reverter o desastre.'),
('Inception', '2010-07-16', 160000000.00, '02:28:00', 'https://www.youtube.com/watch?v=YoHD9XEInc0', 'https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg', 'Um ladrão que invade sonhos é contratado para realizar uma missão quase impossível: plantar uma ideia.'),
('Interstellar', '2014-11-07', 165000000.00, '02:49:00', 'https://www.youtube.com/watch?v=zSWdZVtXT7E', 'https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg', 'Exploradores viajam por um buraco de minhoca para salvar a humanidade da extinção.'),
('Jurassic Park', '1993-06-11', 63000000.00, '02:07:00', 'https://www.youtube.com/watch?v=lc0UehYemQA', 'https://image.tmdb.org/t/p/w500/c414cDeQ9b6qLPLeKmiJuLDUREJ.jpg', 'Cientistas clonam dinossauros e criam um parque temático que logo sai do controle.'),
('Forrest Gump', '1994-07-06', 55000000.00, '02:22:00', 'https://www.youtube.com/watch?v=bLvqoHBptjg', 'https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg', 'A vida de um homem simples que testemunha grandes momentos da história americana.'),
('The Matrix', '1999-03-31', 63000000.00, '02:16:00', 'https://www.youtube.com/watch?v=vKQi3bBA1y8', 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg', 'Um hacker descobre que a realidade é uma simulação criada por máquinas.'),
('Gladiator', '2000-05-05', 103000000.00, '02:35:00', 'https://www.youtube.com/watch?v=owK1qxDselE', 'https://image.tmdb.org/t/p/w500/pRn3TJHbAqCAOQnxOoV2PIwrSq8.jpg', 'Um general romano busca vingança após ser traído e ver sua família assassinada.'),
('Spider-Man: No Way Home', '2021-12-17', 200000000.00, '02:28:00', 'https://www.youtube.com/watch?v=JfVOs4VSpmA', 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg', 'Peter Parker enfrenta vilões de outros universos após um feitiço dar errado.'),
('Black Panther', '2018-02-16', 200000000.00, '02:14:00', 'https://www.youtube.com/watch?v=xjDjIWPwcPU', 'https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg', 'T’Challa retorna a Wakanda para assumir o trono e defender seu povo.'),
('Iron Man', '2008-05-02', 140000000.00, '02:06:00', 'https://www.youtube.com/watch?v=8ugaeA-nMTc', 'https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg', 'Um bilionário cria uma armadura de alta tecnologia para combater o crime.'),
('The Lion King', '1994-06-24', 45000000.00, '01:28:00', 'https://www.youtube.com/watch?v=4sj1MT05lAA', 'https://image.tmdb.org/t/p/w500/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg', 'O jovem leão Simba enfrenta a perda do pai e o desafio de se tornar rei.'),
('Frozen', '2013-11-27', 150000000.00, '01:42:00', 'https://www.youtube.com/watch?v=L0MK7qz13bU', 'https://image.tmdb.org/t/p/w500/kgwjIb2JDHRhNk13lmSxiClFjVk.jpg', 'A princesa Elsa luta para controlar seus poderes de gelo enquanto o reino entra em inverno eterno.'),
('Toy Story', '1995-11-22', 30000000.00, '01:21:00', 'https://www.youtube.com/watch?v=rNk1Wi8SvNc', 'https://image.tmdb.org/t/p/w500/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg', 'Brinquedos ganham vida quando os humanos não estão por perto.'),
('Shrek', '2001-05-18', 60000000.00, '01:30:00', 'https://www.youtube.com/watch?v=CwXOrWvPBPk', 'https://image.tmdb.org/t/p/w500/2yYP0PQjG8zVqturh1BAqu2Tixl.jpg', 'Um ogro parte em uma jornada para resgatar uma princesa e salvar seu pântano.'),
('The Godfather', '1972-03-24', 6000000.00, '02:55:00', 'https://www.youtube.com/watch?v=sY1S34973zA', 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg', 'A história da poderosa família mafiosa Corleone.'),
('Star Wars: A New Hope', '1977-05-25', 11000000.00, '02:01:00', 'https://www.youtube.com/watch?v=vZ734NWnAHA', 'https://image.tmdb.org/t/p/w500/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg', 'Um jovem fazendeiro embarca em uma jornada épica para derrotar o Império.'),
('Pulp Fiction', '1994-10-14', 8000000.00, '02:34:00', 'https://www.youtube.com/watch?v=s7EdQ4FqbhY', 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg', 'Histórias interligadas de criminosos e pessoas comuns em Los Angeles.');


