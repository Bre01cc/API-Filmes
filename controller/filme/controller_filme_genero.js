/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL para o crud na relação entre filme e generos
 * Data: 05/11/2025
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

//Imports
const filmeGeneroDAO = require('../../model/DAO/filme_genero.js')
const DEFAULT_MENSSAGES = require('../modulo/config_menssages.js')

//Retorna todos os gêneros
const listarFilmesGenero = async () => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))

    let resultFilmesGeneros = await filmeGeneroDAO.getSelectAllMoviesGenres()
    try {
        if (resultFilmesGeneros) {
            if (resultFilmesGeneros.length > 0) {
                MENSSAGES.DEFAULT_HEADER.status = MENSSAGES.SUCCESS_REQUEST.status
                MENSSAGES.DEFAULT_HEADER.status_code = MENSSAGES.SUCCESS_REQUEST.status_code
                MENSSAGES.DEFAULT_HEADER.items.filmes_generos = resultFilmesGeneros

                return MENSSAGES.DEFAULT_HEADER//201
            } else {
                return MENSSAGES.ERROR_NOT_FOUND//404
            }
        } else {
            return MENSSAGES.ERROR_INTERNAL_SERVER_MODEL//500
        }

    } catch (error) {
        return MENSSAGES.ERROR_INTERNAL_SERVER_CONTRLOLLER//500

    }
}


//Retorna o gênero pelo Id
const buscarFilmeGeneroId = async (id) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))

    try {
        //Validação da chegada do ID
        if (!isNaN(id) && id != null && id > 0) {
            //cria uma variável local para executar a função getSelectByFilms, passando para ela o ID
            let resultFilmesGeneros = await filmeGeneroDAO.getSelectByGenre(Number(id))

            //Se getSelectByFilms tiver sido executado corretamente  ele vai passar nessa primeira verificação, já caso algo estiver errado o valor de resultFilmes será false
            if (resultFilmesGeneros) {
                //Verificando se resulfilmes não está vazio
                if (resultFilmesGeneros.length > 0) {
                    MENSSAGES.DEFAULT_HEADER.status = MENSSAGES.SUCCESS_REQUEST.status
                    MENSSAGES.DEFAULT_HEADER.status_code = MENSSAGES.SUCCESS_REQUEST.status_code
                    MENSSAGES.DEFAULT_HEADER.items.filmes_generos = resultFilmesGeneros

                    return MENSSAGES.DEFAULT_HEADER//200
                } else {
                    return MENSSAGES.ERROR_NOT_FOUND//404
                }
            } else {
                return MENSSAGES.ERROR_INTERNAL_SERVER_MODEL//500
            }

        } else {

            MENSSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MENSSAGES.ERROR_REQUIRED_FIELDS//400

        }

    } catch (error) {
        return MENSSAGES.ERROR_REQUIRED_FIELDS//400
    }
}

//Retorna o gênero pelo Id
const buscarFilmeId = async (id) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))

    try {
        //Validação da chegada do ID
        if (!isNaN(id) && id != null && id > 0) {
            //cria uma variável local para executar a função getSelectByFilms, passando para ela o ID
            let resultFilmesGeneros = await filmeGeneroDAO.getSelectByMovieId(Number(id))

            //Se getSelectByFilms tiver sido executado corretamente  ele vai passar nessa primeira verificação, já caso algo estiver errado o valor de resultFilmes será false
            if (resultFilmesGeneros) {
                //Verificando se resulfilmes não está vazio
                if (resultFilmesGeneros.length > 0) {
                    MENSSAGES.DEFAULT_HEADER.status = MENSSAGES.SUCCESS_REQUEST.status
                    MENSSAGES.DEFAULT_HEADER.status_code = MENSSAGES.SUCCESS_REQUEST.status_code
                    MENSSAGES.DEFAULT_HEADER.items.filmes = resultFilmesGeneros

                    return MENSSAGES.DEFAULT_HEADER//200
                } else {
                    return MENSSAGES.ERROR_NOT_FOUND//404
                }
            } else {
                return MENSSAGES.ERROR_INTERNAL_SERVER_MODEL//500
            }

        } else {

            MENSSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MENSSAGES.ERROR_REQUIRED_FIELDS//400

        }

    } catch (error) {
        return MENSSAGES.ERROR_REQUIRED_FIELDS//400
    }
}
const listarGenerosIdFilme = async (idFilme) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))

    try {
        //Validação da chegada do ID
        if (!isNaN(idFilme) && idFilme != null && idFilme > 0) {
            //cria uma variável local para executar a função getSelectByFilms, passando para ela o ID
            let resultFilmesGeneros = await filmeGeneroDAO.getSelectGenresByidMovies(Number(idFilme))

            //Se getSelectByFilms tiver sido executado corretamente  ele vai passar nessa primeira verificação, já caso algo estiver errado o valor de resultFilmes será false
            if (resultFilmesGeneros) {
                //Verificando se resulfilmes não está vazio
                if (resultFilmesGeneros.length > 0) {
                    MENSSAGES.DEFAULT_HEADER.status = MENSSAGES.SUCCESS_REQUEST.status
                    MENSSAGES.DEFAULT_HEADER.status_code = MENSSAGES.SUCCESS_REQUEST.status_code
                    MENSSAGES.DEFAULT_HEADER.items.filmes_generos = resultFilmesGeneros

                    return MENSSAGES.DEFAULT_HEADER//200
                } else {
                    return MENSSAGES.ERROR_NOT_FOUND//404
                }
            } else {
                return MENSSAGES.ERROR_INTERNAL_SERVER_MODEL//500
            }

        } else {

            MENSSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MENSSAGES.ERROR_REQUIRED_FIELDS//400

        }

    } catch (error) {
        return MENSSAGES.ERROR_REQUIRED_FIELDS//400
    }
}

