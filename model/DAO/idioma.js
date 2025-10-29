/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao idioma
 * Data: 22/10/2025
 * Autot: Breno Oliveira Assis Reis
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
        // console.log(error)
        return false

    }
}

//Busca o idioma pelo id
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

const setIdioma = async (idioma) => {

    try {
        let sql = ''
        console.log(idioma.data_criacao)
        if (idioma.data_criacao === undefined) {
           
            sql = `insert into tbl_idioma(nome,sigla,familia_linguistica,descricao)
            values(
             '${idioma.nome}',
             '${idioma.sigla}',
             '${idioma.familia_linguistica}',
             '${idioma.descricao}'
            ); `
        }
      
        let resultIdioma = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(resultIdioma))
            return resultIdioma
        else
            return false

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



module.exports = {
    getSelectAllIdioma,
    setDeleteIdioma,
    getSelectByIdioma,
    setIdioma
}