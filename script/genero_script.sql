
-- Criação da tabela
CREATE TABLE tbl_genero (
    id_genero INT PRIMARY KEY auto_increment,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(500) NOT NULL,
    data_criacao DATE NULL
);

-- Inserção de dados de exemplo
INSERT INTO tbl_genero (nome, descricao, data_criacao)
VALUES 
('Ação', 'Filmes com cenas de ação intensa e aventura', '2025-10-28'),
('Comédia', 'Filmes que têm como objetivo principal fazer rir', '2025-10-28'),
('Drama', 'Filmes com forte carga emocional e narrativa envolvente', '2025-10-28'),
('Terror', 'Filmes que provocam medo ou tensão no espectador', '2025-10-28'),
('Ficção Científica', 'Filmes que exploram ciência e tecnologia futurista', '2025-10-28');
