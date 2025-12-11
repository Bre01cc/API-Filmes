const express = require('express');
const router = express.Router();

const cors = require('cors');
const bodyParser = require('body-parser');
const bodyParserJSON = bodyParser.json();

const controllerDistribuidora = require('../controller/distribuidora/distribuidora_controller.js');

/**
 * @swagger
 * tags:
 *   name: Distribuidora
 *   description: Rotas para gerenciamento de distribuidoras
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Distribuidora:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           example: "Warner Bros"
 *         descricao:
 *           type: string
 *           example: "Distribuidora Internacional"
 *         data_fundacao:
 *           type: string
 *           format: date
 *           example: "1923-04-04"
 *         telefone:
 *           type: string
 *           example: "(11) 90000-0000"
 *         email:
 *           type: string
 *           format: email
 *           example: "contato@warner.com"
 *         id_nacionalidade:
 *           type: integer
 *           example: 3
 *         id_tipo_distribuidora:
 *           type: integer
 *           example: 1
 *       required:
 *         - nome
 *         - descricao
 *         - data_fundacao
 *         - telefone
 *         - email
 *         - id_nacionalidade
 *         - id_tipo_distribuidora

 *     DistribuidoraOutput:
 *       type: object
 *       properties:
 *         id_distribuidora:
 *           type: integer
 *           example: 1
 *         nome:
 *           type: string
 *           example: "Warner Bros"
 *         descricao:
 *           type: string
 *           example: "Distribuidora Internacional"
 *         data_fundacao:
 *           type: string
 *           format: date
 *           example: "1923-04-04"
 *         telefone:
 *           type: string
 *           example: "(11) 90000-0000"
 *         email:
 *           type: string
 *           format: email
 *           example: "contato@warner.com"
 *         id_nacionalidade:
 *           type: integer
 *           example: 3
 *         id_tipo_distribuidora:
 *           type: integer
 *           example: 1

 */

/**
 * @swagger
 * /v1/locadora/distribuidora:
 *   get:
 *     summary: Retorna todas as distribuidoras
 *     tags: [Distribuidora]
 *     responses:
 *       200:
 *         description: Lista de distribuidoras
 */
router.get('/v1/locadora/distribuidora', cors(), async (req, res) => {
    let distribuidora = await controllerDistribuidora.listarDistribuidora();
    res.status(distribuidora.status_code).json(distribuidora);
});

/**
 * @swagger
 * /v1/locadora/distribuidora/{id}:
 *   get:
 *     summary: Retorna uma distribuidora pelo ID
 *     tags: [Distribuidora]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da distribuidora
 *     responses:
 *       200:
 *         description: Distribuidora encontrada
 */
router.get('/v1/locadora/distribuidora/:id', cors(), async (req, res) => {
    let idDistribuidora = req.params.id;
    let distribuidora = await controllerDistribuidora.buscarDistribuidoraID(idDistribuidora);
    res.status(distribuidora.status_code).json(distribuidora);
});

/**
 * @swagger
 * /v1/locadora/distribuidora/{id}:
 *   delete:
 *     summary: Exclui uma distribuidora pelo ID
 *     tags: [Distribuidora]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Distribuidora excluída
 */
router.delete('/v1/locadora/distribuidora/:id', cors(), async (req, res) => {
    let idDistribuidora = req.params.id;
    let distribuidora = await controllerDistribuidora.deletarDistribuidoraId(idDistribuidora);
    res.status(distribuidora.status_code).json(distribuidora);
});


/**
 * @swagger
 * /v1/locadora/distribuidora/type/{id}:
 *   delete:
 *     summary: Exclui uma distribuidora pelo ID do tipo_distribuidora
 *     tags: [Distribuidora]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Distribuidora excluída
 */
router.delete('/v1/locadora/distribuidora/:id', cors(), async (req, res) => {
    let idDistribuidora = req.params.id;
    let distribuidora = await controllerDistribuidora.deletarDistribuidoraIdType(idDistribuidora);
    res.status(distribuidora.status_code).json(distribuidora);
});

/**
 * @swagger
 * /v1/locadora/distribuidora:
 *   post:
 *     summary: Cadastra uma nova distribuidora
 *     tags: [Distribuidora]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Distribuidora'
 *     responses:
 *       201:
 *         description: Distribuidora cadastrada
 */
router.post('/v1/locadora/distribuidora', cors(), bodyParserJSON, async (req, res) => {
    let dadosBody = req.body;
    let contentType = req.headers['content-type'];
    let distribuidora = await controllerDistribuidora.inserirDistribuidora(dadosBody, contentType);
    res.status(distribuidora.status_code).json(distribuidora);
});



/**
 * @swagger
 * /v1/locadora/distribuidora/{id}:
 *   put:
 *     summary: Atualiza uma distribuidora pelo ID
 *     tags: [Distribuidora]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da distribuidora
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Distribuidora'
 *     responses:
 *       200:
 *         description: Distribuidora atualizada
 */

router.put('/v1/locadora/distribuidora/:id', cors(), bodyParserJSON, async (req, res) => {
    let dadosBody = req.body;
    let contentType = req.headers['content-type'];
    let idDistribuidora = req.params.id;
    let distribuidora = await controllerDistribuidora.atualizarDistribuidora(dadosBody, idDistribuidora, contentType);
    res.status(distribuidora.status_code).json(distribuidora);
});

module.exports = router;


