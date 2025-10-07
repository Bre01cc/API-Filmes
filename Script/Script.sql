
CREATE DATABASE db_locadora_filme_ds2m_25_2;
USE db_locadora_filme_ds2m_25_2;


CREATE TABLE tbl_filme(
	id_filme        int             primary key auto_increment,
	nome            VARCHAR(100)     not null,
	data_lancamento DATE             not null,
	orcamento       DECIMAL(7,2)     not null,
	duracao         TIME,
	trailer         VARCHAR(200)     not null,
	capa            VARCHAR(200)     not null    
);
ALTER table tbl_filme add COLUMN sinopse Text null;
ALTER table tbl_filme MODIFY data_lancamento DATE null;

INSERT INTO tbl_filme(nome,data_lancamento,orcamento,duracao,trailer,capa,sinopse)
VALUES('Bob-esponja','2025-07-15',22500.00,'02:09:00','https://www.youtube.com/watch?v=LcC-jBJRzXg','https://br.web.img3.acsta.net/c_310_420/pictures/14/12/19/17/48/225645.jpg',
'Incomodado com o sucesso do Siri Cascudo, a lanchonete do Sr. Sirigueijo que tem a exclusividade na produção do hambúrguer de siri, Plankton, o dono da lanchonete Balde de Lixo, resolve traçar uma verdadeira estratégia de guerra para roubar a fórmula da iguaria, que é a base da alimentação da população da Fenda do Biquíni. Mas alguma coisa sai errado e a fórmula desaparece, deixando a uma vez pacata comunidade à beira do apocalipse. Agora, Bob Esponja, o funcionário padrão do Siri Cascudo, vai ter que unir forças com o ambicioso Plankton em uma viagem no tempo e no espaço para tentar recuperar a receita, contando com a ajuda da leal estrela-do-mar Patrick, do sarcástico Lula Molusco, da esquilo cientista Sandy e também o mercenário Sr. Sirigueijo. Outro interessado na fórmula é o malvado pirata Barba Burguer (Antonio Banderas), que os heróis terão de enfrentar em uma batalha fora da água.');