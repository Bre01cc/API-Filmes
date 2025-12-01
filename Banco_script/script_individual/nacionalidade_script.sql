
-- Criação da tabela nacionalidade
create table tbl_nacionalidade(
    id_nacionalidade int primary key auto_increment,
    nome varchar(100) not null,
    sigla varchar(5) not null,
    data_criacao Date not null
);

-- Insert de nacionalidades
insert into tbl_nacionalidade(nome, sigla, data_criacao)
values
('Brasil', 'BR', '1822-09-07'),
('Japão', 'JP', '660-02-11'),
('Canadá', 'CA', '1867-07-01'),
('Egito', 'EG', '3100-01-01'),
('Itália', 'IT', '1861-03-17'),
('Austrália', 'AU', '1901-01-01'),
('México', 'MX', '1810-09-16'),
('Alemanha', 'DE', '1871-01-18'),
('Índia', 'IN', '1947-08-15'),
('França', 'FR', '843-08-10');
