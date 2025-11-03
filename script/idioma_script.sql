
-- Criação da tabela idioma
create table tbl_idioma(
    id_idioma int primary key auto_increment,
    sigla varchar(10) not null,
    data_criacao date not null,
    descricao varchar(500) null,
    familia_linguistica varchar(500) null
);

alter table tbl_idioma add column antes_de_cristo BOOLEAN DEFAULT FALSE;



--- Inserts de dados
insert into tbl_idioma(sigla,data_criacao,descricao,familia_linguistica,antes_de_cristo)
values(
    'pt-br','1532-01-01','O português brasileiro é a variante do idioma português falada no Brasil. Possui vocabulário, pronúncia e expressões próprias, 
    influenciadas por línguas indígenas, africanas e europeias, e é a língua oficial do país,
     utilizada em todos os contextos sociais, culturais e administrativos.','LATIM',FALSE
);

insert into tbl_idioma(sigla, data_criacao, descricao, familia_linguistica, antes_de_cristo)
values(
    'en-us','1607-01-01','O inglês americano é a variedade da língua inglesa falada nos Estados Unidos. Apresenta diferenças de vocabulário, pronúncia e gramática em relação ao inglês britânico, refletindo influências de imigrantes e povos nativos.','GERMÂNICA',FALSE
);

insert into tbl_idioma(sigla, data_criacao, descricao, familia_linguistica, antes_de_cristo)
values(
    'es-es','1200-01-01','O espanhol da Espanha é a forma original do idioma espanhol, derivado do latim vulgar e com influências árabes e germânicas. É a base para as variações faladas na América Latina.','LATIM',FALSE
);

insert into tbl_idioma(sigla, data_criacao, descricao, familia_linguistica, antes_de_cristo)
values(
    'fr-fr','842-01-01','O francês é uma língua românica originada do latim, desenvolvida na região da Gália. É conhecida por sua influência cultural, literária e diplomática no mundo.','LATIM',FALSE
);

insert into tbl_idioma(sigla, data_criacao, descricao, familia_linguistica, antes_de_cristo)
values(
    'de-de','1050-01-01','O alemão é uma língua germânica falada principalmente na Alemanha, Áustria e Suíça. Apresenta forte estrutura gramatical e amplo vocabulário técnico e filosófico.','GERMÂNICA',FALSE
);

insert into tbl_idioma(sigla, data_criacao, descricao, familia_linguistica, antes_de_cristo)
values(
    'zh-cn','1250-01-01','O chinês mandarim é o principal dialeto da China e uma das línguas mais faladas do mundo. Possui escrita ideográfica e longa tradição cultural e literária.','SINO-TIBETANA',FALSE
);

insert into tbl_idioma(sigla, data_criacao, descricao, familia_linguistica, antes_de_cristo)
values(
    'gr-anc','0500-01-01','O grego antigo era falado nas cidades-estado da Grécia Antiga e influenciou profundamente a filosofia, a ciência e as línguas europeias modernas.','INDO-EUROPEIA',TRUE
);
