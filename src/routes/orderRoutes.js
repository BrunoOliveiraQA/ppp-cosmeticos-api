import { Router } from 'express';

// Importa o nosso "segurança"
import authMiddleware from '../middlewares/authMiddleware.js';

// Importa o controller da ordem
import { createWhatsappOrder } from '../controllers/OrderController.js';

const orderRouter = Router();

/**
 * @route   POST /order/checkout
 * @desc    Processa o carrinho e retorna uma URL de WhatsApp
 * @access  Private (Requer Token JWT)
 */
orderRouter.post('/checkout', authMiddleware, createWhatsappOrder);

// Exporta o roteador
export default orderRouter;