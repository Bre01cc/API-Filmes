const express = require('express');
const router = express.Router();

const cors = require('cors');
const bodyParser = require('body-parser');
const bodyParserJSON = bodyParser.json();

const controllerIdioma = require('../controller/idioma/controller_Idioma.js');
/**
 * @swagger
 * tags:
 *   name: Idioma
 *   description: Rotas de idiomas
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Idioma:
 *       type: object
 *       properties:
 *         id_idioma:
 *           type: integer
 *           example: 1
 *         sigla:
 *           type: string
 *           example: "PT"
 *         data_criacao:
 *           type: string
 *           example: "1290-01-01"
 *         descricao:
 *           type: string
 *           example: "Língua portuguesa antiga, base do português moderno."
 *         familia_linguistica:
 *           type: string
 *           example: "Indo-Europeia"
 *         antes_de_cristo:
 *           type: boolean
 *           example: false
 *       required:
 *         - id_idioma
 *         - sigla
 *         - data_criacao
 *         - familia_linguistica
 *
 *     IdiomaInput:
 *       type: object
 *       properties:
 *         sigla:
 *           type: string
 *           example: "PT"
 *         data_criacao:
 *           type: string
 *           example: "1290-01-01"
 *         descricao:
 *           type: string
 *           example: "Língua portuguesa antiga, base do português moderno."
 *         familia_linguistica:
 *           type: string
 *           example: "Indo-Europeia"
 *         antes_de_cristo:
 *           type: boolean
 *           example: false
 *       required:
 *         - sigla
 *         - data_criacao
 *         - familia_linguistica
 */


/**
 * @swagger
 * /v1/locadora/idioma:
 *   get:
 *     summary: Retorna todos os idiomas
 *     tags: [Idioma]
 *     responses:
 *       200:
 *         description: Lista de idiomas
 */
router.get('/v1/locadora/idioma', cors(), async (req, res) => {
    let idioma = await controllerIdioma.listarIdiomas();
    res.status(idioma.status_code).json(idioma);
});

/**
 * @swagger
 * /v1/locadora/idioma/{id}:
 *   get:
 *     summary: Retorna um idioma pelo ID
 *     tags: [Idioma]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do idioma
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Idioma encontrado
 */
router.get('/v1/locadora/idioma/:id', cors(), async (req, res) => {
    let idIdioma = req.params.id;
    let idioma = await controllerIdioma.buscarIdiomasId(idIdioma);
    res.status(idioma.status_code).json(idioma);
});

/**
 * @swagger
 * /v1/locadora/idioma:
 *   post:
 *     summary: Cadastra um novo idioma
 *     tags: [Idioma]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/IdiomaInput'
 *     responses:
 *       201:
 *         description: Idioma cadastrado
 */
router.post('/v1/locadora/idioma', cors(), bodyParserJSON, async (req, res) => {
    let dadosBody = req.body;
    let contentType = req.headers['content-type'];
    let idioma = await controllerIdioma.inserirIdioma(dadosBody, contentType);
    res.status(idioma.status_code).json(idioma);
});

/**
 * @swagger
 * /v1/locadora/idioma/{id}:
 *   put:
 *     summary: Atualiza um idioma pelo ID
 *     tags: [Idioma]
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
 *              $ref: '#/components/schemas/IdiomaInput'
 *     responses:
 *       200:
 *         description: Idioma atualizado
 */
router.put('/v1/locadora/idioma/:id', cors(), bodyParserJSON, async (req, res) => {
    let dadosBody = req.body;
    let contentType = req.headers['content-type'];
    let idIdioma = req.params.id;
    let idioma = await controllerIdioma.atualizarIdioma(dadosBody, idIdioma, contentType);
    res.status(idioma.status_code).json(idioma);
});

/**
 * @swagger
 * /v1/locadora/idioma/{id}:
 *   delete:
 *     summary: Exclui um idioma pelo ID
 *     tags: [Idioma]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Idioma excluído
 */
router.delete('/v1/locadora/idioma/:id', cors(), async (req, res) => {
    let idIdioma = req.params.id;
    let idioma = await controllerIdioma.excluirIdioma(idIdioma);
    res.status(idioma.status_code).json(idioma);
});

module.exports = router;
