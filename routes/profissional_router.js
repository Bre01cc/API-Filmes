/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas rotas referente a profissional
 * Data: 04/11/2025
 * Autor: Breno Oliveira Assis Reis
 * Versão: 1.0
 ***********************************************************************************************************************/

const express = require('express');
const router = express.Router();

const cors = require('cors');
const bodyParser = require('body-parser');
const bodyParserJSON = bodyParser.json();

const controllerProfissional = require('../controller/profissional/profissional_controller.js');

/**
 * @swagger
 * tags:
 *   name: Profissional
 *   description: Rotas para gerenciamento de profissionais
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Profissional:
 *       type: object
 *       properties:
 *         id_profissional:
 *           type: integer
 *           example: 1
 *         nome:
 *           type: string
 *           example: "João Silva"
 *         nome_artistico:
 *           type: string
 *           example: "Joãozinho"
 *         data_nascimento:
 *           type: string
 *           format: date
 *           example: "1990-05-21"
 *         data_falecimento:
 *           type: string
 *           format: date
 *           nullable: true
 *           example: null
 *         foto:
 *           type: string
 *           example: "foto.png"
 *         sexo:
 *           type: string
 *           example: "M"
 *         rede_social:
 *           type: string
 *           nullable: true
 *           example: "https://instagram.com/joao"
 *         biografia:
 *           type: string
 *           example: "Ator e produtor de cinema"
 *         nacionalidade:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id_nacionalidade:
 *                 type: integer
 *                 example: 1
 *               nome:
 *                 type: string
 *                 example: "Brasil"
 *         idioma:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id_idioma:
 *                 type: integer
 *                 example: 1
 *               sigla:
 *                 type: string
 *                 example: "PT"
 *
 *     ProfissionalInput:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           example: "João Silva"
 *         nome_artistico:
 *           type: string
 *           example: "Joãozinho"
 *         data_nascimento:
 *           type: string
 *           format: date
 *           example: "1990-05-21"
 *         data_falecimento:
 *           type: string
 *           format: date
 *           nullable: true
 *           example: null
 *         foto:
 *           type: string
 *           example: "foto.png"
 *         sexo:
 *           type: string
 *           example: "M"
 *         rede_social:
 *           type: string
 *           nullable: true
 *           example: "https://instagram.com/joao"
 *         biografia:
 *           type: string
 *           example: "Ator e produtor de cinema"
 *         nacionalidade:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id_nacionalidade:
 *                 type: integer
 *                 example: 1
 *         idioma:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id_idioma:
 *                 type: integer
 *                 example: 1
 *       required:
 *         - nome
 *         - data_nascimento
 *         - sexo
 *         - foto
 */


/**
 * @swagger
 * /v1/locadora/profissional:
 *   get:
 *     summary: Retorna todos os profissionais
 *     tags: [Profissional]
 *     responses:
 *       200:
 *         description: Lista de profissionais
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profissional'
 */
router.get('/v1/locadora/profissional', cors(), async (req, res) => {
    let profissional = await controllerProfissional.listarProfissional();
    res.status(profissional.status_code).json(profissional);
});

/**
 * @swagger
 * /v1/locadora/profissional/{id}:
 *   get:
 *     summary: Retorna um profissional pelo ID
 *     tags: [Profissional]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do profissional
 *     responses:
 *       200:
 *         description: Profissional encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profissional'
 */
router.get('/v1/locadora/profissional/:id', cors(), async (req, res) => {
    let idProfissional = req.params.id;
    let profissional = await controllerProfissional.buscarProfissionalID(idProfissional);
    res.status(profissional.status_code).json(profissional);
});

/**
 * @swagger
 * /v1/locadora/profissional/{id}:
 *   delete:
 *     summary: Exclui um profissional pelo ID
 *     tags: [Profissional]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Profissional excluído
 */
router.delete('/v1/locadora/profissional/:id', cors(), async (req, res) => {
    let idProfissional = req.params.id;
    let profissional = await controllerProfissional.deletarProfissionalId(idProfissional);
    res.status(profissional.status_code).json(profissional);
});

/**
 * @swagger
 * /v1/locadora/profissional:
 *   post:
 *     summary: Cadastra um novo profissional
 *     tags: [Profissional]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfissionalInput'
 *     responses:
 *       201:
 *         description: Profissional cadastrado
 */
router.post('/v1/locadora/profissional', cors(), bodyParserJSON, async (req, res) => {
    let dadosBody = req.body;
    let contentType = req.headers['content-type'];
    let profissional = await controllerProfissional.inserirProfissional(dadosBody, contentType);
    res.status(profissional.status_code).json(profissional);
});

/**
 * @swagger
 * /v1/locadora/profissional/{id}:
 *   put:
 *     summary: Atualiza um profissional pelo ID
 *     tags: [Profissional]
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
 *             $ref: '#/components/schemas/ProfissionalInput'
 *     responses:
 *       200:
 *         description: Profissional atualizado
 */
router.put('/v1/locadora/profissional/:id', cors(), bodyParserJSON, async (req, res) => {
    let dadosBody = req.body;
    let contentType = req.headers['content-type'];
    let idProfissional = req.params.id;
    let profissional = await controllerProfissional.atualizarProfissional(dadosBody, idProfissional, contentType);
    res.status(profissional.status_code).json(profissional);
});

module.exports = router;
