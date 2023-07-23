import { Router } from 'express';
import authMiddleware from '../../../middleware/auth.js';
import exprienceDataContr from '../../../controller/sections/Expreience/exprienceData.contr.js';
const router = Router();

router.get('/', exprienceDataContr.getExpreienceData);
router.post('/', authMiddleware, exprienceDataContr.postExpreienceData);
router.put('/:id',  authMiddleware, exprienceDataContr.putExperienceData)
router.delete('/:id', authMiddleware, exprienceDataContr.deleteExperienceData)

export default router;