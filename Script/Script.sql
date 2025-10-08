
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

alter table tbl_filme MODIFY column orcamento DECIMAL(11,2);

INSERT into tbl_filme(nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa) 
VALUES(
    "Como Treinar o seu Dragão",
    "Na acidentada ilha de Berk, onde vikings e dragões convivem em constante conflito, vive Soluço (Mason Thames), um jovem imaginativo e subestimado pelo pai, o Chefe Stoico (Gerard Butler). Diferente de seus conterrâneos, Soluço não possui habilidade para caçar dragões, mas busca provar seu valor. Tudo muda quando ele derruba um temido Fúria da Noite, mas, em vez de matá-lo, forma uma improvável amizade com o dragão, a quem chama de Banguela. Esse laço revela a verdadeira natureza dos dragões, desafiando séculos de tradições e crenças da sociedade viking. Com a corajosa Astrid (Nico Parker) e o excêntrico ferreiro Bocão Bonarroto (Nick Frost), Soluço lidera uma jornada de transformação, questionando o medo que separa os dois mundos. Quando uma antiga ameaça ressurge, colocando em risco tanto os vikings quanto os dragões, a amizade de Soluço e Banguela se torna a única esperança de unir os dois lados. A história aborda coragem, liderança e a busca pela paz, enquanto redefine o significado de heroísmo. Baseado na animação da DreamWorks, Como Treinar o Seu Dragão, este live-action traz ação, emoção e um olhar renovado sobre a clássica jornada do jovem viking que ousou mudar o destino de sua vila.",
    '2025-06-12',
    '02:05',
    '15000000',
    "https://youtu.be/M7YuVLjEB_U?si=FaGxpBtvVH9uTxPK",
    "https://br.web.img3.acsta.net/r_1280_720/img/2c/59/2c5907be8f52c06b3cba679cd43d2ed7.jpg"
);

alter table tbl_filme MODIFY column orcamento DECIMAL(11,2);