# API de Recomendações Culturais

Uma API backend construída com Node.js e Express que integra a API do Google Gemini para fornecer recomendações de filmes, séries ou livros em um tom amigável, com base nas preferências do usuário. A documentação da API é gerada automaticamente com Swagger.

## Funcionalidades
- Endpoint para obter recomendações culturais personalizadas (`POST /api/recommend`).
- Integração com a API do Google Gemini para gerar respostas.
- Documentação interativa via Swagger (`/api-docs`).

## Pré-requisitos
- **Node.js**: Versão 18 ou superior.
- **Chave da API do Google Gemini**: Obtida em [Google AI Studio](https://ai.google.dev/).

## Instalação
1. Clone o repositório (ou crie a estrutura de arquivos manualmente):
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd recomendacoesApi
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```plaintext
   GEMINI_API_KEY=sua-chave-de-api
   GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent
   PORT=3000
   ```
   **Nota**: Substitua `sua-chave-de-api` pela chave obtida no Google AI Studio. Verifique a URL da API na documentação oficial, pois ela pode variar.

## Estrutura do Projeto
```
recomendacao-cultural/
├── src/
│   ├── routes/
│   │   └── recomendacao.js      # Rotas da API
│   ├── services/
│   │   └── geminiService.js     # Integração com a API do Gemini
│   ├── swagger.yaml             # Configuração do Swagger
│   └── server.js                # Servidor principal
├── .env                         # Variáveis de ambiente
├── package.json                 # Dependências e scripts
├── package-lock.json            # Dependências
├── .gitignore                   # 
└── README.md                    # Este arquivo
```

## Como Executar
1. Inicie o servidor:
   ```bash
   npm start
   ```
2. Acesse a documentação Swagger:
   - Abra `http://localhost:3000/api-docs` no navegador.
3. Teste os endpoints:
   - **Recomendação**:
     ```bash
     curl -X POST http://localhost:3000/api/recommend -H "Content-Type: application/json" -d '{"question": "Quero um filme de ficção científica"}'
     ```
     **Resposta esperada**:
     ```json
     {
       "response": "Ei, se você curte ficção científica, 'Duna' (2021) é incrível! Tem visuais épicos e uma história sobre destino e poder. Outra dica é 'Interstellar', com uma vibe emocionante e viagens espaciais. Qual estilo você prefere?"
     }
     ```
   - **Verificação de status**:
     ```bash
     curl http://localhost:3000/api/health
     ```
     **Resposta esperada**:
     ```json
     {"status": "ok"}
     ```

## Endpoints da API
- **POST /api/recommend**
  - **Descrição**: Obtém recomendações de filmes, séries ou livros com base na preferência do usuário.
  - **Corpo da requisição**:
    ```json
    {"question": "Quero um filme de ficção científica"}
    ```
  - **Resposta**:
    ```json
    {"response": "<recomendação gerada pelo Gemini>"}
    ```

## Documentação
A documentação completa da API está disponível em `/api-docs` (Swagger UI) quando o servidor está rodando. Acesse `http://localhost:3000/api-docs` para explorar os endpoints interativamente.

## Solução de Problemas
- **Erro 404 ao consultar Gemini**:
  - Verifique a `GEMINI_API_URL` no arquivo `.env` e na documentação oficial do Gemini.
  - Confirme se o modelo (ex.: `gemini-2.0-flash`) está disponível na camada gratuita.
  - Teste a chave da API diretamente com `curl`:
    ```bash
    curl -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=SUA_CHAVE" -H "Content-Type: application/json" -d '{"contents": [{"parts": [{"text": "Teste"}]}]}'
    ```
- **Erro 401/403**:
  - A chave da API pode estar inválida ou sem permissões. Gere uma nova chave em [Google AI Studio](https://ai.google.dev/).
- **Servidor não inicia**:
  - Verifique se a porta `3000` está livre ou altere a variável `PORT` no `.env`.

## Contribuições
Sinta-se à vontade para abrir issues ou pull requests no repositório para melhorias ou correções.

## Licença
MIT License