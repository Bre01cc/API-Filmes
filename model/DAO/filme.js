/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao filme
 * Data: 01/10/2025
 * Autot: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

/***********************************************************************************************************************
 * Exemplo de dependencias para conexão com BD
 *   Banco de Dados relacionais:
 *      Sequelize                          -> Foi utilizado em  muitos projetos desde o ínicio do node
 *      Prisma                             -> É uma dependencia atual que trabalha com BD (SQL ou ORM)
 *      Knex                               -> É uma dependencia atual que trabalha com MYSQL
 *      prisma                             -> É a dependencia atual que trabalha com BD(Mysql e etc)
 *      npm install prisma --save          -> instalar o prisma
 *      npm install @prisma/client -- save ->  Instalar o cliente do prisma(executar scripts no banco)
 *      npm prisma init                    -> Propt comando para iniciar o projeto
 *      npx prisma migrate dev             -> Realiza o sincronismo entre o prisma, mas corre risco de apagar todas as tabelas e dados.
 *      npx prisma generate                -> Apenas realiza o sicronismo entre o prisma e o BD, geralmente usamos para rodar o  projeto de um PC novo
 * 
 * 
 *      Banco de Dados Não relacionais:
 *      mongoose                           -> É uma dependencia para o Mongo DB (Não relacional)
 * 
 * *********************************************************************************************************************/

/* 
   Comandos:
        npm install express         --save
        npm install cors            --save
        npm install  body-parser    --save
        npm install  prisma         --save
        npm install @prisma/client  --save
        npx prisma migrate dev
        npx prisma migrate reset
*/


//Import da dependencia do Prisma que permite a execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()
//Order by : vai dizer a ordem em que os dados vão ser exibidos, ACS e DESC
//Retorna uma lista de todos os filmes
//$queryRawUsafe()    -> vai pegar a variavel e envia para o banco de dados e pedimos devolver o  retorno. Por conta do comando ser o (select)
//$executeRawUnsafe() -> só para executar sem retorno, no caso quando enviamos uma variável alguma coisa para. Alteração(Insert,update e Delete)
//$queryRaw()         -> executa comandos sem uma variável e que retorna valores do banco(select)
//executeRaw()        -> permite executar comandos sem  estar em uma variável e não retorna nenhum dados, no caso injeta dados no banco.


//Injeção de sql, acessar o a aplicação sem permissão atraves de comandos.
const getSelectAllFilms = async () => {

    try {
        //Emcaminha para o BD o script SQL
        let sql = `select * from tbl_filme order by id decs`


        let result = await prisma.$queryRawUnsafe(sql)
        if (result.length > 0)
            return result
        else
            return false


    } catch (error) {
        // console.log(error)
        return false

    }



}

//Retorna um filme pelo seu ID.
const getSelectByFilms = async (id) => {
}

//Insere um filme novo no banco de dados
const setInsertFilms = async (id) => {
}

//Altera um filme no banco de dados
const setUpdateFilms = async (id) => {
}

//Exclui um filme pelo ID no banco de dados
const setDeleteFilms = async (id) => {
}

module.exports = {
    getSelectAllFilms
}