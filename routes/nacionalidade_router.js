
const express = require('express');
const router = express.Router();

const cors = require('cors')//Responsável pela permissão de API(APP)
const bodyParser = require('body-parser')//Responsável por gerenciar a chegada dos dados da API com o front

//Cria um objeto  especialista no formato JSON para receber dados via POST E PUT
const bodyParserJSON = bodyParser.json()

const controllerNacionalidade = require('../controller/nacionalidade/controller_nacionalidade.js')



router.get('/v1/locador/nacionalidade', cors(), async function (request, response) {
    let nacionalidade = await controllerNacionalidade.listarNacionalidade()
    response.status(nacionalidade.status_code)
    response.json(nacionalidade)
})

router.get('/v1/locador/nacionalidade/:id', cors(), async function (request, response) {

    let nacionalidadeID = request.params.id
    let nacionalidade = await controllerNacionalidade.buscarNacionalidadeID(nacionalidadeID)
    response.status(nacionalidade.status_code)
    response.json(nacionalidade)
})

router.delete('/v1/locador/nacionalidade/:id', cors(), async function (request, response) {

    let nacionalidadeID = request.params.id
    let nacionalidade = await controllerNacionalidade.deletarNacionalidadeId(nacionalidadeID)
    response.status(nacionalidade.status_code)
    response.json(nacionalidade)
})

router.post('/v1/locador/nacionalidade', cors(), bodyParserJSON, async function (request, response) {
    //Receber os dados do body da requisição (se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    //Recebe o tipo de dado da requisição (JSON,XML ou ...)
    let contentType = request.headers['content-type']

    let nacionalidade = await controllerNacionalidade.inserirNacionalidade(dadosBody, contentType)
    response.status(nacionalidade.status_code)
    response.json(nacionalidade)
})

router.put('/v1/locador/nacionalidade/:id', bodyParserJSON, cors(), async function (request, response) {
    
    //Receber os dados do body da requisição (se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    //Recebe o tipo de dado da requisição (JSON,XML ou ...)
    let contentType = request.headers['content-type']
    let idNacionalidade = request.params.id
    let nacionalidade = await controllerNacionalidade.atualizarNacionalidade(dadosBody,idNacionalidade,contentType)
    response.status(nacionalidade.status_code)
    response.json(nacionalidade)
})

module.exports = router;