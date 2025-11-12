/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao relacionamento de profissional e nacionalidade
 * Data: 12/11/2025
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

const getSelectAllProfessionalNationality = async () => {
    try {

        let sql = 'select * from tbl_profissional_nacionalidade'

        let result = await prisma.$executeRawUnsafe(sql)
        if (Array.isArray(result)) {
            return result
        }
        else {
            return false
        }
    } catch (error) {
        return false
    }
}

const getSelectByProfessionalNationality = async (id) => {
    try {

        let sql = `select * from tbl_profissional_nacionalidade where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)
        if (Array.isArray(result)) {
            return result
        }
        else {
            return false
        }
    } catch (error) {
        return false
    }
}

const getSelectByProfessional = async (id) => {
    try {

        let sql = `select * from tbl_profissional_nacionalidade where id_profissional = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)
        if (Array.isArray(result)) {
            return result
        }
        else {
            return false
        }
    } catch (error) {
        return false
    }
}

const getSelectNationalitiesByProfessional = async (id) => {

    try {

        //Emcaminha para o BD o script SQL

        let sql = `select tbl_nacionalidade.id_nacionalidade,tbl_nacionalidade.nome  
        from tbl_nacionalidade  join tbl_profissional_nacionalidade
        on tbl_nacionalidade.id_nacionalidade = tbl_profissional_nacionalidade.id_nacionalidade join 
        tbl_profissional on tbl_profissional.id_profissional = tbl_profissional_nacionalidade.id_profissional where tbl_profissional.id_profissional =${id}`

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


const getSelectProfessionalsByNationalities = async (id) => {

    try {

        //Emcaminha para o BD o script SQL

        let sql = `select tbl_profissional.id_profissional,tbl_profissional.nome  
        from tbl_nacionalidade  join tbl_profissional_nacionalidade
        on tbl_nacionalidade.id_nacionalidade = tbl_profissional_nacionalidade.id_nacionalidade join 
        tbl_profissional on tbl_profissional.id_profissional = tbl_profissional_nacionalidade.id_profissional where tbl_nacionalidade.id_nacionalidade =${id}`

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

const getSelectLastId = async () => {
    try {

        let sql = `select id from tbl_profissional_nacionalidade order by id desc limit 1;`
        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result)) {
            return Number(result[0].id)
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

const setInsertProfessionalNationality = async (profissionalNacionalidade) => {

    try {
        let sql = `insert into profissional_nacionalidade
     (id_profissional,id_nacionalidade)
    values(
    ${profissionalNacionalidade.id_profissional},
    ${profissionalNacionalidade.id_nacionalidade});`

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

const setDeleteProfessionalNationality = async (id) => {
    try {
        let sql = `delete from tbl_profissional_nacionalidade where id = ${id}`

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

const setDeleteNationalitiesByProfessional = async (id_filme) => {
    try {
        console.log(id_filme)
        let sql = `delete from tbl_profissional_nacionalidade where id_profissional = ${id_filme}`

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

module.exports ={
    
}