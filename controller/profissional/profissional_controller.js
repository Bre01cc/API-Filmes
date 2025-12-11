/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL para o CRUD de profissional
 * Data: 04/11/2025
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/


//Imports
const profissionalDAO = require('../../model/DAO/profissional.js')
const ControllerProfissionalNacionalidade = require('./profissional_nacionalidade.js')
const ControllerProfissionalIdioma = require('./profissional_idioma.js')
const DEFAULT_MENSAGENS = require('../modulo/config_menssages.js')

//Retorna todos os profissionais
const listarProfissional = async () => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    let resultProfissional = await profissionalDAO.getSelectAllprofissional()
    try {
        if (resultProfissional) {
            if (resultProfissional.length > 0) {
                for (profissional of resultProfissional) {
                    let resultNacionalidadeProfissional = await ControllerProfissionalNacionalidade.listarNacionalidadeByProfissional(profissional.id_profissional)

                    if (resultNacionalidadeProfissional.status_code == 200) {

                        profissional.nacionalidade = resultNacionalidadeProfissional.items.profissional_nacionalidade
                    }

                    let resultIdiomaProfissional = await ControllerProfissionalIdioma.listaridiomaByProfissional(profissional.id_profissional)
                    if (resultIdiomaProfissional.status_code == 200) {
                        profissional.idioma = resultIdiomaProfissional.items.profissional_idioma
                    }
                }

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

//Retorna um profissional pelo id
const buscarProfissionalID = async (id) => {
    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {
        if (!isNaN(id) && id != null && id > 0) {

            let resultProfissional = await profissionalDAO.getSelectByprofissional(id)
            if (resultProfissional) {

                if (resultProfissional.length > 0) {

                    for (profissional of resultProfissional) {
                        let resultNacionalidadeProfissional = await ControllerProfissionalNacionalidade.listarNacionalidadeByProfissional(profissional.id_profissional)
                        if (resultNacionalidadeProfissional.status_code == 200) {

                            profissional.nacionalidade = resultNacionalidadeProfissional.items.profissional_nacionalidade
                        }
                        let resultIdiomaProfissional = await ControllerProfissionalIdioma.listaridiomaByProfissional(profissional.id_profissional)
                        if (resultIdiomaProfissional.status_code == 200) {
                            profissional.idioma = resultIdiomaProfissional.items.profissional_idioma
                        }
                    }
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

//Deleta um profissional pelo id
const deletarProfissionalId = async (id) => {
    let MENSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))
    try {
        let validarId = await buscarProfissionalID(id)
        if (validarId.status_code == 200) {

            let excluirNacionalidade = await ControllerProfissionalNacionalidade.excluirNacionalidadeid_profissional(id)
            let excluirIdioma = await ControllerProfissionalIdioma.excluirIdiomasid_profissional(id)

            if (excluirNacionalidade.status_code == 500) {

                return MENSAGENS.ERROR_RELATION_TABLE

            }
            else if (excluirIdioma.status_code == 500) {
                return MENSAGENS.ERROR_RELATION_TABLE
            }
            else {
                let deletarProfissional = await profissionalDAO.setDeleteprofissional(id)
                if (deletarProfissional) {
                    MENSAGENS.DEFAULT_HEADER.status = MENSAGENS.SUCCESS_REQUEST.status
                    MENSAGENS.DEFAULT_HEADER.status_code = MENSAGENS.SUCCESS_REQUEST.status_code
                    MENSAGENS.DEFAULT_HEADER.message = MENSAGENS.SUCCESS_DELETE.message
                    delete MENSAGENS.DEFAULT_HEADER.items

                    return MENSAGENS.DEFAULT_HEADER
                } else {
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

//Inseri um novo profissional
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
                        if (profissional.nacionalidade != undefined) {
                            for (nacionalidade of profissional.nacionalidade) {
                                let profissionalNacionalidade = {
                                    id_profissional: ultimoId,
                                    id_nacionalidade: nacionalidade.id_nacionalidade
                                }

                                let resultNacionalidadeProfissional = await ControllerProfissionalNacionalidade.inserirProfissionalNacionalidade(profissionalNacionalidade, contentType)

                                if (resultNacionalidadeProfissional.status_code != 201) {
                                    return MENSSAGENS.ERROR_RELATION_TABLE // 200, porem com problemas na tabela de relação
                                } else {
                                    //Processamento para trazer dados dos generos cadastratos na tabela  de relação
                                    delete profissional.nacionalidade
                                    console.log(ultimoId)
                                    let nacionalidadeList = await ControllerProfissionalNacionalidade.listarNacionalidadeByProfissional(ultimoId)


                                    profissional.nacionalidade = nacionalidadeList.items.profissional_nacionalidade

                                }

                            }
                        }
                        if (profissional.idioma != undefined) {
                            for (idioma of profissional.idioma) {
                                let profissionalIdioma = {
                                    id_profissional: ultimoId,
                                    id_idioma: idioma.id_idioma
                                }

                                let resultIdiomaProfissional = await ControllerProfissionalIdioma.inserirProfissionalIdioma(profissionalIdioma, contentType)

                                if (resultIdiomaProfissional.status_code != 201) {
                                    return MENSSAGENS.ERROR_RELATION_TABLE // 200, porem com problemas na tabela de relação
                                } else {

                                    delete profissional.idioma
                                    let idiomaList = await ControllerProfissionalIdioma.listaridiomaByProfissional(ultimoId)


                                    profissional.idioma = idiomaList.items.profissional_idioma
                                }

                            }
                        }

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
        console.log(error)
        return MENSSAGENS.ERROR_INTERNAL_SERVER_CONTRLOLLER
    }
}

//Atualiza um profissional pelo id
const atualizarProfissional = async (profissional, id, contentType) => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSAGENS))

    try {


        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let atualizar = true
            const validar = await validarProfissional(profissional, atualizar)

            if (!validar) {


                let validarId = await buscarProfissionalID(id)

                if (validarId.status_code == 200) {

                    profissional.id = Number(id)

                    let resultProfissional = await profissionalDAO.setUpdateProfissional(profissional)
                    if (resultProfissional) {
                        let excluirNacionalidade = await ControllerProfissionalNacionalidade.excluirNacionalidadeid_profissional(id)

                        if (excluirNacionalidade.status_code != 200 && excluirNacionalidade.status_code != 404) {

                            return MENSSAGENS.ERROR_RELATION_TABLE

                        } else {
                            for (nacionalidade of profissional.nacionalidade) {
                                let profissionalNacionalidade = {
                                    id_profissional: id,
                                    id_nacionalidade: nacionalidade.id_nacionalidade
                                }

                                let resultNacionalidadeProfissional = await ControllerProfissionalNacionalidade.inserirProfissionalNacionalidade(profissionalNacionalidade, contentType)

                                if (resultNacionalidadeProfissional.status_code != 201) {
                                    return MENSSAGENS.ERROR_RELATION_TABLE // 200, porem com problemas na tabela de relação
                                } else {
                                    //Processamento para trazer dados dos generos cadastratos na tabela  de relação
                                    // delete profissional.nacionalidade

                                    let nacionalidadeList = await ControllerProfissionalNacionalidade.listarNacionalidadeByProfissional(id)


                                    profissional.nacionalidade = nacionalidadeList.items.profissional_nacionalidade

                                }

                            }
                        }

                        let excluirIdioma = await ControllerProfissionalIdioma.excluirIdiomasid_profissional(id)
                        if (excluirIdioma.status_code != 200 && excluirIdioma.status_code != 404) {
                            return MENSSAGENS.ERROR_RELATION_TABLE
                        } else {
                            for (idioma of profissional.idioma) {
                                let profissionalIdioma = {
                                    id_profissional: id,
                                    id_idioma: idioma.id_idioma
                                }

                                let resultIdiomaProfissional = await ControllerProfissionalIdioma.inserirProfissionalIdioma(profissionalIdioma, contentType)

                                if (resultIdiomaProfissional.status_code != 201) {
                                    return MENSSAGENS.ERROR_RELATION_TABLE // 200, porem com problemas na tabela de relação
                                } else {

                                    // delete profissional.idioma
                                    let idiomaList = await ControllerProfissionalIdioma.listaridiomaByProfissional(id)


                                    profissional.idioma = idiomaList.items.profissional_idioma
                                }

                            }
                        }

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
        console.log(error)
        return MENSSAGENS.ERROR_INTERNAL_SERVER_CONTRLOLLER
    }
}

//Validando os dados do profissional
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

    if (profissional.data_nascimento == undefined || profissional.data_nascimento.length != 10) {
        MENSSAGENS.ERROR_REQUIRED_FIELDS.message += "[Data de nascimento incorreta]"
        return MENSSAGENS.ERROR_REQUIRED_FIELDS
    }

    if ('data_falecimento' in profissional || atualizar) {

        //garantindo que a data falecimento pode ser null, se não hover esse if a condicional abaixo vai cair em um erro ao tentar acessar o lenght de algo que é null
        if (profissional.data_falecimento == null) {
            profissional.data_falecimento = null
        }
        else if (profissional.data_falecimento == undefined || profissional.data_falecimento.length != 10) {
            MENSSAGENS.ERROR_REQUIRED_FIELDS.message += "[Data de falecimento incorreta]"
            return MENSSAGENS.ERROR_REQUIRED_FIELDS
        }

    }

    if (profissional.foto == undefined || profissional.foto == null || profissional.foto == "" || profissional.foto.length > 100) {
        MENSSAGENS.ERROR_REQUIRED_FIELDS.message += "[Foto incorreta]"
        return MENSSAGENS.ERROR_REQUIRED_FIELDS
    }

    if (profissional.sexo == undefined || profissional.sexo == null || profissional.sexo == "" || profissional.sexo.length > 1) {
        MENSSAGENS.ERROR_REQUIRED_FIELDS.message += "[Sexo incorreto]"
        return MENSSAGENS.ERROR_REQUIRED_FIELDS
    }

    if ('rede_social' in profissional || atualizar) {
        if (profissional.rede_social == null) {
            profissional.rede_social = null
        }
        else if (profissional.rede_social == "" || profissional.rede_social == undefined || profissional.rede_social.length > 150) {
            MENSSAGENS.ERROR_REQUIRED_FIELDS.message = + "[Rede social incorreta]"
            return MENSSAGENS.ERROR_REQUIRED_FIELDS
        }
    }

    if (profissional.biografia == undefined || profissional.biografia == null || profissional.biografia == "" || profissional.biografia.length > 500) {
        MENSSAGENS.ERROR_REQUIRED_FIELDS = + "[Biografia incorreta]"
    }

    else {
        return false
    }
}

//Exports das funções
module.exports = {
    listarProfissional,
    buscarProfissionalID,
    deletarProfissionalId,
    inserirProfissional,
    atualizarProfissional
}