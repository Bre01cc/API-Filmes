
-- Criação da tabela tipo_distribuidora
create table tbl_tipo_distribuidora(
 id_tipo_distribuidora int primary key auto_increment,
 nome Varchar(100) not null,
 descricao Varchar(500) not null
);

-- Insert de tipos de distribuidoras
INSERT INTO tbl_tipo_distribuidora (nome, descricao)
VALUES
('Global', 
 'Distribuidoras com atuação internacional, responsáveis por lançar filmes em múltiplos países e idiomas, geralmente associadas a grandes estúdios como Disney, Warner Bros. e Universal.'),
 
('Regional', 
 'Distribuidoras que operam em uma área geográfica específica, como América Latina ou Europa, adaptando lançamentos conforme o público e as regulamentações locais.'),
 
('Nacional', 
 'Distribuidoras que atuam exclusivamente dentro do território nacional, cuidando de lançamentos e campanhas de marketing voltados ao público local.'),
 
('Independente', 
 'Distribuidoras menores, que promovem filmes de baixo orçamento ou produções alternativas, com foco em festivais e circuitos de cinema de arte.'),
 
('Streaming', 
 'Distribuidoras digitais responsáveis por lançar produções diretamente em plataformas online, como Netflix, Amazon Prime e Globoplay.'),
 
('Corporativa', 
 'Distribuidoras ligadas a conglomerados ou grupos empresariais que controlam diversos estúdios e canais de mídia, garantindo ampla distribuição global.'),
 
('Estatal', 
 'Distribuidoras mantidas ou apoiadas por governos, voltadas à promoção cultural e incentivo à produção cinematográfica nacional.'),
 
('Festival', 
 'Distribuidoras especializadas em exibir filmes em festivais internacionais e eventos de cinema, com foco em produções autorais e independentes.'),
 
('Educacional', 
 'Distribuidoras que trabalham com filmes e documentários voltados à educação, cultura e treinamento, muitas vezes em parceria com instituições de ensino.'),
 
('Histórica', 
 'Distribuidoras desativadas ou incorporadas por outras empresas, que tiveram papel importante na história do cinema, especialmente durante o século XX.');
