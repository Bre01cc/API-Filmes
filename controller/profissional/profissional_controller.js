/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL para o CRUD de profissional
 * Data: 04/11/2025
 * Autot: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/



const profissionalDAO = require('../../model/DAO/profissional.js')
const { atualizarIdioma } = require('../idioma/controller_Idioma.js')
const DEFAULT_MENSAGENS = require('../modulo/config_menssages.js')

const listarProfissional = async () => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    let resultProfissional = await profissionalDAO.getSelectAllprofissional()
    try {
        if (resultProfissional) {
            if (resultProfissional.length > 0) {
                MENSSAGENS.DEFAULT_HEADER.status = MENSSAGENS.SUCCESS_REQUEST.status
                MENSSAGENS.DEFAULT_HEADER.status_code = MENSSAGENS.SUCCESS_REQUEST.status_code
                MENSSAGENS.DEFAULT_HEADER.items.profissional = resultProfissional

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

const buscarProfissionalID = async (id) => {
    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        if (!isNaN(id) && id != null && id > 0) {

            let resultProfissional = await profissionalDAO.getSelectByprofissional(id)
            if (resultProfissional) {

                if (resultProfissional.length > 0) {

                    MENSAGENS.DEFAULT_HEADER.status = MENSAGENS.SUCCESS_REQUEST.status
                    MENSAGENS.DEFAULT_HEADER.status_code = MENSAGENS.SUCCESS_REQUEST.status_code
                    MENSAGENS.DEFAULT_HEADER.items.profissional = resultProfissional

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

const deletarProfissionalId = async (id) => {
    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))
    try {
        let validarId = await buscarProfissionalID(id)
        if (validarId.status_code == 200) {

            let deletarProfissional = await profissionalDAO.setDeleteprofissional(id)
            MENSAGENS.DEFAULT_HEADER.status = MENSAGENS.SUCCESS_REQUEST.status
            MENSAGENS.DEFAULT_HEADER.status_code = MENSAGENS.SUCCESS_REQUEST.status_code
            MENSAGENS.DEFAULT_HEADER.message = MENSAGENS.SUCCESS_DELETE.message
            delete MENSAGENS.DEFAULT_HEADER.items

            return MENSAGENS.DEFAULT_HEADER
        } else {
            return validarId
        }
    } catch (error) {
        return MENSAGENS.ERROR_INTERNAL_SERVER_CONTRLOLLER
    }
}

const inserirProfissional = async (profissional, contentType) => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarProfissional(profissional);

            if (!validar) {

                let resultProfissional = await profissionalDAO.setProfissional(profissional)
                if (resultProfissional) {
                    let ultimoId = await profissionalDAO.getSelectLastIdProfissional()

                    if (ultimoId) {
                        profissional.id = ultimoId
                        MENSSAGENS.DEFAULT_HEADER.status = MENSSAGENS.SUCCESS_CREATED_ITEM.status
                        MENSSAGENS.DEFAULT_HEADER.status_code = MENSSAGENS.SUCCESS_CREATED_ITEM.status_code
                        MENSSAGENS.DEFAULT_HEADER.message = MENSSAGENS.SUCCESS_CREATED_ITEM.message
                        MENSSAGENS.DEFAULT_HEADER.items = profissional

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


const atualizarProfissional = async (profissional,id, contentType) => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {


        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let atualizar = true
            const validar = await validarProfissional(profissional,atualizar)

            if (!validar) {


                let validarId = await buscarProfissionalID(id)

                if (validarId.status_code == 200) {

                    profissional.id = Number(id)

                    let resultProfissional = await profissionalDAO.setUpdateProfissional(profissional)
                    if (resultProfissional) {

                        MENSSAGENS.DEFAULT_HEADER.status = MENSSAGENS.SUCCESS_UPDATE_ITEM.status
                        MENSSAGENS.DEFAULT_HEADER.status_code = MENSSAGENS.SUCCESS_UPDATE_ITEM.status_code
                        MENSSAGENS.DEFAULT_HEADER.message = MENSSAGENS.SUCCESS_UPDATE_ITEM.message
                        MENSSAGENS.DEFAULT_HEADER.items.profissional = profissional

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

const validarProfissional = async (profissional, atualizar) => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    if (profissional.nome == undefined || profissional.nome == null || profissional.nome == "" || profissional.nome.length > 100) {

        MENSSAGENS.ERROR_REQUIRED_FIELDS.message += "[Nome incorreto]"
        return MENSSAGENS.ERROR_REQUIRED_FIELDS
    }

    if (profissional.nome_artistico == undefined || profissional.nome_artistico == null || profissional.nome_artistico == "" || profissional.nome_artistico.length > 500) {

        MENSSAGENS.ERROR_REQUIRED_FIELDS.message += "[Nome artístico incorreto]"
        return MENSSAGENS.ERROR_REQUIRED_FIELDS
    }

    if (profissional.data_nascimento == undefined || profissional.data_nascimento.length !=10) {
        MENSSAGENS.ERROR_REQUIRED_FIELDS.message += "[Data de nascimento incorreta]"
        return MENSSAGENS.ERROR_REQUIRED_FIELDS
    }

    if ('data_falecimento' in profissional || atualizar) {

        if (profissional.data_falecimento == undefined || profissional.data_falecimento.length >10) {  
            MENSSAGENS.ERROR_REQUIRED_FIELDS.message += "[Data de falecimento incorreta]"
            return MENSSAGENS.ERROR_REQUIRED_FIELDS
        }

    }

    if (profissional.foto == undefined || profissional.foto == null || profissional.foto == "" || profissional.foto.length > 100) {
        MENSSAGENS.ERROR_REQUIRED_FIELDS.message += "[Foto incorreta]"
        return MENSSAGENS.ERROR_REQUIRED_FIELDS
    }

    if (profissional.sexo == undefined || profissional.sexo == null || profissional.sexo == "" || profissional.sexo.length > 1 ) {
        MENSSAGENS.ERROR_REQUIRED_FIELDS.message += "[Sexo incorreto]"
        return MENSSAGENS.ERROR_REQUIRED_FIELDS
    }

    if ('rede_social' in profissional || atualizar) {
        if (profissional.rede_social == "" || profissional.rede_social == undefined || profissional.rede_social.length > 20) {
            MENSSAGENS.ERROR_REQUIRED_FIELDS =+ "[Rede social incorreta]"
            return MENSSAGENS.ERROR_REQUIRED_FIELDS
        }
    }

    if(profissional.biografia == undefined || profissional.biografia ==null || profissional.biografia ==""||profissional.biografia.length>500){
        MENSSAGENS.ERROR_REQUIRED_FIELDS =+ "[Biografia incorreta]"
    }

    else {
        return false
    }
}

module.exports = {
    listarProfissional,
    buscarProfissionalID,
    deletarProfissionalId,
    inserirProfissional,
    atualizarProfissional
}