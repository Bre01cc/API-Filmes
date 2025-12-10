/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições da API de locadora
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

//Imports das rotas
const idiomasRotas = require('./routes/idioma_router.js')
const filmesRotas = require('./routes/filme_router.js')
const generoRotas = require('./routes/genero_router.js')
const nacionalidadeRotas = require('./routes/nacionalidade_router.js')
const tipoDistribuidoraRotas = require('./routes/tipo_distribuidora_router.js')
const profissionalRotas = require('./routes/profissional_router.js')
const estudioRotas = require('./routes/estudio.js')
const distribuidoraRotas = require('./routes/distribuidora.js')

app.use(filmesRotas)
app.use(generoRotas)
app.use(idiomasRotas)
app.use(nacionalidadeRotas)
app.use(tipoDistribuidoraRotas)
app.use(profissionalRotas)
app.use(estudioRotas)
app.use(distribuidoraRotas)

app.listen(PORT, function () {
    console.log('API aguardando requisições.....')
})

