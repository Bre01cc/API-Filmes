create table tb_conglomerado_estudio(
    id int primary key auto_increment,
    id_estudio int not null,

    constraint fk_estudio_key_conglomerado
    foreign key(id_estudio)
    references tbl_estudio(id_estudio),

    id_conglomerado int not null,

    constraint fk_conglomerado_key_conglomerado
    foreign key(id_conglomerado)
    references tbl_conglomerado(id_conglomerado),

    data_fim date null,
    data_inicio date not null
);