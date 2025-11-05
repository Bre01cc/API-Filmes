/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas rotas referente ao tipo de distribuidora
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
const controllerTipoDistribuidora = require('../controller/tipo_distribuidora/tipo_distribuidora_controller.js')



//Resposável por devolver todos tipos de distrubuidoras
router.get('/v1/locadora/tipoDistribuidora', cors(), async function (request, response) {
    let  tipoDistribuidora = await controllerTipoDistribuidora.listarTipoDistribuidora()
    response.status(tipoDistribuidora.status_code)
    response.json(tipoDistribuidora)
})

//Responsável por devolver um tipo de distribuidora pelo id
router.get('/v1/locadora/tipoDistribuidora/:id', cors(), async function (request, response) {

    let tipoDistribuidoraID = request.params.id
    let tipoDistribuidora = await controllerTipoDistribuidora.buscarTipoDistribuidoraID(tipoDistribuidoraID)
    response.status(tipoDistribuidora.status_code)
    response.json(tipoDistribuidora)
})

//Responsável por deletar um tipo de distruibuidora
router.delete('/v1/locadora/tipoDistribuidora/:id', cors(), async function (request, response) {

    let tipoDistribuidoraID = request.params.id
    let tipoDistribuidora = await controllerTipoDistribuidora.deletarTipoDistribuidoraId(tipoDistribuidoraID)
    response.status(tipoDistribuidora.status_code)
    response.json(tipoDistribuidora)
})

//Responsável por cadastrar um novo tipo de distribuidora
router.post('/v1/locadora/tipoDistribuidora', cors(), bodyParserJSON, async function (request, response) {
    //Receber os dados do body da requisição (se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    //Recebe o tipo de dado da requisição (JSON,XML ou ...)
    let contentType = request.headers['content-type']

    let tipoDistribuidora = await controllerTipoDistribuidora.inserirTipoDistribuidora(dadosBody, contentType)
    response.status(tipoDistribuidora.status_code)
    response.json(tipoDistribuidora)
})

//Responsável por atualizar um tipo de distribuidora
router.put('/v1/locadora/tipoDistribuidora/:id', bodyParserJSON, cors(), async function (request, response) {
    
    //Receber os dados do body da requisição (se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    //Recebe o tipo de dado da requisição (JSON,XML ou ...)
    let contentType = request.headers['content-type']
    let idTipoDistribuidora = request.params.id
    let tipoDistribuidora = await controllerTipoDistribuidora.atualizarTipoDistribuidora(dadosBody,idTipoDistribuidora,contentType)
    response.status(tipoDistribuidora.status_code)
    response.json(tipoDistribuidora)
})

//Exporte do router
module.exports = router;