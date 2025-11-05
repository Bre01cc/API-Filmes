/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelos padrões que o projeto irá realizar, sempre no formato JSON(Mensages de erro e sucesso, etc)
 * Data: 01/10/2025
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const { request } = require("express");
//Cria um objeto da classe Date para pegar a data atual
const data_atual = new Date()
/*****************************************************MENSAGENS DE PADRONIZADAS*****************************************/
//Mensagem de principal
const DEFAULT_HEADER = {
    development: 'Breno Oliveira Assis Reis',
    api_description: 'API para manipular dados de Filmes',
    status: Boolean,
    status_code: Number,
    request_date: data_atual.toString(),
    items: {}
}

/*****************************************************MENSAGENS DE ERRO*************************************************/

//Mensagem caso algo não for encontrado
const ERROR_NOT_FOUND = {
    status:false,
    status_code:404,
    message:'Não foram encontrados dados de retorno!!!'
}

//Mensagem caso ocorra erros internos na execução dos arquivos da controller
const ERROR_INTERNAL_SERVER_CONTRLOLLER = {
    status:false,
    status_code:500,
    message:'Não foi possível devido a erros internos no servidor(CONTROLLER)!!!'
}
//Mensagem caso ocorra erros internos na execução dos arquivos da model
const ERROR_INTERNAL_SERVER_MODEL = {
    status:false,
    status_code:500,
    message:'Não foi possível devido a erros internos no servidor(MODELAAGEM DE DADOS)!!!'
}

//Mensagem para informar a falta de campos obrigatorios
const ERROR_REQUIRED_FIELDS = {
    status:false,
    status_code:400,
    message:'Não foi possível processar pois existem campos obrigatórios que devem ser encaminhados e atendidos conforme o desejado'
}

//Mensagem para informar que o tipo de passados na requisição não estão de acordo com o já pré-estabelecido.
const ERROR_CONTENT_TYPE  = {
    status:false,
    status_code:415,
    message:'Não foi possível processar a requisição o tipo de dados enviados no corpo deve ser JSON!!!'
}

/*****************************************************MENSAGENS DE SUCESSO**********************************************/
//Mensagem de sucesso da requisição
const SUCCESS_REQUEST = {
    status: true,
    status_code: 200,
    message: "Requisição bem sucedida!!!"
}
//Mensagem de delete foi realizado com sucesso
const SUCCESS_DELETE = {
    status: true,
    status_code: 200,
    message: "Delete realizado com sucesso!!!"
}
//Mensagem de update foi realizado com sucesso
const SUCCESS_UPDATE_ITEM = {
    status: true,
    status_code: 200,
    message: "Item atualizado com sucesso!!!"
}

////Mensagem de item criado com sucesso
const SUCCESS_CREATED_ITEM ={
    status: true,
    status_code: 201,
    message: "Item criado com sucesso!!!"
}

//Exportes
module.exports = {
    DEFAULT_HEADER,
    SUCCESS_REQUEST,
    SUCCESS_CREATED_ITEM,
    ERROR_INTERNAL_SERVER_CONTRLOLLER,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_REQUIRED_FIELDS,
    ERROR_CONTENT_TYPE,
    SUCCESS_UPDATE_ITEM,
    SUCCESS_DELETE
   
}




