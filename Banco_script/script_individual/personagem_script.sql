create table tb_personagem(
    id_personagem int primary key auto_increment,
    nome varchar(200) not null,
    data_criacao date not null,
    descricao not null,
    habilidade varchar(400) null
);