const listarFilmesIdGenero = async (idGenero) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))

    try {
        //Validação da chegada do ID
        if (!isNaN(idGenero) && idGenero != null && idGenero > 0) {
            //cria uma variável local para executar a função getSelectByFilms, passando para ela o ID
            let resultFilmesGeneros = await filmeGeneroDAO.getSelectMoviesByIdGenres(Number(idGenero))

            //Se getSelectByFilms tiver sido executado corretamente  ele vai passar nessa primeira verificação, já caso algo estiver errado o valor de resultFilmes será false
            if (resultFilmesGeneros) {
                //Verificando se resulfilmes não está vazio
                if (resultFilmesGeneros.length > 0) {
                    MENSSAGES.DEFAULT_HEADER.status = MENSSAGES.SUCCESS_REQUEST.status
                    MENSSAGES.DEFAULT_HEADER.status_code = MENSSAGES.SUCCESS_REQUEST.status_code
                    MENSSAGES.DEFAULT_HEADER.items.filmes_generos = resultFilmesGeneros

                    return MENSSAGES.DEFAULT_HEADER//200
                } else {
                    return MENSSAGES.ERROR_NOT_FOUND//404
                }
            } else {
                return MENSSAGES.ERROR_INTERNAL_SERVER_MODEL//500
            }

        } else {

            MENSSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MENSSAGES.ERROR_REQUIRED_FIELDS//400

        }

    } catch (error) {
        return MENSSAGES.ERROR_REQUIRED_FIELDS//400
    }
}

//Insere um gênero 
const inserirFilmeGenero = async (filmeGenero, contentType) => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarfilmesGenero(filmeGenero);

            if (!validar) {

                let resultFilmesGeneros = await filmeGeneroDAO.setInsertMoviesGenres(filmeGenero)

                if (resultFilmesGeneros) {

                    let ultimoId = await filmeGeneroDAO.getSelectLastId()
                    if (ultimoId) {
                        filmeGenero.id = ultimoId
                        MENSSAGENS.DEFAULT_HEADER.status = MENSSAGENS.SUCCESS_CREATED_ITEM.status
                        MENSSAGENS.DEFAULT_HEADER.status_code = MENSSAGENS.SUCCESS_CREATED_ITEM.status_code
                        MENSSAGENS.DEFAULT_HEADER.message = MENSSAGENS.SUCCESS_CREATED_ITEM.message
                        MENSSAGENS.DEFAULT_HEADER.items = filmeGenero

                        return MENSSAGENS.DEFAULT_HEADER//200

                    } else {
                        return MENSSAGENS.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return MENSSAGENS.ERROR_INTERNAL_SERVER_MODEL
                }
            } else {
                return validar//500
            }

        } else {
            return MENSSAGENS.ERROR_CONTENT_TYPE//415
        }
    } catch (error) {
        return MENSSAGENS.ERROR_INTERNAL_SERVER_CONTRLOLLER
    }

}

