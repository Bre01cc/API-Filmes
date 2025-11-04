
const nacionalidadeDAO = require('../../model/DAO/nacionalidade.js')
const DEFAULT_MENSAGENS = require('../modulo/config_menssages.js')

const listarNacionalidade = async () => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    let resultNacionalidade = await nacionalidadeDAO.getSelectAllnacionalidade()
    try {
        if (resultNacionalidade) {
            if (resultNacionalidade.length > 0) {
                MENSSAGENS.DEFAULT_HEADER.status = MENSSAGENS.SUCCESS_REQUEST.status
                MENSSAGENS.DEFAULT_HEADER.status_code = MENSSAGENS.SUCCESS_REQUEST.status_code
                MENSSAGENS.DEFAULT_HEADER.items.nacionalidade = resultNacionalidade

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

const buscarNacionalidadeID = async (id) => {
    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        if (!isNaN(id) && id != null && id > 0) {

            let resultNacionalidade = await nacionalidadeDAO.getSelectByNacionalidade(id)
            if (resultNacionalidade) {

                if (resultNacionalidade.length > 0) {

                    MENSAGENS.DEFAULT_HEADER.status = MENSAGENS.SUCCESS_REQUEST.status
                    MENSAGENS.DEFAULT_HEADER.status_code = MENSAGENS.SUCCESS_REQUEST.status_code
                    MENSAGENS.DEFAULT_HEADER.items.nacionalidade = resultNacionalidade

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

const deletarNacionalidadeId = async (id) => {
    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))
    try {
        let validarId = await buscarNacionalidadeID(id)
        if (validarId.status_code == 200) {

            let deletarNacionalidade = await nacionalidadeDAO.setDeleteNacionalidade(id)
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

const inserirNacionalidade = async (nacionalidade, contentType) => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarNacionalidade(nacionalidade);

            if (!validar) {

                let resultNacionalidade = await nacionalidadeDAO.setNacionalidade(nacionalidade)

                if (resultNacionalidade) {
                    let ultimoId = await nacionalidadeDAO.getSelectLastIdNacionalidade()

                    if (ultimoId) {
                        nacionalidade.id = ultimoId
                        MENSSAGENS.DEFAULT_HEADER.status = MENSSAGENS.SUCCESS_CREATED_ITEM.status
                        MENSSAGENS.DEFAULT_HEADER.status_code = MENSSAGENS.SUCCESS_CREATED_ITEM.status_code
                        MENSSAGENS.DEFAULT_HEADER.message = MENSSAGENS.SUCCESS_CREATED_ITEM.message
                        MENSSAGENS.DEFAULT_HEADER.items = nacionalidade

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


const atualizarNacionalidade = async (nacionalidade, id, contentType) => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {


        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            const validar = await validarNacionalidade(nacionalidade)

            if (!validar) {


                let validarId = await buscarNacionalidadeID(id)

                if (validarId.status_code == 200) {

                    nacionalidade.id = Number(id)

                    let resultNacionalidade = await nacionalidadeDAO.setUpdateNacionalidade(nacionalidade)
                    if (resultNacionalidade) {

                        MENSSAGENS.DEFAULT_HEADER.status = MENSSAGENS.SUCCESS_UPDATE_ITEM.status
                        MENSSAGENS.DEFAULT_HEADER.status_code = MENSSAGENS.SUCCESS_UPDATE_ITEM.status_code
                        MENSSAGENS.DEFAULT_HEADER.message = MENSSAGENS.SUCCESS_UPDATE_ITEM.message
                        MENSSAGENS.DEFAULT_HEADER.items.nacionalidade = nacionalidade

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

const validarNacionalidade = async (nacionalidade) => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    if (nacionalidade.nome == undefined || nacionalidade.nome == null || nacionalidade.nome == "" || nacionalidade.nome.length > 100) {

        MENSSAGENS.ERROR_REQUIRED_FIELDS.message += "[Nome incorreto]"
        return MENSSAGENS.ERROR_REQUIRED_FIELDS
    }
    else if (nacionalidade.sigla == undefined || nacionalidade.sigla == null || nacionalidade.sigla == "" || nacionalidade.sigla.length > 5) {

        MENSSAGENS.ERROR_REQUIRED_FIELDS.message += "[Sigla incorreto]"
        return MENSSAGENS.ERROR_REQUIRED_FIELDS
    }
    else if (nacionalidade.data_criacao == undefined || nacionalidade.data_criacao == null || nacionalidade.data_criacao == "" || nacionalidade.data_criacao.length != 10) {

        MENSSAGENS.ERROR_REQUIRED_FIELDS.message += "[Data de cração incorreta]"
        return MENSSAGENS.ERROR_REQUIRED_FIELDS
    }
    else {
        return false
    }
}

module.exports = {
    listarNacionalidade,
    buscarNacionalidadeID,
    deletarNacionalidadeId,
    inserirNacionalidade,
    atualizarNacionalidade
}