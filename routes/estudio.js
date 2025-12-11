/***********************************************************************************************************************
 * Objetivo: Rotas para estudo com documentação Swagger corrigida
 * Data: 11/12/2025
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.3
 ***********************************************************************************************************************/

const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const bodyParserJSON = bodyParser.json();

const controllerEstudio = require('../controller/estudio/estudio_controller.js');

/**
 * @swagger
 * tags:
 *   name: Estudios
 *   description: Rotas de estudios
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Estudio:
 *       type: object
 *       properties:
 *         id_estudio:
 *           type: integer
 *           example: 1
 *         nome:
 *           type: string
 *           example: "Warner Bros"
 *         nome_fantasia:
 *           type: string
 *           example: "Warner"
 *         dublagem:
 *           type: boolean
 *           example: false
 *         produtora:
 *           type: boolean
 *           example: true
 *         ano_fundacao:
 *           type: string
 *           format: date
 *           example: "1923-04-04"
 *         email:
 *           type: string
 *           format: email
 *           example: "contato@warner.com"
 *         telefone:
 *           type: string
 *           example: "(11)1234-5678"
 *         id_nacionalidade:
 *           type: integer
 *           example: 1
 *       required:
 *         - nome
 *         - nome_fantasia
 *         - ano_fundacao
 *         - telefone
 *         - email
 *         - id_nacionalidade
 * 
 *     EstudioInput:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           example: "Warner Bros"
 *         nome_fantasia:
 *           type: string
 *           example: "Warner"
 *         dublagem:
 *           type: boolean
 *           example: false
 *         produtora:
 *           type: boolean
 *           example: true
 *         ano_fundacao:
 *           type: string
 *           format: date
 *           example: "1923-04-04"
 *         email:
 *           type: string
 *           format: email
 *           example: "contato@warner.com"
 *         telefone:
 *           type: string
 *           example: "(11)1234-5678"
 *         id_nacionalidade:
 *           type: integer
 *           example: 1
 *       required:
 *         - nome
 *         - nome_fantasia
 *         - ano_fundacao
 *         - telefone
 *         - email
 *         - id_nacionalidade
 */

/**
 * @swagger
 * /v1/locadora/estudio:
 *   get:
 *     summary: Retorna todos os estudios
 *     tags: [Estudios]
 *     responses:
 *       200:
 *         description: Lista de estudios retornada
 */
router.get('/v1/locadora/estudio', cors(), async (req, res) => {
    let estudio = await controllerEstudio.listarEstudios();
    res.status(estudio.status_code).json(estudio);
});

/**
 * @swagger
 * /v1/locadora/estudio/{id}:
 *   get:
 *     summary: Retorna um estudio pelo ID
 *     tags: [Estudios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do estudio
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estudio encontrado
 */
router.get('/v1/locadora/estudio/:id', cors(), async (req, res) => {
    let estudio = await controllerEstudio.buscarEstudioID(req.params.id);
    res.status(estudio.status_code).json(estudio);
});

/**
 * @swagger
 * /v1/locadora/estudio/nacionalidade/{id}:
 *   get:
 *     summary: Retorna estudios por nacionalidade
 *     tags: [Estudios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da nacionalidade
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estudios encontrados
 */
router.get('/v1/locadora/estudio/nacionalidade/:id', cors(), async (req, res) => {
    let estudio = await controllerEstudio.buscarEstudioIDNacionalidade(req.params.id);
    res.status(estudio.status_code).json(estudio);
});

/**
 * @swagger
 * /v1/locadora/estudio:
 *   post:
 *     summary: Cadastra um novo estudio
 *     tags: [Estudios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EstudioInput'
 *     responses:
 *       201:
 *         description: Estudio cadastrado com sucesso
 */
router.post('/v1/locadora/estudio', cors(), bodyParserJSON, async (req, res) => {
    let estudio = await controllerEstudio.inserirEstudio(req.body, req.headers['content-type']);
    res.status(estudio.status_code).json(estudio);
});

/**
 * @swagger
 * /v1/locadora/estudio/{id}:
 *   put:
 *     summary: Atualiza um estudio pelo ID
 *     tags: [Estudios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do estudio
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EstudioInput'
 *     responses:
 *       200:
 *         description: Estudio atualizado com sucesso
 */
router.put('/v1/locadora/estudio/:id', cors(), bodyParserJSON, async (req, res) => {
    let estudio = await controllerEstudio.atualizarEstudio(req.body, req.params.id, req.headers['content-type']);
    res.status(estudio.status_code).json(estudio);
});

/**
 * @swagger
 * /v1/locadora/estudio/{id}:
 *   delete:
 *     summary: Exclui um estudio pelo ID
 *     tags: [Estudios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do estudio
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estudio excluído com sucesso
 */
router.delete('/v1/locadora/estudio/:id', cors(), async (req, res) => {
    let estudio = await controllerEstudio.deletarEstudioId(req.params.id);
    res.status(estudio.status_code).json(estudio);
});

/**
 * @swagger
 * /v1/locadora/estudio/nacionalidade/{id}:
 *   delete:
 *     summary: Exclui estudios por nacionalidade
 *     tags: [Estudios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da nacionalidade
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estudios excluídos com sucesso
 */
router.delete('/v1/locadora/estudio/nacionalidade/:id', cors(), async (req, res) => {
    let estudio = await controllerEstudio.deletarEstudioIdNacionalidade(req.params.id);
    res.status(estudio.status_code).json(estudio);
});

module.exports = router;
