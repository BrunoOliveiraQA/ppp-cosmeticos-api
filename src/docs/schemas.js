/* eslint-disable */
// Desabilitamos o eslint neste arquivo por ser apenas um JSON de definição

export const schemas = {
  // --- Objeto Base do Produto ---
  Product: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        format: 'int64',
        example: 1,
      },
      nome: {
        type: 'string',
        example: 'Creme de Barbear Hidratante',
      },
      descricao: {
        type: 'string',
        example: 'Creme denso para um barbear suave e rente.',
      },
      preco: {
        type: 'number',
        format: 'decimal',
        example: '45.50',
      },
      categoria: {
        type: 'string',
        enum: ['masculino', 'feminino', 'unissex'],
        example: 'masculino',
      },
      imagem_url: {
        type: 'string',
        example: 'https://exemplo.com/img/barba.jpg',
      },
    },
  },

  // --- Objeto do Item no Carrinho ---
  CartItem: {
    type: 'object',
    properties: {
      product_id: {
        type: 'integer',
        example: 1,
      },
      quantidade: {
        type: 'integer',
        example: 2,
      },
      nome: {
        type: 'string',
        example: 'Creme de Barbear Hidratante',
      },
      preco: {
        type: 'number',
        format: 'decimal',
        example: '45.50',
      },
      imagem_url: {
        type: 'string',
        example: 'https://exemplo.com/img/barba.jpg',
      },
      subtotal: {
        type: 'number',
        format: 'decimal',
        example: '91.00',
      },
    },
  },

  // --- Objeto do Carrinho Completo ---
  Cart: {
    type: 'object',
    properties: {
      items: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/CartItem', // Referência ao schema CartItem
        },
      },
      total: {
        type: 'number',
        format: 'decimal',
        example: 91.00,
      },
    },
  },

  // --- Respostas de Erro Padrão ---
  Error400: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: 'Requisição inválida. Verifique os dados enviados.',
      },
    },
  },
  Error401: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: 'Token de autenticação não fornecido ou inválido.',
      },
    },
  },
  Error404: {
    type: 'object',
    properties: {
      message: { type: 'string', example: 'Recurso não encontrado.' },
    },
  },
  Error500: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: 'Erro interno do servidor.',
      },
    },
  },
};