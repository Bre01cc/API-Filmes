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

//EndPoints para a rota de filme
app.use('/v1/locador/filmes', cors(), async function (request,response) {
    let filme = await controllerFilme.listarFilmes()
    response.status(filme.status_code)
    response.json(filme)
})

app.use('/v1/locador/filme/:id', cors(), async function (request,response) {
    let idFilme = request.params.id
    let filme = await controllerFilme.buscarFilmesId(idFilme)
    response.status(filme.status_code)
    response.json(filme)
})

app.listen(PORT, function () {
    console.log('API aguardando requisições.....')
})