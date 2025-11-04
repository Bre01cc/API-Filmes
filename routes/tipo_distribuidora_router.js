
const express = require('express');
const router = express.Router();

const cors = require('cors')//Responsável pela permissão de API(APP)
const bodyParser = require('body-parser')//Responsável por gerenciar a chegada dos dados da API com o front

//Cria um objeto  especialista no formato JSON para receber dados via POST E PUT
const bodyParserJSON = bodyParser.json()

const controllerTipoDistribuidora = require('../controller/tipo_distribuidora/tipo_distribuidora_controller.js')




router.get('/v1/locadora/tipoDistribuidora', cors(), async function (request, response) {
    let  tipoDistribuidora = await controllerTipoDistribuidora.listarTipoDistribuidora()
    response.status(tipoDistribuidora.status_code)
    response.json(tipoDistribuidora)
})

router.get('/v1/locadora/tipoDistribuidora/:id', cors(), async function (request, response) {

    let tipoDistribuidoraID = request.params.id
    let tipoDistribuidora = await controllerTipoDistribuidora.buscarTipoDistribuidoraID(tipoDistribuidoraID)
    response.status(tipoDistribuidora.status_code)
    response.json(tipoDistribuidora)
})

router.delete('/v1/locadora/tipoDistribuidora/:id', cors(), async function (request, response) {

    let tipoDistribuidoraID = request.params.id
    let tipoDistribuidora = await controllerTipoDistribuidora.deletarTipoDistribuidoraId(tipoDistribuidoraID)
    response.status(tipoDistribuidora.status_code)
    response.json(tipoDistribuidora)
})

router.post('/v1/locadora/tipoDistribuidora', cors(), bodyParserJSON, async function (request, response) {
    //Receber os dados do body da requisição (se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    //Recebe o tipo de dado da requisição (JSON,XML ou ...)
    let contentType = request.headers['content-type']

    let tipoDistribuidora = await controllerTipoDistribuidora.inserirTipoDistribuidora(dadosBody, contentType)
    response.status(tipoDistribuidora.status_code)
    response.json(tipoDistribuidora)
})

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

module.exports = router;