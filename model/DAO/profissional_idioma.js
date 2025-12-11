
/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao relacionamento de profissional e idioma
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

//Retorna todos os cadastro de profissional e idioma
const getSelectAllProfissionalIdioma = async () => {
    try {

        let sql = 'select * from vw_profissional_idioma order by id desc'

        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result)) {
            return result
        }
        else {
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}
// Retorna apenas um cadastro de profissional e idioma pelo id
const getSelectByProfissionalIdioma = async (id) => {
    try {

        let sql = `select * from tbl_profissional_idioma where id = ${id}`

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

// Retorna apenas um cadastro de profissional e idioma pelo id do profissional
const getSelectIdiomaByProfessional = async (id) => {
    try {

        let sql = `select * from vw_profissional_idioma where id_profissional = ${id}`

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



// Retorna apenas um cadastro de profissional e idioma pelo id do idioma
const getSelectProfissionalIdiomaByIdiomas = async (id) => {

    try {

        //Emcaminha para o BD o script SQL

        let sql = `select * from tbl_profissional_idioma where id_idioma = ${id}`

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

// Retorna apenas um cadastro de profissional e idioma pelo id do profissional
const getSelectProfissionalIdiomaByProfissional = async (id) => {
    try {

        let sql = `select * from tbl_profissional_idioma where id_profissional = ${id}`

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



// Retorna apenas um cadastro de profissional e idioma pelo id do idioma
const getSelectProfissionalByIdiomas = async (id) => {

    try {

        //Emcaminha para o BD o script SQL

        let sql = `select * from vw_profissional_idioma where id_idioma = ${id}`

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

        let sql = `select id from tbl_profissional_idioma order by id desc limit 1;`
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

//Inseri um novo profissional e idioma
const setInsertProfissionalIdioma = async (profissionalIdioma) => {

    try {


        let sql = `
    Insert into tbl_profissional_idioma (
        id_profissional,
        id_idioma
    ) VALUES (
        ${profissionalIdioma.id_profissional},
        ${profissionalIdioma.id_idioma}
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

//Deleta um profissional e idioma pelo id
const setUpdateProfissionalIdioma = async (profissionalIdioma) => {

    try {


        let sql = `
    Update tbl_profissional_idioma 
        set id_profissional = ${profissionalIdioma.id_profissional},
        id_idioma = ${profissionalIdioma.id_idioma} 
        where id = ${profissionalIdioma.id}`

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

//Deleta um profissional e idioma pelo id
const setDeleteProfissionalIdioma = async (id) => {
    try {
        let sql = `delete from tbl_profissional_idioma where id = ${id}`

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

//Deleta um profissional e idioma pelo id do profissional
const setDeleteIdiomaByProfissional = async (id_profissional) => {
    try {

        let sql = `delete from tbl_profissional_idioma where id_profissional = ${id_profissional}`

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

//Deleta um profissional e idioma pelo id do idioma
const setDeleteProfissionalByIdioma = async (id_idioma) => {
    try {

        let sql = `delete from tbl_profissional_idioma where id_idioma = ${id_idioma}`

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

module.exports = {
    getSelectAllProfissionalIdioma,
    getSelectByProfissionalIdioma,
    getSelectIdiomaByProfessional,
    getSelectProfissionalIdiomaByIdiomas,
    getSelectProfissionalIdiomaByProfissional,
    getSelectProfissionalByIdiomas,
    getSelectLastId,
    setInsertProfissionalIdioma,
    setUpdateProfissionalIdioma,
    setDeleteProfissionalIdioma,
    setDeleteIdiomaByProfissional,
    setDeleteProfissionalByIdioma
}

