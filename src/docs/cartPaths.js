/* eslint-disable */
export const cartPaths = {
  '/cart': {
    get: {
      tags: ['Carrinho'],
      summary: 'Busca o carrinho do usuário',
      description: 'Retorna os itens e o valor total do carrinho do usuário autenticado.',
      security: [ // <-- Define que esta rota é PRIVADA
        {
          bearerAuth: [],
        },
      ],
      responses: {
        '200': {
          description: 'Carrinho do usuário',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Cart', // Referência ao Schema de Carrinho
              },
            },
          },
        },
        '401': { $ref: '#/components/schemas/Error401' },
        '500': { $ref: '#/components/schemas/Error500' },
      },
    },
  },
  '/cart/add': {
    post: {
      tags: ['Carrinho'],
      summary: 'Adiciona ou atualiza item no carrinho',
      description: 'Adiciona um produto ao carrinho. Se o produto já existir, atualiza sua quantidade.',
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                productId: { type: 'integer', example: 1 },
                quantidade: { type: 'integer', example: 2 },
              },
              required: ['productId', 'quantidade'],
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Item adicionado/atualizado. Retorna o carrinho atualizado.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string', example: 'Item adicionado/atualizado com sucesso!' },
                  cart: { $ref: '#/components/schemas/Cart' },
                },
              },
            },
          },
        },
        '400': { $ref: '#/components/schemas/Error400' },
        '401': { $ref: '#/components/schemas/Error401' },
        '404': { description: 'Produto não encontrado no catálogo', $ref: '#/components/schemas/Error404' },
        '500': { $ref: '#/components/schemas/Error500' },
      },
    },
  },
  '/cart/remove/{productId}': {
    delete: {
      tags: ['Carrinho'],
      summary: 'Remove um item do carrinho',
      description: 'Remove um produto específico do carrinho do usuário.',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: 'productId',
          in: 'path',
          required: true,
          schema: {
            type: 'integer',
          },
          description: 'ID do produto a ser removido.',
        },
      ],
      responses: {
        '200': {
          description: 'Item removido',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string', example: 'Item removido com sucesso do carrinho.' },
                },
              },
            },
          },
        },
        '401': { $ref: '#/components/schemas/Error401' },
        '404': { description: 'Item não encontrado no carrinho', $ref: '#/components/schemas/Error404' },
        '500': { $ref: '#/components/schemas/Error500' },
      },
    },
  },
};