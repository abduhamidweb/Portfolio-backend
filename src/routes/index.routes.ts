import express from "express";
import userRouter from './user.routes.js';
import experienceDataRouter from './sections/Expreience/expreienceData.routes.js'
import companiesRouter from './companies.routes.js'
import experienceRouter from './experience.routes.js'
// import portfolioRouter from './portfolio.routes.js';
import listRouter from './list.routes.js'
import projectRouter from "./sections/Projects/project.routes.js"
import projectDataRouter from "./sections/Projects/projectData.routes.js"
import sectionRouter from './section.routes.js'
const router = express.Router();
router.use('/users', userRouter);
router.use('/companies', companiesRouter);
router.use('/experience-data', experienceDataRouter)
router.use('/experience', experienceRouter)
router.use('/project', projectRouter);
router.use('/projectData', projectDataRouter);
router.use('/sections', sectionRouter)
router.use('/list', listRouter);

// import expreienceRouter from './sections/Expreience/expreience.routes.js';
// import expreienceDataRouter from './sections/Expreience/expreienceData.routes.js';

// const router = express.Router();
// router.use('/users', userRouter);
// router.use('/expreience', expreienceRouter);
// router.use('/expreienceData', expreienceDataRouter);


router.use('/test', (req, res) => { });

export default router