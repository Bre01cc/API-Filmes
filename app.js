/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições da API da locadora
 * Data: 01/10/2025
 * Autot: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const express = require('express')//Responsável pela API
// const bodyParser = require('body-parser')//Responsável por gerenciar a chegada dos dados da API com o front
const cors = require('cors')//Responsável pela permissão de API(APP)
const bodyParser = require('body-parser')//Responsável por gerenciar a chegada dos dados da API com o front

//Cria um objeto  especialista no formato JSON para receber dados via POST E PUT
const bodyParserJSON = bodyParser.json()


const app = express()

const PORT = process.PORT || 8080

//Configurações de permissões
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')//Servidor de origem da API
    response.header('Access-Control-Allow-Methods', 'GET')//Verbos permitidos na API
    //Carregar as configurações no CORS da API
    app.use(cors())
    //Proximo, carregar os proximos endpoints
    next()
})

const controllerFilme = require('./controller/filme/controller_filme.js')

const controllerGenero = require('./controller/genero/controller_genero.js')

//EndPoints para a rota de Filme
app.get('/v1/locador/filmes', cors(), async function (request, response) {
    let filme = await controllerFilme.listarFilmes()
    response.status(filme.status_code)
    response.json(filme)
})

app.get('/v1/locador/filme/:id', cors(), async function (request, response) {
    let idFilme = request.params.id
    let filme = await controllerFilme.buscarFilmesId(idFilme)
    response.status(filme.status_code)
    response.json(filme)
})
app.post('/v1/locador/adicionar/filme', cors(), bodyParserJSON, async function (request, response) {

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
app.put('/v1/locador/atualizar/filme/:id', bodyParserJSON, cors(), async function (request, response) {
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
app.delete('/v1/locador/deletar/filme/:id', cors(), async function (request, response) {
    let idFilme = request.params.id;
    let filme = await controllerFilme.excluirFilme(idFilme)
    response.status(filme.status_code)
    response.json(filme)
})



//EndPoints para a rota de Genero
app.get('/v1/locador/generos', cors(), async function (request, response) {
    let genero = await controllerGenero.listarGenero()
    response.status(genero.status_code)
    response.json(genero)
})

app.get('/v1/locador/genero/:id', cors(), async function (request, response) {
    let idGenero = request.params.id
    let genero = await controllerGenero.buscarGeneroId(idGenero)
    response.status(genero.status_code)
    response.json(genero)
})

app.post('/v1/locador/adicionar/genero', cors(), bodyParserJSON, async function (request, response) {

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

app.put('/v1/locador/atualizar/genero/:id', bodyParserJSON, cors(), async function (request, response) {
    //Receber os dados do body da requisição (se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    //Recebe o tipo de dado da requisição (JSON,XML ou ...)
    let contentType = request.headers['content-type']
    // console.log(contentType)
    let idGenero= request.params.id
    let genero = await controllerGenero.atualizarGenero(dadosBody, idGenero, contentType)
    response.status(genero.status_code)
    response.json(genero)
})

app.delete('/v1/locador/deletar/genero/:id', cors(), async function (request, response) {
    let idGenero = request.params.id;
    let genero = await controllerGenero.excluirGenero(idGenero)
    response.status(genero.status_code)
    response.json(genero)
})








app.listen(PORT, function () {
    console.log('API aguardando requisições.....')
})