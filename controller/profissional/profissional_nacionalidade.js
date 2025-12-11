/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL para o crud na relação entre profissional e nacionalidade
 * Data: 10/122/2025
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

//Imports
const profissionalNacionalidadeDAO = require('../../model/DAO/profissional_nacionalidade.js')
const DEFAULT_MENSSAGES = require('../modulo/config_menssages.js')

//Retorna  os profissional e nacionalidade
const listarProfissionalNacionalidade = async () => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))

    let resultProfissionalNacionalidade = await profissionalNacionalidadeDAO.getSelectAllProfessionalNationality()

    try {
        if (resultProfissionalNacionalidade) {
            if (resultProfissionalNacionalidade.length > 0) {
                MENSSAGES.DEFAULT_HEADER.status = MENSSAGES.SUCCESS_REQUEST.status
                MENSSAGES.DEFAULT_HEADER.status_code = MENSSAGES.SUCCESS_REQUEST.status_code
                MENSSAGES.DEFAULT_HEADER.items.profissional_nacionalidade = resultProfissionalNacionalidade

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


//Retorna o profissional e nacionalidade pelo Id
const buscarProfissionalNacionalidadeId = async (id) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))

    try {
        //Validação da chegada do ID
        if (!isNaN(id) && id != null && id > 0) {

            let resultProfissionalNacionalidade = await profissionalNacionalidadeDAO.getSelectByProfessionalNationality(Number(id))


            if (resultProfissionalNacionalidade) {

                if (resultProfissionalNacionalidade.length > 0) {
                    MENSSAGES.DEFAULT_HEADER.status = MENSSAGES.SUCCESS_REQUEST.status
                    MENSSAGES.DEFAULT_HEADER.status_code = MENSSAGES.SUCCESS_REQUEST.status_code
                    MENSSAGES.DEFAULT_HEADER.items.profissional_nacionalidade = resultProfissionalNacionalidade

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

//Retorna o profissional e nacionalidade pelo id da nacionalidade
const buscarProfissionalIdNacionalidade = async (id_nacionalidade) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))

    try {
        //Validação da chegada do ID
        if (!isNaN(id_nacionalidade) && id_nacionalidade != null && id_nacionalidade > 0) {

            let resultProfissionalNacionalidade = await profissionalNacionalidadeDAO.getSelectProfessionalIdNationalities(Number(id_nacionalidade))

            if (resultProfissionalNacionalidade) {

                if (resultProfissionalNacionalidade.length > 0) {
                    MENSSAGES.DEFAULT_HEADER.status = MENSSAGES.SUCCESS_REQUEST.status
                    MENSSAGES.DEFAULT_HEADER.status_code = MENSSAGES.SUCCESS_REQUEST.status_code
                    MENSSAGES.DEFAULT_HEADER.items.profissional_nacionalidade = resultProfissionalNacionalidade

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

//Retorna o profissional e nacionalidade pelo id do profissional
const buscarProfissionalIdProfissional = async (id_profissional) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))

    try {
        //Validação da chegada do ID
        if (!isNaN(id_profissional) && id_profissional != null && id_profissional > 0) {

            let resultProfissionalNacionalidade = await profissionalNacionalidadeDAO.getSelectNationalitiesIdProfissional(Number(id_profissional))

            if (resultProfissionalNacionalidade) {

                if (resultProfissionalNacionalidade.length > 0) {

                    MENSSAGES.DEFAULT_HEADER.status = MENSSAGES.SUCCESS_REQUEST.status
                    MENSSAGES.DEFAULT_HEADER.status_code = MENSSAGES.SUCCESS_REQUEST.status_code
                    MENSSAGES.DEFAULT_HEADER.items.profissional_nacionalidade = resultProfissionalNacionalidade

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

//Lista as nacionalidades de um profissional
const listarNacionalidadeByProfissional = async (id_profissional) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))

    try {
        //Validação da chegada do ID
        if (!isNaN(id_profissional) && id_profissional != null && id_profissional > 0) {

            let resultProfissionalNacionalidade = await profissionalNacionalidadeDAO.getSelectNationalitiesByProfissional(Number(id_profissional))


            if (resultProfissionalNacionalidade) {

                if (resultProfissionalNacionalidade.length > 0) {
                    resultProfissionalNacionalidade.forEach(profissional => {
                        delete profissional.id
                        delete profissional.id_profissional
                        delete profissional.nome

                    })
                    MENSSAGES.DEFAULT_HEADER.status = MENSSAGES.SUCCESS_REQUEST.status
                    MENSSAGES.DEFAULT_HEADER.status_code = MENSSAGES.SUCCESS_REQUEST.status_code
                    MENSSAGES.DEFAULT_HEADER.items.profissional_nacionalidade = resultProfissionalNacionalidade

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

//Lista os profissionais de uma nacionalidade
const listarProfissionalByNacionalidade = async (id_nacionalidade) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))

    try {
        //Validação da chegada do ID
        if (!isNaN(id_nacionalidade) && id_nacionalidade != null && id_nacionalidade > 0) {

            let resultProfissionalNacionalidade = await profissionalNacionalidadeDAO.getSelectNationalitiesByProfessional(Number(id_nacionalidade))


            if (resultProfissionalNacionalidade) {

                if (resultProfissionalNacionalidade.length > 0) {
                    MENSSAGES.DEFAULT_HEADER.status = MENSSAGES.SUCCESS_REQUEST.status
                    MENSSAGES.DEFAULT_HEADER.status_code = MENSSAGES.SUCCESS_REQUEST.status_code
                    MENSSAGES.DEFAULT_HEADER.items.profissional_nacionalidade = resultProfissionalNacionalidade

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

//Inseri um profissionalNacionalidade no banco
const inserirProfissionalNacionalidade = async (profissionalNacionalidade, contentType) => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarProfissionalNacilidade(profissionalNacionalidade);

            if (!validar) {

                let resultprofissionalNacionalidade = await profissionalNacionalidadeDAO.setInsertProfessionalNationality(profissionalNacionalidade)

                if (resultprofissionalNacionalidade) {

                    let ultimoId = await profissionalNacionalidadeDAO.getSelectLastId()
                    if (ultimoId) {
                        profissionalNacionalidade.id = ultimoId
                        MENSSAGENS.DEFAULT_HEADER.status = MENSSAGENS.SUCCESS_CREATED_ITEM.status
                        MENSSAGENS.DEFAULT_HEADER.status_code = MENSSAGENS.SUCCESS_CREATED_ITEM.status_code
                        MENSSAGENS.DEFAULT_HEADER.message = MENSSAGENS.SUCCESS_CREATED_ITEM.message
                        MENSSAGENS.DEFAULT_HEADER.items.profissional_nacionalidade = profissionalNacionalidade

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
        console.log(error)
        return MENSSAGENS.ERROR_INTERNAL_SERVER_CONTRLOLLER
    }

}

//Atualizar os dados de um profissionalNacionalidade
const atualizarProfissionaNacionalidade = async (ProfissionalNacilidade, id, contentType) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))

    try {
        //Validação das entradas de dados
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Validação de id, se existe no BD

            //Chama a função de validar todos os dados
            let validar = await validarProfissionalNacilidade(ProfissionalNacilidade)

            if (!validar) {
                // Validação de id, chamndo a função que verifica no BD
                let validarId = await buscarProfissionalNacionalidadeId(id)
                if (validarId.status_code == 200) {
                    // adiciona o ID no JSON de dados para ser encaminhado
                    ProfissionalNacilidade.id = Number(id)

                    //Chama a função para inserir um novo item no BD
                    let resultProfissionalNacilidade = await profissionalNacionalidadeDAO.setUpdateProfessionalNationality(ProfissionalNacilidade)
                    if (resultProfissionalNacilidade) {

                        MENSSAGES.DEFAULT_HEADER.status = MENSSAGES.SUCCESS_UPDATE_ITEM.status
                        MENSSAGES.DEFAULT_HEADER.status_code = MENSSAGES.SUCCESS_UPDATE_ITEM.status_code
                        MENSSAGES.DEFAULT_HEADER.message = MENSSAGES.SUCCESS_UPDATE_ITEM.message
                        MENSSAGES.DEFAULT_HEADER.items.profissional_nacionalidade = ProfissionalNacilidade


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


//Valida os dados de um profissionalNacionalidade
const validarProfissionalNacilidade = async (ProfissionalNacionalidade) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))

    //Validação do nome
    if (ProfissionalNacionalidade.id_profissional <= 0 || isNaN(ProfissionalNacionalidade.id_profissional) || ProfissionalNacionalidade.id_profissional == undefined || ProfissionalNacionalidade.id_profissional == null || ProfissionalNacionalidade.id_profissional == '') {
        MENSSAGES.ERROR_REQUIRED_FIELDS.message += '[Id profissional incorreto]'
        return MENSSAGES.ERROR_REQUIRED_FIELDS
    }
    else if (ProfissionalNacionalidade.id_nacionalidade <= 0 || isNaN(ProfissionalNacionalidade.id_nacionalidade) || ProfissionalNacionalidade.id_nacionalidade == undefined || ProfissionalNacionalidade.id_nacionalidade == null || ProfissionalNacionalidade.id_nacionalidade == '') {
        MENSSAGES.ERROR_REQUIRED_FIELDS.message += '[Id nacionalidade incorreto]'
        return MENSSAGES.ERROR_REQUIRED_FIELDS
    }

    else {
        return false
    }
}

//Deleta um profissionalNacionalidade pelo ID
const excluirProfissionalNacionalidade = async (id) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))

    try {

        let validarId = await buscarProfissionalNacionalidadeId(id)
        if (validarId.status_code == 200) {

            let deletarProfissionalIdioma = await profissionalNacionalidadeDAO.setDeleteProfessionalNationality(id);
            if (deletarProfissionalIdioma) {
                MENSSAGES.DEFAULT_HEADER.status = MENSSAGES.SUCCESS_DELETE.status
                MENSSAGES.DEFAULT_HEADER.status_code = MENSSAGES.SUCCESS_DELETE.status_code
                MENSSAGES.DEFAULT_HEADER.message = MENSSAGES.SUCCESS_DELETE.message
                delete MENSSAGES.DEFAULT_HEADER.items
                return MENSSAGES.DEFAULT_HEADER
            } else {
                return MENSSAGES.ERROR_INTERNAL_SERVER_MODEL
            }


        } else {
            return validarId
        }

    } catch (error) {

        return MENSSAGES.ERROR_INTERNAL_SERVER_CONTRLOLLER
    }




}

//Excluir profissionalNacionalidade pelo id do profissional
const excluirNacionalidadeid_profissional = async (id) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))

    try {

        let validarId = await buscarProfissionalIdProfissional(id)
        if (validarId.status_code == 200) {

            let deletarProfissionalIdioma = await profissionalNacionalidadeDAO.setDeleteNationalitiesByProfessional(id);
            if (deletarProfissionalIdioma) {
                MENSSAGES.DEFAULT_HEADER.status = MENSSAGES.SUCCESS_DELETE.status
                MENSSAGES.DEFAULT_HEADER.status_code = MENSSAGES.SUCCESS_DELETE.status_code
                MENSSAGES.DEFAULT_HEADER.message = MENSSAGES.SUCCESS_DELETE.message
                delete MENSSAGES.DEFAULT_HEADER.items
                return MENSSAGES.DEFAULT_HEADER
            } else {
                return MENSSAGES.ERROR_INTERNAL_SERVER_MODEL
            }


        } else {
            return validarId
        }

    } catch (error) {
        return MENSSAGES.ERROR_INTERNAL_SERVER_CONTRLOLLER
    }




}
//Excluir profissionalNacionalidade pelo id da nacionalidade
const excluirProfissionalId_nacionalidade = async (id) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))

    try {

        let validarId = await buscarProfissionalIdNacionalidade(id)

        if (validarId.status_code == 200) {

            let deletarProfissionalIdioma = await profissionalNacionalidadeDAO.setDeleteProfessionalByNationalitie(id);

            if (deletarProfissionalIdioma) {
                MENSSAGES.DEFAULT_HEADER.status = MENSSAGES.SUCCESS_DELETE.status
                MENSSAGES.DEFAULT_HEADER.status_code = MENSSAGES.SUCCESS_DELETE.status_code
                MENSSAGES.DEFAULT_HEADER.message = MENSSAGES.SUCCESS_DELETE.message
                delete MENSSAGES.DEFAULT_HEADER.items
                return MENSSAGES.DEFAULT_HEADER
            } else {
                return MENSSAGES.ERROR_INTERNAL_SERVER_MODEL
            }


        } else {
            return validarId
        }

    } catch (error) {
        return MENSSAGES.ERROR_INTERNAL_SERVER_CONTRLOLLER
    }




}
module.exports = {
    listarNacionalidadeByProfissional,
    listarProfissionalByNacionalidade,
    listarProfissionalNacionalidade,
    buscarProfissionalIdNacionalidade,
    buscarProfissionalIdProfissional,
    buscarProfissionalNacionalidadeId,
    inserirProfissionalNacionalidade,
    atualizarProfissionaNacionalidade,
    excluirNacionalidadeid_profissional,
    excluirProfissionalId_nacionalidade,
    excluirProfissionalNacionalidade
}