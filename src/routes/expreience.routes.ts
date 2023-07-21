import { Router } from 'express';
import authMiddleware from '../middleware/auth.js';
import exprienceContr from '../controller/exprience.contr.js';
const router = Router();

// router.post('/', userContr.createUser);
router.get('/', exprienceContr.getExpreience);
router.post('/', exprienceContr.postExpreience);
router.put('/', exprienceContr.updateExpreience);
// router.get('/:id', userContr.getUserById);
// router.put('/', authMiddleware, userContr.updateUser);
// router.delete('/', authMiddleware, userContr.deleteUser);
// router.post('/login', userContr.login);
// router.post('/forget', userContr.forget);
export default router;