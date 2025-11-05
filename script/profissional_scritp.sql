create table tbl_profissional(
 id_profissional int primary key auto_increment,
 nome Varchar(100) not null,
 data_nascimento date not null,
 nome_artistico varchar(100) not null,
 foto varchar(100) not null,
 data_falecimento date null,
 rede_social varchar(150)not null,
 biografia varchar(500) not null,
 sexo varchar(1) not null
);

-- Insert de profissionais
insert into tbl_profissional
(nome, data_nascimento, nome_artistico, foto, data_falecimento, rede_social, biografia, sexo)
values
('Leonardo Wilhelm DiCaprio', '1974-11-11', 'Leonardo DiCaprio', 'leonardo.jpg', null, 'https://www.instagram.com/leonardodicaprio', 
 'Ator, produtor e ativista ambiental norte-americano, vencedor do Oscar por O Regresso (2016).', 'M'),

('Scarlett Ingrid Johansson', '1984-11-22', 'Scarlett Johansson', 'scarlett.jpg', null, 'https://www.instagram.com/scarlettjohanssonworld', 
 'Atriz e cantora norte-americana, conhecida por seu papel como Viúva Negra no Universo Marvel.', 'F'),

('Robert John Downey Jr.', '1965-04-04', 'Robert Downey Jr.', 'robertdowney.jpg', null, 'https://www.instagram.com/robertdowneyjr', 
 'Ator e produtor, consagrado como Tony Stark/Homem de Ferro na Marvel Studios.', 'M'),

('Natalie Portman', '1981-06-09', 'Natalie Portman', 'natalie.jpg', null, 'https://www.instagram.com/natalieportman', 
 'Atriz israelense-americana, vencedora do Oscar por Cisne Negro e ativista de causas sociais.', 'F'),

('Heath Andrew Ledger', '1979-04-04', 'Heath Ledger', 'heath.jpg', '2008-01-22', 'https://www.instagram.com/heathledger', 
 'Ator australiano que marcou o cinema com sua atuação como Coringa em O Cavaleiro das Trevas.', 'M'),

('Emma Charlotte Duerre Watson', '1990-04-15', 'Emma Watson', 'emma.jpg', null, 'https://www.instagram.com/emmawatson', 
 'Atriz britânica famosa por interpretar Hermione Granger na saga Harry Potter.', 'F'),

('Morgan Freeman', '1937-06-01', 'Morgan Freeman', 'morgan.jpg', null, 'https://www.instagram.com/morganfreeman', 
 'Ator, diretor e narrador americano, conhecido por sua voz marcante e papéis icônicos em dramas e filmes biográficos.', 'M'),

('Marilyn Monroe', '1926-06-01', 'Marilyn Monroe', 'marilyn.jpg', '1962-08-05', 'https://www.instagram.com/marilynmonroe', 
 'Atriz e modelo norte-americana, ícone cultural e símbolo de beleza da era de ouro de Hollywood.', 'F'),

('Tom Hanks', '1956-07-09', 'Tom Hanks', 'tomhanks.jpg', null, 'https://www.instagram.com/tomhanks', 
 'Ator e produtor norte-americano, vencedor de dois Oscars consecutivos e protagonista de Forrest Gump.', 'M'),

('Anne Hathaway', '1982-11-12', 'Anne Hathaway', 'annehathaway.jpg', null, 'https://www.instagram.com/annehathaway', 
 'Atriz norte-americana premiada com o Oscar por Os Miseráveis e reconhecida por O Diabo Veste Prada.', 'F');
