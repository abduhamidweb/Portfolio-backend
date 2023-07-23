import { Router } from "express";
import ListContr from "../controller/List.contr.js";
import Middleware from "../middleware/project.check.js";
let { POST,GET,DELETE, PUT } = ListContr
let { authMiddleware:auth,idCheckerList:idCheck} = Middleware;
const router = Router();


router.post('/',auth,POST)
router.get('/:id',auth,GET)
router.put('/:id',auth,PUT)
router.delete('/:id',auth,DELETE)

export default router