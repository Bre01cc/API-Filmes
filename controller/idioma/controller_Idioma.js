
/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL para o CRUD de idiomas
 * Data: 04/11/2025
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

//Imports
const idiomaDAO = require('../../model/DAO/idioma.js')
const ControllerProfissionalIdioma = require('../profissional/profissional_idioma.js')
const DEFAULT_MENSSAGENS = require('../modulo/config_menssages.js')


//Retorna todos idiomas
const listarIdiomas = async () => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSSAGENS))


    try {
        let resultIdioma = await idiomaDAO.getSelectAllIdioma()

        if (resultIdioma) {

            if (resultIdioma.length > 0) {
                MENSSAGENS.DEFAULT_HEADER.status = MENSSAGENS.SUCCESS_REQUEST.status
                MENSSAGENS.DEFAULT_HEADER.status_code = MENSSAGENS.SUCCESS_REQUEST.status_code
                MENSSAGENS.DEFAULT_HEADER.items.idiomas = resultIdioma
                return MENSSAGENS.DEFAULT_HEADER//201

            } else {
                return MENSSAGENS.ERROR_NOT_FOUND//404
            }
        } else {
            return MENSSAGENS.ERROR_INTERNAL_SERVER_MODEL//500
        }

    } catch (error) {
        return MENSSAGENS.ERROR_INTERNAL_SERVER_CONTRLOLLER//500

    }
}

//Retorna um idioma pelo id
const buscarIdiomasId = async (id) => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSSAGENS))
    try {


        //Validação da chegada do ID
        if (!isNaN(id) && id != null && id > 0) {

            let resultIdioma = await idiomaDAO.getSelectByIdioma(Number(id))


            if (resultIdioma) {

                if (resultIdioma.length > 0) {
                    MENSSAGENS.DEFAULT_HEADER.status = MENSSAGENS.SUCCESS_REQUEST.status
                    MENSSAGENS.DEFAULT_HEADER.status_code = MENSSAGENS.SUCCESS_REQUEST.status_code
                    MENSSAGENS.DEFAULT_HEADER.items.idioma = resultIdioma
                    return MENSSAGENS.DEFAULT_HEADER
                } else {
                    return MENSSAGENS.ERROR_NOT_FOUND
                }
            } else {
                return MENSSAGENS.ERROR_INTERNAL_SERVER_MODEL
            }

        } else {

            MENSSAGENS.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MENSSAGENS.ERROR_REQUIRED_FIELDS

        }

    } catch (error) {
        return MENSSAGENS.ERROR_REQUIRED_FIELDS
    }

}

//Exclui um idioma pelo id
const excluirIdioma = async (id) => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSSAGENS))
    try {

        let validarId = await buscarIdiomasId(id)
        if (validarId.status_code == 200) {

            let excluirProfissionalIdiomas = await ControllerProfissionalIdioma.excluirProfissionalId_idiomas(id)

            if (excluirProfissionalIdiomas.status_code == 500) {
                return MENSSAGENS.ERROR_RELATION_TABLE
            } else {
                let deletarIdioma = await idiomaDAO.setDeleteIdioma(id);
                MENSSAGENS.DEFAULT_HEADER.status = MENSSAGENS.SUCCESS_DELETE.status
                MENSSAGENS.DEFAULT_HEADER.status_code = MENSSAGENS.SUCCESS_DELETE.status_code
                MENSSAGENS.DEFAULT_HEADER.message = MENSSAGENS.SUCCESS_DELETE.message
                delete MENSSAGENS.DEFAULT_HEADER.items
                return MENSSAGENS.DEFAULT_HEADER

            }


        } else {
            return validarId
        }

    } catch (error) {
        return MENSSAGENS.ERROR_INTERNAL_SERVER_CONTRLOLLER
    }
}

//Insere um novo idioma
const inserirIdioma = async (idioma, contentType) => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSSAGENS))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarIdioma(idioma);

            if (!validar) {


                let resultidioma = await idiomaDAO.setIdioma(idioma)

                if (resultidioma) {

                    let ultimoId = await idiomaDAO.getSelectLastIdIdioma()

                    if (ultimoId) {
                        idioma.id = ultimoId
                        MENSSAGENS.DEFAULT_HEADER.status = MENSSAGENS.SUCCESS_CREATED_ITEM.status
                        MENSSAGENS.DEFAULT_HEADER.status_code = MENSSAGENS.SUCCESS_CREATED_ITEM.status_code
                        MENSSAGENS.DEFAULT_HEADER.message = MENSSAGENS.SUCCESS_CREATED_ITEM.message
                        MENSSAGENS.DEFAULT_HEADER.items = idioma

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
            return MENSSAGENS.ERROR_INTERNAL_SERVER_MODEL
        }

    } catch (error) {
        return MENSSAGENS.ERROR_INTERNAL_SERVER_CONTRLOLLER
    }
}

