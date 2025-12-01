create table tbl_distribuidora(
    id_distribuidora int primary key auto_increment,
    data_fundacao date not null,
    telefone varchar(20) not null,
    id_nacionalidade int not null,

    constraint fk_nacionalidade_distribuidora
    FOREIGN KEY (id_nacionalidade)
    REFERENCEs  tbl_nacionalidade(id_nacionalidade),

    id_tipo_distribuidora int not null,
    
    constraint fk_tipo_key_distribuidora
    FOREIGN KEY (id_tipo_distribuidora)
    REFERENCEs  tbl_tipo_distribuidora(id_tipo_distribuidora),

    email varchar(100) not null,
);