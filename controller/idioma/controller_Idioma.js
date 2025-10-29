const idiomaDAO = require('../../model/DAO/idioma.js')
const DEFAULT_MENSSAGES = require('../modulo/config_menssages.js')


const listarIdiomas = async () => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))


    try {
        let resultIdioma = await idiomaDAO.getSelectAllIdioma()

        if (resultIdioma) {

            if (resultIdioma.length > 0) {
                MENSSAGES.DEFAULT_HEADER.status = MENSSAGES.SUCCESS_REQUEST.status
                MENSSAGES.DEFAULT_HEADER.status_code = MENSSAGES.SUCCESS_REQUEST.status_code
                MENSSAGES.DEFAULT_HEADER.items.idiomas = resultIdioma
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


const buscarIdiomasId = async (id) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))
    try {


        //Validação da chegada do ID
        if (!isNaN(id) && id != null && id > 0) {

            let resultIdioma = await idiomaDAO.getSelectByIdioma(Number(id))


            if (resultIdioma) {

                if (resultIdioma.length > 0) {
                    MENSSAGES.DEFAULT_HEADER.status = MENSSAGES.SUCCESS_REQUEST.status
                    MENSSAGES.DEFAULT_HEADER.status_code = MENSSAGES.SUCCESS_REQUEST.status_code
                    MENSSAGES.DEFAULT_HEADER.items.idioma = resultIdioma
                    return MENSSAGES.DEFAULT_HEADER
                } else {
                    return MENSSAGES.ERROR_NOT_FOUND
                }
            } else {
                return MENSSAGES.ERROR_INTERNAL_SERVER_MODEL
            }

        } else {

            MENSSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MENSSAGES.ERROR_REQUIRED_FIELDS

        }

    } catch (error) {
        return MENSSAGES.ERROR_REQUIRED_FIELDS
    }

}

const excluirIdioma = async (id) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))
    try {

        let validarId = await buscarIdiomasId(id)
        if (validarId.status_code == 200) {

            let deletarIdioma = await idiomaDAO.setDeleteIdioma(id);
            MENSSAGES.DEFAULT_HEADER.status = MENSSAGES.SUCCESS_DELETE.status
            MENSSAGES.DEFAULT_HEADER.status_code = MENSSAGES.SUCCESS_DELETE.status_code
            MENSSAGES.DEFAULT_HEADER.message = MENSSAGES.SUCCESS_DELETE.message
            delete MENSSAGES.DEFAULT_HEADER.items
            return MENSSAGES.DEFAULT_HEADER

        } else {
            return validarId
        }

    } catch (error) {
        return MENSSAGES.ERROR_INTERNAL_SERVER_CONTRLOLLER
    }
}

const inserirIdioma = async (idioma, contentType) => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarIdioma(idioma);

            if (!validar) {
                let resultidioma = await idiomaDAO.setIdioma(idioma)

                if (resultidioma) {
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

    } catch (error) {
        return MENSSAGENS.ERROR_INTERNAL_SERVER_CONTRLOLLER
    }
}

const validarIdioma = async (idioma) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))

    //Validação do nome
    if (idioma.nome == '' || idioma.nome == undefined || idioma.nome == null || idioma.nome.length > 100) {
        MENSSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome incorreto]'

        return MENSSAGES.ERROR_REQUIRED_FIELDS

    }
    else if (idioma.sigla == '' || idioma.sigla == undefined || idioma.sigla == null || idioma.sigla.length > 10) {
        console.log('aqui')
        MENSSAGES.ERROR_REQUIRED_FIELDS.message += '[Sigla incorreto]'
        return MENSSAGES.ERROR_REQUIRED_FIELDS
    }
    //Validação da descrição
    else if (idioma.descricao.length > 500) {
        MENSSAGES.ERROR_REQUIRED_FIELDS.message += '[Descrição incorreta]'
        return MENSSAGES.ERROR_REQUIRED_FIELDS
    }
    if (idioma.data_criaca) {

        if (idioma.data_criacao.length != 10) {
            MENSSAGES.ERROR_REQUIRED_FIELDS.message += '[Data de criação incorreta]'
            return MENSSAGES.ERROR_REQUIRED_FIELDS
        }
    }
    else if (idioma.familia_linguistica.length > 50 || idioma.familia_linguistica == '' || idioma.familia_linguistica == undefined || idioma.familia_linguistica == null) {
        MENSSAGES.ERROR_REQUIRED_FIELDS.message += '[Familia linguistica incorreta]'
        return MENSSAGES.ERROR_REQUIRED_FIELDS
    }
   
    else {
    return false
}
}

module.exports = {
    listarIdiomas,
    buscarIdiomasId,
    excluirIdioma,
    inserirIdioma
}