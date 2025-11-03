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





const controllerIdioma = require('./controller/idioma/controller_Idioma.js')

//EndPoints para a rota de Filme



//EndPoints para a rota de Genero


app.get('/v1/locador/idiomas', cors(), async function (request, response) {
    let idioma = await controllerIdioma.listarIdiomas()
    response.status(idioma.status_code)
    response.json(idioma)
})

app.get('/v1/locador/idioma/:id', cors(), async function (request, response) {
    let IDidioma = request.params.id
    let idioma = await controllerIdioma.buscarIdiomasId(IDidioma)
    response.status(idioma.status_code)
    response.json(idioma)
})
app.post('/v1/locador/adicionar/idioma', cors(), bodyParserJSON, async function (request, response) {
    //Receber os dados do body da requisição (se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    //Recebe o tipo de dado da requisição (JSON,XML ou ...)
    let contentType = request.headers['content-type']

    let idioma = await controllerIdioma.inserirIdioma(dadosBody, contentType)
    response.status(idioma.status_code)
    response.json(idioma)

})

app.delete('/v1/locador/idioma/:id', cors(), async function (request, response) {
    let IDidioma = request.params.id
    let idioma = await controllerIdioma.excluirIdioma(IDidioma)
    response.status(idioma.status_code)
    response.json(idioma)
})

app.put('/v1/locador/atualizar/idioma/:id', bodyParserJSON, cors(), async function (request, response) {
    
    //Receber os dados do body da requisição (se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    //Recebe o tipo de dado da requisição (JSON,XML ou ...)
    let contentType = request.headers['content-type']
    let idIdioma= request.params.id
    let idioma = await controllerIdioma.atualizarIdioma(dadosBody,idIdioma,contentType)
    response.status(idioma.status_code)
    response.json(idioma)
})


const filmesRotas = require('./routes/filme_router.js')

const generoRotas = require('./routes/genero_router.js')

app.use(filmesRotas)
app.use(generoRotas)

app.listen(PORT, function () {
    console.log('API aguardando requisições.....')
})

