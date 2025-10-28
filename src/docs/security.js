/* eslint-disable */
// Desabilitamos o eslint neste arquivo por ser apenas um JSON de definição

export const securitySchemes = {
  // Definição do esquema de segurança JWT
  bearerAuth: {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    description: 'Insira o token JWT no formato: "Bearer {token}"',
  },
};