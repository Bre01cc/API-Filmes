create table tbl_profissional_idioma(
    id int primary key auto_increment,
    id_profissional int not null,

    constraint fk_profissional_key_idioma
    foreign key(id_profissional)
    references tbl_profissional(id_profissional),

    id_idioma int not null,
    constraint fk_idioma_key_idioma
    foreign key(id_profissional)
    references tbl_profissional(id_profissional)

);