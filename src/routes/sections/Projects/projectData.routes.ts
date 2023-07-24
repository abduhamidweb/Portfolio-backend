import { Router } from 'express';
import projectsDataContr from '../../../controller/sections/Project/projectData.contr.js';
import Middleware from '../../../middleware/project.check.js';
const router = Router();
let {authMiddleware,idChecker} =Middleware
// router.post('/', userContr.createUser);
// router.get('/', projectsDataContr.getProjectData);
router.post("/", authMiddleware, projectsDataContr.postProjectData);
router.put("/:id", authMiddleware,idChecker, projectsDataContr.PutProjectData);
router.delete("/:id", authMiddleware,idChecker, projectsDataContr.deleteProjectData);

// router.get('/:id', userContr.getUserById);
// router.put('/', authMiddleware, userContr.updateUser);
// router.delete('/', authMiddleware, userContr.deleteUser);
// router.post('/login', userContr.login);
// router.post('/forget', userContr.forget);
export default router;