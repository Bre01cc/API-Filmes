/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas rotas referente ao filme
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
const controllerFilme = require('../controller/filme/controller_filme.js')

//Responsável por devolver todos os filmes 
router.get('/v1/locadora/filme', cors(), async function (request, response) {
    let filme = await controllerFilme.listarFilmes()
    response.status(filme.status_code)
    response.json(filme)
})

//Responsável por devolver um filme pelo id
router.get('/v1/locadora/filme/:id', cors(), async function (request, response) {
    let idFilme = request.params.id
    let filme = await controllerFilme.buscarFilmesId(idFilme)
    response.status(filme.status_code)
    response.json(filme)
})

//Responsável cadastrar um novo filme
router.post('/v1/locadora/filme', cors(), bodyParserJSON, async function (request, response) {

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

//Responsável por atualizar um filme
router.put('/v1/locadora/filme/:id', bodyParserJSON, cors(), async function (request, response) {
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

//Responsável por deletar um filme
router.delete('/v1/locadora/filme/:id', cors(), async function (request, response) {
    let idFilme = request.params.id;
    let filme = await controllerFilme.excluirFilme(idFilme)
    response.status(filme.status_code)
    response.json(filme)
})

//Exporte da router
module.exports = router;