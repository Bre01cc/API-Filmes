create table tbl_profissional_nacionalidade(
    id int primary key auto_increment,
    id_profissional int not null,
    id_nacionalidade int not null,
    constraint fk_profissional_profissional_nacionalidade
    FOREIGN KEY (id_nacionalidade)
    REFERENCEs  tbl_nacionalidade(id_nacionalidade),
     constraint fk_nacionalidade_profissional_nacionalidade
    foreign key (id_profissional) REFERENCEs tbl_profissional(id_profissional)
);