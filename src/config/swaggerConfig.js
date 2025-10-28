import swaggerUi from 'swagger-ui-express';
import swaggerDefinition from '../docs/swaggerDef.js';

// Importa todas as partes da documentação
import { schemas } from '../docs/schemas.js';
import { securitySchemes } from '../docs/security.js';
import { authPaths } from '../docs/authPaths.js';
import { productPaths } from '../docs/productPaths.js';
import { cartPaths } from '../docs/cartPaths.js';
import { orderPaths } from '../docs/orderPaths.js';

// Monta a especificação completa do Swagger
const swaggerSpec = {
  ...swaggerDefinition, // Definição base (info, servers)
  
  // Adiciona as "Tags" para agrupar as rotas
  tags: [
    { name: 'Autenticação', description: 'Rotas para registro e login' },
    { name: 'Produtos', description: 'Rotas públicas de visualização do catálogo' },
    { name: 'Carrinho', description: 'Rotas privadas para gerenciamento do carrinho' },
    { name: 'Pedido (Checkout)', description: 'Rota privada para finalizar a compra' },
  ],

  // Adiciona os Schemas e Definições de Segurança
  components: {
    schemas: schemas,
    securitySchemes: securitySchemes,
  },

  // Junta todas as definições de rotas (paths)
  paths: {
    ...authPaths,
    ...productPaths,
    ...cartPaths,
    ...orderPaths,
  },
};

// Função para configurar o Swagger UI
const setupSwagger = (app) => {
  app.use(
    '/api-docs', // A rota onde a documentação ficará disponível
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, { 
      // Opções de customização
      customCss: '.swagger-ui .topbar { display: none }', // Esconde a barra superior
      customSiteTitle: 'API Cosméticos - Docs',
      swaggerOptions: {
        docExpansion: 'list',   // 'list' (expande as rotas) ou 'none' (contrai)
        filter: true,           // Habilita a barra de filtro
        showCommonExtensions: true,
        showExtensions: true,
      },
    })
  );
};

export default setupSwagger;