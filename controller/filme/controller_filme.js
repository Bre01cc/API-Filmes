/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL para o CRUD de Filmes
 * Data: 01/10/2025
 * Autot: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

//Importe da model do DAO do filme
const filmeDAO = require('../../model/DAO/filme.js')

//Importe do arquivo de mensssagens
const DEFAULT_MENSSAGES = require('../modulo/config_menssages.js')
//Retorna uma lista de todos os filmes
const listarFilmes = async () => {

    //cRIANDO UM OBJETO NOVO PARA AS MENSAGENS
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))
    //Chama a funçã do DAO para retornar a lista de filmes do BD
    let resulFilmes = await filmeDAO.getSelectAllFilms();
    try {
        if (resulFilmes) {
            if (resulFilmes.length > 0) {
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
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))
    try {


        //Validação da chegada do ID
        if (!isNaN(id) && id != null && id > 0) {
            //cria uma variável local para executar a função getSelectByFilms, passando para ela o ID
            let resultFilmes = await filmeDAO.getSelectByFilms(Number(id))

            //Se getSelectByFilms tiver sido executado corretamente  ele vai passar nessa primeira verificação, já caso algo estiver errado o valor de resultFilmes será false
            if (resultFilmes) {
                //Verificando se resulfilmes não está vazio
                if (resultFilmes.length > 0) {
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

            return MENSSAGES.ERROR_REQUIRED_FIELDS

        }

    } catch (error) {
        return MENSSAGES.ERROR_REQUIRED_FIELDS
    }

}

//Inserir uma lista de todos os filmes
const inserirFilme = async (filme, contentType) => {
    let MENSSAGES = JSON.parse(JSON.stringify(DEFAULT_MENSSAGES))

    //Validação das entradas de dados
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON'){
           
            if (filme.nome == '' || filme.nome == undefined || filme.nome == null || filme.nome.length > 100) {
                return MENSSAGES.ERROR_REQUIRED_FIELDS.messages += '[Nome incorreto]'

            }
             else if (filme.sinopse == undefined) {

                return MENSSAGES.ERROR_REQUIRED_FIELDS.messages += '[Sinopse incorreto]'

            } if (filme.data_lancamento == undefined || filme.data_lancamento.length != 10) {

                return MENSSAGES.ERROR_REQUIRED_FIELDS.messages += '[Data_lancamento incorreto]'

            } else if (filme.duracao == '' || filme.duracao == undefined || filme.duracao == null || filme.duracao.length > 8) {

                return MENSSAGES.ERROR_REQUIRED_FIELDS.messages += '[Duração incorreto]'

            } else if (filme.orcamento == '' || filme.orcamento == undefined || filme.orcamento == null || filme.orcamento.length > 12 || typeof (filme.orcamento) != 'number') {

                return MENSSAGES.ERROR_REQUIRED_FIELDS.messages += '[Orçamento incorreto]'

            } else if (filme.trailer == undefined || filme.trailer.length > 200 || filme.trailer == null || filme.trailer == '') {

                return MENSSAGES.ERROR_REQUIRED_FIELDS.messages += '[Trailer incorreto]'

            } else if (filme.capa == '' || filme.capa == undefined || filme.capa == null || filme.capa.length > 200) {
                
                return MENSSAGES.ERROR_REQUIRED_FIELDS.messages += '[Capa incorreta]'

            } else {
               
                //Chama a função para inserir um novo filme no BD
                let resultFilmes = await filmeDAO.setInsertFilms(filme)
                if (resultFilmes) {
                   
                    MENSSAGES.DEFAULT_HEADER.status = MENSSAGES.SUCCESS_CREATED_ITEM.status
                    MENSSAGES.DEFAULT_HEADER.status_code = MENSSAGES.SUCCESS_CREATED_ITEM.status_code
                    MENSSAGES.DEFAULT_HEADER.message = MENSSAGES.SUCCESS_CREATED_ITEM.message
                 
                    return MENSSAGES.DEFAULT_HEADER//201

                } else {

                    return MENSSAGES.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        } else {
            return MENSSAGES.ERROR_CONTENT_TYPE
        }


    } catch (error) {
        console.log(error)
        return MENSSAGES.ERROR_INTERNAL_SERVER_CONTRLOLLER
    }

}

//Atualiza um filme buscando pelo ID
const atualizarFilme = async (filme, id) => {

}

//Exclui um filme buscando pelo ID
const excluirFilme = async (id) => {

}

module.exports = {
    listarFilmes,
    buscarFilmesId,
    inserirFilme
}