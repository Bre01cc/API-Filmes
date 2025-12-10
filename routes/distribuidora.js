/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas rotas referente ao distribuidora
 * Data: 09/12/2025
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
const controllerDistribuidora = require('../controller/distribuidora/distribuidora_controller')

//Responsável por devolver todos os distribuidoras
router.get('/v1/locadora/distribuidora', cors(), async function (request, response) {
    let distribuidora = await controllerDistribuidora.listarDistribuidora()
    response.status(distribuidora.status_code)
    response.json(distribuidora)
})

//Responsável por devolver um distribuidora pelo id
router.get('/v1/locadora/distribuidora/:id', cors(), async function (request, response) {
    let idDistribuidora = request.params.id
    let distribuidora = await controllerDistribuidora.buscarDistribuidoraID(idDistribuidora)
    response.status(distribuidora.status_code)
    response.json(distribuidora)
})

//Responsável por devolver uma distribuidora pelo id nacionalidade
router.get('/v1/locadora/distribuidora/nacionalidade/:id', cors(), async function (request, response) {
    let idDistribuidora = request.params.id
    let distribuidora = await controllerDistribuidora.buscarDistribuidoraIDNacionalidade(idDistribuidora)
    response.status(distribuidora.status_code)
    response.json(distribuidora)
})

//Responsável por devolver uma distribuidora pelo id tipo_distribuidora
router.get('/v1/locadora/distribuidora/tipo/:id', cors(), async function (request, response) {
    let idDistribuidora = request.params.id
    let distribuidora = await controllerDistribuidora.buscarDistribuidoraIDType(idDistribuidora)
    response.status(distribuidora.status_code)
    response.json(distribuidora)
})

//Responsável cadastrar uma distribuidora 
router.post('/v1/locadora/distribuidora', cors(), bodyParserJSON, async function (request, response) {

    //Receber os dados do body da requisição (se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    //Recebe o tipo de dado da requisição (JSON,XML ou ...)
    let contentType = request.headers['content-type']
    // console.log(contentType)

    let distribuidora = await controllerDistribuidora.inserirDistribuidora(dadosBody, contentType)
    // console.log(distribuidora)
    response.status(distribuidora.status_code)
    response.json(distribuidora)

})

//Responsável por atualizar um distribuidora
router.put('/v1/locadora/distribuidora/:id', bodyParserJSON, cors(), async function (request, response) {
    //Receber os dados do body da requisição (se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    //Recebe o tipo de dado da requisição (JSON,XML ou ...)
    let contentType = request.headers['content-type']
    // console.log(contentType)
    let idDistribuidora = request.params.id
    let distribuidora = await controllerDistribuidora.atualizarDistribuidora(dadosBody,idDistribuidora, contentType)
    response.status(distribuidora.status_code)
    response.json(distribuidora)
})

//Responsável por deletar um distribuidora pelo id
router.delete('/v1/locadora/distribuidora/:id', cors(), async function (request, response) {
    let idDistribuidora = request.params.id;
    let distribuidora = await controllerDistribuidora.deletarDistribuidoraId(idDistribuidora)
    response.status(distribuidora.status_code)
    response.json(distribuidora)
})

//Responsável por deletar um distribuidora pelo id da nacionalidade
router.delete('/v1/locadora/distribuidora/nacionalidade/:id', cors(), async function (request, response) {
    let idNacionalidade = request.params.id;
    let distribuidora = await controllerDistribuidora.deletarDistribuidoraIdNacionalidade(idNacionalidade)
    response.status(distribuidora.status_code)
    response.json(distribuidora)
})

//Responsável por deletar um distribuidora pelo id da tipo_distribuidora
router.delete('/v1/locadora/distribuidora/nacionalidade/:id', cors(), async function (request, response) {
    let idNacionalidade = request.params.id;
    let distribuidora = await controllerDistribuidora.deletarDistribuidoraIdType(idNacionalidade)
    response.status(distribuidora.status_code)
    response.json(distribuidora)
})

module.exports = router