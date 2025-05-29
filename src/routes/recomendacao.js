const express = require('express');
const { queryGemini } = require('../services/geminiService');

const router = express.Router();

/**
 * @swagger
 * /recommend:
 *   post:
 *     summary: Obtém recomendações de filmes, séries ou livros
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 description: Preferência do usuário (ex.: gênero, tema)
 *                 example: "Quero um filme de ficção científica"
 *     responses:
 *       200:
 *         description: Recomendação gerada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *       400:
 *         description: Pergunta não fornecida
 *       500:
 *         description: Erro ao consultar a API
 */
router.post('/recommend', async (req, res) => {
    const { question } = req.body;

    if (!question) {
        return res.status(400).json({ success: true, error: 'Pergunta não fornecida' });
    }

    try {
        const response = await queryGemini(question);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;