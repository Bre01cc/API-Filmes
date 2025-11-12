
/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao relacionamento de filme e genero
 * Data: 05/11/2025
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


//Buscar todos filmes e generos da tabela relcionamento
const getSelectAllMoviesGenres = async () => {

    try {
        let sql = `select * from tbl_filme_genero order by id desc`
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

//Busca  um gênero pelo id
const getSelectByGenre = async (id) => {

    try {

        //Emcaminha para o BD o script SQL
        let sql = `select * from tbl_filme_genero where id =${id}`

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

const getSelectByMovieId = async (id) => {

    try {

        //Emcaminha para o BD o script SQL
        let sql = `select * from tbl_filme_genero where id_filme =${id}`

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
//Busca filtrando o id do filme
const getSelectGenresByidMovies = async (id) => {

    try {

        //Emcaminha para o BD o script SQL
        let sql = `select tbl_genero.id_genero,tbl_genero.nome  from tbl_filme  join tbl_filme_genero
        on tbl_filme.id_filme = tbl_filme_genero.id_filme join tbl_genero on tbl_genero.id_genero = tbl_filme_genero.id_genero where tbl_filme.id_filme =${id}`

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

//Busca filtrando o id do genero
const getSelectMoviesByIdGenres = async (id) => {

    try {

        //Emcaminha para o BD o script SQL

        let sql = `select tbl_filme.id_filme,tbl_filme.nome  
        from tbl_filme  join tbl_filme_genero
        on tbl_filme.id_filme = tbl_filme_genero.id_filme join 
        tbl_genero on tbl_genero.id_genero = tbl_filme_genero.id_genero where tbl_genero.id_genero =${id}`

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

        let sql = `select id from tbl_filme_genero order by id desc limit 1;`
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

//Inseri um novo gênero 
const setInsertMoviesGenres = async (filmeGenero) => {
    try {

        let sql = `INSERT into tbl_filme_genero(id_filme,id_genero) 
VALUES(
    ${filmeGenero.id_filme},
    '${filmeGenero.id_genero}');`

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
const setUpdateMoviesGenres = async (filmeGenero) => {
    try {
        let sql = `Update tbl_filme_genero
        set id_filme = '${filmeGenero.id_filme}',
        id_genero = '${filmeGenero.id_genero}',
        where id = ${filmeGenero.id}`

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
const setDeleteMoviesGenres = async (id) => {
    try {
        let sql = `delete from tbl_filme_genero where id = ${id}`

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

const setDeleteGenderesByidMovie = async (id_filme) => {
    try {
        console.log(id_filme)
        let sql = `delete from tbl_filme_genero where id_filme = ${id_filme}`

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
    getSelectAllMoviesGenres,
    getSelectByGenre,
    getSelectGenresByidMovies,
    getSelectMoviesByIdGenres,
    getSelectLastId,
    setDeleteMoviesGenres,
    setUpdateMoviesGenres,
    setInsertMoviesGenres,
    setDeleteGenderesByidMovie,
    getSelectByMovieId

}
