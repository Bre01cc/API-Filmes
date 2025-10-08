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
        if (!isNaN(id)) {
            //cria uma variável local para executar a função getSelectByFilms, passando para ela o ID
            let resultFilmes = await filmeDAO.getSelectByFilms(Number(id))

            //Se getSelectByFilms tiver sido executado corretamente  ele vai passar nessa primeira verificação, já caso algo estiver errado o valor de resultFilmes será false
            if (resultFilmes) {
                //Verificando se resulfilmes não está vazio
                if (resultFilmes.length > 0) {
                    MENSSAGES.DEFAULT_HEADER.status = MENSSAGES.SUCCESS_REQUEST
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
const inserirFilme = async (filme) => {

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
}