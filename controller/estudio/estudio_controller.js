/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL para o CRUD de estudio
 * Data: 09/12/2025
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

//Imports
const estudioDAO = require('../../model/DAO/estudio.js')
controllerNacionalidade = require('../nacionalidade/controller_nacionalidade.js')
const DEFAULT_MENSAGENS = require('../modulo/config_menssages.js')

//Retorna todos os estudios
const listarEstudios = async () => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    let resultEstudio = await estudioDAO.getSelectAllstudio()

    try {
        if (resultEstudio) {
            if (resultEstudio.length > 0) {
                resultEstudio = formatarArray(resultEstudio)
                MENSSAGENS.DEFAULT_HEADER.status = MENSSAGENS.SUCCESS_REQUEST.status
                MENSSAGENS.DEFAULT_HEADER.status_code = MENSSAGENS.SUCCESS_REQUEST.status_code
                MENSSAGENS.DEFAULT_HEADER.items.estudio = resultEstudio

                return MENSSAGENS.DEFAULT_HEADER//201

            } else {
                return MENSSAGENS.ERROR_NOT_FOUND
            }

        } else {
            return MENSSAGENS.ERROR_INTERNAL_SERVER_MODEL
        }

    } catch (error) {
        return MENSSAGENS.ERROR_INTERNAL_SERVER_CONTRLOLLER
    }
}

//Retorna um estudio pelo id
const buscarEstudioID = async (id) => {
    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        if (!isNaN(id) && id != null && id > 0) {

            let resultEstudio = await estudioDAO.getSelectBystudio(id)
            if (resultEstudio) {

                if (resultEstudio.length > 0) {
                    resultEstudio = formatarArray(resultEstudio)
                    MENSAGENS.DEFAULT_HEADER.status = MENSAGENS.SUCCESS_REQUEST.status
                    MENSAGENS.DEFAULT_HEADER.status_code = MENSAGENS.SUCCESS_REQUEST.status_code
                    MENSAGENS.DEFAULT_HEADER.items.estudio = resultEstudio

                    return MENSAGENS.DEFAULT_HEADER
                } else {
                    return MENSAGENS.ERROR_NOT_FOUND//404
                }

            } else {
                return MENSAGENS.ERROR_INTERNAL_SERVER_MODEL//500
            }

        } else {
            MENSAGENS.ERROR_REQUIRED_FIELDS + "[ID incorreto]"
            return MENSAGENS.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        return false
    }
}

//Retorna estudio pelo id da nacionalidade
const buscarEstudioIDNacionalidade = async (id) => {
    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        if (!isNaN(id) && id != null && id > 0) {

            let resultEstudio = await estudioDAO.getSelectByNationality(id)
            if (resultEstudio) {

                if (resultEstudio.length > 0) {
                    resultEstudio = formatarArray(resultEstudio)
                    MENSAGENS.DEFAULT_HEADER.status = MENSAGENS.SUCCESS_REQUEST.status
                    MENSAGENS.DEFAULT_HEADER.status_code = MENSAGENS.SUCCESS_REQUEST.status_code
                    MENSAGENS.DEFAULT_HEADER.items.estudio = resultEstudio

                    return MENSAGENS.DEFAULT_HEADER
                } else {
                    return MENSAGENS.ERROR_NOT_FOUND//404
                }

            } else {
                return MENSAGENS.ERROR_INTERNAL_SERVER_MODEL//500
            }

        } else {
            MENSAGENS.ERROR_REQUIRED_FIELDS + "[ID incorreto]"
            return MENSAGENS.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        return false
    }
}
//Deleta um estudio pelo id
const deletarEstudioId = async (id) => {
    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))
    try {
        let validarId = await buscarEstudioID(id)
        if (validarId.status_code == 200) {

            let deletarEstudio = await estudioDAO.setDeleteStudio(id)
            if (deletarEstudio) {
                MENSAGENS.DEFAULT_HEADER.status = MENSAGENS.SUCCESS_REQUEST.status
                MENSAGENS.DEFAULT_HEADER.status_code = MENSAGENS.SUCCESS_REQUEST.status_code
                MENSAGENS.DEFAULT_HEADER.message = MENSAGENS.SUCCESS_DELETE.message
                delete MENSAGENS.DEFAULT_HEADER.items

                return MENSAGENS.DEFAULT_HEADER
            }




        } else {
            return validarId
        }
    } catch (error) {
        return MENSAGENS.ERROR_INTERNAL_SERVER_CONTRLOLLER
    }
}

