/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas rotas referente ao tipo distribuidor
 * Data: 04/11/2025
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/
const express = require('express');
const router = express.Router();

const cors = require('cors');
const bodyParser = require('body-parser');
const bodyParserJSON = bodyParser.json();

const controllerTipoDistribuidora = require('../controller/tipo_distribuidora/tipo_distribuidora_controller.js');

/**
 * @swagger
 * tags:
 *   name: TipoDistribuidora
 *   description: Rotas para gerenciamento de tipos de distribuidora
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TipoDistribuidora:
 *       type: object
 *       properties:
 *         id_tipo_distribuidora:
 *           type: integer
 *           example: 1
 *         nome:
 *           type: string
 *           example: "Distribuidora XYZ"
 *         descricao:
 *           type: string
 *           example: "Distribuidora especializada em filmes de ação"
 *       required:
 *         - nome
 *         - descricao
 *
 *     TipoDistribuidoraInput:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           example: "Distribuidora XYZ"
 *         descricao:
 *           type: string
 *           example: "Distribuidora especializada em filmes de ação"
 *       required:
 *         - nome
 *         - descricao
 */


/**
 * @swagger
 * /v1/locadora/tipoDistribuidora:
 *   get:
 *     summary: Retorna todos os tipos de distribuidora
 *     tags: [TipoDistribuidora]
 *     responses:
 *       200:
 *         description: Lista de tipos de distribuidora
 */
router.get('/v1/locadora/tipoDistribuidora', cors(), async (req, res) => {
    let tipoDistribuidora = await controllerTipoDistribuidora.listarTipoDistribuidora();
    res.status(tipoDistribuidora.status_code).json(tipoDistribuidora);
});

/**
 * @swagger
 * /v1/locadora/tipoDistribuidora/{id}:
 *   get:
 *     summary: Retorna um tipo de distribuidora pelo ID
 *     tags: [TipoDistribuidora]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do tipo de distribuidora
 *     responses:
 *       200:
 *         description: Tipo de distribuidora encontrado
 */
router.get('/v1/locadora/tipoDistribuidora/:id', cors(), async (req, res) => {
    let idTipoDistribuidora = req.params.id;
    let tipoDistribuidora = await controllerTipoDistribuidora.buscarTipoDistribuidoraID(idTipoDistribuidora);
    res.status(tipoDistribuidora.status_code).json(tipoDistribuidora);
});

/**
 * @swagger
 * /v1/locadora/tipoDistribuidora/{id}:
 *   delete:
 *     summary: Exclui um tipo de distribuidora pelo ID
 *     tags: [TipoDistribuidora]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tipo de distribuidora excluído
 */
router.delete('/v1/locadora/tipoDistribuidora/:id', cors(), async (req, res) => {
    let idTipoDistribuidora = req.params.id;
    let tipoDistribuidora = await controllerTipoDistribuidora.deletarTipoDistribuidoraId(idTipoDistribuidora);
    res.status(tipoDistribuidora.status_code).json(tipoDistribuidora);
});

/**
 * @swagger
 * /v1/locadora/tipoDistribuidora:
 *   post:
 *     summary: Cadastra um novo tipo de distribuidora
 *     tags: [TipoDistribuidora]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TipoDistribuidoraInput'
 *     responses:
 *       201:
 *         description: Tipo de distribuidora cadastrado
 */
router.post('/v1/locadora/tipoDistribuidora', cors(), bodyParserJSON, async (req, res) => {
    let dadosBody = req.body;
    let contentType = req.headers['content-type'];
    let tipoDistribuidora = await controllerTipoDistribuidora.inserirTipoDistribuidora(dadosBody, contentType);
    res.status(tipoDistribuidora.status_code).json(tipoDistribuidora);
});

/**
 * @swagger
 * /v1/locadora/tipoDistribuidora/{id}:
 *   put:
 *     summary: Atualiza um tipo de distribuidora pelo ID
 *     tags: [TipoDistribuidora]
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
 *             $ref: '#/components/schemas/TipoDistribuidoraInput'
 *     responses:
 *       200:
 *         description: Tipo de distribuidora atualizado
 */
router.put('/v1/locadora/tipoDistribuidora/:id', cors(), bodyParserJSON, async (req, res) => {
    let dadosBody = req.body;
    let contentType = req.headers['content-type'];
    let idTipoDistribuidora = req.params.id;
    let tipoDistribuidora = await controllerTipoDistribuidora.atualizarTipoDistribuidora(dadosBody, idTipoDistribuidora, contentType);
    res.status(tipoDistribuidora.status_code).json(tipoDistribuidora);
});

module.exports = router;

