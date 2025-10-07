/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL para o CRUD de Filmes
 * Data: 01/10/2025
 * Autot: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

//Importe da model do DAO do filme
const filmeDAO = require('../../model/DAO/filme.js')

//Importe do arquivo de mensssagens
const MENSSAGES = require('../modulo/config_menssages.js')
//Retorna uma lista de todos os filmes
const listarFilmes = async () => {

    //Chama a funçã do DAO para retornar a lista de filmes do BD
    let resulFilmes = await filmeDAO.getSelectAllFilms();

    if (resulFilmes) {
        if (resulFilmes.lenght > 0) {
            MENSSAGES.MENSAGE_HEADER.status = MENSSAGES.MENSSAGE_REQUEST_SUCCESS.status
            MENSSAGES.MENSAGE_HEADER.status_code = MENSSAGES.MENSSAGE_REQUEST_SUCCESS.status_code
            MENSSAGES.MENSAGE_HEADER.items.filmes = resulFilmes

            return MENSSAGES.MENSAGE_HEADER
        }
    }

}

//Retorna um filme pelo ID
const buscarFilmesId = async (id) => {

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
    listarFilmes
}