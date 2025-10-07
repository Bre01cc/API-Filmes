/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelos padrões que o projeto irá realizar, sempre no formato JSON(Mensages de erro e sucesso, etc)
 * Data: 01/10/2025
 * Autot: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const { request } = require("express");
//Cria um objeto da classe Date para pegar a data atual
const data_atual = new Date()
/*****************************************************MENSAGENS DE PADRONIZADAS*****************************************/
const MENSAGE_HEADER = {
    development: 'Breno Oliveira Assis Reis',
    api_description: 'API para manipular dados de Filmes',
    status: Boolean,
    status_code: Number,
    request_date: data_atual.getTimezoneOffset(),
    items: {}
}
/*****************************************************MENSAGENS DE SUCESSO**********************************************/
const MENSSAGE_REQUEST_SUCCESS = {
    status: true,
    status_code: 200,
    message: "Requisição bem sucedida!!!"
}
/*****************************************************MENSAGENS DE ERRO*************************************************/

module.exports ={
    MENSAGE_HEADER,
    MENSSAGE_REQUEST_SUCCESS
}




