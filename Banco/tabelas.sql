CREATE DATABASE db_locadora_filme_ds2m_25_2_breno;
USE db_locadora_filme_ds2m_25_2_breno;

-- =============================================================
-- 1) Tabela: Nacionalidade
-- =============================================================
CREATE TABLE tbl_nacionalidade(
    id_nacionalidade INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    sigla VARCHAR(5) NOT NULL,
    data_criacao DATE NOT NULL
);

-- =============================================================
-- 2) Tabela: Tipo de Distribuidora
-- =============================================================
CREATE TABLE tbl_tipo_distribuidora(
    id_tipo_distribuidora INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(500) NOT NULL
);

-- =============================================================
-- 3) Tabela: Filme
-- =============================================================
CREATE TABLE tbl_filme(
    id_filme INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    data_lancamento DATE NULL,
    orcamento DECIMAL(11,2) NOT NULL,
    duracao TIME,
    trailer VARCHAR(200) NOT NULL,
    capa VARCHAR(200) NOT NULL,
    sinopse TEXT NULL
);

-- =============================================================
-- 4) Tabela: Gênero
-- =============================================================
CREATE TABLE tbl_genero (
    id_genero INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(500) NOT NULL,
    data_criacao DATE NOT NULL
);

-- =============================================================
-- 5) Tabela: Idioma
-- =============================================================
CREATE TABLE tbl_idioma(
    id_idioma INT PRIMARY KEY AUTO_INCREMENT,
    sigla VARCHAR(10) NOT NULL,
    data_criacao DATE NOT NULL,
    descricao VARCHAR(500),
    familia_linguistica VARCHAR(500) NOT NULL,
    antes_de_cristo BOOLEAN DEFAULT FALSE
);

-- =============================================================
-- 6) Tabela: Profissional
-- =============================================================
CREATE TABLE tbl_profissional(
    id_profissional INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
    nome_artistico VARCHAR(100) NOT NULL,
    foto VARCHAR(100) NOT NULL,
    data_falecimento DATE NULL,
    rede_social VARCHAR(150) NULL,
    biografia VARCHAR(500) NOT NULL,
    sexo VARCHAR(1) NOT NULL
);


-- =============================================================
-- 7) Tabela: Distribuidora
-- =============================================================
CREATE TABLE tbl_distribuidora(
    id_distribuidora INT PRIMARY KEY AUTO_INCREMENT,
    data_fundacao DATE NOT NULL,
    nome varchar(100) not null,
    telefone VARCHAR(20) NOT NULL,
    id_nacionalidade INT NOT NULL,
    id_tipo_distribuidora INT NOT NULL,
    email VARCHAR(100) NOT NULL,
    CONSTRAINT fk_nacionalidade_distribuidora
        FOREIGN KEY (id_nacionalidade)
        REFERENCES tbl_nacionalidade(id_nacionalidade),
    CONSTRAINT fk_tipo_distribuidora
        FOREIGN KEY (id_tipo_distribuidora)
        REFERENCES tbl_tipo_distribuidora(id_tipo_distribuidora)
);

-- =============================================================
-- 8) Tabela: Filme x Gênero
-- =============================================================
CREATE TABLE tbl_filme_genero(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_filme INT NOT NULL,
    id_genero INT NOT NULL,
    CONSTRAINT fk_filme_filme_genero
        FOREIGN KEY (id_filme)
        REFERENCES tbl_filme(id_filme),
    CONSTRAINT fk_genero_filme_genero
        FOREIGN KEY (id_genero)
        REFERENCES tbl_genero(id_genero)
);

-- =============================================================
-- 9) Tabela: Profissional x Idioma
-- =============================================================
CREATE TABLE tbl_profissional_idioma(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_profissional INT NOT NULL,
    id_idioma INT NOT NULL,
    CONSTRAINT fk_profissional_idioma
        FOREIGN KEY (id_profissional)
        REFERENCES tbl_profissional(id_profissional),
    CONSTRAINT fk_idioma_profissional
        FOREIGN KEY (id_idioma)
        REFERENCES tbl_idioma(id_idioma)
);

-- =============================================================
-- 10) Tabela: Profissional x Nacionalidade
-- =============================================================
CREATE TABLE tbl_profissional_nacionalidade(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_profissional INT NOT NULL,
    id_nacionalidade INT NOT NULL,
    CONSTRAINT fk_profissional_prof_nac
        FOREIGN KEY (id_profissional)
        REFERENCES tbl_profissional(id_profissional),
    CONSTRAINT fk_nacionalidade_prof_nac
        FOREIGN KEY (id_nacionalidade)
        REFERENCES tbl_nacionalidade(id_nacionalidade)
);

-- =============================================================
-- 11) Tabela: Estudio
-- =============================================================
create table tbl_estudio( 
    id_estudio int primary key auto_increment,
    nome varchar(150) not null,
    nome_fantasia varchar(100) not null,
    dublagem boolean default false null,
    produtora boolean default true not null,
    ano_fundacao date not null,
    email varchar(100) null,
    telefone varchar(20) null,
    id_nacionalidade int not null,
    constraint fk_estudio_nacionalidade
    foreign key (id_nacionalidade)
    references tbl_nacionalidade(id_nacionalidade));


-- =============================================================
-- 1) View: Distribuidora
-- =============================================================
create view vw_distribuidora
as
select 
distribuidora.id_distribuidora,
distribuidora.nome,
distribuidora.data_fundacao,
distribuidora.email,
nacionalidade.id_nacionalidade,
nacionalidade.sigla,
tipo.id_tipo_distribuidora,
tipo.nome nome_tipo
 from tbl_distribuidora distribuidora join tbl_nacionalidade nacionalidade on 
nacionalidade.id_nacionalidade = distribuidora.id_nacionalidade join tbl_tipo_distribuidora tipo on
tipo.id_tipo_distribuidora = distribuidora.id_tipo_distribuidora;

-- =============================================================
-- 2) View: Estudio
-- =============================================================
create view vw_estudio 
as
select
estudio.id_estudio,
estudio.nome,
estudio.nome_fantasia,
estudio.dublagem,
estudio.produtora,
estudio.ano_fundacao,
estudio.email,
estudio.telefone,
nacionalidade.id_nacionalidade,
nacionalidade.sigla
from tbl_estudio estudio join tbl_nacionalidade nacionalidade on
nacionalidade.id_nacionalidade = estudio.id_nacionalidade;

-- =============================================================
-- 3) View: Profissional x idioma
-- =============================================================
 create view vw_profissional_idioma
    as
    select 
    profissional_idioma.id,
    profissional.id_profissional,
    profissional.nome,
    idioma.id_idioma,
    idioma.sigla
    from tbl_profissional_idioma profissional_idioma join tbl_profissional profissional
    on profissional_idioma.id_profissional = profissional.id_profissional join tbl_idioma idioma
    on idioma.id_idioma = profissional_idioma.id_idioma;

-- =============================================================
-- 4) View: Profissional x nacionalidade
-- =============================================================
  create view vw_profissional_nacionalidade
    as
    select 
    profissional_nacionalidade.id,
    profissional.id_profissional,
    profissional.nome,
    nacionalidade.id_nacionalidade,
    nacionalidade.sigla
    from tbl_profissional_nacionalidade profissional_nacionalidade join tbl_profissional profissional
    on profissional_nacionalidade.id_profissional = profissional.id_profissional join tbl_nacionalidade nacionalidade
    on nacionalidade.id_nacionalidade = profissional_nacionalidade.id_nacionalidade;
