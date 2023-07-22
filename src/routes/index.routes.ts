import express from "express";
import userRouter from './user.routes.js';
import experienceRouter from './experience.routes.js'
import portfolioRouter from './portfolio.routes.js';
import sectionRouter from './section.routes.js'
const router = express.Router();
router.use('/users', userRouter);
router.use('/portfolios', portfolioRouter);
router.use('/experience', experienceRouter)
router.use('/sections', sectionRouter)
router.use('/test', (req, res) => { });

export default router