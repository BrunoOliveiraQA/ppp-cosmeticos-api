import { Router } from 'express';

// Importa os controllers que este roteador vai usar
import { register, login } from '../controllers/AuthController.js';

// Cria a instância do roteador
const authRouter = Router();

// --- Definição das Rotas de Autenticação ---

/**
 * @route   POST /auth/register
 * @desc    Registra um novo usuário
 * @access  Public
 * @body    { "nome": "String", "email": "String", "senha": "String", "whatsapp": "String" }
 */
authRouter.post('/register', register);

/**
 * @route   POST /auth/login
 * @desc    Autentica um usuário e retorna um token JWT
 * @access  Public
 * @body    { "email": "String", "senha": "String" }
 */
authRouter.post('/login', login);


// Exporta o roteador para ser usado no app.js
export default authRouter;