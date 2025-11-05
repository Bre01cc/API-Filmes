create table tbl_filme_genero(
    id int primary key auto_increment,
    id_filme int not null,
    id_genero int not null,
    constraint fk_filme_filme_genero
    FOREIGN KEY (id_genero)
    REFERENCEs  tbl_genero(id_genero),
     constraint fk_genero_filme_genero
    foreign key (id_filme) REFERENCEs tbl_filme(id_filme)
);