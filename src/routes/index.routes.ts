import express from "express";
import userRouter from './user.routes.js';
import expreienceRouter from './sections/Expreience/expreience.routes.js';
import expreienceDataRouter from './sections/Expreience/expreienceData.routes.js';
const router = express.Router();
router.use('/users', userRouter);
router.use('/expreience', expreienceRouter);
router.use('/expreienceData', expreienceDataRouter);
router.use('/test', (req, res) => { });

export default router