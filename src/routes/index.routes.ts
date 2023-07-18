import express from "express";
import projectRouter from "./projects.routes.js";
import listsRouter from "./lists.routes.js";

const router = express.Router();


router.use('/test', (req, res)=>{});
router.use('/project', projectRouter);
router.use('/list', listsRouter);

export default router