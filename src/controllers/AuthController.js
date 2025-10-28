import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

// Importa os models que vamos usar
import { createUser, findUserByEmail } from '../models/UserModel.js';

// Define a força da criptografia da senha
const SALT_ROUNDS = 10;

// --- Controller de Registro (Register) ---
export const register = async (req, res) => {
  try {
    // 1. Pega os dados do corpo da requisição (JSON)
    const { nome, email, senha, whatsapp } = req.body;

    // 2. Validação simples (Numa API real, isso seria mais complexo)
    if (!nome || !email || !senha || !whatsapp) {
      return res.status(400).json({ 
        message: 'Todos os campos são obrigatórios (nome, email, senha, whatsapp).' 
      });
    }

    // 3. Verifica se o usuário já existe no banco
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'Este email já está cadastrado.' });
    }

    // 4. Criptografa a senha antes de salvar
    const passwordHash = await bcrypt.hash(senha, SALT_ROUNDS);

    // 5. Chama o Model para criar o usuário (e seu carrinho)
    // Usamos o passwordHash, e não a senha original
    const newUserId = await createUser(nome, email, passwordHash, whatsapp);

    // 6. Resposta de sucesso (não retornamos o token aqui, forçamos o login)
    // Isso é uma boa prática de segurança. O usuário se cadastra, depois faz login.
    res.status(201).json({
      message: 'Usuário cadastrado com sucesso!',
      userId: newUserId,
    });

  } catch (error) {
    // Tratamento de erro
    console.error('[AuthController] Erro no registro:', error);
    res.status(500).json({ 
      message: 'Erro interno do servidor ao tentar registrar usuário.' 
    });
  }
};


// --- Controller de Login ---
export const login = async (req, res) => {
  try {
    // 1. Pega email e senha do corpo da requisição
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    // 2. Busca o usuário no banco de dados pelo email
    const user = await findUserByEmail(email);

    // 3. Se o usuário não for encontrado...
    if (!user) {
      // Usamos 401 (Não Autorizado) por segurança. Não diga ao cliente
      // se foi o email ou a senha que errou.
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    // 4. Compara a senha enviada com o hash salvo no banco
    const isPasswordValid = await bcrypt.compare(senha, user.password_hash);

    // 5. Se as senhas não baterem...
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    // 6. Se passou em tudo, o usuário está autenticado!
    // Geramos o Token JWT
    const token = jwt.sign(
      { 
        id: user.id, // O "payload" do token. Guardamos o ID
        nome: user.nome
      },
      process.env.JWT_SECRET, // Nosso segredo do .env
      {
        expiresIn: process.env.JWT_EXPIRES_IN // Tempo de expiração do .env
      }
    );

    // 7. Envia a resposta de sucesso com o token
    res.status(200).json({
      message: 'Login bem-sucedido!',
      userId: user.id,
      token: token,
    });

  } catch (error) {
    console.error('[AuthController] Erro no login:', error);
    res.status(500).json({ 
      message: 'Erro interno do servidor ao tentar fazer login.' 
    });
  }
};