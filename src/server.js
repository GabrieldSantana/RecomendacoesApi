const express = require('express');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const recomendacaoRoutes = require('./routes/recomendacao');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsing de JSON
app.use(express.json());

// Carregar documentação Swagger
const swaggerDocument = yaml.load('./src/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas
app.use('/api', recomendacaoRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Documentação Swagger: http://localhost:${PORT}/api-docs`);
});