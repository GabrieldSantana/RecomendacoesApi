const axios = require('axios');
require('dotenv').config();

const GEMINI_API_URL = process.env.GEMINI_API_URL;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const queryGemini = async (question) => {
    try {
        // Formatar o prompt com contexto amigável
        const prompt = `Você é um amigo apaixonado por cultura pop. Recomende filmes, séries ou livros de forma amigável e envolvente, com no máximo 100 palavras. Baseie-se na preferência do usuário: "${question}". Forneça sugestões específicas com uma breve explicação.`;

        const response = await axios.post(
        `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
        {
            contents: [{ parts: [{ text: prompt }] }],
        },
        {
            headers: { 'Content-Type': 'application/json' },
        }
        );

        // Extrair a resposta do Gemini
        const text = response.data.candidates[0].content.parts[0].text;
        return text;
    } catch (error) {
        console.error('Erro ao consultar Gemini:', error.message);
        throw new Error('Falha ao obter recomendação');
    }
};

module.exports = { queryGemini };