//Atualizar os dados de um gênero
const atualizarFilmeGenero = async (filmeGenero, id, contentType) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))

    try {
        //Validação das entradas de dados
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Validação de id, se existe no BD

            //Chama a função de validar todos os dados
            let validar = await validarfilmesGenero(filmeGenero)

            if (!validar) {
                // Validação de id, chamndo a função que verifica no BD
                let validarId = await buscarFilmeGeneroId(id)
                if (validarId.status_code == 200) {
                    // adiciona o ID no JSON de dados para ser encaminhado
                    filmeGenero.id = Number(id)

                    //Chama a função para inserir um novo item no BD
                    let resultFilmesGeneros = await filmeGeneroDAO.setUpdateMoviesGenres(filmeGenero)
                    if (resultFilmesGeneros) {

                        MENSSAGES.DEFAULT_HEADER.status = MENSSAGES.SUCCESS_UPDATE_ITEM.status
                        MENSSAGES.DEFAULT_HEADER.status_code = MENSSAGES.SUCCESS_UPDATE_ITEM.status_code
                        MENSSAGES.DEFAULT_HEADER.message = MENSSAGES.SUCCESS_UPDATE_ITEM.message
                        MENSSAGES.DEFAULT_HEADER.items.filmes_generos = filmeGenero


                        return MENSSAGES.DEFAULT_HEADER//200

                    } else {

                        return MENSSAGES.ERROR_INTERNAL_SERVER_MODEL//500
                    }
                } else {
                    return validarId//a função podera retornar (400 ou 404 ou 500)
                }
            }
            else {
                return validar //400 referentes a validação dos dados
            }
        }
        else {
            return MENSSAGES.ERROR_CONTENT_TYPE//415
        }
    } catch (error) {
        return MENSSAGES.ERROR_INTERNAL_SERVER_CONTRLOLLER
    }
}


//Valida os dados de um gênero
const validarfilmesGenero = async (filmeGenero) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))

    //Validação do nome
    if (filmeGenero.id_filme <= 0 || isNaN(filmeGenero.id_filme) || filmeGenero.id_filme == undefined || filmeGenero.id_filme == null || filmeGenero.id_filme == '') {
        MENSSAGES.ERROR_REQUIRED_FIELDS.message += '[Id filme incorreto]'
        return MENSSAGES.ERROR_REQUIRED_FIELDS
    }
    else if (filmeGenero.id_genero <= 0 || isNaN(filmeGenero.id_genero) || filmeGenero.id_genero == undefined || filmeGenero.id_genero == null || filmeGenero.id_genero == '') {
        MENSSAGES.ERROR_REQUIRED_FIELDS.message += '[Id gênero incorreto]'
        return MENSSAGES.ERROR_REQUIRED_FIELDS
    }

    else {
        return false
    }
}

//Deleta um gênero pelo ID
const excluirFilmeGenero = async (id) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))
    //Chama a funçã do DAO para retornar a lista de filmes do BD
    try {

        let validarId = await buscarFilmeGeneroId(id)
        if (validarId.status_code == 200) {

            let deletarFilmeGeneros = await filmeGeneroDAO.setDeleteMoviesGenres(id);
            if (deletarFilmeGeneros) {
                MENSSAGES.DEFAULT_HEADER.status = MENSSAGES.SUCCESS_DELETE.status
                MENSSAGES.DEFAULT_HEADER.status_code = MENSSAGES.SUCCESS_DELETE.status_code
                MENSSAGES.DEFAULT_HEADER.message = MENSSAGES.SUCCESS_DELETE.message
                delete MENSSAGES.DEFAULT_HEADER.items
                return MENSSAGES.DEFAULT_HEADER
            } else {
                MENSSAGES.ERROR_INTERNAL_SERVER_MODEL
            }


        } else {
            return validarId
        }

    } catch (error) {
        return MENSSAGES.ERROR_INTERNAL_SERVER_CONTRLOLLER
    }




}

//Excluir generos
const excluirGenerosIdFilme = async (id) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))
    //Chama a funçã do DAO para retornar a lista de filmes do BD
    try {

        let validarId = await buscarFilmeId(id)
        if (validarId.status_code == 200) {

            let deletarFilmeGeneros = await filmeGeneroDAO.setDeleteGenderesByidMovie(id);
            if (deletarFilmeGeneros) {
                MENSSAGES.DEFAULT_HEADER.status = MENSSAGES.SUCCESS_DELETE.status
                MENSSAGES.DEFAULT_HEADER.status_code = MENSSAGES.SUCCESS_DELETE.status_code
                MENSSAGES.DEFAULT_HEADER.message = MENSSAGES.SUCCESS_DELETE.message
                delete MENSSAGES.DEFAULT_HEADER.items
                return MENSSAGES.DEFAULT_HEADER
            } else {
                MENSSAGES.ERROR_INTERNAL_SERVER_MODEL
            }


        } else {
            return validarId
        }

    } catch (error) {
        return MENSSAGES.ERROR_INTERNAL_SERVER_CONTRLOLLER
    }




}
module.exports = {
    listarFilmesGenero,
    listarGenerosIdFilme,
    listarFilmesIdGenero,
    buscarFilmeGeneroId,
    excluirFilmeGenero,
    inserirFilmeGenero,
    atualizarFilmeGenero,
    excluirGenerosIdFilme
}