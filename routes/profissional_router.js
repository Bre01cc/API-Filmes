/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas rotas referente ao profissional
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
const controllerProfissional = require('../controller/profissional/profissional_controller.js')



//Responsável por devolver todos profissionais
router.get('/v1/locadora/profissional', cors(), async function (request, response) {
    let profissional = await controllerProfissional.listarProfissional()
    response.status(profissional.status_code)
    response.json(profissional)
})

//Responsável por devolver um profissional pelo id
router.get('/v1/locadora/profissional/:id', cors(), async function (request, response) {
    let profissionalID = request.params.id
    let profissional = await controllerProfissional.buscarProfissionalID(profissionalID)
    response.status(profissional.status_code)
    response.json(profissional)
})

//Resposável por deletar um profissional
router.delete('/v1/locadora/profissional/:id', cors(), async function (request, response) {
    let profissionalID = request.params.id
    let profissional = await controllerProfissional.deletarProfissionalId(profissionalID)
    response.status(profissional.status_code)
    response.json(profissional)
})

//Respósavel por cadastrar um profissional
router.post('/v1/locadora/profissional', cors(), bodyParserJSON, async function (request, response) {
    //Receber os dados do body da requisição (se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    //Recebe o tipo de dado da requisição (JSON,XML ou ...)
    let contentType = request.headers['content-type']

    let profissional = await controllerProfissional.inserirProfissional(dadosBody, contentType)
    response.status(profissional.status_code)
    response.json(profissional)
})

//Responsável por atualizar um profissional
router.put('/v1/locadora/profissional/:id', bodyParserJSON, cors(), async function (request, response) {
    
    //Receber os dados do body da requisição (se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    //Recebe o tipo de dado da requisição (JSON,XML ou ...)
    let contentType = request.headers['content-type']
    let idProfissional = request.params.id
    let profissional = await controllerProfissional.atualizarProfissional(dadosBody,idProfissional,contentType)
    response.status(profissional.status_code)
    response.json(profissional)
})

//Exporte do router
module.exports = router;