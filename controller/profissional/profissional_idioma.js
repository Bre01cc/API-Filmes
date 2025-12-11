/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL para o crud na relação entre profissional e idioma
 * Data: 09/12/2025
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

//Imports
const profissionalIdiomaDAO = require('../../model/DAO/profissional_idioma.js')
const DEFAULT_MENSSAGES = require('../modulo/config_menssages.js')

//Retorna  os profissional e idioma
const listarProfissionalIdioma= async () => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))

    let resultProfissionalIdioma = await profissionalIdiomaDAO.getSelectAllProfissionalIdioma()
    
    try {
        if (resultProfissionalIdioma) {
            if (resultProfissionalIdioma.length > 0) {
                MENSSAGES.DEFAULT_HEADER.status = MENSSAGES.SUCCESS_REQUEST.status
                MENSSAGES.DEFAULT_HEADER.status_code = MENSSAGES.SUCCESS_REQUEST.status_code
                MENSSAGES.DEFAULT_HEADER.items.profissional_idioma = resultProfissionalIdioma

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


//Retorna o profissional e idioma pelo Id
const buscarProfissionalIdiomaId = async (id) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))

    try {
        //Validação da chegada do ID
        if (!isNaN(id) && id != null && id > 0) {
           
            let resultProfissionalIdioma = await profissionalIdiomaDAO.getSelectByProfissionalIdioma(Number(id))

        
            if (resultProfissionalIdioma) {
               
                if (resultProfissionalIdioma.length > 0) {
                    MENSSAGES.DEFAULT_HEADER.status = MENSSAGES.SUCCESS_REQUEST.status
                    MENSSAGES.DEFAULT_HEADER.status_code = MENSSAGES.SUCCESS_REQUEST.status_code
                    MENSSAGES.DEFAULT_HEADER.items.profissional_idioma = resultProfissionalIdioma

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

//Retorna o profissional e idioma pelo id do idioma
const buscarProfissionalIdIdioma = async (id_idioma) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))

    try {
        //Validação da chegada do ID
        if (!isNaN(id_idioma) && id_idioma != null && id_idioma > 0) {
           
            let resultProfissionalIdioma = await profissionalIdiomaDAO.getSelectProfissionalIdiomaByIdiomas(Number(id_idioma))

            if (resultProfissionalIdioma) {
                
                if (resultProfissionalIdioma.length > 0) {
                    MENSSAGES.DEFAULT_HEADER.status = MENSSAGES.SUCCESS_REQUEST.status
                    MENSSAGES.DEFAULT_HEADER.status_code = MENSSAGES.SUCCESS_REQUEST.status_code
                    MENSSAGES.DEFAULT_HEADER.items.profissional_idioma = resultProfissionalIdioma

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

//Retorna o profissional e idioma pelo id do profissional
const buscarProfissionalIdProfissional = async (id_profissional) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))

    try {
        //Validação da chegada do ID
        if (!isNaN(id_profissional) && id_profissional != null && id_profissional > 0) {
           
            let resultProfissionalIdioma = await profissionalIdiomaDAO.getSelectProfissionalIdiomaByProfissional(Number(id_profissional))

            if (resultProfissionalIdioma) {
                
                if (resultProfissionalIdioma.length > 0) {
                    MENSSAGES.DEFAULT_HEADER.status = MENSSAGES.SUCCESS_REQUEST.status
                    MENSSAGES.DEFAULT_HEADER.status_code = MENSSAGES.SUCCESS_REQUEST.status_code
                    MENSSAGES.DEFAULT_HEADER.items.profissional_idioma = resultProfissionalIdioma

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

//Lista os idiomas de um profissional
const listaridiomaByProfissional = async (id_profissional) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))

    try {
        //Validação da chegada do ID
        if (!isNaN(id_profissional) && id_profissional != null && id_profissional > 0) {
          
            let resultProfissionalIdioma = await profissionalIdiomaDAO.getSelectIdiomaByProfessional(Number(id_profissional))

         
            if (resultProfissionalIdioma) {
                //Verificando se resulfilmes não está vazio
                if (resultProfissionalIdioma.length > 0) {
                    resultProfissionalIdioma.forEach(profissional => {
                        delete profissional.id
                        delete profissional.id_profissional
                        delete profissional.nome

                    })
                    MENSSAGES.DEFAULT_HEADER.status = MENSSAGES.SUCCESS_REQUEST.status
                    MENSSAGES.DEFAULT_HEADER.status_code = MENSSAGES.SUCCESS_REQUEST.status_code
                    MENSSAGES.DEFAULT_HEADER.items.profissional_idioma = resultProfissionalIdioma

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

//Lista os profissionais de um idioma
const listarProfissionalByIdioma = async (id_idioma) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))

    try {
        //Validação da chegada do ID
        if (!isNaN(id_idioma) && id_idioma != null && id_idioma > 0) {
            //cria uma variável local para executar a função getSelectByFilms, passando para ela o ID
            let resultProfissionalIdioma = await profissionalIdiomaDAO.getSelectProfissionalByIdiomas(Number(id_idioma))

            
            if (resultProfissionalIdioma) {
                
                if (resultProfissionalIdioma.length > 0) {
                    MENSSAGES.DEFAULT_HEADER.status = MENSSAGES.SUCCESS_REQUEST.status
                    MENSSAGES.DEFAULT_HEADER.status_code = MENSSAGES.SUCCESS_REQUEST.status_code
                    MENSSAGES.DEFAULT_HEADER.items.profissional_idioma = resultProfissionalIdioma

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

//Inseri um profissionalIdioma no banco
const inserirProfissionalIdioma = async (ProfissionalIdioma, contentType) => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarProfissionalIdioma(ProfissionalIdioma);

            if (!validar) {

                let resultProfissionalIdioma = await profissionalIdiomaDAO.setInsertProfissionalIdioma(ProfissionalIdioma)

                if (resultProfissionalIdioma) {

                    let ultimoId = await profissionalIdiomaDAO.getSelectLastId()
                    if (ultimoId) {
                        ProfissionalIdioma.id = ultimoId
                        MENSSAGENS.DEFAULT_HEADER.status = MENSSAGENS.SUCCESS_CREATED_ITEM.status
                        MENSSAGENS.DEFAULT_HEADER.status_code = MENSSAGENS.SUCCESS_CREATED_ITEM.status_code
                        MENSSAGENS.DEFAULT_HEADER.message = MENSSAGENS.SUCCESS_CREATED_ITEM.message
                        MENSSAGENS.DEFAULT_HEADER.items.profissional_idioma = ProfissionalIdioma

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

//Atualizar os dados de um profissionalIdioma
const atualizarProfissionalIdioma = async (ProfissionalIdioma, id, contentType) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))

    try {
        //Validação das entradas de dados
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Validação de id, se existe no BD

            //Chama a função de validar todos os dados
            let validar = await validarProfissionalIdioma(ProfissionalIdioma)

            if (!validar) {
                // Validação de id, chamndo a função que verifica no BD
                let validarId = await buscarProfissionalIdiomaId(id)
                if (validarId.status_code == 200) {
                    // adiciona o ID no JSON de dados para ser encaminhado
                    ProfissionalIdioma.id = Number(id)

                    //Chama a função para inserir um novo item no BD
                    let resultProfissionalIdioma = await profissionalIdiomaDAO.setUpdateProfissionalIdioma(ProfissionalIdioma)
                    if (resultProfissionalIdioma) {

                        MENSSAGES.DEFAULT_HEADER.status = MENSSAGES.SUCCESS_UPDATE_ITEM.status
                        MENSSAGES.DEFAULT_HEADER.status_code = MENSSAGES.SUCCESS_UPDATE_ITEM.status_code
                        MENSSAGES.DEFAULT_HEADER.message = MENSSAGES.SUCCESS_UPDATE_ITEM.message
                        MENSSAGES.DEFAULT_HEADER.items.profissional_idioma = ProfissionalIdioma


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


//Valida os dados de um profissionalIdioma
const validarProfissionalIdioma = async (ProfissionalIdioma) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))

    //Validação do nome
    if (ProfissionalIdioma.id_profissional <= 0 || isNaN(ProfissionalIdioma.id_profissional) || ProfissionalIdioma.id_profissional == undefined || ProfissionalIdioma.id_profissional == null || ProfissionalIdioma.id_profissional == '') {
        MENSSAGES.ERROR_REQUIRED_FIELDS.message += '[Id profissional incorreto]'
        return MENSSAGES.ERROR_REQUIRED_FIELDS
    }
    else if (ProfissionalIdioma.id_idioma <= 0 || isNaN(ProfissionalIdioma.id_idioma) || ProfissionalIdioma.id_idioma == undefined || ProfissionalIdioma.id_idioma == null || ProfissionalIdioma.id_idioma == '') {
        MENSSAGES.ERROR_REQUIRED_FIELDS.message += '[Id idioma incorreto]'
        return MENSSAGES.ERROR_REQUIRED_FIELDS
    }

    else {
        return false
    }
}

//Deleta um profissionalIdioma pelo ID
const excluirProfissionalIdioma = async (id) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))
    //Chama a funçã do DAO para retornar a lista de filmes do BD
    try {

        let validarId = await buscarProfissionalIdiomaId(id)
        if (validarId.status_code == 200) {

            let deletarProfissionalIdioma = await profissionalIdiomaDAO.setDeleteProfissionalIdioma(id);
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

//Excluir profissionalIdioma pelo id do profissional
const excluirIdiomasid_profissional = async (id) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))
    //Chama a funçã do DAO para retornar a lista de filmes do BD
    try {

        let validarId = await buscarProfissionalIdProfissional(id)
        if (validarId.status_code == 200) {

            let deletarProfissionalIdioma = await profissionalIdiomaDAO.setDeleteIdiomaByProfissional(id);
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
//Excluir profissionalIdioma pelo id do idioma
const excluirProfissionalId_idiomas = async (id) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))
    //Chama a funçã do DAO para retornar a lista de filmes do BD
    try {

        let validarId = await buscarProfissionalIdIdioma(id)
     
        if (validarId.status_code == 200) {
   
            let deletarProfissionalIdioma = await profissionalIdiomaDAO.setDeleteProfissionalByIdioma(id);
           
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
   listarProfissionalIdioma,
   listarProfissionalByIdioma,
   listaridiomaByProfissional,
   buscarProfissionalIdIdioma,
   buscarProfissionalIdProfissional,
   buscarProfissionalIdiomaId,
   inserirProfissionalIdioma,
   atualizarProfissionalIdioma,
   excluirProfissionalIdioma,
   excluirIdiomasid_profissional,
   excluirProfissionalId_idiomas
}