//Deleta um estudio pelo id
const deletarEstudioIdNacionalidade = async (id) => {
    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))
    try {
        let validarId = await buscarEstudioIDNacionalidade(id)
        
        if (validarId.status_code == 200) {

            let deletarEstudio = await estudioDAO.setDeleteStudio(id)
         
            if (deletarEstudio) {
                MENSAGENS.DEFAULT_HEADER.status = MENSAGENS.SUCCESS_REQUEST.status
                MENSAGENS.DEFAULT_HEADER.status_code = MENSAGENS.SUCCESS_REQUEST.status_code
                MENSAGENS.DEFAULT_HEADER.message = MENSAGENS.SUCCESS_DELETE.message
                delete MENSAGENS.DEFAULT_HEADER.items

                return MENSAGENS.DEFAULT_HEADER
            }

            else {
                MENSAGENS.ERROR_INTERNAL_SERVER_MODEL
            }

            return MENSAGENS.DEFAULT_HEADER
        } else {
            return validarId
        }
    } catch (error) {
      
        return MENSAGENS.ERROR_INTERNAL_SERVER_CONTRLOLLER
    }
}

//Inseri um novo tipo de distribuidora
const inserirEstudio = async (estudio, contentType) => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarEstudio(estudio);

            if (!validar) {

                 let nacionalidadeID = await controllerNacionalidade.buscarNacionalidadeID(estudio.id_nacionalidade)
                    if(nacionalidadeID.status == false){
                        nacionalidadeID.message +="Id nacionalidade não foi encontrado"
                        return nacionalidadeID
                    }
                let resultEstudio = await estudioDAO.setInsertStudios(estudio)

                if (resultEstudio) {
                    let ultimoId = await estudioDAO.getSelectLastId()
                   

                    if (ultimoId) {
                        estudio.id = ultimoId
                        let result = await buscarEstudioID(estudio.id)
                        MENSSAGENS.DEFAULT_HEADER.status = MENSSAGENS.SUCCESS_CREATED_ITEM.status
                        MENSSAGENS.DEFAULT_HEADER.status_code = MENSSAGENS.SUCCESS_CREATED_ITEM.status_code
                        MENSSAGENS.DEFAULT_HEADER.message = MENSSAGENS.SUCCESS_CREATED_ITEM.message
                        MENSSAGENS.DEFAULT_HEADER.items = result.items

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

//Atualiza um  tipo de distribuidora pelo id
const atualizarEstudio = async (estudio, id, contentType) => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {


        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            const validar = await validarEstudio(estudio)

            if (!validar) {


                let validarId = await buscarEstudioID(id)

                if (validarId.status_code == 200) {

                    estudio.id_estudio = Number(id)

                    let nacionalidadeID = await controllerNacionalidade.buscarNacionalidadeID(estudio.id_nacionalidade)
                    if(nacionalidadeID.status == false){
                        nacionalidadeID.message +="Id nacionalidade não foi encontrado"
                        return nacionalidadeID
                    }
                    let resultEstudio = await estudioDAO.setUpdateStudio(estudio)
                    if (resultEstudio) {
                        let result = await buscarEstudioID(estudio.id_estudio)
                        MENSSAGENS.DEFAULT_HEADER.status = MENSSAGENS.SUCCESS_UPDATE_ITEM.status
                        MENSSAGENS.DEFAULT_HEADER.status_code = MENSSAGENS.SUCCESS_UPDATE_ITEM.status_code
                        MENSSAGENS.DEFAULT_HEADER.message = MENSSAGENS.SUCCESS_UPDATE_ITEM.message
                        MENSSAGENS.DEFAULT_HEADER.items.estudio = result.items

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
        return MENSSAGENS.ERROR_INTERNAL_SERVER_CONTRLOLLER
    }
}

//Valida os dados de tipo de distruidora.
const validarEstudio = async (estudio, atualizar) => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    if (estudio.nome == undefined || estudio.nome == null || estudio.nome == "" || estudio.nome.length > 100) {

        MENSSAGENS.ERROR_REQUIRED_FIELDS.message += "[Nome incorreto]"
        return MENSSAGENS.ERROR_REQUIRED_FIELDS
    }
    if ('dublagem' in estudio || atualizar) {

        if (estudio.dublagem == true || estudio.dublagem == 1 || String(estudio.dublagem).toLowerCase() == "true")
            estudio.dublagem = 1;

        else if (estudio.dublagem == false || estudio.dublagem == 0 || String(estudio.dublagem).toLowerCase() == "false") {

            estudio.dublagem = 0;
        }

        else {
            MENSSAGENS.ERROR_REQUIRED_FIELDS.message += '[dublagem incorreta envie um boolean]'
            return MENSSAGENS.ERROR_REQUIRED_FIELDS
        }

    }
    if ('produtora' in estudio || atualizar) {

        if (estudio.produtora == true || estudio.produtora == 1 || String(estudio.produtora).toLowerCase() == "true")
            estudio.produtora = 1;

        else if (estudio.produtora == false || estudio.produtora == 0 || String(estudio.produtora).toLowerCase() == "false") {

            estudio.produtora = 0;
        }

        else {
            MENSSAGENS.ERROR_REQUIRED_FIELDS.message += '[produtora incorreta envie um boolean]'
            return MENSSAGENS.ERROR_REQUIRED_FIELDS
        }

    }
    if (estudio.ano_fundacao == undefined || estudio.ano_fundacao == null || estudio.ano_fundacao == "" || estudio.ano_fundacao.length != 10) {

        MENSSAGENS.ERROR_REQUIRED_FIELDS.message += "[ano de fundação incorreta]"
        return MENSSAGENS.ERROR_REQUIRED_FIELDS
    }
    if (estudio.telefone == undefined || estudio.telefone == null || estudio.telefone == "" || estudio.telefone.length > 20) {

        MENSSAGENS.ERROR_REQUIRED_FIELDS.message += "[telefone incorreto]"
        return MENSSAGENS.ERROR_REQUIRED_FIELDS
    }
    if (estudio.email == undefined || estudio.email == null || estudio.email == "" || estudio.email.length > 100) {

        MENSSAGENS.ERROR_REQUIRED_FIELDS.message += "[telefone incorreto]"
        return MENSSAGENS.ERROR_REQUIRED_FIELDS
    }
    if (estudio.id_nacionalidade <= 0 || isNaN(estudio.id_nacionalidade) || estudio.id_nacionalidade == undefined || estudio.id_nacionalidade == null || estudio.id_nacionalidade == '') {
        MENSSAGENS.ERROR_REQUIRED_FIELDS.message += '[Id nacionalidade incorreto]'
        return MENSSAGENS.ERROR_REQUIRED_FIELDS
    }

    else {
        return false
    }
}

const formatarArray = (array) => {
    array.forEach(estudio => {
        estudio.nacionalidade = []
        estudio.nacionalidade.push({
            id: estudio.id_nacionalidade,
            sigla: estudio.sigla
        })
        delete estudio.id_nacionalidade
        delete estudio.sigla
    })
    return array
}

module.exports = {
    listarEstudios,
    buscarEstudioID,
    buscarEstudioIDNacionalidade,
    deletarEstudioId,
    deletarEstudioIdNacionalidade,
    inserirEstudio,
    atualizarEstudio
}