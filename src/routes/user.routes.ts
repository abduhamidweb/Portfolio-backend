import { Router } from 'express';
import userContr from '../controller/user.contr.js';
import authMiddleware from '../middleware/auth.js';

const router = Router();

router.post('/', userContr.createUser);
router.get('/',  userContr.getUsers);
router.get('/:id', userContr.getUserById);
router.get('/token/data',authMiddleware, userContr.getUserByToken);
router.put('/', authMiddleware, userContr.updateUser);
router.delete('/', authMiddleware, userContr.deleteUser);
router.post('/login', userContr.login);
router.post('/forget', userContr.forget);
export default router;