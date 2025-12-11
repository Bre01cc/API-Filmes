const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Locadora',
      version: '1.0.0',
      description: 'API de filmes criada na disciplina de Back-End',
    },
    servers: [
      { url: 'http://localhost:8080' },
    ]
    
  },

   apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
