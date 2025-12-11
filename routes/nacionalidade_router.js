/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas rotas referente à nacionalidade
 * Data: 04/11/2025
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const express = require('express');
const router = express.Router();

const cors = require('cors');
const bodyParser = require('body-parser');
const bodyParserJSON = bodyParser.json();

const controllerNacionalidade = require('../controller/nacionalidade/controller_nacionalidade.js');

/**
 * @swagger
 * tags:
 *   name: Nacionalidade
 *   description: Rotas para gerenciamento de nacionalidades
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Nacionalidade:
 *       type: object
 *       properties:
 *         id_nacionalidade:
 *           type: integer
 *           example: 1
 *         nome:
 *           type: string
 *           example: "Brasil"
 *         sigla:
 *           type: string
 *           example: "BR"
 *         data_criacao:
 *           type: string
 *           format: date
 *           example: "2025-12-11"
 *       required:
 *         - id
 *         - nome
 *         - sigla
 *         - data_criacao
 *
 *     NacionalidadeInput:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           example: "Brasil"
 *         sigla:
 *           type: string
 *           example: "BR"
 *         data_criacao:
 *           type: string
 *           format: date
 *           example: "2025-12-11"
 *       required:
 *         - nome
 *         - sigla
 *         - data_criacao
 */


/**
 * @swagger
 * /v1/locadora/nacionalidade:
 *   get:
 *     summary: Retorna todas as nacionalidades
 *     tags: [Nacionalidade]
 *     responses:
 *       200:
 *         description: Lista de nacionalidades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Nacionalidade'
 */
router.get('/v1/locadora/nacionalidade', cors(), async (req, res) => {
    let nacionalidade = await controllerNacionalidade.listarNacionalidade();
    res.status(nacionalidade.status_code).json(nacionalidade);
});

/**
 * @swagger
 * /v1/locadora/nacionalidade/{id}:
 *   get:
 *     summary: Retorna uma nacionalidade pelo ID
 *     tags: [Nacionalidade]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da nacionalidade
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Nacionalidade encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Nacionalidade'
 */
router.get('/v1/locadora/nacionalidade/:id', cors(), async (req, res) => {
    let idNacionalidade = req.params.id;
    let nacionalidade = await controllerNacionalidade.buscarNacionalidadeID(idNacionalidade);
    res.status(nacionalidade.status_code).json(nacionalidade);
});

/**
 * @swagger
 * /v1/locadora/nacionalidade/{id}:
 *   delete:
 *     summary: Exclui uma nacionalidade pelo ID
 *     tags: [Nacionalidade]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Nacionalidade excluída
 */
router.delete('/v1/locadora/nacionalidade/:id', cors(), async (req, res) => {
    let idNacionalidade = req.params.id;
    let nacionalidade = await controllerNacionalidade.deletarNacionalidadeId(idNacionalidade);
    res.status(nacionalidade.status_code).json(nacionalidade);
});

/**
 * @swagger
 * /v1/locadora/nacionalidade:
 *   post:
 *     summary: Cadastra uma nova nacionalidade
 *     tags: [Nacionalidade]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NacionalidadeInput'
 *     responses:
 *       201:
 *         description: Nacionalidade cadastrada
 */
router.post('/v1/locadora/nacionalidade', cors(), bodyParserJSON, async (req, res) => {
    let dadosBody = req.body;
    let contentType = req.headers['content-type'];
    let nacionalidade = await controllerNacionalidade.inserirNacionalidade(dadosBody, contentType);
    res.status(nacionalidade.status_code).json(nacionalidade);
});

/**
 * @swagger
 * /v1/locadora/nacionalidade/{id}:
 *   put:
 *     summary: Atualiza uma nacionalidade pelo ID
 *     tags: [Nacionalidade]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NacionalidadeInput'
 *     responses:
 *       200:
 *         description: Nacionalidade atualizada
 */
router.put('/v1/locadora/nacionalidade/:id', cors(), bodyParserJSON, async (req, res) => {
    let dadosBody = req.body;
    let contentType = req.headers['content-type'];
    let idNacionalidade = req.params.id;
    let nacionalidade = await controllerNacionalidade.atualizarNacionalidade(dadosBody, idNacionalidade, contentType);
    res.status(nacionalidade.status_code).json(nacionalidade);
});

module.exports = router;
