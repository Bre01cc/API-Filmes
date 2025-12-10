/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL para o CRUD de Filmes
 * Data: 01/10/2025
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0 (CRUD básico do filme, sem as relações com outras tabelas)
 * Versão: 1.1 (CRUD do filme com relacionamento com tabela genero)
 ***********************************************************************************************************************/

//Imports
const filmeDAO = require('../../model/DAO/filme.js')
//Importe
const ControllerFilmeGenero = require('./controller_filme_genero.js')
const DEFAULT_MENSSAGENS = require('../modulo/config_menssages.js')

//Retorna uma lista de todos os filmes
const listarFilmes = async () => {

    //cRIANDO UM OBJETO NOVO PARA AS MENSAGENS
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGENS))
    //Chama a funçã do DAO para retornar a lista de filmes do BD
    let resulFilmes = await filmeDAO.getSelectAllFilms();
    try {

        if (resulFilmes) {

            if (resulFilmes.length > 0) {

                for (filme of resulFilmes) {
                    let resultGenerosFilme = await ControllerFilmeGenero.listarGenerosIdFilme(filme.id_filme)
                    if (resultGenerosFilme.status_code == 200) {
                        filme.genero = resultGenerosFilme.items.filmes_generos
                    }

                }
                MENSSAGES.DEFAULT_HEADER.status = MENSSAGES.SUCCESS_REQUEST.status
                MENSSAGES.DEFAULT_HEADER.status_code = MENSSAGES.SUCCESS_REQUEST.status_code
                MENSSAGES.DEFAULT_HEADER.items.filmes = resulFilmes

                return MENSSAGES.DEFAULT_HEADER
            } else {
                return MENSSAGES.ERROR_NOT_FOUND
            }
        } else {
            return MENSSAGES.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return MENSSAGES.ERROR_INTERNAL_SERVER_CONTRLOLLER
    }


}

//Retorna um filme pelo ID
const buscarFilmesId = async (id) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGENS))
    try {


        //Validação da chegada do ID
        if (!isNaN(id) && id != null && id > 0) {
            //cria uma variável local para executar a função getSelectByFilms, passando para ela o ID
            let resultFilmes = await filmeDAO.getSelectByFilms(Number(id))

            //Se getSelectByFilms tiver sido executado corretamente  ele vai passar nessa primeira verificação, já caso algo estiver errado o valor de resultFilmes será false
            if (resultFilmes) {

                //Verificando se resulfilmes não está vazio
                if (resultFilmes.length > 0) {
                    let resultGenerosFilme = await ControllerFilmeGenero.listarGenerosIdFilme(id)

                    if (resultGenerosFilme.status_code == 200) {
                        resultFilmes[0].genero = resultGenerosFilme.items.filmes_generos
                    }

                    MENSSAGES.DEFAULT_HEADER.status = MENSSAGES.SUCCESS_REQUEST.status
                    MENSSAGES.DEFAULT_HEADER.status_code = MENSSAGES.SUCCESS_REQUEST.status_code
                    MENSSAGES.DEFAULT_HEADER.items.filme = resultFilmes


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


//Inserir uma lista de todos os filmes
const inserirFilme = async (filme, contentType) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGENS))


    try {
        //Validação das entradas de dados
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //Chama a função de validar todos os dados do filme
            let validar = await validarDadosFilmes(filme)

            if (!validar) {


                //Chama a função para inserir um novo filme no BD
                let resultFilmes = await filmeDAO.setInsertFilms(filme)

                if (resultFilmes) {
                    //Chama a  função para receber o ID gerado no BD
                    let lastID = await filmeDAO.getSelectLastId();
                    if (lastID) {

                        // filme.genero.forEach( async function(genero){
                        //for of para a execução do código até ser finalizado, diferente forEach onde o coódigo continua.
                        if (filme.genero != undefined) {
                            for (genero of filme.genero) {
                                let filmeGenero = {
                                    id_filme: lastID,
                                    id_genero: genero.id_genero
                                }
                               
                                let resultFilmesGeneros = await ControllerFilmeGenero.inserirFilmeGenero(filmeGenero, contentType)

                                if (resultFilmesGeneros.status_code != 201) {
                                    return MENSSAGES.ERROR_RELATION_TABLE // 200, porem com problemas na tabela de relação
                                } else {
                                    //Adiciona o ID no JSON com os dados do filme

                                    //Processamento para trazer dados dos generos cadastratos na tabela  de relação
                                    delete filme.genero
                                    let resultGenerosFilme = await ControllerFilmeGenero.listarGenerosIdFilme(lastID)

                                    //Adicionar novamente o atributo genero com todas as informações do genero (id,nome)
                                    filme.genero = resultGenerosFilme.items.filmes_generos
                                }

                            }
                        }

                        filme.id = lastID
                        MENSSAGES.DEFAULT_HEADER.status = MENSSAGES.SUCCESS_CREATED_ITEM.status
                        MENSSAGES.DEFAULT_HEADER.status_code = MENSSAGES.SUCCESS_CREATED_ITEM.status_code
                        MENSSAGES.DEFAULT_HEADER.message = MENSSAGES.SUCCESS_CREATED_ITEM.message
                        MENSSAGES.DEFAULT_HEADER.items = filme
                        return MENSSAGES.DEFAULT_HEADER//201

                    } else {
                        return MENSSAGES.ERROR_INTERNAL_SERVER_MODEL//500
                    }

                } else {

                    return MENSSAGES.ERROR_INTERNAL_SERVER_MODEL//500
                }
            }
            else {
                return validar
            }
        }
        else {
            return MENSSAGES.ERROR_CONTENT_TYPE
        }
    } catch (error) {
      
        return MENSSAGES.ERROR_INTERNAL_SERVER_CONTRLOLLER

    }

}

