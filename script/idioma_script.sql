-- Criação da tabela idioma
create table tbl_idioma(
    id_idioma int primary key auto_increment,
    sigla varchar(10) not null,
    data_criacao date not null,
    descricao varchar(500) null,
    familia_linguistica varchar(500) not null
);

alter table tbl_idioma add column antes_de_cristo BOOLEAN DEFAULT FALSE;



--- Inserts de dados

insert into tbl_idioma(sigla, data_criacao, descricao, familia_linguistica, antes_de_cristo)
values
('es', '1492-01-01', 'O espanhol é uma língua românica originária da Península Ibérica, falada em diversos países da América Latina e na Espanha. Possui diversas variações regionais.', 'LATIM', FALSE),
('fr', '842-01-01', 'O francês é uma língua românica falada na França, Bélgica, Suíça, Canadá e vários países africanos. Destaca-se pela influência cultural e literária ao longo da história.', 'LATIM', FALSE),
('en', '450-01-01', 'O inglês é uma língua germânica ocidental, originária da Inglaterra, hoje língua global de comunicação, comércio e ciência, com grande número de falantes nativos e não nativos.', 'GERMÂNICA', FALSE),
('de', '750-01-01', 'O alemão é uma língua germânica falada principalmente na Alemanha, Áustria e Suíça, conhecida por sua complexa gramática e vocabulário técnico e científico.', 'GERMÂNICA', FALSE),
('it', '960-01-01', 'O italiano é uma língua românica falada na Itália e na Suíça, com raízes no latim, muito associada à cultura, música e gastronomia italianas.', 'LATIM', FALSE),
('zh', '1250-01-01', 'O mandarim é a língua oficial da China, com milhares de anos de história, escrita em caracteres ideográficos, e é falada por mais de um bilhão de pessoas.', 'SINOTIBETANA', FALSE),
('ar', '600-01-01', 'O árabe é uma língua semítica, falada em países do Oriente Médio e Norte da África, com diversas variantes dialetais e importante papel cultural e religioso.', 'SEMÍTICA', FALSE),
('hi', '1000-01-01', 'O hindi é uma língua indo-ariana falada principalmente na Índia e Nepal, usando o alfabeto devanágari e influenciada por diversas línguas locais.', 'INDO-ARIANA', FALSE),
('la', '700-01-01', 'O latim é uma língua clássica da Roma Antiga, base das línguas românicas modernas, e utilizada historicamente em documentos religiosos e científicos.', 'LATIM', TRUE),
('grc', '500-01-01', 'O grego antigo é a língua da Grécia Antiga, usada em literatura, filosofia e ciência, com grande influência no vocabulário de várias línguas modernas.', 'GREGA', TRUE),
('jp', '800-01-01', 'O japonês é a língua oficial do Japão, com sistema de escrita complexo envolvendo kanji e kana, e rica tradição literária e cultural.', 'JAPONESA', FALSE);
