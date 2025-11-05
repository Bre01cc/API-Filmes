/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao idioma
 * Data: 22/10/2025
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

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


//Busca todos os idiomas armazenados no banco
const getSelectAllIdioma = async () => {

    try {
        let sql = `select * from tbl_idioma order by id_idioma desc`
        let result = await prisma.$queryRawUnsafe(sql)
        //Verificando se o result tem algo dentro dele
        if (Array.isArray(result))
            return result
        else
            return false


    } catch (error) {
        return false

    }
}

//Busca o idioma pelo id no banco de dados
const getSelectByIdioma = async (id) => {
    try {
        let sql = `select * from tbl_idioma where id_idioma =${id}`
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Inseri um idioma 
const setIdioma = async (idioma) => {

    try {
        let sql = ''
        if (!('descricao' in idioma) && !('antes_de_cristo' in idioma)) {
            sql = `insert into tbl_idioma(sigla,data_criacao,familia_linguistica)
            values(
            
             '${idioma.sigla}',
             '${idioma.data_criacao}',
             '${idioma.familia_linguistica}'
            ); `
        }
        else if (!('descricao' in idioma)) {
            sql = `insert into tbl_idioma(sigla,data_criacao,familia_linguistica,antes_de_cristo)
            values(
            
             '${idioma.sigla}',
             '${idioma.data_criacao}',
             '${idioma.familia_linguistica}',
             '${idioma.antes_de_cristo}'
            );
            `}
        else if (!('antes_de_cristo' in idioma)) {
            sql = `insert into tbl_idioma(sigla,data_criacao,familia_linguistica,descricao)
            values(
            
             '${idioma.sigla}',
             '${idioma.data_criacao}',
             '${idioma.familia_linguistica}',
             '${idioma.descricao}'
            );
            `
        }
        else {
            sql = `insert into tbl_idioma(sigla,data_criacao,familia_linguistica,descricao,antes_de_cristo)
            values(
            
             '${idioma.sigla}',
             '${idioma.data_criacao}',
             '${idioma.familia_linguistica}',
             '${idioma.descricao}',
             '${idioma.antes_de_cristo}'
            ); `
        }

        let resultIdioma = await prisma.$queryRawUnsafe(sql)

        if (resultIdioma)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//Atualiza um idioma 
const setUpdateIdioma = async(idioma)=>{

    try {
         let sql = `Update tbl_idioma
        set sigla = '${idioma.sigla}',
        descricao = '${idioma.descricao}',
        data_criacao = '${idioma.data_criacao}',
        familia_linguistica = '${idioma.familia_linguistica}',
        antes_de_cristo = '${idioma.antes_de_cristo}'
        where id_idioma = ${idioma.id}`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return true
        } else {
            return false
        }
        
    } catch (error) {
        return false
    }
}


//Deleta o idioma pelo id
const setDeleteIdioma = async (id) => {
    try {
        let sql = `delete from tbl_idioma where id_idioma =${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//Busca o ultimo id 
const getSelectLastIdIdioma = async () => {
    try {
        let sql = `select id_idioma from tbl_idioma order by id_idioma desc limit 1;`
        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result)) {
            return Number(result[0].id_idioma)
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

//Exportes das funções
module.exports = {
    getSelectAllIdioma,
    setDeleteIdioma,
    getSelectByIdioma,
    setIdioma,
    getSelectLastIdIdioma,
    setUpdateIdioma

}