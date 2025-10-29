/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao genero
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


//Busca todos os gêneros no banco
const getSelectAllGenero = async () => {

    try {
        let sql = `select * from tbl_genero order by id_genero desc`
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

//Busca  um gênero pelo id
const getSelectByGenero = async (id) => {

    try {

        //Emcaminha para o BD o script SQL
        let sql = `select * from tbl_genero where id_genero=${id}`

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

//Busca o ID do último gênero
const getSelectLastId = async () => {
    try {
        let sql = `select id_genero from tbl_genero order by id_genero desc limit 1;`
        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result)) {
            return Number(result[0].id_genero)
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

//Inseri um novo gênero 
const setInsertGeneros = async (genero) => {
    try {

        let sql = `INSERT into tbl_genero(nome,descricao,data_criacao) 
VALUES(
    '${genero.nome}',
    '${genero.descricao}',
    '${genero.data_criacao}');`

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

//Atualiza o gênero pelo ID
const setUpdateGenero = async (genero) =>{
     try {
        let sql = `Update tbl_genero
        set nome = '${genero.nome}',
        descricao = '${genero.descricao}',
        data_criacao = '${genero.data_criacao}'
        where id_genero = ${genero.id}`

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

//Deleta um gênero pelo ID
const setDeleteGenero = async (id) => {
    try {
        let sql = `delete from tbl_genero where id_genero = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return true
        } else {
            return false
        }
    }

    catch (error) {
        console.log(error)
        return false
    }
}

//Exporte das funções
module.exports = {
    getSelectAllGenero,
    getSelectByGenero,
    setInsertGeneros,
    getSelectLastId,
    setUpdateGenero,
    setDeleteGenero
}



