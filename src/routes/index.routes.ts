import express from "express";
import userRouter from './user.routes.js';
import portfolioRouter from './portfolio.routes.js';
const router = express.Router();
router.use('/users', userRouter);
router.use('/portfolios', portfolioRouter);
router.use('/test', (req, res) => { });

export default router