import { Router } from 'express';
import authMiddleware from '../../../middleware/auth.js';
import exprienceContr from '../../../controller/sections/Expreience/exprience.contr.js';
const router = Router();
router.put('/', authMiddleware, exprienceContr.updateExpreience);
export default router;