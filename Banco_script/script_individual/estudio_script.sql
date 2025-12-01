create table tb_estudio(
    id_estudio int primary key auto_increment,
    nome varchar(150) not null,
    nome_fantasia varchar(100) not null,
    dublagem boolean default false null,
    produtora boolean dafalut true not null,
    ano_fundacao date not null,
    email varchar(100) null,
    telefone varchar(20) null,
    id_nacionalidade int not null,
    constraint fk_estudio_nacionalidade
    foreign key (id_nacionalidade)
    references tbl_nacionalidade(id_nacionalidade)
);