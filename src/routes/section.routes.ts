import { Router } from 'express';
import authMiddleware from '../middleware/auth.js';
import { SectionContr } from '../controller/section.schema.js';
const router = Router();

router.post('/', SectionContr.AddSection)
router.put('/:id', SectionContr.PutSection)
router.delete('/:id', SectionContr.DeleteSection)


export default router;