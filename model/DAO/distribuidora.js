/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente a distribuidora
 * Data: 08/12/2025
 * Autor: Breno Oliveira Assis Reis
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


//Buscar todas as distribuidoras
const getSelectAlldistributor = async () => {

    try {
        let sql = `select * from vw_distribuidora order by id_distribuidora desc`
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

//Busca  uma distribuidora pelo id
const getSelectByDistributor = async (id) => {

    try {

        //Emcaminha para o BD o script SQL
        let sql = `select * from vw_distribuidora where id_distribuidora =${id}`

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

//Busca  uma distribuidora pelo id da nacionaidade
const getSelectByNationality = async (id) => {

    try {

        //Emcaminha para o BD o script SQL
        let sql = `select * from vw_distribuidora where id_nacionalidade =${id}`

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

//Busca  uma distribuidora pelo id do tipo distribuidora
const getSelectByType = async (id) => {

    try {

        //Emcaminha para o BD o script SQL
        let sql = `select * from vw_distribuidora where id_tipo_distribuidora =${id}`

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

//Busca o ID do último id
const getSelectLastId = async () => {
    try {

        let sql = `select id_distribuidora from tbl_distribuidora order by id_distribuidora desc limit 1;`
        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result)) {
            return Number(result[0].id_distribuidora)
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

//Inseri uma nova distribuidora
const setInsertDistributor = async (distribuidora) => {
    try {

        let sql = `
    INSERT INTO tbl_distribuidora (
        nome,
        data_fundacao,
        telefone,
        id_nacionalidade,
        id_tipo_distribuidora,
        email
    ) VALUES (
        '${distribuidora.nome}',
        '${distribuidora.data_fundacao}',
        '${distribuidora.telefone}',
        ${distribuidora.id_nacionalidade},
        ${distribuidora.id_tipo_distribuidora},
        '${distribuidora.email}'
    );`

     
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

//Atualiza uma distribuidora pelo ID
const setUpdateDistributor = async (distribuidora) => {
    try {
        let sql = `
    UPDATE tbl_distribuidora
    SET
        nome = '${distribuidora.nome}',
        data_fundacao = '${distribuidora.data_fundacao}',
        telefone = '${distribuidora.telefone}',
        id_nacionalidade = ${distribuidora.id_nacionalidade},
        id_tipo_distribuidora = ${distribuidora.id_tipo_distribuidora},
        email = '${distribuidora.email}'
    WHERE id_distribuidora = ${distribuidora.id_distribuidora};`

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

//Deleta uma distribuidora pelo ID
const setDeleteDistributor = async (id) => {
    try {
        let sql = `delete from tbl_distribuidora where id_distribuidora = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return true
        } else {
            return false
        }
    }

    catch (error) {
        return false
    }
}

//Deleta uma distribuidora pelo ID do tipo_distribuidora
const setDeleteDistributorByType = async (id) => {
    try {
        let sql = `delete from tbl_distribuidora where id_tipo_distribuidora = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return true
        } else {
            return false
        }
    }

    catch (error) {
        return false
    }
}

//Deleta uma distribuidora pelo ID
const setDeleteDistributorByNationality = async (id) => {
    try {
        let sql = `delete from tbl_distribuidora where id_nacionalidade = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return true
        } else {
            return false
        }
    }

    catch (error) {
        return false
    }
}

module.exports = {
    getSelectAlldistributor,
    getSelectByNationality,
    getSelectByType,
    getSelectByDistributor,
    getSelectLastId,
    setDeleteDistributor,
    setUpdateDistributor,
    setInsertDistributor,
    setDeleteDistributorByType,
    setDeleteDistributorByNationality
}