const express = require('express');
const router = express.Router();

const cors = require('cors')//Responsável pela permissão de API(APP)
const bodyParser = require('body-parser')//Responsável por gerenciar a chegada dos dados da API com o front

//Cria um objeto  especialista no formato JSON para receber dados via POST E PUT
const bodyParserJSON = bodyParser.json()

const controllerGenero = require('../controller/genero/controller_genero.js')



router.get('/v1/locador/generos', cors(), async function (request, response) {
    let genero = await controllerGenero.listarGenero()
    response.status(genero.status_code)
    response.json(genero)
})

router.get('/v1/locador/genero/:id', cors(), async function (request, response) {
    let idGenero = request.params.id
    let genero = await controllerGenero.buscarGeneroId(idGenero)
    response.status(genero.status_code)
    response.json(genero)
})

router.post('/v1/locador/genero', cors(), bodyParserJSON, async function (request, response) {

    //Receber os dados do body da requisição (se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    //Recebe o tipo de dado da requisição (JSON,XML ou ...)
    let contentType = request.headers['content-type']
    // console.log(contentType)

    let genero = await controllerGenero.inserirGenero(dadosBody, contentType)
    // console.log(filme)
    response.status(genero.status_code)
    response.json(genero)

})

router.put('/v1/locador/genero/:id', bodyParserJSON, cors(), async function (request, response) {
    //Receber os dados do body da requisição (se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    //Recebe o tipo de dado da requisição (JSON,XML ou ...)
    let contentType = request.headers['content-type']
    // console.log(contentType)
    let idGenero = request.params.id
    let genero = await controllerGenero.atualizarGenero(dadosBody, idGenero, contentType)
    response.status(genero.status_code)
    response.json(genero)
})

router.delete('/v1/locador/genero/:id', cors(), async function (request, response) {
    let idGenero = request.params.id;
    let genero = await controllerGenero.excluirGenero(idGenero)
    response.status(genero.status_code)
    response.json(genero)
})

module.exports = router;