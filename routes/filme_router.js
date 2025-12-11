/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas rotas referente ao filme com documentação Swagger
 * Data: 11/12/2025
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');

const bodyParserJSON = bodyParser.json();
const controllerFilme = require('../controller/filme/controller_filme.js');

/**
 * @swagger
 * tags:
 *   name: Filmes
 *   description: Rotas de filmes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FilmeInput:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           example: "Matrix"
 *         sinopse:
 *           type: string
 *           example: "Um hacker descobre a verdade sobre o mundo."
 *         data_lancamento:
 *           type: string
 *           example: "1999-03-31"
 *         duracao:
 *           type: string
 *           example: "02:16:00"
 *         orcamento:
 *           type: number
 *           example: 63000000
 *         trailer:
 *           type: string
 *           example: "https://youtube.com/matrix"
 *         capa:
 *           type: string
 *           example: "https://example.com/matrix.jpg"
 *         genero:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id_genero:
 *                 type: integer
 *                 example: 3
 *            
 *       required:
 *         - nome
 *         - sinopse
 *         - data_lancamento
 *         - duracao
 *         - orcamento
 *         - trailer
 *         - capa
 *
 *     Filme:
 *       type: object
 *       properties:
 *         id_filme:
 *           type: integer
 *           example: 1
 *         nome:
 *           type: string
 *           example: "Matrix"
 *         sinopse:
 *           type: string
 *           example: "Um hacker descobre a verdade sobre o mundo."
 *         data_lancamento:
 *           type: string
 *           example: "1999-03-31"
 *         duracao:
 *           type: string
 *           example: "02:16:00"
 *         orcamento:
 *           type: number
 *           example: 63000000
 *         trailer:
 *           type: string
 *           example: "https://youtube.com/matrix"
 *         capa:
 *           type: string
 *           example: "https://example.com/matrix.jpg"
 *         genero:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id_genero:
 *                 type: integer
 *                 example: 3
 *               nome:
 *                 type: string
 *                 example: "Ação"
 *       required:
 *         - id_filme
 *         - nome
 *         - sinopse
 *         - data_lancamento
 *         - duracao
 *         - orcamento
 *         - trailer
 *         - capa
 */


/**
 * @swagger
 * /v1/locadora/filme:
 *   get:
 *     summary: Retorna todos os filmes
 *     tags: [Filmes]
 *     responses:
 *       200:
 *         description: Lista de filmes retornada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: integer
 *                   example: 200
 *                 items:
 *                   type: object
 *                   properties:
 *                     filmes:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Filme'
 */
router.get('/v1/locadora/filme', cors(), async function (request, response) {
    let filme = await controllerFilme.listarFilmes();
    response.status(filme.status_code).json(filme);
});

/**
 * @swagger
 * /v1/locadora/filme/{id}:
 *   get:
 *     summary: Retorna um filme pelo ID
 *     tags: [Filmes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do filme
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Filme encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Filme'
 */
router.get('/v1/locadora/filme/:id', cors(), async function (request, response) {
    let idFilme = request.params.id;
    let filme = await controllerFilme.buscarFilmesId(idFilme);
    response.status(filme.status_code).json(filme);
});

/**
 * @swagger
 * /v1/locadora/filme:
 *   post:
 *     summary: Cadastra um novo filme
 *     tags: [Filmes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FilmeInput'
 *     responses:
 *       201:
 *         description: Filme cadastrado com sucesso
 */
router.post('/v1/locadora/filme', cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body;
    let contentType = request.headers['content-type'];
    let filme = await controllerFilme.inserirFilme(dadosBody, contentType);
    response.status(filme.status_code).json(filme);
});

/**
 * @swagger
 * /v1/locadora/filme/{id}:
 *   put:
 *     summary: Atualiza um filme pelo ID
 *     tags: [Filmes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do filme
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FilmeInput'
 *     responses:
 *       200:
 *         description: Filme atualizado com sucesso
 */
router.put('/v1/locadora/filme/:id', cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body;
    let contentType = request.headers['content-type'];
    let idFilme = request.params.id;
    let filme = await controllerFilme.atualizarFilme(dadosBody, idFilme, contentType);
    response.status(filme.status_code).json(filme);
});

/**
 * @swagger
 * /v1/locadora/filme/{id}:
 *   delete:
 *     summary: Exclui um filme pelo ID
 *     tags: [Filmes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do filme
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Filme excluído com sucesso
 */
router.delete('/v1/locadora/filme/:id', cors(), async function (request, response) {
    let idFilme = request.params.id;
    let filme = await controllerFilme.excluirFilme(idFilme);
    response.status(filme.status_code).json(filme);
});

module.exports = router;