//Atualiza um filme buscando pelo ID
const atualizarFilme = async (filme, id, contentType) => {
    let MENSSAGENS = JSON.parse(JSON.stringify(DEFAULT_MENSSAGENS))

    try {
        //Validação das entradas de dados
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Validação de id, se existe no BD

            //Chama a função de validar todos os dados do filme
            let validar = await validarDadosFilmes(filme)

            if (!validar) {
                // Validação de id, chamndo a função que verifica no BD
                let validarId = await buscarFilmesId(id)
                if (validarId.status_code == 200) {


                    // adiciona o ID do filme no JSON de dados para ser encaminhado
                    filme.id = Number(id)

                    //Chama a função para inserir um novo filme no BD
                    let resultFilmes = await filmeDAO.setUpdateFilms(filme)
                    if (resultFilmes) {

                        let excluirGeneros = await ControllerFilmeGenero.excluirGenerosIdFilme(id)
                        
                        if (excluirGeneros.status_code != 200 && excluirGeneros.status_code != 404) {

                            return MENSSAGENS.ERROR_RELATION_TABLE

                        } else {
                            for (genero of filme.genero) {
                                let filmeGenero = {
                                    id_filme: id,
                                    id_genero: genero.id_genero
                                }
                             
                                let resultFilmesGeneros = await ControllerFilmeGenero.inserirFilmeGenero(filmeGenero, contentType)

                                if (resultFilmesGeneros.status_code != 201) {
                                    return MENSSAGENS.ERROR_RELATION_TABLE // 200, porem com problemas na tabela de relação
                                }
                            }
                        }

                        MENSSAGENS.DEFAULT_HEADER.status = MENSSAGENS.SUCCESS_UPDATE_ITEM.status
                        MENSSAGENS.DEFAULT_HEADER.status_code = MENSSAGENS.SUCCESS_UPDATE_ITEM.status_code
                        MENSSAGENS.DEFAULT_HEADER.message = MENSSAGENS.SUCCESS_UPDATE_ITEM.message
                        MENSSAGENS.DEFAULT_HEADER.items.filme = filme


                        return MENSSAGENS.DEFAULT_HEADER//200

                    } else {

                        return MENSSAGENS.ERROR_INTERNAL_SERVER_MODEL//500
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
            return MENSSAGENS.ERROR_CONTENT_TYPE//415
        }
    } catch (error) {
        return MENSSAGENS.ERROR_INTERNAL_SERVER_CONTRLOLLER
    }
}

//Exclui um filme buscando pelo ID
const excluirFilme = async (id) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGENS))
    //Chama a funçã do DAO para retornar a lista de filmes do BD
    try {

        let validarId = await buscarFilmesId(id)
        if (validarId.status_code == 200) {


            let excluirGeneros = await ControllerFilmeGenero.excluirGenerosIdFilme(id)

          if (excluirGeneros.status_code == 500) {

                return MENSSAGES.ERROR_RELATION_TABLE

            }else{
                let deletarFilme = await filmeDAO.setDeleteFilms(id);
                if (deletarFilme) {
                    MENSSAGES.DEFAULT_HEADER.status = MENSSAGES.SUCCESS_DELETE.status
                    MENSSAGES.DEFAULT_HEADER.status_code = MENSSAGES.SUCCESS_DELETE.status_code
                    MENSSAGES.DEFAULT_HEADER.message = MENSSAGES.SUCCESS_DELETE.message
                    delete MENSSAGES.DEFAULT_HEADER.items
                    return MENSSAGES.DEFAULT_HEADER
                } else {
                    return MENSSAGES.ERROR_INTERNAL_SERVER_MODEL
                }
            }
            
        } else {
            return validarId
        }

    } catch (error) {
        return MENSSAGES.ERROR_INTERNAL_SERVER_CONTRLOLLER
    }




}

//Validação dos dados de cadastro e atualização de filmes
const validarDadosFilmes = async (filme) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGENS))

    if (filme.nome == '' || filme.nome == undefined || filme.nome == null || filme.nome.length > 100) {
        MENSSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome incorreto]'
        return MENSSAGES.ERROR_REQUIRED_FIELDS

    }
    else if (filme.sinopse == undefined) {
        MENSSAGES.ERROR_REQUIRED_FIELDS.message += '[Sinopse incorreto]'
        return MENSSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.data_lancamento == undefined || filme.data_lancamento.length != 10) {
        MENSSAGES.ERROR_REQUIRED_FIELDS.message += '[Data_lancamento incorreto]'
        return MENSSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.duracao == '' || filme.duracao == undefined || filme.duracao == null || filme.duracao.length > 8) {
        MENSSAGES.ERROR_REQUIRED_FIELDS.message += '[Duração incorreto]'
        return MENSSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.orcamento == '' || filme.orcamento == undefined || filme.orcamento == null || filme.orcamento.length > 12 || typeof (filme.orcamento) != 'number') {
        MENSSAGES.ERROR_REQUIRED_FIELDS.message += '[Orçamento incorreto]'

        return MENSSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.trailer == undefined || filme.trailer.length > 200 || filme.trailer == null || filme.trailer == '') {

        MENSSAGES.ERROR_REQUIRED_FIELDS.message += '[Trailer incorreto]'
        return MENSSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.capa == '' || filme.capa == undefined || filme.capa == null || filme.capa.length > 200) {
        MENSSAGES.ERROR_REQUIRED_FIELDS.message += '[Capa incorreta]'
        return MENSSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}

//Exporte das funções
module.exports = {
    listarFilmes,
    buscarFilmesId,
    inserirFilme,
    excluirFilme,
    atualizarFilme
}