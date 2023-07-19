import { Router } from 'express';
import portfolioRoutes from '../controller/portfolio.contr.js';
import authMiddleware from '../middleware/auth.js';
const router = Router();
router.post('/', authMiddleware, portfolioRoutes.createUser);
router.get('/', portfolioRoutes.getPortfolio);
router.get('/:id', portfolioRoutes.getPortfolioById);
export default router;