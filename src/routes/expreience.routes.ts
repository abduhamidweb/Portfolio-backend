import { Router } from 'express';
import authMiddleware from '../middleware/auth.js';
import exprienceContr from '../controller/exprience.contr.js';
const router = Router();
router.put('/', authMiddleware, exprienceContr.updateExpreience);
export default router;