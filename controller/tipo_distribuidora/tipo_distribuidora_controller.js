/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL para o CRUD de tipo de distribuicao
 * Data: 04/11/2025
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

//Imports
const tipoDistribuidoraDAO = require('../../model/DAO/tipo_distribuidora')
const controllerDistrbuidora = require('./../distribuidora/distribuidora_controller.js')
const DEFAULT_MENSAGENS = require('../modulo/config_menssages.js')

//Retorna todos os tipo de distribuidoras
const listarTipoDistribuidora = async () => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    let resultipoDistribuidora = await tipoDistribuidoraDAO.getSelectAlltipoDistribuidora()
    try {
        if (resultipoDistribuidora) {
            if (resultipoDistribuidora.length > 0) {
                MENSSAGENS.DEFAULT_HEADER.status = MENSSAGENS.SUCCESS_REQUEST.status
                MENSSAGENS.DEFAULT_HEADER.status_code = MENSSAGENS.SUCCESS_REQUEST.status_code
                MENSSAGENS.DEFAULT_HEADER.items.tipoDistribuidora = resultipoDistribuidora

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

//Retorna um tipo de distribuidora pelo id
const buscarTipoDistribuidoraID = async (id) => {
    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        if (!isNaN(id) && id != null && id > 0) {

            let resultTipoDistribuidora = await tipoDistribuidoraDAO.getSelectBytipoDistribuidora(id)
            if (resultTipoDistribuidora) {

                if (resultTipoDistribuidora.length > 0) {

                    MENSAGENS.DEFAULT_HEADER.status = MENSAGENS.SUCCESS_REQUEST.status
                    MENSAGENS.DEFAULT_HEADER.status_code = MENSAGENS.SUCCESS_REQUEST.status_code
                    MENSAGENS.DEFAULT_HEADER.items.tipoDistribuidora = resultTipoDistribuidora

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

//Deleta um tipo de distribuidora
const deletarTipoDistribuidoraId = async (id) => {
    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))
    try {
        let validarId = await buscarTipoDistribuidoraID(id)
        if (validarId.status_code == 200) {

            let excluirDistribuidora = await controllerDistrbuidora.deletarDistribuidoraIdType(id)
            if (excluirDistribuidora.status == 500) {
                return MENSAGENS.ERROR_RELATION_TABLE
            } else {
                let deletarTipoDistribuidora = await tipoDistribuidoraDAO.setDeletetipoDistribuidora(id)
                if (deletarTipoDistribuidora) {
                    MENSAGENS.DEFAULT_HEADER.status = MENSAGENS.SUCCESS_REQUEST.status
                    MENSAGENS.DEFAULT_HEADER.status_code = MENSAGENS.SUCCESS_REQUEST.status_code
                    MENSAGENS.DEFAULT_HEADER.message = MENSAGENS.SUCCESS_DELETE.message
                    delete MENSAGENS.DEFAULT_HEADER.items

                    return MENSAGENS.DEFAULT_HEADER
                }else{
                    return MENSAGENS.ERROR_INTERNAL_SERVER_MODEL
                }

            }


        } else {
            return validarId
        }
    } catch (error) {
        return MENSAGENS.ERROR_INTERNAL_SERVER_CONTRLOLLER
    }
}

//Inseri um novo tipo de distribuidora
const inserirTipoDistribuidora = async (tipoDistribuidora, contentType) => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarTipoDistribuidora(tipoDistribuidora);

            if (!validar) {

                let resultTipoDistribuidora = await tipoDistribuidoraDAO.setTipoDistribuidora(tipoDistribuidora)
                if (resultTipoDistribuidora) {
                    let ultimoId = await tipoDistribuidoraDAO.getSelectLastIdtipoDistribuidora()

                    if (ultimoId) {
                        tipoDistribuidora.id = ultimoId
                        MENSSAGENS.DEFAULT_HEADER.status = MENSSAGENS.SUCCESS_CREATED_ITEM.status
                        MENSSAGENS.DEFAULT_HEADER.status_code = MENSSAGENS.SUCCESS_CREATED_ITEM.status_code
                        MENSSAGENS.DEFAULT_HEADER.message = MENSSAGENS.SUCCESS_CREATED_ITEM.message
                        MENSSAGENS.DEFAULT_HEADER.items = tipoDistribuidora

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
const atualizarTipoDistribuidora = async (tipoDistribuidora, id, contentType) => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {


        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            const validar = await validarTipoDistribuidora(tipoDistribuidora)

            if (!validar) {


                let validarId = await buscarTipoDistribuidoraID(id)

                if (validarId.status_code == 200) {

                    tipoDistribuidora.id = Number(id)

                    let resultTipoDistribuidora = await tipoDistribuidoraDAO.setUpdatetipoDistribuidora(tipoDistribuidora)
                    if (resultTipoDistribuidora) {

                        MENSSAGENS.DEFAULT_HEADER.status = MENSSAGENS.SUCCESS_UPDATE_ITEM.status
                        MENSSAGENS.DEFAULT_HEADER.status_code = MENSSAGENS.SUCCESS_UPDATE_ITEM.status_code
                        MENSSAGENS.DEFAULT_HEADER.message = MENSSAGENS.SUCCESS_UPDATE_ITEM.message
                        MENSSAGENS.DEFAULT_HEADER.items.tipoDistribuidora = tipoDistribuidora

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
const validarTipoDistribuidora = async (tipoDistribuidora) => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    if (tipoDistribuidora.nome == undefined || tipoDistribuidora.nome == null || tipoDistribuidora.nome == "" || tipoDistribuidora.nome.length > 100) {

        MENSSAGENS.ERROR_REQUIRED_FIELDS.message += "[Nome incorreto]"
        return MENSSAGENS.ERROR_REQUIRED_FIELDS
    }
    else if (tipoDistribuidora.descricao == undefined || tipoDistribuidora.descricao == null || tipoDistribuidora.descricao == "" || tipoDistribuidora.descricao.length > 500) {

        MENSSAGENS.ERROR_REQUIRED_FIELDS.message += "[Descrição incorreta]"
        return MENSSAGENS.ERROR_REQUIRED_FIELDS
    }

    else {
        return false
    }
}


//Exports
module.exports = {
    listarTipoDistribuidora,
    buscarTipoDistribuidoraID,
    deletarTipoDistribuidoraId,
    inserirTipoDistribuidora,
    atualizarTipoDistribuidora
}