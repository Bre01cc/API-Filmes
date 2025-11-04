create table tbl_profissional(
 id_profissional int primary key auto_increment,
 nome Varchar(100) not null,
 data_nascimento date not null,
 nome_artistico varchar(100) not null,
 foto varchar(100) not null,
 data_falecimento date null,
 rede_social varchar(20)not null,
 biografia varchar(500) not null
);

INSERT INTO tbl_profissional (nome, data_nascimento, nome_artistico, foto_ator, data_falecimento, rede_social, biografia)
VALUES
('João Silva', '1985-03-12', 'João S.', 'joao_silva.jpg', NULL, '@joaosilva',
 'João Silva iniciou sua carreira no teatro ainda na adolescência, migrando para o cinema em 2008. Desde então, participou de mais de 20 produções nacionais, destacando-se por papéis intensos em dramas e filmes históricos. É conhecido também por seu trabalho como dublador em animações brasileiras.'),
 
('Maria Souza', '1990-07-25', 'Maria S.', 'maria_souza.jpg', NULL, '@mariasouza',
 'Maria Souza é uma atriz premiada, reconhecida por sua versatilidade em papéis de comédia e drama. Formada em artes cênicas pela USP, estreou nas telonas em 2010 e rapidamente se tornou um dos grandes nomes do cinema brasileiro contemporâneo.'),
 
('Carlos Pereira', '1978-11-05', 'Carlos P.', 'carlos_pereira.jpg', NULL, '@carlosp',
 'Carlos Pereira é ator e produtor de cinema. Iniciou sua trajetória em produções independentes e ganhou notoriedade em filmes de ação e suspense. Além de atuar, fundou sua própria produtora, dedicada a revelar novos talentos no cinema nacional.'),
 
('Ana Oliveira', '1988-02-19', 'Ana O.', 'ana_oliveira.jpg', NULL, '@anaoliveira',
 'Ana Oliveira é atriz, diretora e roteirista. Estreou no cinema em 2012 e rapidamente conquistou público e crítica com suas performances marcantes. Em 2020, dirigiu seu primeiro longa-metragem, premiado em festivais internacionais.'),
 
('Rafael Costa', '1982-09-14', 'Rafa Costa', 'rafael_costa.jpg', NULL, '@rafacosta',
 'Rafael Costa é um ator de cinema e teatro conhecido por seu carisma e talento em comédias românticas. Ao longo da carreira, participou de diversas produções que marcaram a bilheteria nacional e também se aventurou como apresentador de TV.'),
 
('Fernanda Lima', '1992-06-30', 'Fê Lima', 'fernanda_lima.jpg', NULL, '@ferlima',
 'Fernanda Lima iniciou sua carreira como modelo antes de se dedicar ao cinema. Reconhecida por suas atuações emocionais e presença de cena, participou de produções internacionais e foi indicada a prêmios de melhor atriz em festivais sul-americanos.'),
 
('Bruno Martins', '1975-12-01', 'Bruno M.', 'bruno_martins.jpg', '2022-05-10', '@brunom',
 'Bruno Martins foi um renomado ator e diretor de cinema. Atuou em mais de 30 produções e é lembrado por sua contribuição para o cinema nacional dos anos 2000. Após décadas de carreira, aposentou-se em 2018, vindo a falecer em 2022.'),
 
('Camila Rocha', '1987-08-22', 'Cami R.', 'camila_rocha.jpg', NULL, '@camilarocha',
 'Camila Rocha é atriz e roteirista brasileira, conhecida por sua capacidade de interpretar personagens complexos. Trabalhou em produções de sucesso e colaborou na escrita de roteiros premiados. É uma das principais vozes femininas no cinema independente.'),
 
('Lucas Fernandes', '1995-01-15', 'Luc F.', 'lucas_fernandes.jpg', NULL, '@lucfernandes',
 'Lucas Fernandes é um jovem ator em ascensão. Começou na televisão e logo chamou atenção por seu talento natural em comédias. Hoje, atua também em produções de streaming e é considerado uma das promessas do cinema nacional.'),
 
('Patrícia Almeida', '1983-04-10', 'Paty A.', 'patricia_almeida.jpg', NULL, '@paty_almeida',
 'Patrícia Almeida é uma atriz premiada e ativista cultural. Com uma carreira consolidada no teatro e no cinema, recebeu reconhecimento por papéis em dramas intensos e por seu engajamento em causas sociais relacionadas à representatividade feminina no audiovisual.');

alter table tbl_profissional add column sexo varchar(1) not null;

 alter table tbl_profissional modify data_falecimento date DEFAULT null;
 alter table tbl_profissional modify rede_social varchar(20) DEFAULT null;