/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas rotas referente ao generos
 * Data: 03/11/2025
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const express = require('express');
const router = express.Router();

const cors = require('cors')
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()

//Import
const controllerGenero = require('../controller/genero/controller_genero.js')

/**
 * @swagger
 * tags:
 *   name: Generos
 *   description: Rotas para gerenciamento de gêneros de filmes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Genero:
 *       type: object
 *       properties:
 *         id_genero:
 *           type: integer
 *           example: 1
 *         nome:
 *           type: string
 *           example: "Ação"
 *         descricao:
 *           type: string
 *           example: "Filmes com muita ação e aventura"
 *         data_criacao:
 *           type: string
 *           format: date
 *           example: "2025-12-11"
 *       required:
 *         - id_genero
 *         - nome
 *         - descricao
 *         - data_criacao
 * 
 *     GeneroInput:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           example: "Ação"
 *         descricao:
 *           type: string
 *           example: "Filmes com muita ação e aventura"
 *         data_criacao:
 *           type: string
 *           format: date
 *           example: "2025-12-11"
 *       required:
 *         - nome
 *         - descricao
 *         - data_criacao
 */


/**
 * @swagger
 * /v1/locadora/genero:
 *   get:
 *     summary: Retorna todos os gêneros
 *     tags: [Generos]
 *     responses:
 *       200:
 *         description: Lista de gêneros retornada
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genero'
 */
router.get('/v1/locadora/genero', cors(), async function (request, response) {
    let genero = await controllerGenero.listarGenero()
    response.status(genero.status_code)
    response.json(genero)
})

/**
 * @swagger
 * /v1/locadora/genero/{id}:
 *   get:
 *     summary: Retorna um gênero pelo ID
 *     tags: [Generos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do gênero
 *     responses:
 *       200:
 *         description: Gênero encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genero'
 */
router.get('/v1/locadora/genero/:id', cors(), async function (request, response) {
    let idGenero = request.params.id
    let genero = await controllerGenero.buscarGeneroId(idGenero)
    response.status(genero.status_code)
    response.json(genero)
})

/**
 * @swagger
 * /v1/locadora/genero:
 *   post:
 *     summary: Cadastra um novo gênero
 *     tags: [Generos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GeneroInput'
 *     responses:
 *       201:
 *         description: Gênero criado com sucesso
 */
router.post('/v1/locadora/genero', cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    let genero = await controllerGenero.inserirGenero(dadosBody, contentType)
    response.status(genero.status_code)
    response.json(genero)
})

/**
 * @swagger
 * /v1/locadora/genero/{id}:
 *   put:
 *     summary: Atualiza um gênero pelo ID
 *     tags: [Generos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do gênero
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GeneroInput'
 *     responses:
 *       200:
 *         description: Gênero atualizado com sucesso
 */
router.put('/v1/locadora/genero/:id', bodyParserJSON, cors(), async function (request, response) {
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    let idGenero = request.params.id
    let genero = await controllerGenero.atualizarGenero(dadosBody, idGenero, contentType)
    response.status(genero.status_code)
    response.json(genero)
})

/**
 * @swagger
 * /v1/locadora/genero/{id}:
 *   delete:
 *     summary: Deleta um gênero pelo ID
 *     tags: [Generos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do gênero
 *     responses:
 *       200:
 *         description: Gênero deletado com sucesso
 */
router.delete('/v1/locadora/genero/:id', cors(), async function (request, response) {
    let idGenero = request.params.id
    let genero = await controllerGenero.excluirGenero(idGenero)
    response.status(genero.status_code)
    response.json(genero)
})

module.exports = router
