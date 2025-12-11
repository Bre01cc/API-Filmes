/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao relacionamento de profissional e nacionalidade
 * Data: 09/12/2025
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

//Retorna todos os cadastro de profissional e nacionalidade
const getSelectAllProfessionalNationality = async () => {
    try {

        let sql = 'select * from vw_profissional_nacionalidade order by id desc'

        let result = await prisma.$queryRawUnsafe(sql)
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
// Retorna apenas um cadastro de profissional e nacionalidade pelo id
const getSelectByProfessionalNationality = async (id) => {
    try {

        let sql = `select * from vw_profissional_nacionalidade where id = ${id}`

         let result = await prisma.$queryRawUnsafe(sql)
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

// Retorna apenas um cadastro de profissional e nacionalidade pelo id do profissional
const getSelectNationalitiesByProfissional = async (id) => {
    try {

        let sql = `select * from vw_profissional_nacionalidade where id_profissional = ${id}`

         let result = await prisma.$queryRawUnsafe(sql)
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

// Retorna apenas um cadastro de profissional e nacionalidade pelo id da nacionalidade
const getSelectProfessionalByNationalities = async (id) => {

    try {

        //Emcaminha para o BD o script SQL

        let sql = `select * from vw_profissional_nacionalidade where id_nacionalidade = ${id}`

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
// Retorna apenas um cadastro de profissional e nacionalidade pelo id do profissional
const getSelectNationalitiesIdProfissional = async (id) => {
    try {

        let sql = `select * from tbl_profissional_nacionalidade where id_profissional = ${id}`

         let result = await prisma.$queryRawUnsafe(sql)
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

// Retorna apenas um cadastro de profissional e nacionalidade pelo id da nacionalidade
const getSelectProfessionalIdNationalities = async (id) => {

    try {

        //Emcaminha para o BD o script SQL

        let sql = `select * from tbl_profissional_nacionalidade where id_nacionalidade = ${id}`

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

//Retorna o id do ultimo item cadastrado no banco
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

//Cadastra um novo profissional nacionalidade 
const setInsertProfessionalNationality = async (profissionalNacionalidade) => {

    try {
        let sql = `insert into tbl_profissional_nacionalidade
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

//Atualiza profissional e nacionalidade 
const setUpdateProfessionalNationality = async (profissionalNacionalidade) => {

    try {
    
        let sql = `Update tbl_profissional_nacionalidade
            set id_profissional = ${profissionalNacionalidade.id_profissional},
            id_nacionalidade = ${profissionalNacionalidade.id_nacionalidade}
            where id= ${profissionalNacionalidade.id};`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
         console.log(error)
        return false
    }

}
//Deleta profissional nacionalidade pelo id
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

//Deleta profissional nacionalidade pelo id
const setDeleteNationalitiesByProfessional = async (id_profissional) => {
    try {
       
        let sql = `delete from tbl_profissional_nacionalidade where id_profissional = ${id_profissional}`

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

//Deleta profissional nacionalidade pelo id
const setDeleteProfessionalByNationalitie = async (id_nacionalidade) => {
    try {
       
        let sql = `delete from tbl_profissional_nacionalidade where id_nacionalidade = ${id_nacionalidade}`

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
    getSelectAllProfessionalNationality,
    getSelectByProfessionalNationality,
    getSelectNationalitiesByProfissional,
    getSelectProfessionalByNationalities,
    getSelectLastId,
    getSelectNationalitiesIdProfissional,
    getSelectProfessionalIdNationalities,
    setInsertProfessionalNationality,
    setUpdateProfessionalNationality,
    setDeleteNationalitiesByProfessional,
    setDeleteProfessionalByNationalitie,
    setDeleteProfessionalNationality
}

