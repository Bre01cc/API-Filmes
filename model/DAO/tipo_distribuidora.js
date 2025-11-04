/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao tipo de distribuidora
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

const getSelectAlltipoDistribuidora = async () => {

    try {
        let sql = `select * from tbl_tipo_distribuidora order by id_tipo_distribuidora desc`
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

const getSelectBytipoDistribuidora = async (id) => {

    try {
        let sql = `select * from tbl_tipo_distribuidora where id_tipo_distribuidora =${id}`

        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const setDeletetipoDistribuidora = async (id) => {
    
    try {
      let sql = `delete from tbl_tipo_distribuidora where id_tipo_distribuidora = ${id}`

      let result = await prisma.$queryRawUnsafe(sql)
      if(result)
        return true
    else 
        return false

    } catch (error) {
        return false
    }
}

const getSelectLastIdtipoDistribuidora = async () => {
    try {
        let sql = `select id_tipo_distribuidora from tbl_tipo_distribuidora order by id_tipo_distribuidora desc limit 1;`
        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result)) {
            return Number(result[0].id_tipo_distribuidora)
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

const setUpdatetipoDistribuidora = async (tipoDistribuidora) => {

    try {

        let sql = `Update tbl_tipo_distribuidora
             set nome ='${tipoDistribuidora.nome}',
             descricao ='${tipoDistribuidora.descricao}'
             where id_tipo_distribuidora = ${tipoDistribuidora.id};`


        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const setTipoDistribuidora = async (tipoDistribuidora) => {

    try {


        let sql = `insert into tbl_tipo_distribuidora(nome,descricao)
            values(
             '${tipoDistribuidora.nome}',
             '${tipoDistribuidora.descricao}'
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

module.exports = {
   getSelectAlltipoDistribuidora,
   getSelectBytipoDistribuidora,
   setDeletetipoDistribuidora,
   setTipoDistribuidora,
   setUpdatetipoDistribuidora,
   getSelectLastIdtipoDistribuidora
}