//Atualiza um idioma já cadastrado
const atualizarIdioma = async (idioma, id, contentType) => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSSAGENS))

    try {


        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let atualizar = true
            const validar = await validarIdioma(idioma, atualizar)
            console.log(validar)

            if (!validar) {


                let validarId = await buscarIdiomasId(id)

                if (validarId.status_code == 200) {

                    idioma.id = Number(id)

                    let resulIdioma = await idiomaDAO.setUpdateIdioma(idioma)
                    if (resulIdioma) {

                        MENSSAGENS.DEFAULT_HEADER.status = MENSSAGENS.SUCCESS_UPDATE_ITEM.status
                        MENSSAGENS.DEFAULT_HEADER.status_code = MENSSAGENS.SUCCESS_UPDATE_ITEM.status_code
                        MENSSAGENS.DEFAULT_HEADER.message = MENSSAGENS.SUCCESS_UPDATE_ITEM.message
                        MENSSAGENS.DEFAULT_HEADER.items.idioma = idioma

                        return MENSSAGENS.DEFAULT_HEADER
                    } else {
                        return MENSSAGENS.ERROR_INTERNAL_SERVER_MODEL
                    }

                } else {
                    return validarId
                }

            } else {
                return validar
            }

        }
        else {
            return MENSSAGENS.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        console.log(error)
        return MENSSAGENS.ERROR_INTERNAL_SERVER_CONTRLOLLER
    }
}

//Valida os dados do idioma
const validarIdioma = async (idioma, atualizar) => {

    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSSAGENS))
    //Validação da sigla
    if (idioma.sigla == '' || idioma.sigla == undefined || idioma.sigla == null || idioma.sigla.length > 10) {
        MENSSAGENS.ERROR_REQUIRED_FIELDS.message += '[Sigla incorreto]'
        return MENSSAGENS.ERROR_REQUIRED_FIELDS
    }
    if (idioma.data_criacao == undefined || idioma.data_criacao == '' || idioma.data_criacao == null || idioma.data_criacao.length != 10) {
        MENSSAGENS.ERROR_REQUIRED_FIELDS.message += '[Data de criação incorreta]'
        return MENSSAGENS.ERROR_REQUIRED_FIELDS
    }
    if (idioma.familia_linguistica == undefined || idioma.familia_linguistica == null || idioma.familia_linguistica == '' || idioma.familia_linguistica.length > 50) {
        MENSSAGENS.ERROR_REQUIRED_FIELDS.message += '[Familia linguistica incorreta]'
        return MENSSAGENS.ERROR_REQUIRED_FIELDS
    }
    //Validando se a chave descricao foi envida na requisição ou dentro do objeto idioma
    if ('descricao' in idioma || atualizar) {
        //Validando a descricao enviada
        if (idioma.descricao == undefined || idioma.descricao == null || idioma.descricao == '' || idioma.descricao.length > 500) {
            MENSSAGENS.ERROR_REQUIRED_FIELDS.message += '[Descrição incorreta]'
            return MENSSAGENS.ERROR_REQUIRED_FIELDS
        }

    }

    if ('antes_de_cristo' in idioma || atualizar) {

        if (idioma.antes_de_cristo == true || idioma.antes_de_cristo == 1 || String(idioma.antes_de_cristo).toLowerCase() == "true")
            idioma.antes_de_cristo = 1;

        else if (idioma.antes_de_cristo == false || idioma.antes_de_cristo == 0 || String(idioma.antes_de_cristo).toLowerCase() == "false") {

            idioma.antes_de_cristo = 0;
        }

        else {
            MENSSAGENS.ERROR_REQUIRED_FIELDS.message += '[antes_de_cristo incorreto]'
            return MENSSAGENS.ERROR_REQUIRED_FIELDS
        }

    }
    else {
        return false
    }
}


//Exporte das funções
module.exports = {
    listarIdiomas,
    buscarIdiomasId,
    excluirIdioma,
    inserirIdioma,
    atualizarIdioma
}