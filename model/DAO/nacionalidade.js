/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao nacionalidade
 * Data: 03/11/2025
 * Autot: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/




//Import da dependencia do Prisma que permite a execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()
//$queryRawUsafe()    -> vai pegar a variavel e envia para o banco de dados e pedimos devolver o  retorno. Por conta do comando ser o (select)
//$executeRawUnsafe() -> só para executar sem retorno, no caso quando enviamos uma variável alguma coisa para. Alteração(Insert,update e Delete)
//$queryRaw()         -> executa comandos sem uma variável e que retorna valores do banco(select)
//executeRaw()        -> permite executar comandos sem  estar em uma variável e não retorna nenhum dados, no caso injeta dados no banco.

const getSelectAllnacionalidade = async () => {

    try {
        let sql = `select * from tbl_nacionalidade order by id_nacionalidade desc`
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

const getSelectByNacionalidade = async (id) => {

    try {
        let sql = `select * from tbl_nacionalidade where id_nacionalidade =${id}`

        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const setUpdateNacionalidade = async (nacionalidade) => {

    try {

        let sql = `Update tbl_nacionalidade
             set nome ='${nacionalidade.nome}',
             sigla ='${nacionalidade.sigla}',
             data_criacao = '${nacionalidade.data_criacao}'
             where id_nacionalidade = ${nacionalidade.id};`


        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const setNacionalidade = async (nacionalidade) => {

    try {


        let sql = `insert into tbl_nacionalidade(nome,sigla,data_criacao)
            values(
             '${nacionalidade.nome}',
             '${nacionalidade.sigla}',
             '${nacionalidade.data_criacao}'
            ); `

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const getSelectLastIdNacionalidade = async () => {
    try {
        let sql = `select id_nacionalidade from tbl_nacionalidade order by id_nacionalidade desc limit 1;`
        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result)) {
            return Number(result[0].id_nacionalidade)
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}
const setDeleteNacionalidade = async (id) => {

    try {
        let sql = `delete from tbl_nacionalidade where id_nacionalidade = ${id}`

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
    getSelectAllnacionalidade,
    getSelectByNacionalidade,
    setDeleteNacionalidade,
    setNacionalidade,
    setUpdateNacionalidade,
    getSelectLastIdNacionalidade
}