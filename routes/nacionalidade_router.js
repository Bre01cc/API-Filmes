/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas rotas referente a nacionalidade
 * Data: 03/11/2025
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/


const express = require('express');
const router = express.Router();

const cors = require('cors')//Responsável pela permissão de API(APP)
const bodyParser = require('body-parser')//Responsável por gerenciar a chegada dos dados da API com o front

//Cria um objeto  especialista no formato JSON para receber dados via POST E PUT
const bodyParserJSON = bodyParser.json()

//Import
const controllerNacionalidade = require('../controller/nacionalidade/controller_nacionalidade.js')


//Responsável por devolver todas as nacionalidades
router.get('/v1/locadora/nacionalidade', cors(), async function (request, response) {
    let nacionalidade = await controllerNacionalidade.listarNacionalidade()
    response.status(nacionalidade.status_code)
    response.json(nacionalidade)
})

//Responsável por devolver um nacionalidade pelo id
router.get('/v1/locadora/nacionalidade/:id', cors(), async function (request, response) {

    let nacionalidadeID = request.params.id
    let nacionalidade = await controllerNacionalidade.buscarNacionalidadeID(nacionalidadeID)
    response.status(nacionalidade.status_code)
    response.json(nacionalidade)
})

//Responsável por deletar uma nacionalidade
router.delete('/v1/locadora/nacionalidade/:id', cors(), async function (request, response) {

    let nacionalidadeID = request.params.id
    let nacionalidade = await controllerNacionalidade.deletarNacionalidadeId(nacionalidadeID)
    response.status(nacionalidade.status_code)
    response.json(nacionalidade)
})

//Responsável por cadastrar uma nacionalidade
router.post('/v1/locadora/nacionalidade', cors(), bodyParserJSON, async function (request, response) {
    //Receber os dados do body da requisição (se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    //Recebe o tipo de dado da requisição (JSON,XML ou ...)
    let contentType = request.headers['content-type']

    let nacionalidade = await controllerNacionalidade.inserirNacionalidade(dadosBody, contentType)
    response.status(nacionalidade.status_code)
    response.json(nacionalidade)
})

//Responsável por atualizar uma nacionalidade
router.put('/v1/locadora/nacionalidade/:id', bodyParserJSON, cors(), async function (request, response) {
    
    //Receber os dados do body da requisição (se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    //Recebe o tipo de dado da requisição (JSON,XML ou ...)
    let contentType = request.headers['content-type']
    let idNacionalidade = request.params.id
    let nacionalidade = await controllerNacionalidade.atualizarNacionalidade(dadosBody,idNacionalidade,contentType)
    response.status(nacionalidade.status_code)
    response.json(nacionalidade)
})

//Exports do router
module.exports = router;