import { Router } from 'express';
import authMiddleware from '../middleware/auth.js';
import exprienceContr from '../controller/exprienceData.contr.js';
const router = Router();

// router.post('/', userContr.createUser);
router.get('/', exprienceContr.getExpreienceData);
router.post('/', exprienceContr.postExpreienceData);
// router.get('/:id', userContr.getUserById);
// router.put('/', authMiddleware, userContr.updateUser);
// router.delete('/', authMiddleware, userContr.deleteUser);
// router.post('/login', userContr.login);
// router.post('/forget', userContr.forget);
export default router;