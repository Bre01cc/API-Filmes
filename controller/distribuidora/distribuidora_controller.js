/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL para o CRUD de distribuidora
 * Data: 09/12/2025
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

//Imports
const distribuidoraDAO = require('../../model/DAO/distribuidora.js')
controllerNacionalidade = require('../nacionalidade/controller_nacionalidade.js')
controllerTipoDistribuidora = require('../tipo_distribuidora/tipo_distribuidora_controller.js')
const DEFAULT_MENSAGENS = require('../modulo/config_menssages.js')

//Retorna todos os distribuidoras
const listarDistribuidora = async () => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    let resultDistribuidora = await distribuidoraDAO.getSelectAlldistributor()

    try {
        if (resultDistribuidora) {
            if (resultDistribuidora.length > 0) {
                resultDistribuidora = formatarArray(resultDistribuidora)
                MENSSAGENS.DEFAULT_HEADER.status = MENSSAGENS.SUCCESS_REQUEST.status
                MENSSAGENS.DEFAULT_HEADER.status_code = MENSSAGENS.SUCCESS_REQUEST.status_code
                MENSSAGENS.DEFAULT_HEADER.items.distribuidora = resultDistribuidora

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

//Retorna um distribuidora pelo id
const buscarDistribuidoraID = async (id) => {
    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        if (!isNaN(id) && id != null && id > 0) {

            let resultDistribuidora = await distribuidoraDAO.getSelectByDistributor(id)
            if (resultDistribuidora) {

                if (resultDistribuidora.length > 0) {
                    resultDistribuidora = formatarArray(resultDistribuidora)
                    MENSAGENS.DEFAULT_HEADER.status = MENSAGENS.SUCCESS_REQUEST.status
                    MENSAGENS.DEFAULT_HEADER.status_code = MENSAGENS.SUCCESS_REQUEST.status_code
                    MENSAGENS.DEFAULT_HEADER.items.distribuidora = resultDistribuidora

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

//Retorna distribuidora pelo id da nacionalidade
const buscarDistribuidoraIDNacionalidade = async (id) => {
    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        if (!isNaN(id) && id != null && id > 0) {

            let resultDistribuidora = await distribuidoraDAO.getSelectByNationality(id)
            if (resultDistribuidora) {

                if (resultDistribuidora.length > 0) {
                    resultDistribuidora = formatarArray(resultDistribuidora)
                    MENSAGENS.DEFAULT_HEADER.status = MENSAGENS.SUCCESS_REQUEST.status
                    MENSAGENS.DEFAULT_HEADER.status_code = MENSAGENS.SUCCESS_REQUEST.status_code
                    MENSAGENS.DEFAULT_HEADER.items.distribuidora = resultDistribuidora

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

//Retorna distribuidora pelo id da nacionalidade
const buscarDistribuidoraIDType = async (id) => {
    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        if (!isNaN(id) && id != null && id > 0) {

            let resultDistribuidora = await distribuidoraDAO.getSelectByType(id)
            if (resultDistribuidora) {

                if (resultDistribuidora.length > 0) {
                    resultDistribuidora = formatarArray(resultDistribuidora)
                    MENSAGENS.DEFAULT_HEADER.status = MENSAGENS.SUCCESS_REQUEST.status
                    MENSAGENS.DEFAULT_HEADER.status_code = MENSAGENS.SUCCESS_REQUEST.status_code
                    MENSAGENS.DEFAULT_HEADER.items.distribuidora = resultDistribuidora

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

//Deleta um distribuidora pelo id
const deletarDistribuidoraId = async (id) => {
    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))
    try {
        let validarId = await buscarDistribuidoraID(id)
        if (validarId.status_code == 200) {

            let deletardistribuidora = await distribuidoraDAO.setDeleteDistributor(id)
            if (deletardistribuidora) {
                MENSAGENS.DEFAULT_HEADER.status = MENSAGENS.SUCCESS_REQUEST.status
                MENSAGENS.DEFAULT_HEADER.status_code = MENSAGENS.SUCCESS_REQUEST.status_code
                MENSAGENS.DEFAULT_HEADER.message = MENSAGENS.SUCCESS_DELETE.message
                delete MENSAGENS.DEFAULT_HEADER.items

                return MENSAGENS.DEFAULT_HEADER
            }
            else{
              return  MENSAGENS.ERROR_INTERNAL_SERVER_MODEL
            }




        } else {
            return validarId
        }
    } catch (error) {
        return MENSAGENS.ERROR_INTERNAL_SERVER_CONTRLOLLER
    }
}

//Deleta um distribuidora pelo id nacionalidade
const deletarDistribuidoraIdNacionalidade = async (id) => {
    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))
    try {
        let validarId = await buscarDistribuidoraIDNacionalidade(id)

        if (validarId.status_code == 200) {

            let deletardistribuidora = await distribuidoraDAO.setDeleteDistributorByNationality(id)

            if (deletardistribuidora) {
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

//Deleta um distribuidora pelo id tipo_distribuidora
const deletarDistribuidoraIdType = async (id) => {
    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))
    try {
        let validarId = await buscarDistribuidoraIDType(id)

        if (validarId.status_code == 200) {

            let deletardistribuidora = await distribuidoraDAO.setDeleteDistributorByType(id)

            if (deletardistribuidora) {
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
const inserirDistribuidora = async (distribuidora, contentType) => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDistribuidora(distribuidora);

            if (!validar) {

               
                let resultDistribuidora = await distribuidoraDAO.setInsertDistributor(distribuidora)

                if (resultDistribuidora) {
                    let ultimoId = await distribuidoraDAO.getSelectLastId()

                   
                    if (ultimoId) {
                        distribuidora.id = ultimoId
                        let result = await buscarDistribuidoraID(distribuidora.id)

                        MENSSAGENS.DEFAULT_HEADER.status = MENSSAGENS.SUCCESS_CREATED_ITEM.status
                        MENSSAGENS.DEFAULT_HEADER.status_code = MENSSAGENS.SUCCESS_CREATED_ITEM.status_code
                        MENSSAGENS.DEFAULT_HEADER.message = MENSSAGENS.SUCCESS_CREATED_ITEM.message
                        MENSSAGENS.DEFAULT_HEADER.items.distribuidora = result.items

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
const atualizarDistribuidora = async (distribuidora, id, contentType) => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {


        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            const validar = await validarDistribuidora(distribuidora)

            if (!validar) {


                let validarId = await buscarDistribuidoraID(id)

                if (validarId.status_code == 200) {

                    distribuidora.id_distribuidora = Number(id)

                   
                    let resultDistribuidora = await distribuidoraDAO.setUpdateDistributor(distribuidora)
                    if (resultDistribuidora) {
                        let result = await buscarDistribuidoraID(distribuidora.id_distribuidora)
                        MENSSAGENS.DEFAULT_HEADER.status = MENSSAGENS.SUCCESS_UPDATE_ITEM.status
                        MENSSAGENS.DEFAULT_HEADER.status_code = MENSSAGENS.SUCCESS_UPDATE_ITEM.status_code
                        MENSSAGENS.DEFAULT_HEADER.message = MENSSAGENS.SUCCESS_UPDATE_ITEM.message
                        MENSSAGENS.DEFAULT_HEADER.items.distribuidora = result.items

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

const validarDistribuidora = async (distribuidora) => {

    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS));

    if (distribuidora.data_fundacao == undefined || distribuidora.data_fundacao == null || distribuidora.data_fundacao == "" || distribuidora.data_fundacao.length != 10) {
        MENSAGENS.ERROR_REQUIRED_FIELDS.message += "[data_fundacao inválida]";
        return MENSAGENS.ERROR_REQUIRED_FIELDS;
    }

    if (distribuidora.telefone == undefined || distribuidora.telefone == null || distribuidora.telefone == "" || distribuidora.telefone.length > 20) {
        MENSAGENS.ERROR_REQUIRED_FIELDS.message += "[telefone incorreto]";
        return MENSAGENS.ERROR_REQUIRED_FIELDS;
    }

    if (distribuidora.email == undefined || distribuidora.email == null || distribuidora.email == "" || distribuidora.email.length > 100) {
        MENSAGENS.ERROR_REQUIRED_FIELDS.message += "[email incorreto]";
        return MENSAGENS.ERROR_REQUIRED_FIELDS;
    }

    if (distribuidora.id_nacionalidade == undefined || distribuidora.id_nacionalidade == null || distribuidora.id_nacionalidade == "" || isNaN(distribuidora.id_nacionalidade) || distribuidora.id_nacionalidade <= 0) {
        MENSAGENS.ERROR_REQUIRED_FIELDS.message += "[id_nacionalidade incorreto]";
        return MENSAGENS.ERROR_REQUIRED_FIELDS;
    }

    if (distribuidora.id_tipo_distribuidora == undefined || distribuidora.id_tipo_distribuidora == null || distribuidora.id_tipo_distribuidora == "" || isNaN(distribuidora.id_tipo_distribuidora) || distribuidora.id_tipo_distribuidora <= 0) {
        MENSAGENS.ERROR_REQUIRED_FIELDS.message += "[id_tipo_distribuidora incorreto]";
        return MENSAGENS.ERROR_REQUIRED_FIELDS;
    }

    return false;
};


const formatarArray = (array) => {
    array.forEach(distribuidora => {
        distribuidora.nacionalidade = []
        distribuidora.nacionalidade.push({
            id: distribuidora.id_nacionalidade,
            sigla: distribuidora.sigla
        })
        delete distribuidora.id_nacionalidade
        delete distribuidora.sigla

        distribuidora.tipo_distribuidora = []
        distribuidora.tipo_distribuidora.push(
            {
                id: distribuidora.id_tipo_distribuidora,
                nome: distribuidora.nome_tipo
            }
        )
        delete distribuidora.id_tipo_distribuidora
        delete distribuidora.nome_tipo
    })
    return array
}

module.exports = {
    listarDistribuidora,
    buscarDistribuidoraID,
    buscarDistribuidoraIDNacionalidade,
    buscarDistribuidoraIDType,
    deletarDistribuidoraId,
    deletarDistribuidoraIdNacionalidade,
    deletarDistribuidoraIdType,
    atualizarDistribuidora,
    inserirDistribuidora
}