import { Router } from 'express';
import authMiddleware from '../../../middleware/auth.js';
import projectContr from '../../../controller/sections/Project/project.contr.js';
const router = Router();
router.put('/', authMiddleware, projectContr.updateProject);
export default router;