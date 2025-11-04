const express = require('express');
const router = express.Router();

const cors = require('cors')//Responsável pela permissão de API(APP)
const bodyParser = require('body-parser')//Responsável por gerenciar a chegada dos dados da API com o front

//Cria um objeto  especialista no formato JSON para receber dados via POST E PUT
const bodyParserJSON = bodyParser.json()

const controllerFilme = require('../controller/filme/controller_filme.js')

router.get('/v1/locador/filme', cors(), async function (request, response) {
    let filme = await controllerFilme.listarFilmes()
    response.status(filme.status_code)
    response.json(filme)
})

router.get('/v1/locador/filme/:id', cors(), async function (request, response) {
    let idFilme = request.params.id
    let filme = await controllerFilme.buscarFilmesId(idFilme)
    response.status(filme.status_code)
    response.json(filme)
})
router.post('/v1/locador/filme', cors(), bodyParserJSON, async function (request, response) {

    //Receber os dados do body da requisição (se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    //Recebe o tipo de dado da requisição (JSON,XML ou ...)
    let contentType = request.headers['content-type']
    // console.log(contentType)

    let filme = await controllerFilme.inserirFilme(dadosBody, contentType)
    // console.log(filme)
    response.status(filme.status_code)
    response.json(filme)

})
router.put('/v1/locador/filme/:id', bodyParserJSON, cors(), async function (request, response) {
    //Receber os dados do body da requisição (se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    //Recebe o tipo de dado da requisição (JSON,XML ou ...)
    let contentType = request.headers['content-type']
    // console.log(contentType)
    let idFilme = request.params.id
    let filme = await controllerFilme.atualizarFilme(dadosBody, idFilme, contentType)
    response.status(filme.status_code)
    response.json(filme)
})
router.delete('/v1/locador/filme/:id', cors(), async function (request, response) {
    let idFilme = request.params.id;
    let filme = await controllerFilme.excluirFilme(idFilme)
    response.status(filme.status_code)
    response.json(filme)
})


module.exports = router;