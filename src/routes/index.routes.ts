import express from "express";
import projectRouter from "./projects.routes.js";

const router = express.Router();


router.use('/test', (req, res)=>{});
router.use('/project', projectRouter);

export default router