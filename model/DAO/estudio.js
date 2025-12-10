/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao estudio
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


//Buscar todos os estudios
const getSelectAllstudio = async () => {

    try {
        let sql = `select * from vw_estudio order by id_estudio desc`

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

//Busca  um estudio pelo id
const getSelectBystudio = async (id) => {

    try {

        //Emcaminha para o BD o script SQL
        let sql = `select * from vw_estudio where id_estudio =${id}`

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

//Busca  um estudio pelo id
const getSelectByNationality = async (id) => {

    try {

        //Emcaminha para o BD o script SQL
        let sql = `select * from vw_estudio where id_nacionalidade =${id}`

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

        let sql = `select id_estudio from tbl_estudio order by id_estudio desc limit 1;`
        let result = await prisma.$queryRawUnsafe(sql)
        
        if (Array.isArray(result)) {
            return Number(result[0].id_estudio)
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

//Inseri um novo estudio
const setInsertStudios = async (estudio) => {
    try {

        let sql = ''
        if ('produtora' in estudio && !('dublagem' in estudio)) {
            sql = `INSERT INTO tbl_estudio (
    nome,
    nome_fantasia,
    produtora,
    ano_fundacao,
    email,
    telefone,
    id_nacionalidade
) VALUES (
    '${estudio.nome}',
    '${estudio.nome_fantasia}',
    ${estudio.produtora},
    '${estudio.ano_fundacao}',
    '${estudio.email}',
    '${estudio.telefone}',
    ${estudio.id_nacionalidade}
);`
        }
        if ('dublagem' in estudio && !('produtora' in estudio)) {
            sql = `INSERT INTO tbl_estudio (
    nome,
    nome_fantasia,
    dublagem,
    ano_fundacao,
    email,
    telefone,
    id_nacionalidade
) VALUES (
    '${estudio.nome}',
    '${estudio.nome_fantasia}',
    ${estudio.dublagem},
    '${estudio.ano_fundacao}',
    '${estudio.email}',
    '${estudio.telefone}',
    ${estudio.id_nacionalidade}
);`
        } else {
            sql = `INSERT INTO tbl_estudio (
    nome,
    nome_fantasia,
    dublagem,
    produtora,
    ano_fundacao,
    email,
    telefone,
    id_nacionalidade
) VALUES (
    '${estudio.nome}',
    '${estudio.nome_fantasia}',
    ${estudio.dublagem},
    ${estudio.produtora},
    '${estudio.ano_fundacao}',
    '${estudio.email}',
    '${estudio.telefone}',
    ${estudio.id_nacionalidade}
);`
        }

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

//Atualiza o estudio pelo ID
const setUpdateStudio = async (estudio) => {
    try {
        let sql = `
    UPDATE tbl_estudio
    SET
        nome = '${estudio.nome}',
        nome_fantasia = '${estudio.nome_fantasia}',
        dublagem = ${estudio.dublagem},
        produtora = ${estudio.produtora},
        ano_fundacao = '${estudio.ano_fundacao}',
        email = '${estudio.email}',
        telefone = '${estudio.telefone}',
        id_nacionalidade = ${estudio.id_nacionalidade}
    WHERE id_estudio = ${estudio.id_estudio};`


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

//Deleta um estudio pelo ID
const setDeleteStudio = async (id) => {
    try {
        let sql = `delete from tbl_estudio where id_estudio = ${id}`

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

const setDeleteStudioByNationality = async (id) => {
    try {
        let sql = `delete from tbl_estudio where id_nacionalidade = ${id}`

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
    getSelectAllstudio,
    getSelectBystudio,
    getSelectByNationality,
    getSelectLastId,
    setInsertStudios,
    setUpdateStudio,
    setDeleteStudio,
    setDeleteStudioByNationality
}