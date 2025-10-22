
//Import da model do gênero
const generoDAO = require('../../model/DAO/genero.js')
const DEFAULT_MENSSAGES = require('../modulo/config_menssages.js')

//Retorna todos os generos
const listarGenero = async () => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))

    let resultGenero = await generoDAO.getSelectAllGenero()
    console.log(resultGenero)
    try {
        if (resultGenero) {
            if (resultGenero.length > 0) {
                MENSSAGES.DEFAULT_HEADER.status = MENSSAGES.SUCCESS_REQUEST.status
                MENSSAGES.DEFAULT_HEADER.status_code = MENSSAGES.SUCCESS_REQUEST.status_code
                MENSSAGES.DEFAULT_HEADER.items.genero = resultGenero

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


//Retorna o genero pelo Id
const buscarGeneroId = async (id) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))

    try {
        //Validação da chegada do ID
        if (!isNaN(id) && id != null && id > 0) {
            //cria uma variável local para executar a função getSelectByFilms, passando para ela o ID
            let resultGenero = await generoDAO.getSelectByGenero(Number(id))

            //Se getSelectByFilms tiver sido executado corretamente  ele vai passar nessa primeira verificação, já caso algo estiver errado o valor de resultFilmes será false
            if (resultGenero) {
                //Verificando se resulfilmes não está vazio
                if (resultGenero.length > 0) {
                    MENSSAGES.DEFAULT_HEADER.status = MENSSAGES.SUCCESS_REQUEST.status
                    MENSSAGES.DEFAULT_HEADER.status_code = MENSSAGES.SUCCESS_REQUEST.status_code
                    MENSSAGES.DEFAULT_HEADER.items.generos = resultGenero

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

//Insere um genero 
const inserirGenero = async (genero, contentType) => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = validarGenero(genero);

            if (!validar) {



                let resultGenero = await generoDAO.setInsertGeneros(genero)

                if (resultGenero) {

                    let ultimoId = await generoDAO.getSelectLastId()

                    if (ultimoId) {
                        genero.id = ultimoId
                        MENSSAGENS.DEFAULT_HEADER.status = MENSSAGENS.SUCCESS_CREATED_ITEM.status
                        MENSSAGENS.DEFAULT_HEADER.status_code = MENSSAGENS.SUCCESS_CREATED_ITEM.status_code
                        MENSSAGENS.DEFAULT_HEADER.message = MENSSAGENS.SUCCESS_CREATED_ITEM.message
                        MENSSAGENS.DEFAULT_HEADER.items = genero

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

//Atualizar os dados do genero
const atualizarGenero = async (filme, id, contentType) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))

    try {
        //Validação das entradas de dados
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Validação de id, se existe no BD

            //Chama a função de validar todos os dados do filme
            let validar = await validarDadosFilmes(filme)

            if (!validar) {
                // Validação de id, chamndo a função que verifica no BD
                let validarId = await buscarFilmesId(id)
                if (validarId.status_code == 200) {
                    // adiciona o ID do filme no JSON de dados para ser encaminhado
                    filme.id = Number(id)

                    //Chama a função para inserir um novo filme no BD
                    let resultFilmes = await filmeDAO.setUpdateFilms(filme)
                    if (resultFilmes) {

                        MENSSAGES.DEFAULT_HEADER.status = MENSSAGES.SUCCESS_UPDATE_ITEM.status
                        MENSSAGES.DEFAULT_HEADER.status_code = MENSSAGES.SUCCESS_UPDATE_ITEM.status_code
                        MENSSAGES.DEFAULT_HEADER.message = MENSSAGES.SUCCESS_UPDATE_ITEM.message
                        MENSSAGES.DEFAULT_HEADER.items.filme = filme


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
        console.log(error)
        return MENSSAGES.ERROR_INTERNAL_SERVER_CONTRLOLLER
    }
}


const validarGenero = (genero) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))

    //Validação do nome
    if (genero.nome == '' || genero.nome == undefined || genero.nome == null || genero.nome.length > 100) {
        MENSSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome incorreto]'
        return MENSSAGES.ERROR_REQUIRED_FIELDS
    }
    //Validação da descrição
    else if (genero.descricao == '' || genero.descricao == undefined || genero.descricao == null || genero.descricao.length > 500) {
        MENSSAGES.ERROR_REQUIRED_FIELDS.message += '[Descrição incorreta]'
        return MENSSAGES.ERROR_REQUIRED_FIELDS

    } else if (genero.data_criacao == '' || genero.data_criacao.length != 10) {
        MENSSAGES.ERROR_REQUIRED_FIELDS.message += '[Data de criação incorreta]'
        return MENSSAGES.ERROR_REQUIRED_FIELDS
    }
    else {
        return false
    }
}

module.exports = {
    listarGenero,
    buscarGeneroId,
    inserirFilme
}