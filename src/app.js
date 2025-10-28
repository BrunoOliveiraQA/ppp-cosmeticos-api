import express from 'express';
import cors from 'cors';
import setupSwagger from './config/swaggerConfig.js';

// --- Importação das Rotas ---
import authRouter from './routes/authRoutes.js'; 
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';

// Cria a instância principal da aplicação Express
const app = express();

// --- Configuração dos Middlewares ---
app.use(cors());
app.use(express.json());

// --- Configuração do Swagger ---
setupSwagger(app); // <-- NOVA LINHA (Chama a função)

// --- Rotas ---

// Rota de "saúde" (Health Check)
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API de Cosméticos está online!',
    status: 'OK',
  });
});

// Define o prefixo /auth para todas as rotas de autenticação
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);

// Exporta a instância do app para ser usada no server.js
export default app;