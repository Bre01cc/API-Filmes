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
const DEFAULT_HEADER = {
    development: 'Breno Oliveira Assis Reis',
    api_description: 'API para manipular dados de Filmes',
    status: Boolean,
    status_code: Number,
    request_date: data_atual.toString(),
    items: {}
}

const ERROR_NOT_FOUND = {
    status:false,
    status_code:404,
    message:'Não foram encontrados dadoss de retorno!!!'
}
const ERROR_INTERNAL_SERVER_CONTRLOLLER = {
    status:false,
    status_code:500,
    message:'Não foi possível devido a erros internos no servidor(CONTROLLER)!!!'
}
const ERROR_INTERNAL_SERVER_MODEL = {
    status:false,
    status_code:500,
    message:'Não foi possível devido a erros internos no servidor(MODELAAGEM DE DADOS)!!!'
}

const ERROR_REQUIRED_FIELDS = {
    status:false,
    status_code:400,
    message:'Não foi possível processar pois existem campos obrigatórios que devem ser encaminhados e atendidos conforme o desejado'
}

/*****************************************************MENSAGENS DE SUCESSO**********************************************/
const SUCCESS_REQUEST = {
    status: true,
    status_code: 200,
    message: "Requisição bem sucedida!!!"
}
/*****************************************************MENSAGENS DE ERRO*************************************************/

module.exports = {
    DEFAULT_HEADER,
    SUCCESS_REQUEST,
    ERROR_INTERNAL_SERVER_CONTRLOLLER,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_REQUIRED_FIELDS
}




