create table tb_distribuicao(
    id int primary key auto_increment,
    id_nacionalidade int not null,

    constraint fk_nacionalidade_distribuicao
    foreign key(id_nacionalidade)
    references tbl_distribuidora(id_distribuidora),

    id_distribuidora int not null

    constraint fk_distribuidora_distribuicao
    foreign key(id_nacionalidade)
    references tbl_distribuidora(id_distribuidora),

    id_filme int not null,

    constraint fk_filme_distruicao
    foreign key(id_filme)
    references tbl_filme(id_filme)
);