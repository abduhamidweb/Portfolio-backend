import { Router } from 'express';
import authMiddleware from '../middleware/auth.js';
import { ExperienceContr } from '../controller/experience.js';
const router = Router();

router.post('/', ExperienceContr.addExperience)
router.put('/:id', ExperienceContr.putExperience)
router.delete('/:id', ExperienceContr.deleteExperience)


export default router;