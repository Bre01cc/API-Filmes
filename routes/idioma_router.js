const express = require('express');
const router = express.Router();

const cors = require('cors')//Responsável pela permissão de API(APP)
const bodyParser = require('body-parser')//Responsável por gerenciar a chegada dos dados da API com o front

//Cria um objeto  especialista no formato JSON para receber dados via POST E PUT
const bodyParserJSON = bodyParser.json()

const controllerIdioma = require('../controller/idioma/controller_Idioma.js')

router.get('/v1/locador/idioma', cors(), async function (request, response) {
    let idioma = await controllerIdioma.listarIdiomas()
    response.status(idioma.status_code)
    response.json(idioma)
})

router.get('/v1/locador/idioma/:id', cors(), async function (request, response) {
    let IDidioma = request.params.id
    let idioma = await controllerIdioma.buscarIdiomasId(IDidioma)
    response.status(idioma.status_code)
    response.json(idioma)
})
router.post('/v1/locador/idioma', cors(), bodyParserJSON, async function (request, response) {
    //Receber os dados do body da requisição (se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    //Recebe o tipo de dado da requisição (JSON,XML ou ...)
    let contentType = request.headers['content-type']

    let idioma = await controllerIdioma.inserirIdioma(dadosBody, contentType)
    response.status(idioma.status_code)
    response.json(idioma)

})

router.delete('/v1/locador/idioma/:id', cors(), async function (request, response) {
    let IDidioma = request.params.id
    let idioma = await controllerIdioma.excluirIdioma(IDidioma)
    response.status(idioma.status_code)
    response.json(idioma)
})

router.put('/v1/locador/idioma/:id', bodyParserJSON, cors(), async function (request, response) {
    
    //Receber os dados do body da requisição (se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    //Recebe o tipo de dado da requisição (JSON,XML ou ...)
    let contentType = request.headers['content-type']
    let idIdioma= request.params.id
    let idioma = await controllerIdioma.atualizarIdioma(dadosBody,idIdioma,contentType)
    response.status(idioma.status_code)
    response.json(idioma)
})

module.exports = router;