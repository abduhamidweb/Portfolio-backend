import { Router } from 'express';
import authMiddleware from '../../../middleware/auth.js';
import projectsDataContr from '../../../controller/sections/Project/projectData.contr.js';
const router = Router();

// router.post('/', userContr.createUser);
router.get('/', projectsDataContr.getProjectData);
router.post('/', projectsDataContr.postProjectData);
// router.get('/:id', userContr.getUserById);
// router.put('/', authMiddleware, userContr.updateUser);
// router.delete('/', authMiddleware, userContr.deleteUser);
// router.post('/login', userContr.login);
// router.post('/forget', userContr.forget);
export default router;