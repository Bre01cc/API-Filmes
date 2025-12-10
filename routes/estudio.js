/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas rotas referente ao estudio
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
const controllerEstudio = require('../controller/estudio/estudio_controller.js')

//Responsável por devolver todos os estudios
router.get('/v1/locadora/estudio', cors(), async function (request, response) {
    let estudio = await controllerEstudio.listarEstudios()
    response.status(estudio.status_code)
    response.json(estudio)
})

//Responsável por devolver um estudio pelo id
router.get('/v1/locadora/estudio/:id', cors(), async function (request, response) {
    let idEstudio = request.params.id
    let estudio = await controllerEstudio.buscarEstudioID(idEstudio)
    response.status(estudio.status_code)
    response.json(estudio)
})

//Responsável por devolver um estudio pelo id nacionalidade
router.get('/v1/locadora/estudio/nacionalidade/:id', cors(), async function (request, response) {
    let idNacionalidade = request.params.id
    let estudio = await controllerEstudio.buscarEstudioIDNacionalidade(idNacionalidade)
    response.status(estudio.status_code)
    response.json(estudio)
})

//Responsável cadastrar um estudio
router.post('/v1/locadora/estudio', cors(), bodyParserJSON, async function (request, response) {

    //Receber os dados do body da requisição (se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    //Recebe o tipo de dado da requisição (JSON,XML ou ...)
    let contentType = request.headers['content-type']
    // console.log(contentType)

    let estudio = await controllerEstudio.inserirEstudio(dadosBody, contentType)
    // console.log(estudio)
    response.status(estudio.status_code)
    response.json(estudio)

})

//Responsável por atualizar um estudio
router.put('/v1/locadora/estudio/:id', bodyParserJSON, cors(), async function (request, response) {
    //Receber os dados do body da requisição (se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    //Recebe o tipo de dado da requisição (JSON,XML ou ...)
    let contentType = request.headers['content-type']
    // console.log(contentType)
    let idEstudio = request.params.id
    let estudio = await controllerEstudio.atualizarEstudio(dadosBody,idEstudio, contentType)
    response.status(estudio.status_code)
    response.json(estudio)
})

//Responsável por deletar um estudio pelo id
router.delete('/v1/locadora/estudio/:id', cors(), async function (request, response) {
    let idEstudio = request.params.id;
    let estudio = await controllerEstudio.deletarEstudioId(idEstudio)
    response.status(estudio.status_code)
    response.json(estudio)
})

//Responsável por deletar um estudio pelo id da nacionalidade
router.delete('/v1/locadora/estudio/nacionalidade/:id', cors(), async function (request, response) {
    let idEstudio = request.params.id;
    let estudio = await controllerEstudio.deletarEstudioIdNacionalidade(idEstudio)
    response.status(estudio.status_code)
    response.json(estudio)
})

//Exporte da router
module.exports = router;