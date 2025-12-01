create table tbl_elenco(
    id int primary key auto_increment,
    id_estudio int not null,

    constraint fk_estudio_elenco
    FOREIGN KEY (id_estudio)
    REFERENCES  tbl_estudio(id_estudio),

    id_filme int not null,
    constraint fk_filme_elenco
    FOREIGN KEY (id_filme)
    REFERENCES  tbl_filme(id_filme),

    id_profissional int not null,

    constraint  fk_profissional_elenco
    FOREIGN KEY (id_profissional) 
    REFERENCES tbl_profissional(id_profissional),

    id_personagem int null,

    constraint fk_personagem_elenco
    foreign key (id_personagem)
    references tbl_personagem(id_personagem),

    id_cargo int not null,

    constraint fk_cargo_elenco
    foreign key (id_cargo)
    references tbl_cargo(id_cargo),

    salario decimal(11,2) not null,

    elenco_original BOOLEAN DEFAULT FALSE

);