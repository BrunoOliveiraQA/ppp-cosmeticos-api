/* eslint-disable */
export const authPaths = {
  '/auth/register': {
    post: {
      tags: ['Autenticação'],
      summary: 'Registra um novo usuário',
      description: 'Cria um novo usuário e seu respectivo carrinho vazio no sistema.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                nome: { type: 'string', example: 'João da Silva' },
                email: { type: 'string', example: 'joao.silva@email.com' },
                senha: { type: 'string', format: 'password', example: 'senha123' },
                whatsapp: { type: 'string', example: '11987654321' },
              },
              required: ['nome', 'email', 'senha', 'whatsapp'],
            },
          },
        },
      },
      responses: {
        '201': {
          description: 'Usuário cadastrado com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string', example: 'Usuário cadastrado com sucesso!' },
                  userId: { type: 'integer', example: 1 },
                },
              },
            },
          },
        },
        '400': { $ref: '#/components/schemas/Error400' },
        '409': { description: 'Email já cadastrado', $ref: '#/components/schemas/Error400' },
        '500': { $ref: '#/components/schemas/Error500' },
      },
    },
  },
  '/auth/login': {
    post: {
      tags: ['Autenticação'],
      summary: 'Autentica um usuário',
      description: 'Faz o login do usuário e retorna um token JWT para acesso às rotas privadas.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: { type: 'string', example: 'joao.silva@email.com' },
                senha: { type: 'string', format: 'password', example: 'senha123' },
              },
              required: ['email', 'senha'],
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Login bem-sucedido',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string', example: 'Login bem-sucedido!' },
                  userId: { type: 'integer', example: 1 },
                  token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                },
              },
            },
          },
        },
        '400': { $ref: '#/components/schemas/Error400' },
        '401': { description: 'Credenciais inválidas', $ref: '#/components/schemas/Error401' },
        '500': { $ref: '#/components/schemas/Error500' },
      },
    },
  },
};