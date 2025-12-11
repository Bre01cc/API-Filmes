/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao profissional
 * Data: 03/11/2025
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

const getSelectAllprofissional = async () => {

    try {
        let sql = `select * from tbl_profissional order by id_profissional desc`
        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result))
            return result
        else
            return false


    } catch (error) {
        return false

    }
}

const getSelectByprofissional = async (id) => {

    try {
        let sql = `select * from tbl_profissional where id_profissional =${id}`

        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const setDeleteprofissional = async (id) => {

    try {
        let sql = `delete from tbl_profissional where id_profissional = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const getSelectLastIdProfissional = async () => {
    try {
        let sql = `select id_profissional from tbl_profissional order by id_profissional desc limit 1;`
        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result)) {
            return Number(result[0].id_profissional)
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

const setUpdateProfissional = async (profissional) => {

    try {

        let sql = `Update tbl_profissional
             set nome ='${profissional.nome}',
             data_nascimento ='${profissional.data_nascimento}',
             nome_artistico ='${profissional.nome_artistico}',
             foto = '${profissional.foto}',
             data_falecimento =${profissional.data_falecimento ? `'${profissional.data_falecimento}'` : 'NULL'},
             rede_social = ${profissional.rede_social ? `'${profissional.rede_social}'` : 'Null'},
             biografia ='${profissional.biografia}',
             sexo ='${profissional.sexo}'
             where id_profissional = ${profissional.id};`

        let result = await prisma.$executeRawUnsafe(sql)


        if (result)
            return true
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }
}

const setProfissional = async (profissional) => {

    try {

        let sql = ''

        if ('data_falecimento' in profissional && 'rede_social' in profissional) {
            sql = `insert into tbl_profissional(nome,data_nascimento,nome_artistico,foto,data_falecimento,rede_social,biografia,sexo)
            values(
             '${profissional.nome}',
             '${profissional.data_nascimento}',
             '${profissional.nome_artistico}',
             '${profissional.foto}',
             '${profissional.data_falecimento}',
             '${profissional.rede_social}',
             '${profissional.biografia}',
             '${profissional.sexo}'
            ); `
        }
        if ('data_falecimento' in profissional && !('rede_social' in profissional)) {
            sql = `insert into tbl_profissional(nome,data_nascimento,nome_artistico,foto,data_falecimento,biografia,sexo)
            values(
             '${profissional.nome}',
             '${profissional.data_nascimento}',
             '${profissional.nome_artistico}',
             '${profissional.foto}',
             '${profissional.data_falecimento}',
             '${profissional.biografia}',
             '${profissional.sexo}'

            ); `
        }
        if ('rede_social' in profissional && !('data_falecimento' in profissional)) {
            sql = `insert into tbl_profissional(nome,data_nascimento,nome_artistico,foto,biografia,sexo,rede_social)
            values(
             '${profissional.nome}',
             '${profissional.data_nascimento}',
             '${profissional.nome_artistico}',
             '${profissional.foto}',
             '${profissional.biografia}',
             '${profissional.sexo}',
             '${profissional.rede_social}'
            ); `
        }
        else {
            sql = `insert into tbl_profissional(nome,data_nascimento,nome_artistico,foto,biografia,sexo)
            values(
             '${profissional.nome}',
             '${profissional.data_nascimento}',
             '${profissional.nome_artistico}',
             '${profissional.foto}',
             '${profissional.biografia}',
             '${profissional.sexo}'

            ); `
        }
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }
}




module.exports = {
    getSelectAllprofissional,
    getSelectByprofissional,
    setDeleteprofissional,
    setProfissional,
    setUpdateProfissional,
    getSelectLastIdProfissional

}